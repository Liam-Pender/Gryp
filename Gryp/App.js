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
  ImageBackground,
  FlatList,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Section, TableView } from "react-native-tableview-simple";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import AsyncStorage from "@react-native-community/async-storage";
import React, { useEffect, useState, useCallback } from "react";
import LogInfo from "./log.json";
import { ClimbingLogCell } from "./components/ClimbingLogCell.js";
import { GoalItem } from "./components/GoalComp";
import { Picker } from "@react-native-picker/picker";
import CheckBox from "expo-checkbox";
import DateTimePicker from "@react-native-community/datetimepicker";
import Spinner from "react-native-loading-spinner-overlay";
import { WorkOutCell } from "./components/Training";
import { Set } from "./components/Set";
import NumericInput from "react-native-numeric-input";
import DatePicker from "react-native-date-picker";

const Stack = createNativeStackNavigator();
const log = {
  Climbing_logs: [
    {
      entry_name: "This is log 1",
      date: new Date("2022/04/23"),
      info: "Climbed today on a slab, it went well, fell off 3 times, I am now extending the length of this to check multi line printing",
      imagePath: "",
      grade: "4",
      completed: false,
    },
    {
      entry_name: "This is log 2",
      date: new Date("2023/02/23"),
      info: "climbed today on an overhand, fell off 10 times ",
      imagePath: "",
      grade: "1",
      completed: false,
    },
    {
      entry_name: "And this is log 3",
      date: new Date("2023/12/02"),
      info: "blah blah blah",
      imagePath: "",
      grade: "2",
      completed: true,
    },
  ],
};

const gljson = {
  goal: [
    { title: "Goal 1", date: "2023/03/23", achieved: false },
    { title: "Goal 2", date: "2023/01/23", achieved: false },
  ],
};

const trainArr = {
  workOuts: [
    {
      Name: "Default",
      contents: [
        { name: "Pull up", type: "count", quant: 10 },
        { name: "Push up", type: "count", quant: 10 },
        { name: "Squats", type: "count", quant: 10 },
        { name: "50Kg Reps", type: "count", quant: 10 },
      ],
    },
    {
      Name: "Climbing",
      contents: [
        { name: "Pull up", type: "count", quant: 10 },
        { name: "Push up", type: "count", quant: 10 },
        { name: "Squats", type: "count", quant: 10 },
        { name: "50Kg Reps", type: "count", quant: 10 },
        { name: "Finger hang", type: "time", quant: 20 },
        { name: "running", type: "time", quant: 120 },
        { name: "bicep curls", type: "count", quant: 20 },
      ],
    },
  ],
};

function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.scrollStyle}>
      <Image
        style={styles.logo}
        source={require("./assets/GrypLogoWhite.png")}
      />
      <Image
        style={styles.homeImage}
        source={require("./assets/homeClimb.jpg")}
      />

      <View style={styles.homeScreenCells}>
        <TouchableOpacity
          style={styles.homeScreenTouchable}
          onPress={() => navigation.navigate("Training")}
        >
          <ImageBackground
            style={styles.homePageImages}
            source={require("./assets/gym.png")}
          />
          <Text style={styles.homeCellText}>Training</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.homeScreenCells}>
        <TouchableOpacity
          style={styles.homeScreenTouchable}
          onPress={() => navigation.navigate("Climbing Log Screen")}
        >
          <ImageBackground
            style={styles.homePageImages}
            source={require("./assets/logImage.jpg")}
          />
          <Text style={styles.homeCellText}>Climbing Log</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.homeScreenCells}>
        <TouchableOpacity
          style={styles.homeScreenTouchable}
          onPress={() => navigation.navigate("Goals")}
        >
          <ImageBackground
            style={styles.homePageImages}
            source={require("./assets/goals.jpg")}
          />
          <Text style={styles.homeCellText}>Goals</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.homeScreenCells}>
        <TouchableOpacity
          style={styles.homeScreenTouchable}
          onPress={() => navigation.navigate("Setting")}
        >
          <Text style={styles.homeCellText}>Settings</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </ScrollView>
  );
}

async function _getTrainingValues() {
  try {
    const trainJson = await AsyncStorage.getItem("@Training");
    return JSON.parse(trainJson);
  } catch (e) {
    console.log("failed to laod: " + e);
  }
}

