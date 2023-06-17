import React from "react";
import { HasId, Render } from "lib/lang/Types";

interface TableProps<T extends HasId> {
  array: T[];
  header: Render<T>;
  body: Render<T>;
}

export class Table<T extends HasId> extends React.Component<
  TableProps<T>,
  any
> {
  public constructor(prop: TableProps<T>) {
    super(prop);
  }
  public render(): React.ReactNode {
    if (this.props.array.length === 0) {
      return <></>;
    }
    const firstRec = this.props.array[0];
    return (
      <table border={1}>
        <thead>
          <tr>{this.props.header(firstRec)}</tr>
        </thead>
        <tbody>
          {this.props.array.map((e) => (
            <tr key={e.id}>{this.props.body(e)}</tr>
          ))}
        </tbody>
      </table>
    );
  }
}
