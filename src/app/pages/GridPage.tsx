import * as Mui from "@mui/material";
import * as Lib from "lib/elements";
import React from "react";
import { Logs } from "lib/lang/Logs";
import { Values } from "lib/lang/Values";

type Props = {
  title?: string;
};

export function GridPage(props: Props): React.ReactElement {
  const title = Values.getValue(props.title, "button");

  function onClick(arg0: string): void {
    Logs.debug("onClick %s", arg0);
  }

  function renderRow(i: number): React.ReactElement {
    return (
      <Mui.Grid key={i} container spacing={2}>
        <Mui.Grid item xs={2}>
          <Mui.Button
            sx={{ width: "100%" }}
            data-name="text"
            onClick={() => onClick("text" + i)}
          >
            text({i})
          </Mui.Button>
        </Mui.Grid>
        <Mui.Grid item xs={2}>
          <Mui.Button
            sx={{ width: "100%" }}
            data-name="cont"
            onClick={() => onClick("cont" + i)}
            variant="contained"
          >
            contained({i})
          </Mui.Button>
        </Mui.Grid>
        <Mui.Grid item xs={2}>
          <Mui.Button
            sx={{ width: "100%" }}
            data-name="outl"
            onClick={() => onClick("outl" + i)}
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

  const ids = [];
  for (let i = 0; i < 100; i++) {
    ids.push(i);
  }
  return (
    <>
      <h1>{title}</h1>
      {ids.map((i) => renderRow(i))}
    </>
  );
}
