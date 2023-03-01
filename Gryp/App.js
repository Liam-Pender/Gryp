import { StatusBar } from "expo-status-bar";
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Section, TableView } from "react-native-tableview-simple";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import UserData from "./userdata.json";
import LogInfo from "./log.json";
import { ClimbingLogCell } from "./components/ClimbingLogCell.js";
import { GoalItem } from "./components/GoalComp";
import { Picker } from "@react-native-picker/picker";
import CheckBox from "expo-checkbox";
import DateTimePicker from "@react-native-community/datetimepicker";

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.scrollStyle}>
      <Image
        style={styles.logo}
        source={require("./assets/GrypLogoWhite.png")}
      />
      <Image
        style={styles.homeImage}
        source={require("./assets/homeClimb.png")}
      />
      <TouchableOpacity
        style={styles.homeScreenTouchable}
        onPress={() => navigation.navigate("Calendar")}
      >
        <Text style={{ textAlign: "center" }}>Calendar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.homeScreenTouchable}
        onPress={() => navigation.navigate("ClimbingLogScreen")}
      >
        <Text style={{ textAlign: "center" }}>Climbing Log</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.homeScreenTouchable}
        onPress={() => navigation.navigate("Goals")}
      >
        <Text style={{ textAlign: "center" }}>Goals</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.homeScreenTouchable}
        onPress={() => navigation.navigate("Setting")}
      >
        <Text style={{ textAlign: "center" }}>Settings</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </ScrollView>
  );
}

function Calendar({ navigation }) {
  return (
    <ScrollView style={styles.scrollStyle}>
      <Image
        style={styles.logo}
        source={require("./assets/GrypLogoWhite.png")}
      />
      <Text>Calendar</Text>
    </ScrollView>
  );
}

function Goals({ navigation }) {
  return (
    <ScrollView style={styles.scrollStyle}>
      <Image
        style={styles.logo}
        source={require("./assets/GrypLogoWhite.png")}
      />
      <TouchableOpacity style={styles.newGoal}>
        <Text style={styles.newGoalText}>New Goal</Text>
      </TouchableOpacity>
      <GoalItem date={"2023-02-02"} text={"goal1"} />
      <GoalItem date={"2023-03-05"} text={"goal2"} />
    </ScrollView>
  );
}

function Settings({ navigation }) {
  return (
    <ScrollView style={styles.scrollStyle}>
      <Image
        style={styles.logo}
        source={require("./assets/GrypLogoWhite.png")}
      />
      <Text>Hello {JSONdata.name}</Text>
    </ScrollView>
  );
}

function ClimbingLogScreen({ navigation }) {
  return (
    <ScrollView style={styles.scrollStyle}>
      <Image
        style={styles.logo}
        source={require("./assets/GrypLogoWhite.png")}
      />
      <TableView>
        {LogInfo.Climbing_logs.map((section, i) => (
          <Section
            name={"climbing log"}
            hideSeparator="false"
            separatorTintColor={"transparent"}
            headerComponent
          >
            <ClimbingLogCell
              key={i}
              logEntryName={section.entry_name}
              date={section.date}
              grade={section.grade}
              logInfo={section.info}
              action={() => navigation.navigate("LogPage", { k: i })}
            />
          </Section>
        ))}
      </TableView>
    </ScrollView>
  );
}

