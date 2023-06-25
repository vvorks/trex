import React from "react";
import { Logs } from "lib/lang/Logs";
import { KeyCodes } from "lib/browser/KeyCodes";
import { Predicate } from "lib/lang/Types";

const KEY_DELAY = 100;

interface KeyControlerProps {
  children?: React.ReactNode;
}

interface KeyControlerState {}

export class KeyControler extends React.Component<
  KeyControlerProps,
  KeyControlerState
> {
  private static readonly EDIT_STATE_NONE = 0;

  private static readonly EDIT_STATE_HALF = 1;

  private static readonly EDIT_STATE_FULL = 2;

  private lastFocus?: HTMLElement;

  private waitUntil: number;

  private editState: number;

  private saveText: string;

  public constructor(prop: KeyControlerProps) {
    super(prop);
    this.waitUntil = 0;
    this.editState = KeyControler.EDIT_STATE_NONE;
    this.saveText = "";
  }

  public componentDidMount(): void {
    window.addEventListener("keydown", (e) => this.onKeyDown(e));
    window.addEventListener("keyup", (e) => this.onKeyUp(e));
    window.addEventListener("focus", (e) => this.onFocus(e), true);
    window.addEventListener("blur", (e) => this.onBlur(e), true);
    this.resetFocus();
  }

  public render(): React.ReactNode {
    return <>{this.props.children}</>;
  }

  private onKeyDown(evt: KeyboardEvent): void {
    if (!(evt.target instanceof HTMLElement)) {
      evt.preventDefault();
      return;
    }
    const curr = evt.target as HTMLElement;
    const name = this.getName(curr);
    const mods = this.getKeyModifier(evt);
    const macsKey = this.getKeyCode(evt) | (mods & KeyCodes.MOD_MACS);
    Logs.info("onKeyDown(%s) key=0x%x", name, macsKey);
    if (evt.timeStamp < this.waitUntil) {
      evt.preventDefault();
      return;
    }
    const body = document.body;
    if (curr === body) {
      this.restoreFocus();
      evt.preventDefault();
    } else if (macsKey === KeyCodes.F2) {
      if (this.isEditable(curr)) {
        this.editState = KeyControler.EDIT_STATE_FULL;
      }
    } else if (macsKey === KeyCodes.ESCAPE) {
      if (this.editState > KeyControler.EDIT_STATE_NONE) {
        if (document.execCommand) {
          document.execCommand("undo", false);
        } else {
          //undoのふるまいが変になるが致し方なし
          if (curr instanceof HTMLInputElement) {
            curr.value = this.saveText;
            curr.select();
          } else {
            curr.innerText = this.saveText;
            this.selectInnerText(curr);
          }
          evt.preventDefault();
        }
      }
    } else if (macsKey === KeyCodes.ENTER) {
      const next = this.getNextElement(curr, KeyCodes.DOWN, body);
      if (!!next) {
        this.setFocus(next);
        this.waitUntil = evt.timeStamp + KEY_DELAY;
        evt.preventDefault();
      }
    } else if (KeyCodes.isArrowKey(macsKey)) {
      if (this.editState < KeyControler.EDIT_STATE_FULL) {
        const next = this.getNextElement(curr, macsKey, body);
        if (!!next) {
          this.setFocus(next);
          this.waitUntil = evt.timeStamp + KEY_DELAY;
          evt.preventDefault();
        }
      }
    }
  }

  private onKeyUp(evt: KeyboardEvent): void {
    if (!(evt.target instanceof HTMLElement)) {
      evt.preventDefault();
      return;
    }
    const curr = evt.target as HTMLElement;
    const name = this.getName(curr);
    const mods = this.getKeyModifier(evt);
    const macsKey = this.getKeyCode(evt) | (mods & KeyCodes.MOD_MACS);
    Logs.info("onKeyUp  (%s) key=0x%x", name, macsKey);
  }

  private onFocus(evt: FocusEvent): void {
    if (!(evt.target instanceof HTMLElement)) {
      return;
    }
    const curr = evt.target;
    const name = this.getName(curr);
    Logs.info("onFocus %s", name);
    this.lastFocus = curr;
    if (curr instanceof HTMLInputElement) {
      curr.select();
      this.editState = KeyControler.EDIT_STATE_HALF;
      this.saveText = curr.value;
    } else if (this.isEditable(curr)) {
      this.selectInnerText(curr);
      this.editState = KeyControler.EDIT_STATE_HALF;
      this.saveText = curr.innerText;
    } else {
      this.editState = KeyControler.EDIT_STATE_NONE;
    }
  }

  private onBlur(evt: FocusEvent): void {
    if (!(evt.target instanceof HTMLElement)) {
      return;
    }
    const target = evt.target;
    const name = this.getName(target);
    Logs.info("onBlur %s", name);
    this.editState = KeyControler.EDIT_STATE_NONE;
    this.saveText = "";
  }

  private getKeyCode(evt: KeyboardEvent): number {
    return evt.keyCode;
  }

  private getKeyModifier(evt: KeyboardEvent): number {
    return (
      (evt.shiftKey ? KeyCodes.MOD_SHIFT : 0) |
      (evt.ctrlKey ? KeyCodes.MOD_CTRL : 0) |
      (evt.altKey ? KeyCodes.MOD_ALT : 0) |
      (evt.metaKey ? KeyCodes.MOD_META : 0) |
      (evt.repeat ? KeyCodes.MOD_REPEAT : 0)
    );
  }

  private getName(e: HTMLElement): string {
    const dataName = e.getAttribute("data-name");
    return dataName !== null ? dataName : e.tagName;
  }

  private getNextElement(
    curr: HTMLElement,
    modKey: number,
    root: HTMLElement
  ): HTMLElement | undefined {
    const currRect = curr.getBoundingClientRect();
    let pred: Predicate<HTMLElement>;
    switch (modKey) {
      case KeyCodes.LEFT:
        pred = (e) =>
          e !== curr &&
          this.isFocusable(e) &&
          currRect.left >= e.getBoundingClientRect().right;
        break;
      case KeyCodes.RIGHT:
        pred = (e) =>
          e !== curr &&
          this.isFocusable(e) &&
          currRect.right <= e.getBoundingClientRect().left;
        break;
      case KeyCodes.UP:
        pred = (e) =>
          e !== curr &&
          this.isFocusable(e) &&
          currRect.top >= e.getBoundingClientRect().bottom;
        break;
      case KeyCodes.DOWN:
        pred = (e) =>
          e !== curr &&
          this.isFocusable(e) &&
          currRect.bottom <= e.getBoundingClientRect().top;
        break;
      default:
        pred = (e) => false;
        break;
    }
    let next: HTMLElement | undefined = undefined;
    let minDistance = Number.MAX_SAFE_INTEGER;
    for (const child of this.getDescendants(root, pred)) {
      const distance = this.getDistance(
        currRect,
        child.getBoundingClientRect()
      );
      if (next === undefined || distance < minDistance) {
        next = child;
        minDistance = distance;
      }
    }
    return next;
  }

  private resetFocus() {
    const root = document.body;
    for (const child of this.getDescendants(root, (e) => this.isFocusable(e))) {
      this.setFocus(child);
      break;
    }
  }

  private setFocus(e: HTMLElement) {
    e.focus();
  }

  private restoreFocus(): void {
    if (!!this.lastFocus && this.isShown(this.lastFocus)) {
      this.lastFocus.focus();
    } else {
      this.resetFocus();
    }
  }

  private isShown(e: HTMLElement): boolean {
    const r = e.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  }

  private *getDescendants(
    elem: HTMLElement,
    func: Predicate<HTMLElement>
  ): IterableIterator<HTMLElement> {
    if (func(elem)) {
      yield elem;
    }
    for (const c of elem.children) {
      if (c instanceof HTMLElement) {
        yield* this.getDescendants(c, func);
      }
    }
  }

  private isFocusable(e: HTMLElement): boolean {
    return e.tagName === "INPUT" || e.getAttribute("tabIndex") != null;
  }

  private isEditable(e: HTMLElement): boolean {
    return e.tagName === "INPUT" || e.getAttribute("contentEditable") != null;
  }

  private getDistance(r1: DOMRect, r2: DOMRect) {
    const cx1 = Math.round(r1.left + r1.width / 2);
    const cy1 = Math.round(r1.top + r1.height / 2);
    const cx2 = Math.round(r2.left + r2.width / 2);
    const cy2 = Math.round(r2.top + r2.height / 2);
    return Math.sqrt(Math.pow(cx1 - cx2, 2) + Math.pow(cy1 - cy2, 2));
  }

  private selectInnerText(elem: HTMLElement): void {
    window.setTimeout(() => {
      let range: Range;
      let sel: Selection | null;
      range = document.createRange();
      range.selectNodeContents(elem);
      sel = window.getSelection();
      if (sel !== null) {
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }, 0);
  }
}
