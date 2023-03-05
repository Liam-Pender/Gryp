import React, { useState, useEffect } from "react";
import { Cell } from "react-native-tableview-simple";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import CheckBox from "expo-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function _getGoalValues() {
  try {
    const goalJson = await AsyncStorage.getItem("@GoalList");
    return JSON.parse(goalJson);
  } catch (e) {
    console.log("failed to laod: " + e);
  }
}

async function updateGoals(list) {
  let string = JSON.stringify(list);
  AsyncStorage.setItem("@GoalList", string);
}

const GoalItem = (props) => {
  const [goalArr, setGoalArr] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await _getGoalValues();

      setGoalArr(data);
    };
    fetchData();
  }, []);

  const updateBool = () => {
    if (isCompleted) {
      setIsCompleted(false);
      let temp = goalArr;
      temp.goal[props.k].achieved = false;
      updateGoals(temp);
    } else {
      setIsCompleted(true);
      let temp = goalArr;
      temp.goal[props.k].achieved = true;
      updateGoals(temp);
    }
  };

  let today = new Date().getTime();

  let deadline = new Date(props.date).getTime();

  const [isCompleted, setIsCompleted] = useState(props.achieved);

  if (deadline < today && isCompleted == false) {
    return (
      <View style={styles.goalItemOverdue}>
        <CheckBox
          value={isCompleted}
          onValueChange={updateBool}
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
          onValueChange={updateBool}
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
          onValueChange={updateBool}
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