function Training({ navigation }) {
  // changed from Calendar to training

  const [trainingArr, setTrainingArr] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await _getTrainingValues();
      setTrainingArr(data.workOuts);
    };
    fetchData();
  }, []);

  return (
    <View style={styles.scrollStyle}>
      <Image
        style={styles.logo}
        source={require("./assets/GrypLogoWhite.png")}
      />
      <TouchableOpacity
        style={styles.newGoal}
        onPress={() => navigation.navigate("New Workout")}
      >
        <Text style={styles.newGoalText}>New work out plan</Text>
      </TouchableOpacity>
      <FlatList
        data={trainingArr}
        extraData={trainArr}
        numColumns={2}
        renderItem={({ item }) => (
          <WorkOutCell
            name={item.Name}
            action={() => navigation.navigate("Work Out", item.contents)}
          />
        )}
      />
    </View>
  );
}

function NewWorkOut({ navigation }) {
  const [newArr, setNewArray] = useState([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("count");
  const [quant, setQuant] = useState(10);
  const [workOutName, setWorkOutName] = useState("unnamed");

  const addElem = () => {
    console.log("pushing to array");
    let newEx = {
      name: `${name}`,
      type: `${type}`,
      quant: `${quant}`,
    };
    setNewArray((newArr) => [...newArr, newEx]);
  };

  return (
    <SafeAreaView style={styles.scrollStyle}>
      <Image
        style={styles.logo}
        source={require("./assets/GrypLogoWhite.png")}
      />
      <TextInput
        style={styles.logNameText}
        onChangeText={async (workOutName) => {
          setWorkOutName(workOutName);
        }}
        value={workOutName}
        placeholder={"unnamed"}
      />
      <View style={styles.newExcersizeView}>
        <View style={styles.newExcersizeNameView}>
          <TextInput
            style={styles.logNameText}
            onChangeText={async (name) => {
              setName(name);
            }}
            value={name}
            placeholder={"Excercise"}
          />
        </View>
        <View style={styles.newExcersizeSelectView}>
          <View style={styles.excersizePickerView}>
            <Picker
              style={styles.excersizeDropdown}
              selectedValue={type}
              onValueChange={(itemValue, itemIndex) => setType(itemValue)}
            >
              <Picker.Item label="Reps" value="count" />
              <Picker.Item label="Time" value="time" />
            </Picker>
          </View>
          <View style={styles.counter}>
            <NumericInput value={quant} onChange={(value) => setQuant(value)} />
          </View>
        </View>
        <TouchableOpacity style={styles.saveElement} onPress={() => addElem()}>
          <Text style={styles.newGoalText}>Save to list</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={styles.newGoal}
          onPress={() => console.log(newArr)}
        >
          <Text style={styles.newGoalText}>Save Workout</Text>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={newArr}
          extraData={newArr}
          numColumns={1}
          renderItem={({ item }) => (
            <Set name={item.name} type={item.type} quant={item.quant} />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

function WorkOut({ route, navigation }) {
  return (
    <View style={styles.scrollStyle}>
      <Image
        style={styles.logo}
        source={require("./assets/GrypLogoWhite.png")}
      />
      <FlatList
        data={route.params}
        extraData={route.params}
        numColumns={1}
        renderItem={({ item }) => (
          <Set name={item.name} type={item.type} quant={item.quant} />
        )}
      />
    </View>
  );
}

async function _getGoalValues() {
  try {
    const goalJson = await AsyncStorage.getItem("@GoalList");
    return JSON.parse(goalJson);
  } catch (e) {
    console.log("failed to laod: " + e);
  }
}

function Goals({ navigation }) {
  const [goalArr, setGoalArr] = useState([]);
  const [state, setState] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await _getGoalValues();
      setGoalArr(data.goal);
    };
    fetchData();
  }, []);

  const onRefresh = useCallback(() => {
    setState(true);
    const fetchData = async () => {
      const data = await _getGoalValues();
      setGoalArr(data.goal);
    };
    fetchData();
    setTimeout(() => {
      setState(false);
    }, 2000);
  }, []);

  return (
    <View style={styles.scrollStyle}>
      <Image
        style={styles.logo}
        source={require("./assets/GrypLogoWhite.png")}
      />
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={styles.newGoal}
          onPress={() => navigation.navigate("New goal")}
        >
          <Text style={styles.newGoalText}>New Goal</Text>
        </TouchableOpacity>
        <View style={styles.newGoal}>
          <Text style={styles.newGoalText}>Pull to refresh</Text>
        </View>
      </View>
      <FlatList
        data={goalArr}
        extraData={goalArr}
        numColumns={1}
        renderItem={({ item, index }) => (
          <GoalItem
            k={index}
            date={item.date}
            title={item.title}
            achieved={item.achieved}
          />
        )}
        refreshing={state}
        onRefresh={onRefresh}
      />
    </View>
  );
}

function addDays(d, m) {
  let curr = new Date();
  curr.setDate(curr.getDate() + d + m * 30);
  return curr;
}

async function addGoal(list, g) {
  list.goal.push(g);
  let string = JSON.stringify(list);
  AsyncStorage.setItem("@GoalList", string);
}

function NewGoal({ navigation }) {
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [days, setDays] = useState(0);
  const [months, setMonths] = useState(0);
  const [existingData, setExistingData] = useState({});

  const goalGenerate = () => {
    let deadline = addDays(days, months);
    let g = { title: `${name}`, date: `${deadline}`, achieved: false };
    return g;
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await _getGoalValues();
      setExistingData(data);
    };
    fetchData();
  }, []);

  const makeAndNavigate = () => {
    addGoal(existingData, goalGenerate());
    navigation.navigate("Goals");
  };

  return (
    <View style={styles.scrollStyle}>
      <Image
        style={styles.logo}
        source={require("./assets/GrypLogoWhite.png")}
      />
      <View
        style={{
          alignItems: "center",
          margin: 5,
          borderWidth: 1,
          borderRadius: 5,
          backgroundColor: "aliceblue",
        }}
      >
        <Text>Goal name</Text>
        <TextInput
          style={styles.goalNameText}
          onChangeText={async (name) => {
            setName(name);
          }}
          value={name}
          placeholder={"Goal name"}
        />
        <Text>Deadline</Text>
        <View style={styles.newGoalSelectView}>
          <View style={styles.goalPickerView}>
            <Picker
              style={styles.excersizeDropdown}
              selectedValue={days}
              onValueChange={(itemValue, itemIndex) => setDays(itemValue)}
            >
              <Picker.Item label="0 day" value={0} />
              <Picker.Item label="1 day" value={1} />
              <Picker.Item label="2 day" value={2} />
              <Picker.Item label="3 day" value={3} />
              <Picker.Item label="4 day" value={4} />
              <Picker.Item label="5 day" value={5} />
              <Picker.Item label="6 day" value={6} />
              <Picker.Item label="7 day" value={7} />
              <Picker.Item label="8 day" value={8} />
              <Picker.Item label="9 day" value={9} />
              <Picker.Item label="10 day" value={10} />
              <Picker.Item label="11 day" value={11} />
              <Picker.Item label="12 day" value={12} />
              <Picker.Item label="13 day" value={13} />
              <Picker.Item label="14 day" value={14} />
              <Picker.Item label="15 day" value={15} />
              <Picker.Item label="16 day" value={16} />
              <Picker.Item label="17 day" value={17} />
              <Picker.Item label="18 day" value={18} />
              <Picker.Item label="19 day" value={19} />
              <Picker.Item label="20 day" value={20} />
              <Picker.Item label="21 day" value={21} />
              <Picker.Item label="22 day" value={22} />
              <Picker.Item label="23 day" value={23} />
              <Picker.Item label="24 day" value={24} />
              <Picker.Item label="25 day" value={25} />
              <Picker.Item label="26 day" value={26} />
              <Picker.Item label="27 day" value={27} />
              <Picker.Item label="28 day" value={28} />
              <Picker.Item label="29 day" value={29} />
              <Picker.Item label="30 day" value={30} />
              <Picker.Item label="31 day" value={31} />
            </Picker>
          </View>
          <View style={styles.goalPickerView}>
            <Picker
              style={styles.excersizeDropdown}
              selectedValue={months}
              onValueChange={(itemValue, itemIndex) => setMonths(itemValue)}
            >
              <Picker.Item label="0 months" value={0} />
              <Picker.Item label="1 months" value={1} />
              <Picker.Item label="2 months" value={2} />
              <Picker.Item label="3 months" value={3} />
              <Picker.Item label="4 months" value={4} />
              <Picker.Item label="5 months" value={5} />
              <Picker.Item label="6 months" value={6} />
              <Picker.Item label="7 months" value={7} />
              <Picker.Item label="8 months" value={8} />
              <Picker.Item label="9 months" value={9} />
              <Picker.Item label="10 months" value={10} />
              <Picker.Item label="11 months" value={11} />
              <Picker.Item label="12 months" value={12} />
              <Picker.Item label="13 months" value={13} />
              <Picker.Item label="14 months" value={14} />
              <Picker.Item label="15 months" value={15} />
              <Picker.Item label="16 months" value={16} />
              <Picker.Item label="17 months" value={17} />
              <Picker.Item label="18 months" value={18} />
              <Picker.Item label="19 months" value={19} />
              <Picker.Item label="20 months" value={20} />
              <Picker.Item label="21 months" value={21} />
              <Picker.Item label="22 months" value={22} />
              <Picker.Item label="23 months" value={23} />
            </Picker>
          </View>
        </View>
        <TouchableOpacity
          style={styles.newGoal}
          onPress={() => makeAndNavigate()}
        >
          <Text style={styles.newGoalText}>Save goal</Text>
        </TouchableOpacity>
      </View>
    </View>
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

async function _getLogValues() {
  try {
    const goalJson = await AsyncStorage.getItem("@LogInfo");
    return JSON.parse(goalJson);
  } catch (e) {
    console.log("failed to laod: " + e);
  }
}

function ClimbingLogScreen({ navigation }) {
  const [logArr, setLogArr] = useState([]);
  const [state, setState] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await _getLogValues();
      setLogArr(data.Climbing_logs);
    };
    fetchData();
  }, []);

  const onRefresh = useCallback(() => {
    setState(true);
    const fetchData = async () => {
      const data = await _getLogValues();
      setLogArr(data.Climbing_logs);
    };
    fetchData();
    setTimeout(() => {
      setState(false);
    }, 2000);
  }, []);

  return (
    <View style={styles.scrollStyle}>
      <Image
        style={styles.logo}
        source={require("./assets/GrypLogoWhite.png")}
      />
      <TouchableOpacity
        style={styles.newGoal}
        onPress={() => navigation.navigate("New Log")}
      >
        <Text style={styles.newGoalText}>New Log entry</Text>
      </TouchableOpacity>
      <FlatList
        data={logArr}
        extraData={logArr}
        numColumns={1}
        renderItem={({ item, index }) => (
          <ClimbingLogCell
            key={index}
            logEntryName={item.entry_name}
            date={item.date}
            grade={item.grade}
            logInfo={item.info}
            action={() => navigation.navigate("Log Page", { k: index })}
          />
        )}
        refreshing={state}
        onRefresh={onRefresh}
      />
    </View>
  );
}

