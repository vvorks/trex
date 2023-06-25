import axios from "axios";
import React from "react";
import * as Lib from "lib/elements";
import { Values } from "lib/lang/Values";

type MemberRec = { id: number; name: string; age: number };

type Props = {
  title?: string;
};

type State = {
  rows: MemberRec[];
};

export function WebApiPage(props: Props): React.ReactElement {
  const title = Values.getValue(props.title, "webapi");
  const [state, setState] = React.useState<State>({ rows: [] });

  React.useEffect(() => {
    axios.get("http://localhost:3100/member").then((resp) => {
      const rows = resp.data as MemberRec[];
      setState({ rows: rows });
    });
  }, []);

  function renderHeader(e: MemberRec): React.ReactElement {
    return (
      <>
        <th>id</th>
        <th>name</th>
        <th>age</th>
      </>
    );
  }

  function renderBody(e: MemberRec): React.ReactElement {
    return (
      <>
        <td>{e.id}</td>
        <td>{e.name}</td>
        <td>{e.age}</td>
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
