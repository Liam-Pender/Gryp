import React from "react";
import { Cell } from "react-native-tableview-simple";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

const ClimbingLogCell = (props) => (
  <Cell
    {...props}
    backgroundColor="transparent"
    cellContentView={
      <TouchableOpacity style={styles.logCell} onPress={props.action}>
        <View style={styles.logName}>
          <Text style={styles.logTitle}>{props.logEntryName} </Text>
          <Text>Grade: {props.grade}</Text>
          <Text>Date:{props.date}</Text>
        </View>
        <View style={styles.logInfo}>
          <Text>{props.logInfo}</Text>
        </View>
      </TouchableOpacity>
    }
  />
);

const styles = StyleSheet.create({
  logCell: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 5,
    height: 150,
    marginHorizontal: 5,
    borderColor: "black",
    borderWidth: 1,
  },

  logName: {
    width: "100%",
    height: 70,
    backgroundColor: "lightgray",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },

  logTitle: {
    fontSize: 25,
  },

  logInfo: {
    width: "100%",
    borderRadius: 5,
    height: 80,
  },
});

export { ClimbingLogCell };