function LogPage({ route, navigation }) {
  const { k } = route.params;
  const [logInfo, setLogInfo] = useState([]);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [info, setInfo] = useState("");
  const [image, setImage] = useState("");
  const [grade, setGrade] = useState();
  const [isCompleted, setCompleted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await _getLogValues();
      setLogInfo(data);
      setName(data.Climbing_logs[k].entry_name);
      setDate(data.Climbing_logs[k].date.slice(0, 10));
      setInfo(data.Climbing_logs[k].info);
      setImage(data.Climbing_logs[k].imagePath);
      setGrade(data.Climbing_logs[k].grade);
      setCompleted(data.Climbing_logs[k].completed);
    };
    fetchData();
  }, []);

  const save = async () => {
    let temp = logInfo;
    temp.Climbing_logs[k].name = name;
    temp.Climbing_logs[k].date = date;
    temp.Climbing_logs[k].info = info;
    temp.Climbing_logs[k].imagePath = image;
    temp.Climbing_logs[k].grade = grade;
    temp.Climbing_logs[k].completed = isCompleted;
    await AsyncStorage.setItem("@LogInfo", JSON.stringify(temp));
    navigation.navigate("Climbing Log Screen");
  };

  return (
    <ScrollView style={styles.logStyle}>
      <View>
        <Text style={styles.goalNameText}> Log Name</Text>
        <Text style={styles.logNameText}>{name}</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.logNameText}>Date</Text>
          <Text style={styles.logNameText}>{date}</Text>
        </View>

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
          onPress={() => save()}
        />
      </View>
    </ScrollView>
  );
}

