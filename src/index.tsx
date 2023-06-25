import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import * as RR from "react-router-dom";
import * as Lib from "lib/elements";
import { HomePage } from "app/pages/HomePage";
import { ParamPage } from "app/pages/ParamPage";
import { WebApiPage } from "app/pages/WebApiPage";
import { GridPage } from "app/pages/GridPage";
import { Logs } from "lib/lang/Logs";
import { PersistentDrawerLeft } from "app/pages/Drawer";
import { BasicList, VirtualizedList } from "app/pages/List";

// <React.StrictMode></React.StrictMode>

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <Lib.KeyControler />
    <RR.BrowserRouter>
      <RR.Routes>
        <RR.Route path="/" element={<HomePage title="ほうむ" />} />
        <RR.Route path="/param" element={<ParamPage title="ぱらむ" />} />
        <RR.Route path="/webapi" element={<WebApiPage title="通信" />} />
        <RR.Route path="/keycon" element={<GridPage title="ぐりっど" />} />
        <RR.Route path="/drawer" element={<PersistentDrawerLeft />} />
        <RR.Route path="/list" element={<BasicList />} />
        <RR.Route path="/vlist" element={<VirtualizedList />} />
      </RR.Routes>
    </RR.BrowserRouter>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(Logs.vitals);
