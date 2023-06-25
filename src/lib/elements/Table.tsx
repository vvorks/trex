import React from "react";
import { HasId, Render } from "lib/lang/Types";

interface Props<T extends HasId> {
  array: T[];
  header: Render<T>;
  body: Render<T>;
}

export function Table<T extends HasId>(props: Props<T>): React.ReactElement {
  if (!props.array || props.array.length === 0) {
    return <></>;
  }
  const firstRec = props.array[0];
  return (
    <table border={1}>
      <thead>
        <tr>{props.header(firstRec)}</tr>
      </thead>
      <tbody>
        {props.array.map((e) => (
          <tr key={e.id}>{props.body(e)}</tr>
        ))}
      </tbody>
    </table>
  );
}