function LogPage({ route, navigation }) {
  
  const { k } = route.params;
  const [name, setName] = useState(LogInfo.Climbing_logs[k].entry_name);
  const [date, setDate] = useState(LogInfo.Climbing_logs[k].date);
  const [info, setInfo] = useState(LogInfo.Climbing_logs[k].info);
  const [image, setImage] = useState(LogInfo.Climbing_logs[k].imagePath);
  const [grade, setGrade] = useState(LogInfo.Climbing_logs[k].grade);
  const [isCompleted, setCompleted] = useState(
    LogInfo.Climbing_logs[k].completed
  );

  return (
    <ScrollView style={styles.logStyle}>
      <View>
        <TextInput
          style={styles.logNameText}
          onChangeText={async (name) => {
            setName(name);
          }}
          value={name}
          placeholder={"log " + k}
        />
        <Text style={styles.dateText}>{date}</Text>
        <View style={styles.pickerView}>
          <Picker
            style={styles.dropdown}
            selectedValue={grade}
            onValueChange={(itemValue, itemIndex) => setGrade(itemValue)}
          >
            <Picker.Item label="V1" value="1" />
            <Picker.Item label="V2" value="2" />
            <Picker.Item label="V3" value="3" />
            <Picker.Item label="V4" value="4" />
            <Picker.Item label="V5" value="5" />
            <Picker.Item label="V6" value="6" />
            <Picker.Item label="V7" value="7" />
            <Picker.Item label="V8" value="8" />
            <Picker.Item label="V9" value="9" />
            <Picker.Item label="V10" value="10" />
            <Picker.Item label="V11" value="11" />
          </Picker>
        </View>
        <ScrollView style={styles.logEntryScroll}>
          <TextInput
            multiline={true}
            onChangeText={async (info) => {
              setInfo(info);
            }}
            value={info}
            placeholder={""}
          />
        </ScrollView>
        <View style={styles.checkboxContainer}>
          <Text> Route Completed </Text>
          <CheckBox
            value={isCompleted}
            onValueChange={setCompleted}
            style={styles.checkbox}
          />
        </View>
      </View>
      <View style={styles.saveButton}>
        <Button
          style={styles.saveButton}
          title="Save changes"
          onPress={() => {
            console.log("saving new data");
            console.log(name);
            LogInfo.Climbing_logs[k].name = name;
            LogInfo.Climbing_logs[k].date = date;
            LogInfo.Climbing_logs[k].info = info;
            LogInfo.Climbing_logs[k].imagePath = image;
            LogInfo.Climbing_logs[k].grade = grade;
            LogInfo.Climbing_logs[k].completed = isCompleted;
          }}
        />
      </View>
    </ScrollView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Calendar" component={Calendar} />
        <Stack.Screen name="Setting" component={Settings} />
        <Stack.Screen name="ClimbingLogScreen" component={ClimbingLogScreen} />
        <Stack.Screen name="Goals" component={Goals} />
        <Stack.Screen name="LogPage" component={LogPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "0065ff",
    alignItems: "center",
    justifyContent: "center",
  },

  scrollStyle: {
    width: "100%",
    height: "100%",
    backgroundColor: "#003482",
  },
  logStyle: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F5F5F5",
  },
  homeScreenTouchable: {
    alignSelf: "center",
    width: "90%",
    height: 100,
    backgroundColor: "lightgray",
    marginBottom: 10,
    marginVertical: 10,
    borderRadius: 10,
  },

  logo: {
    alignSelf: "center",
    width: 100,
    height: 50,
    marginVertical: 10,
    borderRadius: 10,
    resizeMode: "stretch",
  },

  homeImage: {
    alignSelf: "center",
    width: "100%",
    marginVertical: 10,
    height: 200,
  },

  newGoal: {
    width: "90%",
    height: 30,
    backgroundColor: "white",
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 10,
  },

  newGoalText: {
    fontSize: 18,
    textAlign: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    margin: 10,
  },
  checkbox: {
    alignSelf: "center",
  },
  infoScroll: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: 100,
  },
  dropdown: {
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "white",
    marginVertical: 5,
    marginHorizontal: 10,
  },
  pickerView: {
    marginVertical: 5,
    marginHorizontal: 10,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: "white",
  },
  logNameText: {
    fontSize: 18,
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: "white",
    height: 30,
    paddingHorizontal: 5,
    borderRadius: 10,
    borderWidth: 1,
  },
  logEntryScroll: {
    padding: 5,
    marginHorizontal: 10,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "black",
    height: 100,
  },
  saveButton: {
    justifyContent: "center",
    margin: 10,
  },
});
