import React from "react";
import { useTheme } from "styled-components";
import { ActivityIndicator, View } from "react-native";

export function Load() {
  const { COLORS } = useTheme();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
      <ActivityIndicator color={COLORS.PRIMARY_900} size="large" />
    </View>
  );
}
