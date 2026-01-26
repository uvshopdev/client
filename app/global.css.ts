import { createVar, globalStyle } from "@vanilla-extract/css";

export const primary = createVar()
export const background = createVar()
export const borderDark = createVar()
export const borderLight = createVar()

globalStyle(":root", {
	vars: {
		[primary]: "#ffffff",
		[background]: "#3b3028",
		[borderDark]: "1px solid #3b3028",
		[borderLight]: "1px solid #d3d3d3",
	}
})

globalStyle("*", {
	margin: 0,
	padding: 0,
	boxSizing: "border-box",
});

globalStyle("body", {
	width: "100dvw",
	height: "100dvh",
	background: "#ffffff"
});

globalStyle("img", {
	width: "100%",
	height: "100%",
});

globalStyle("input,button", {
	borderRadius: "10px",
	background: "none",
	outline: "none",
	padding: "0 20px",
	fontSize: "100%",
	fontFamily: "inherit",
});
globalStyle("input", {
	border: borderLight,
	width: "100%",
	height: "100%",
});
globalStyle("button", {
	display: "flex",
	justifyContent: "cneter",
	alignItems: "center",

	border: borderDark,
	cursor: "pointer",
});
