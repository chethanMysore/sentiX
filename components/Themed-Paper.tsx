/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import React from "react";
import {
  Text as DefaultText,
  View as DefaultView,
  TextInput as DefaultTextInput,
  TouchableOpacity as DefaultTouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

import Colors from "@/constants/Colors";
import { useAppTheme } from "@/constants/AppTheme";
import { useColorScheme } from "./useColorScheme";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
  disabled?: boolean;
  isLink?: boolean;
  buttonColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];
export type TextInputProps = ThemeProps & DefaultTextInput["props"];
export type ButtonProps = ThemeProps & TouchableOpacityProps;

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? "light";
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function Text(props: TextProps) {
  const theme = useAppTheme();
  const { style, lightColor, darkColor, isLink, ...otherProps } = props;

  return (
    <DefaultText
      style={[
        {
          color: !!isLink && isLink ? theme.colors.primary : theme.colors.text,
        },
        style,
      ]}
      {...otherProps}
    />
  );
}

export function View(props: ViewProps) {
  const theme = useAppTheme();
  const { style, lightColor, darkColor, ...otherProps } = props;
  return (
    <DefaultView
      style={[{ backgroundColor: theme.colors.primaryContainer }, style]}
      {...otherProps}
    />
  );
}

export function TextInput(props: TextInputProps) {
  const theme = useAppTheme();
  const { style, lightColor, darkColor, disabled, ...otherProps } = props;

  return (
    <DefaultTextInput
      style={[
        {
          backgroundColor: disabled
            ? theme.colors.secondaryContainer
            : theme.colors.plainContainer,
        },
        style,
      ]}
      {...otherProps}
    />
  );
}

export function TouchableOpacity(props: ButtonProps) {
  const theme = useAppTheme();
  const { style, disabled, buttonColor, ...otherProps } = props;
  return (
    <DefaultTouchableOpacity
      style={[
        {
          backgroundColor:
            buttonColor ??
            (!!disabled && disabled
              ? theme.colors.outline
              : theme.colors.primary),
        },
        style,
      ]}
      {...otherProps}
    />
  );
}
