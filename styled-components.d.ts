import "styled-components";

declare module "styled-components" {
	export interface DefaultTheme {
		colors: {
			primary: string;
			primaryHover: string;
			primaryLight: string;
			secondary: string;
			background: string;
			surface: string;
			surfaceElevated: string;
			textPrimary: string;
			textSecondary: string;
			muted: string;
			overlay: string;
			success: string;
		};
	}
}
