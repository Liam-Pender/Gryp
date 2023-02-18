import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import React from 'react';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {


  return (
    <ScrollView style={{ height: "100%" }}>
      
      <Text>Home Screen</Text>
      
    </ScrollView>
  )
}

function Calendar({navigation}) {
  return (
    <ScrollView style={{ height: "100%"}}>
      <Image
      style={styles.}></Image>
      <Text>Calendar</Text>
    </ScrollView>
  )
}

function Goals({navigation}) {

}

function Settings({navigation}) {

}

function ClimbingLog({navigation}) {

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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  homeScreenCell: {
    width: "100%",
    height: 290,
    backgroundColor: 'lightgray',

  },

  calendarMonth: {
    width: "100%",
  },

  calendarDayCell: { // for the cells of the calendar
    width: "14.25%",
    height: 200,
    backgroundColor: 'd9e8ff',
  },

  logo: {
    width: 100,
    height: 50, 
  }

});
