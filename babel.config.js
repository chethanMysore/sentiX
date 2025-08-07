export default function (api) {
  api.cache(true);
  const plugins = [
    // Required for expo-router
    // "expo-router/babel",
    // "module-resolver",
    // {
    //   root: ["./"],
    //   alias: {
    //     ...api(
    //       process.env.BABEL_ENV === "web" && {
    //         "victory-native$": "victory",
    //       }
    //     ),
    //   },
    //   extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    // },
    "module-resolver",
    "react-native-reanimated/plugin", // 👈🏼 add this as the LAST item in plugins
  ];
  return {
    presets: ["babel-preset-expo"],
    plugins,
  };
}
