import React, { useState } from "react";
import { Cell } from "react-native-tableview-simple";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import CheckBox from "expo-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Day from "react-native-calendars/src/calendar/day";

/**
 * The individual checklist elements for the work out routines.
 */
const Set = (props) => {
  const [isCompleted, setCompleted] = useState(false);
  const [isPlaying, setIsPlayer] = useState(false);
  const [startTime, setStartTime] = useState(null);

  if (props.type == "count") {
    if (isCompleted == false) {
      return (
        <View style={styles.setItem}>
          <CheckBox
            value={isCompleted}
            onValueChange={setCompleted}
            style={styles.tickBox}
          />
          <View style={styles.nameArea}>
            <Text style={styles.setText}>{props.name}</Text>
          </View>
          <View style={styles.countView}>
            <Text style={styles.count}>{props.quant}</Text>
            <Text>Reps</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.setItemCompleted}>
          <CheckBox
            value={isCompleted}
            onValueChange={setCompleted}
            style={styles.tickBox}
          />
          <View style={styles.nameArea}>
            <Text style={styles.setText}>{props.name}</Text>
          </View>
          <View style={styles.countView}>
            <Text style={styles.count}>{props.quant}</Text>
            <Text>Reps</Text>
          </View>
        </View>
      );
    }
  } else {
    if (isCompleted == false) {
      return (
        <View style={styles.setItem}>
          <CheckBox
            value={isCompleted}
            onValueChange={setCompleted}
            style={styles.tickBox}
          />
          <View style={styles.nameArea}>
            <Text style={styles.setText}>{props.name}</Text>
          </View>
          <View style={styles.countView}>
            <Text style={styles.count}>{props.quant}</Text>
            <Text>Seconds</Text>
          </View>
        </View>
      );
    } else if (isCompleted == true) {
      return (
        <View style={styles.setItemCompleted}>
          <CheckBox
            value={isCompleted}
            onValueChange={setCompleted}
            style={styles.tickBox}
          />
          <View style={styles.nameArea}>
            <Text style={styles.setText}>{props.name}</Text>
          </View>
          <View style={styles.countView}>
            <Text style={styles.count}>{props.quant}</Text>
            <Text>Seconds</Text>
          </View>
        </View>
      );
    }
  }
};

function t(st, dur) {
  let d = new Date().getTime() / 1000;
  let rem = parseInt(st + dur - d);
  return rem;
}

const styles = StyleSheet.create({
  countDownTimer: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  setItem: {
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
  setItemCompleted: {
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
  setItemTimer: {
    height: 120,
    backgroundColor: "#c4d0ff",
    padding: 10,
    borderRadius: 10,
    paddingVertical: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  setItemTimerCompleted: {
    height: 120,
    backgroundColor: "#78c292",
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
    width: "15%",
  },
  tickBox: {
    width: 30,
    height: 30,
  },
  setText: {
    fontSize: 18,
    paddingLeft: 5,
    textAlign: "center",
  },
  secondsText: {
    textAlign: "center",
  },
  nameArea: {
    height: "100%",
    width: "65%",
    justifyContent: "center",
    alignContent: "center",
  },
  count: {
    fontSize: 30,
  },
  countView: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
  },
});

export { Set };