async function addLog(list, l) {
  list.Climbing_logs.push(l);
  let string = JSON.stringify(list);
  AsyncStorage.setItem("@LogInfo", string);
}

function Newlog({ navigation }) {
  const [logInfo, setLogInfo] = useState([]);
  const [name, setName] = useState("");
  const [info, setInfo] = useState("");
  const [grade, setGrade] = useState(1);
  const [isCompleted, setCompleted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await _getLogValues();
      setLogInfo(data);
    };
    fetchData();
  }, []);

  const newLog = () => {
    let d = new Date();
    console.log(d);
    let logJson = {
      entry_name: `${name}`,
      date: d,
      info: `${info}`,
      imagePath: "",
      grade: `${grade}`,
      completed: `${isCompleted}`,
    };
    return logJson;
  };

  const makeAndNavigate = () => {
    addLog(logInfo, newLog());
    navigation.navigate("Climbing Log Screen");
  };

  return (
    <ScrollView style={styles.logStyle}>
      <View>
        <Text style={styles.goalNameText}> Log Name</Text>
        <TextInput
          style={styles.goalNameText}
          onChangeText={async (name) => {
            setName(name);
          }}
          value={name}
          placeholder={"Log Name"}
        />

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
          title="Save"
          onPress={() => makeAndNavigate()}
        />
      </View>
    </ScrollView>
  );
}

