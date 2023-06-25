import * as Mui from "@mui/material";
import { FixedSizeList, ListChildComponentProps } from "react-window";

export function VirtualizedList() {
  function renderRow(props: ListChildComponentProps) {
    const { index, style } = props;

    return (
      <Mui.ListItem style={style} key={index} component="div" disablePadding>
        <Mui.ListItemButton>
          <Mui.ListItemText primary={`Item ${index + 1}`} />
        </Mui.ListItemButton>
      </Mui.ListItem>
    );
  }
  return (
    <Mui.Box
      sx={{
        width: "100%",
        height: 400,
        maxWidth: 360,
        bgcolor: "background.paper",
      }}
    >
      <FixedSizeList
        height={400}
        width={360}
        itemSize={48}
        itemCount={200}
        overscanCount={5}
        useIsScrolling
      >
        {renderRow}
      </FixedSizeList>
    </Mui.Box>
  );
}

export function BasicList() {
  function renderRow(index: number) {
    return (
      <Mui.ListItem key={index} component="div" disablePadding>
        <Mui.ListItemButton>
          <Mui.ListItemText primary={`Item ${index + 1}`} />
        </Mui.ListItemButton>
      </Mui.ListItem>
    );
  }
  const ids = [];
  for (let i = 0; i < 400; i++) {
    ids.push(i);
  }
  return (
    <Mui.Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <Mui.List>{ids.map((i) => renderRow(i))}</Mui.List>
    </Mui.Box>
  );
}
