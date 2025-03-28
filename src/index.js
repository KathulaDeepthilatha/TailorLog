import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Buffer } from 'buffer';

window.Buffer = Buffer;

import "bootstrap/dist/css/bootstrap.min.css";

const root = createRoot(document.getElementById("root"));
root.render(<App />);
