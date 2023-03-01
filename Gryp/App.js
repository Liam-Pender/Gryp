import { StatusBar } from "expo-status-bar";
import {
  CheckBox,
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
import React from "react";
import UserData from "./userdata.json";
import LogInfo from "./log.json";
import { ClimbingLogCell } from "./components/ClimbingLogCell.js";
import { GoalItem } from "./components/GoalComp";
import { Picker } from "@react-native-picker/picker";

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
        {LogInfo.Climbing_logs.reverse().map((section, i) => (
          <Section
            name={"climbing log"}
            hideSeparator="true"
            separatorTintColor={"transparent"}
            headerComponent
          >
            <ClimbingLogCell
              key={i}
              logEntryName={section.entry_name}
              date={section.date}
              grade={section.grade}
              logInfo={section.info}
              action={() => navigation.navigate("LogPage", section)}
            />
          </Section>
        ))}
      </TableView>
    </ScrollView>
  );
}

function LogPage({ route, navigation }) {
  const { k } = route.params;
  const { name } = LogInfo.Climbing_logs.entry_name;
  const { date } = LogInfo.Climbing_logs.date;
  const { info } = LogInfo.Climbing_logs.info;
  const { image } = LogInfo.Climbing_logs.imagePath;
  const { grade, setGrade } = useState(LogInfo.Climbing_logs.grade);
  const [isCompleted, setCompleted] = useState(LogInfo.Climbing_logs.completed);

  return (
    <ScrollView style={styles.scrollStyle}>
      <View>
        <TextInput
          onChangeText={async (name) => {
            onChangeText(name);
          }}
          value={name}
          placeholder={"log " + k}
        />
        <Text>{date}</Text>
        <Picker
          selectedValue={grade}
          onValueChange={(itemValue, itemIndex) => setGrade(itemValue)}
        >
          <Picker.Item label="V1" value="V1" />
          <Picker.Item label="V2" value="V2" />
          <Picker.Item label="V3" value="V3" />
          <Picker.Item label="V4" value="V4" />
          <Picker.Item label="V5" value="V5" />
          <Picker.Item label="V6" value="V6" />
          <Picker.Item label="V7" value="V7" />
          <Picker.Item label="V8" value="V8" />
          <Picker.Item label="V9" value="V9" />
          <Picker.Item label="V10" value="V10" />
          <Picker.Item label="V11" value="V11" />
        </Picker>
        <View style={styles.checkboxContainer}>
          <Text> Route Completed </Text>
          <CheckBox
            value={isCompleted}
            onValueChange={setCompleted}
            style={styles.checkbox}
          />
        </View>
        <ScrollView>
          <TextInput
            onChangeText={async (info) => {
              onChangeText(info);
            }}
            value={info}
            placeholder={""}
          />
        </ScrollView>
      </View>
      <View style={styles.basketView}>
        <Button
          style={styles.basketbutton}
          title="Save changes"
          onPress={() => {}}
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
    marginBottom: 20,
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
});
