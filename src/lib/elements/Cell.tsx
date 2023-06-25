import * as Mui from "@mui/material";
import React from "react";

interface CellProps {
  name?: string;
}

export class Cell extends React.Component<CellProps, any> {
  public constructor(prop: CellProps) {
    super(prop);
  }

  public render(): React.ReactNode {
    return (
      <div
        contentEditable
        data-name={this.props.name}
        tabIndex={0}
        dangerouslySetInnerHTML={{
          __html: "",
        }}
      ></div>
    );
  }
}
