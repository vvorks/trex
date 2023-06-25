import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import * as RR from "react-router-dom";
import * as Lib from "lib/elements";
import { HomePage } from "app/pages/HomePage";
import { ParamPage } from "app/pages/ParamPage";
import { WebApiPage } from "app/pages/WebApiPage";
import { MuiButtnTestPage } from "app/pages/MuiButtonTestPage";
import { Logs } from "lib/lang/Logs";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Lib.KeyControler />
    <RR.BrowserRouter>
      <RR.Routes>
        <RR.Route path="/" element={<HomePage title="ホームページ" />} />
        <RR.Route path="/param" element={<ParamPage title="引数取得の例" />} />
        <RR.Route
          path="/webapi"
          element={<WebApiPage title="通信処理の例" />}
        />
        <RR.Route
          path="/mui1"
          element={<MuiButtnTestPage title="Mui Button" />}
        />
      </RR.Routes>
    </RR.BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(Logs.vitals);
