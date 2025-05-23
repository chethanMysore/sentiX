/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import React, { useMemo } from "react";
import {
  Text as DefaultText,
  View as DefaultView,
  TextInput as DefaultTextInput,
  TouchableOpacity as DefaultTouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  TextInputChangeEventData,
  StyleSheet,
} from "react-native";

import {
  Dropdown as DefaultDropdown,
  DropdownProps,
  DropdownItemProps,
  DropdownInputProps,
  DropdownInput,
} from "react-native-paper-dropdown";

import {
  TextInput as PaperTextInput,
  Text as PaperText,
  Card,
  CardProps as DefaultCardProps,
} from "react-native-paper";

import Colors from "@/constants/Colors";
import { theme, useAppTheme } from "@/constants/AppTheme";
import { useColorScheme } from "./useColorScheme";
import { Divider, TouchableRipple } from "react-native-paper";

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
export type CardProps = ThemeProps & DefaultCardProps;

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

export function SentixContainer(props: ViewProps) {
  const theme = useAppTheme();
  const { style, lightColor, darkColor, ...otherProps } = props;
  return (
    <DefaultView
      style={[
        { backgroundColor: theme.colors.plainContainer },
        styles.container,
        style,
      ]}
      {...otherProps}
    />
  );
}

export function SentixForm(props: CardProps) {
  const theme = useAppTheme();
  const { style, lightColor, darkColor, children, ...otherProps } = props;

  return (
    <Card
      style={[
        { backgroundColor: theme.colors.primaryContainer },
        styles.centeredView,
        style,
      ]}
    >
      {children}
    </Card>
  );
}

const CustomDropdownItem = ({
  width,
  option,
  value,
  onSelect,
  toggleMenu,
  isLast,
}: DropdownItemProps) => {
  const style: ViewStyle = useMemo(
    () => ({
      backgroundColor: theme.colors.plainContainer,
      justifyContent: "center",
    }),
    [option.value, value]
  );
  return (
    <>
      <TouchableRipple
        onPress={() => {
          onSelect?.(option.value);
          toggleMenu();
        }}
        style={style}
      >
        <PaperText
          style={{
            backgroundColor: theme.colors.plainContainer,
            // marginVertical: 4,
            height: 50,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 4,
            padding: 10,
            verticalAlign: "middle",
            textAlignVertical: "center",
          }}
        >
          {option.label}
        </PaperText>
      </TouchableRipple>
      {/* {!isLast && <Divider />} */}
    </>
  );
};

const CustomDropdownInput = ({
  placeholder,
  selectedLabel,
  rightIcon,
  label,
}: DropdownInputProps) => (
  <>
    <PaperTextInput
      // mode="outlined"
      label={label}
      placeholder={placeholder}
      value={selectedLabel}
      style={{
        backgroundColor: theme.colors.plainContainer,
        marginVertical: 4,
        height: 50,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 4,
        // padding: 10,
        fontSize: 16,
      }}
      right={rightIcon}
    />
  </>
);

export function Dropdown(props: DropdownProps) {
  const { label, placeholder, options, value, onSelect } = props;
  return (
    <DefaultDropdown
      label={label}
      placeholder={placeholder}
      options={options}
      value={value}
      onSelect={onSelect}
      menuContentStyle={{ backgroundColor: theme.colors.plainContainer }}
      menuUpIcon={<PaperTextInput.Icon icon="menu-up" pointerEvents="none" />}
      menuDownIcon={
        <PaperTextInput.Icon icon="menu-down" pointerEvents="none" />
      }
      CustomDropdownInput={CustomDropdownInput}
      CustomDropdownItem={CustomDropdownItem}
      hideMenuHeader
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // backgroundColor: theme.colors.plainContainer,
    height: "100%",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    // backgroundColor: theme.colors.primaryContainer,
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1000,
  },
});
