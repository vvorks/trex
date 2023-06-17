import React from "react";
import { Table } from "../../lib/elements/Table";
import { Logs } from "../../lib/util/Logs";

type KeyValue = { id: number; key: string; value: string };

type Props = {
  title: string;
};

type State = {
  rows: KeyValue[];
};

export class ParamPage extends React.Component<Props, State> {
  public constructor(prop: Props) {
    super(prop);
    const searchParams = new URLSearchParams(document.location.search);
    const rows: KeyValue[] = [];
    for (const [k, v] of searchParams.entries()) {
      const rec: KeyValue = { id: rows.length, key: k, value: v };
      rows.push(rec);
    }
    this.state = {
      rows: rows,
    };
  }

  private idClicked(id: number): void {
    Logs.debug("idClicked %d", id);
  }

  private renderHeader(e: KeyValue): React.ReactNode {
    return (
      <>
        <th>id</th>
        <th>key</th>
        <th>value</th>
      </>
    );
  }

  private renderBody(e: KeyValue): React.ReactNode {
    return (
      <>
        <td onClick={() => this.idClicked(e.id)}>{e.id}</td>
        <td>{e.key}</td>
        <td>{e.value}</td>
      </>
    );
  }

  public render(): React.ReactNode {
    return (
      <>
        <h1>{this.props.title}</h1>
        <Table
          array={this.state.rows}
          header={(e) => this.renderHeader(e)}
          body={(e) => this.renderBody(e)}
        />
      </>
    );
  }
}
