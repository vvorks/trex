import * as Mui from "@mui/material";
import * as Lib from "lib/elements";
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

  private renderRow(i: number): React.ReactNode {
    return (
      <Mui.Grid key={i} container spacing={2}>
        <Mui.Grid item xs={2}>
          <Mui.Button
            sx={{ width: "100%" }}
            data-name="text"
            onClick={() => this.onClick("text" + i)}
          >
            text({i})
          </Mui.Button>
        </Mui.Grid>
        <Mui.Grid item xs={2}>
          <Mui.Button
            sx={{ width: "100%" }}
            data-name="cont"
            onClick={() => this.onClick("cont" + i)}
            variant="contained"
          >
            contained({i})
          </Mui.Button>
        </Mui.Grid>
        <Mui.Grid item xs={2}>
          <Mui.Button
            sx={{ width: "100%" }}
            data-name="outl"
            onClick={() => this.onClick("outl" + i)}
            variant="outlined"
          >
            outlined({i})
          </Mui.Button>
        </Mui.Grid>
        <Mui.Grid item xs={3}>
          <Mui.Input
            sx={{ width: "100%" }}
            data-name="inp"
            placeholder="your name"
          />
        </Mui.Grid>
        <Mui.Grid item xs={3}>
          <Lib.Cell name="edit" />
        </Mui.Grid>
      </Mui.Grid>
    );
  }

  public render(): React.ReactNode {
    const ids = [];
    for (let i = 0; i < 100; i++) {
      ids.push(i);
    }
    return (
      <>
        <h1>{this.props.title}</h1>
        {ids.map((i) => this.renderRow(i))}
      </>
    );
  }
}
