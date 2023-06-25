import React from "react";
import * as Lib from "lib/elements";
import { Logs } from "lib/lang/Logs";
import { Values } from "lib/lang/Values";

type KeyValue = { id: number; key: string; value: string };

type Props = {
  title?: string;
};

type State = {
  rows: KeyValue[];
};

export function ParamPage(props: Props): React.ReactElement {
  const title = Values.getValue(props.title, "param");
  const [state, setState] = React.useState<State>({ rows: [] });

  React.useEffect(() => {
    const searchParams = new URLSearchParams(document.location.search);
    const rows: KeyValue[] = [];
    for (const [k, v] of searchParams.entries()) {
      const rec: KeyValue = { id: rows.length, key: k, value: v };
      rows.push(rec);
    }
    setState({ rows: rows });
  }, []);

  function idClicked(id: number): void {
    Logs.debug("idClicked %d", id);
  }

  function renderHeader(e: KeyValue): React.ReactElement {
    return (
      <>
        <th>id</th>
        <th>key</th>
        <th>value</th>
      </>
    );
  }

  function renderBody(e: KeyValue): React.ReactElement {
    return (
      <>
        <td onClick={() => idClicked(e.id)}>{e.id}</td>
        <td>{e.key}</td>
        <td>{e.value}</td>
      </>
    );
  }

  return (
    <>
      <h1>{title}</h1>
      <Lib.Table
        array={state.rows}
        header={(e) => renderHeader(e)}
        body={(e) => renderBody(e)}
      />
    </>
  );
}
