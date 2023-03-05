import React, { useState } from "react";
import { Cell } from "react-native-tableview-simple";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import CheckBox from "expo-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WorkOutCell = (props) => {
  return (
    <View style={styles.trainingCell}>
      <TouchableOpacity style={styles.trainingTouchable} onPress={props.action}>
        <Text style={styles.nameText}>{props.name}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  trainingCell: {
    height: 200,
    flex: 1,
  },
  trainingTouchable: {
    flex: 1,
    flexDirection: "column",
    margin: 4,
    borderRadius: 5,
    backgroundColor: "#909090",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  nameText: {
    fontSize: 40,
    color: "#FFFFFF",
  },
});

export { WorkOutCell };
