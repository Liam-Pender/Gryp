import React from "react";
import { Cell } from "react-native-tableview-simple";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import GoalList from '../goalList.json';

/** ok so it's gonna work like this, the index of the goal will 
 *  be passed to the comp, then it's pressed the comp will 
 *  find the goal with that index and set the "done" to true*/

const GoalItem = (props) => {
  
  today = new Date().getTime();

  deadline = new Date(props.date).getTime();

  if(deadline < today){
    return (
      <View style={styles.goalItemOverdue}>
        <View style={styles.tickBoxArea}>
          <TouchableOpacity style={styles.tickBox}></TouchableOpacity>
        </View>
        <Text style={styles.goalText}>{props.text}</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.goalItem}>
        <View style={styles.tickBoxArea}>
          <TouchableOpacity style={styles.tickBox}></TouchableOpacity>
        </View>
        <Text style={styles.goalText}>{props.text}</Text>
      </View>
    );
  }
  
};

const styles = StyleSheet.create({
  goalItem: {
    height: 80,
    backgroundColor: "#c4d0ff",
    padding: 10,
    borderRadius: 10,
    paddingVertical: 10,
    marginBottom: 10,
    flexDirection: 'row'
  },
  goalItemOverdue: {
    height: 80,
    backgroundColor: "#ff1f3d",
    padding: 10,
    borderRadius: 10,
    paddingVertical: 10,
    marginBottom: 10,
    flexDirection: 'row'
  },
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
  goalText: {
    fontSize: 18,
    paddingLeft: 5,
  },
});

export { GoalItem };
