import { style } from "@vanilla-extract/css";

import { background, primary } from "@/app/global.css";

export const content = style({
	width: "100%",
	display: "grid",
	gridTemplateColumns: "repeat(3, 1fr)",
	padding: "15px 40px",
	boxShadow: "0 2px 8px rgba(0, 0, 0, .1)",
});
export const navigation = style({
	display: "flex",
	gap: 30,
});
export const logo = style({
	position: "relative",
	width: 40,
	height: 40,
});
export const categories = style({
	display: "flex",
	alignItems: "center",
	gap: 10,

	height: "100%",

	background: background,
	color: primary,
	border: "none",
});

export const search = style({
	position: "relative",

	display: "flex",
	justifySelf: "center",

	minWidth: 220,
	maxWidth: 470,
	width: "100%",
});
export const input = style({
	position: "absolute",
	left: 0,
	top: 0,
});
export const button = style({
	position: "absolute",
	top: 0,
	right: 0,

	height: "100%",

	fontSize: "100%",
	background: background,
	color: primary,
	border: "none",
});

export const profile = style({
	display: "flex",
	gap: 25,
	justifySelf: "end",
});
export const profileButton = style({
	padding: "0 12px",
	borderWidth: 1,
	background: "none",
	color: "unset",
});
