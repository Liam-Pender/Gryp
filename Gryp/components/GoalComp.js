import React, { useState } from "react";
import { Cell } from "react-native-tableview-simple";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import CheckBox from "expo-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";

/** ok so it's gonna work like this, the index of the goal will
 *  be passed to the comp, then it's pressed the comp will
 *  find the goal with that index and set the "done" to true*/

const GoalItem = (props) => {
  console.log(props.key);
  today = new Date().getTime();

  deadline = new Date(props.date).getTime();

  const [isCompleted, setIsCompleted] = useState(props.done);

  if (deadline < today && isCompleted == false) {
    return (
      <View style={styles.goalItemOverdue}>
        <CheckBox
          value={isCompleted}
          onValueChange={setIsCompleted}
          style={styles.tickBox}
        />
        <Text style={styles.goalText}>{props.title}</Text>
      </View>
    );
  } else if (isCompleted == false) {
    return (
      <View style={styles.goalItem}>
        <CheckBox
          value={isCompleted}
          onValueChange={setIsCompleted}
          style={styles.tickBox}
        />
        <Text style={styles.goalText}>{props.title}</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.goalItemCompleted}>
        <CheckBox
          value={isCompleted}
          onValueChange={setIsCompleted}
          style={styles.tickBox}
        />
        <Text style={styles.goalText}>{props.title}</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  goalItem: {
    height: 60,
    backgroundColor: "#c4d0ff",
    padding: 10,
    borderRadius: 10,
    paddingVertical: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  goalItemCompleted: {
    height: 60,
    backgroundColor: "#78c292",
    padding: 10,
    borderRadius: 10,
    paddingVertical: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  goalItemOverdue: {
    height: 60,
    backgroundColor: "#ff1f3d",
    padding: 10,
    borderRadius: 10,
    paddingVertical: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  tickBoxArea: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  tickBox: {
    width: 30,
    height: 30,
  },
  goalText: {
    fontSize: 18,
    paddingLeft: 5,
  },
});

export { GoalItem };
