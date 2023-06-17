import * as Mui from "@mui/material";
import React from "react";
import { Logs } from "lib/lang/Logs";

type Props = {
  title: string;
};

type State = {
  value: number;
};

export class MuiButtnTestPage extends React.Component<Props, State> {
  public constructor(prop: Props) {
    super(prop);
    this.state = {
      value: 0,
    };
  }

  private onClick(arg0: string): void {
    Logs.debug("onClick %s", arg0);
  }

  public render(): React.ReactNode {
    return (
      <>
        <h1>{this.props.title}</h1>
        <Mui.Button tabIndex={0} onClick={() => this.onClick("text")}>
          text
        </Mui.Button>
        <Mui.Button
          tabIndex={0}
          onClick={() => this.onClick("cont")}
          variant="contained"
        >
          contained
        </Mui.Button>
        <Mui.Button
          tabIndex={0}
          onClick={() => this.onClick("outl")}
          variant="outlined"
        >
          outlined
        </Mui.Button>
      </>
    );
  }
}