export default function App() {
  useEffect(() => {
    // used to refresh data
    AsyncStorage.clear();
  });

  useEffect(() => {
    (async () => {
      let t = await AsyncStorage.getItem("@LogInfo");
      if (t == null) {
        try {
          await AsyncStorage.setItem("@LogInfo", JSON.stringify(log));
        } catch (e) {
          console.log("error with log saving: " + e);
        }
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let g = await AsyncStorage.getItem("@GoalList");
      if (g == null) {
        try {
          await AsyncStorage.setItem("@GoalList", JSON.stringify(gljson));
        } catch (e) {
          console.log("error with log saving: " + e);
        }
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let g = await AsyncStorage.getItem("@Training");
      if (g == null) {
        try {
          await AsyncStorage.setItem("@Training", JSON.stringify(trainArr));
        } catch (e) {
          console.log("error with log saving: " + e);
        }
      }
    })();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Training" component={Training} />
        <Stack.Screen name="Setting" component={Settings} />
        <Stack.Screen
          name="Climbing Log Screen"
          component={ClimbingLogScreen}
        />
        <Stack.Screen name="Goals" component={Goals} />
        <Stack.Screen name="Log Page" component={LogPage} />
        <Stack.Screen name="New Log" component={Newlog} />
        <Stack.Screen name="New goal" component={NewGoal} />
        <Stack.Screen name="Work Out" component={WorkOut} />
        <Stack.Screen name="New Workout" component={NewWorkOut} />
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
    width: "100%",
    height: "100%",
  },
  homeScreenCells: {
    backgroundColor: "white",
    width: "90%",
    height: 100,
    marginBottom: 10,
    marginVertical: 10,
    borderRadius: 10,
    alignSelf: "center",
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
    height: 150,
  },
  newGoal: {
    width: "45%",
    height: 30,
    backgroundColor: "white",
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 10,
    borderWidth: 1,
    marginHorizontal: "2.5%",
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
  homePageImages: {
    height: "100%",
    width: "100%",
    opacity: 0.4,
    position: "absolute",
    borderRadius: 10,
    resizeMode: "contain",
    overflow: "hidden",
  },
  homeCellText: {
    fontSize: 40,
    textAlign: "center",
    textAlignVertical: "center",
  },
  trainingCell: {
    flex: 1,
  },
  trainingTouchable: {
    flex: 1,
    flexDirection: "column",
    margin: 4,
    borderRadius: 5,
    backgroundColor: "#808080",
  },
  newExcersizeView: {
    height: 180,
    backgroundColor: "#FFFFF0",
    padding: 10,
    borderRadius: 10,
    paddingVertical: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    alignItems: "center",
    borderWidth: 1,
  },
  newExcersizeNameView: {
    height: 45,
    width: "95%",
  },
  newExcersizeSelectView: {
    height: 70,
    width: "95%",
    flexDirection: "row",
  },
  excersizePickerView: {
    width: "50%",
    height: 62,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: "white",
  },
  excersizeDropdown: {
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "white",
    marginVertical: 5,
    marginHorizontal: 10,
  },
  counter: {
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
  },
  saveElement: {
    width: "90%",
    height: 30,
    backgroundColor: "#7CFC00",
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 10,
    borderWidth: 1,
  },
  newGoalSelectView: {
    height: 70,
    width: "95%",
    flexDirection: "row",
  },
  goalPickerView: {
    width: "50%",
    height: 62,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: "white",
  },
  goalNameText: {
    fontSize: 18,
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: "white",
    height: 30,
    paddingHorizontal: 5,
    borderRadius: 10,
    borderWidth: 1,
    width: "95%",
  },
});
