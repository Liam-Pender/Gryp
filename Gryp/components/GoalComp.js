import React from "react";
import { Cell } from "react-native-tableview-simple";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

/** ok so it's gonna work like this, the index of the goal will 
 *  be passed to the comp, then it's pressed the comp will 
 *  find the goal with that index and set the "done" to true*/

const GoalItem = (props) => {
  return (
    <View style={styles.goalItem}>
      <View style={styles.tickBoxArea}>
        <TouchableOpacity style={styles.tickBox}></TouchableOpacity>
      </View>
      <Text>{props.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tickBoxArea: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  tickBox: {
    width: 30,
    height: 30,
    borderWidth: 1,
    backgroundColor: "white",
    borderColor: "black",
  },
  goalItem: {
    height: 50,
    backgroundColor: "#c4d0ff",
    padding: 10,
    borderRadius: 10,
  },
  goalText: {
    fontSize: 18,
  },
});

export { GoalItem };
