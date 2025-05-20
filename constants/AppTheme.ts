import { MD3LightTheme as DefaultTheme, useTheme } from "react-native-paper";

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primaryContainer: "#fcfbfd",
    secondaryContainer: "#bcbddc",
    plainContainer: "#efedf5",
    primary: "#3f007d",
    secondary: "#54278f",
    tertiary: "#6a51a3",
    text: "#000",
  },
};
export type AppTheme = typeof theme;
export const useAppTheme = () => useTheme<AppTheme>();
