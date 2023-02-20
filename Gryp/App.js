import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import React from 'react';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {


  return (
    <ScrollView style={styles.scrollStyle}>
      <Image style={styles.logo} source={require('./assets/GrypLogoWhite.png')}/>
      <Image style={styles.homeImage} source={require('./assets/homeClimb.png')}/>
      <TouchableOpacity style={styles.homeScreenTouchable} onPress={()=>navigation.navigate("Calendar")}>
        <Text style={{textAlign: 'center',}}>Calendar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.homeScreenTouchable} onPress={()=>navigation.navigate("ClimbingLog")}>
        <Text style={{textAlign: 'center',}}>Climbing Log</Text>  
      </TouchableOpacity>
      <TouchableOpacity style={styles.homeScreenTouchable} onPress={()=>navigation.navigate("Goals")}>
        <Text style={{textAlign: 'center',}}>Goals</Text>  
      </TouchableOpacity>
      <TouchableOpacity style={styles.homeScreenTouchable} onPress={()=>navigation.navigate("Setting")}>
        <Text style={{textAlign: 'center',}}>Settings</Text>  
      </TouchableOpacity>
    </ScrollView>
  )
}

function Calendar({navigation}) {
  return (
    <ScrollView style={styles.scrollStyle}>
      <Image style={styles.logo} source={require('./assets/GrypLogoWhite.png')}/>
      <Text>Calendar</Text>
    </ScrollView>
  )
}

function Goals({navigation}) {
  return (
    <ScrollView style={styles.scrollStyle}>
      <Image style={styles.logo} source={require('./assets/GrypLogoWhite.png')}/>
      <Text>Goals</Text>
    </ScrollView>
  )
}

function Settings({navigation}) {
  return (
    <ScrollView style={styles.scrollStyle}>
      <Image style={styles.logo} source={require('./assets/GrypLogoWhite.png')}/>
      <Text>Settings</Text>
    </ScrollView>
  )
}

function ClimbingLog({navigation}) {
  return (
    <ScrollView style={styles.scrollStyle}>
      <Image style={styles.logo} source={require('./assets/GrypLogoWhite.png')}/>
      <Text>Climbing Log</Text>
    </ScrollView>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Calendar" component={Calendar}/>
        <Stack.Screen name="Setting" component={Settings}/>
        <Stack.Screen name="ClimbingLog" component={ClimbingLog}/>
        <Stack.Screen name="Goals" component={Goals}/>
        
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '0065ff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  scrollStyle: {
    width: "100%",
    height: "100%",
    backgroundColor: '#003482'
  },

  homeScreenTouchable: {
    alignSelf: 'center',
    width: "90%",
    height: 100,
    backgroundColor: 'lightgray',
    marginBottom: 10,
    marginVertical: 10,
    borderRadius: 10,
  },

  // calendarMonth: {
  //   width: "100%",
  // },

  // calendarDayCell: { // for the cells of the calendar
  //   width: "14.25%",
  //   height: 200,
  //   backgroundColor: 'd9e8ff',
  // },

  logo: {
    alignSelf: 'center',
    width: 100,
    height: 50,
    marginVertical: 10,
    borderRadius: 10,
    resizeMode: 'stretch',
  },

  homeImage: {
    alignSelf: 'center',
    width: "100%",
    marginVertical: 10,
    height: 200
  },

});
