import axios from "axios";
import React from "react";
import { Table } from "../../lib/elements/Table";

type MemberRec = { id: number; name: string; age: number };

type Props = {
  title: string;
};

type State = {
  rows: MemberRec[];
};

export class WebApiPage extends React.Component<Props, State> {
  private _mounted: boolean;
  private _loadedState?: State;

  public constructor(props: Props) {
    super(props);
    this.state = {
      rows: [],
    };
    this._mounted = false;
    axios.get("http://localhost:3100/member").then((resp) => {
      const rows = resp.data as MemberRec[];
      this.updateState({ rows: rows });
    });
  }

  public componentDidMount(): void {
    this._mounted = true;
    this.flushState();
  }

  public componentWillUnmount(): void {
    this._mounted = false;
  }

  private updateState(state: State): void {
    if (this._mounted) {
      this.setState(state);
    } else {
      this._loadedState = state;
    }
  }

  private flushState(): void {
    if (!!this._loadedState) {
      this.setState(this._loadedState);
      this._loadedState = undefined;
    }
  }

  private renderHeader(e: MemberRec): React.ReactNode {
    return (
      <>
        <th>id</th>
        <th>name</th>
        <th>age</th>
      </>
    );
  }

  private renderBody(e: MemberRec): React.ReactNode {
    return (
      <>
        <td>{e.id}</td>
        <td>{e.name}</td>
        <td>{e.age}</td>
      </>
    );
  }

  public render(): React.ReactNode {
    return (
      <>
        <h1>{this.props.title}</h1>
        <Table
          array={this.state.rows}
          header={this.renderHeader}
          body={this.renderBody}
        />
      </>
    );
  }
}
