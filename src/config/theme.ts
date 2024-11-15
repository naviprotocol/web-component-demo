import { ThemeVars } from "@mysten/dapp-kit";

export const darkTheme: ThemeVars = {
  blurs: {
    modalOverlay: "blur(0)",
  },
  backgroundColors: {
    primaryButton: "#0DC3A4",
    primaryButtonHover: "#0BAF94",
    outlineButtonHover: "#2C2C2E",
    modalOverlay: "rgba(0, 0, 0, 0.6)",
    modalPrimary: "#1C1C1E",
    modalSecondary: "#2C2C2E",
    iconButton: "transparent",
    iconButtonHover: "#2C2C2E",
    dropdownMenu: "#1C1C1E",
    dropdownMenuSeparator: "#2C2C2E",
    walletItemSelected: "#2C2C2E",
    walletItemHover: "#3C3C3E",
  },
  borderColors: {
    outlineButton: "#3C3C3E",
  },
  colors: {
    primaryButton: "#FFFFFF",
    outlineButton: "#FFFFFF",
    iconButton: "#FFFFFF",
    body: "#E0E0E0",
    bodyMuted: "#8E8E93",
    bodyDanger: "#FF6B6B",
  },
  radii: {
    small: "6px",
    medium: "8px",
    large: "12px",
    xlarge: "16px",
  },
  shadows: {
    primaryButton: "0px 4px 12px rgba(13, 195, 164, 0.2)",
    walletItemSelected: "0px 2px 6px rgba(0, 0, 0, 0.2)",
  },
  fontWeights: {
    normal: "400",
    medium: "500",
    bold: "600",
  },
  fontSizes: {
    small: "14px",
    medium: "16px",
    large: "18px",
    xlarge: "20px",
  },
  typography: {
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    fontStyle: "normal",
    lineHeight: "1.3",
    letterSpacing: "1",
  },
};
