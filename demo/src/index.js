import React from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));
bridge.send("VKWebAppInit");
