import { globalStyle } from "@vanilla-extract/css";

globalStyle("*", {
    margin: 0,
    padding: 0,
    boxSizing: "border-box"
})

globalStyle("body", {
    width: "100dvw",
    height: "100dvh"
})