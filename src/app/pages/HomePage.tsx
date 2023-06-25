import { Values } from "lib/lang/Values";
import React from "react";

type Props = {
  title?: string;
};

export function HomePage(props: Props): React.ReactElement {
  const title = Values.getValue(props.title, "home");
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
}
