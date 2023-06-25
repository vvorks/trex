import { Values } from "lib/lang/Values";
import React from "react";

interface Props {
  name?: string;
  value?: string;
}

export function Cell(props: Props): React.ReactElement {
  const name = props.name;
  const value = Values.getValue(props.value, "");
  return (
    <div
      contentEditable
      data-name={name}
      tabIndex={0}
      dangerouslySetInnerHTML={{
        __html: value,
      }}
    ></div>
  );
}
