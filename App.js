import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { NotesProvider } from "./src/context/NotesContext";
import DashboardScreen from "./src/screens/DashboardScreen";
import NoteScreen from "./src/screens/NoteScreen";
import FormScreen from "./src/screens/FormScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";

const Stack = createStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <NotesProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: "#45699D",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          >
            <Stack.Screen 
              name="Dashboard" 
              component={DashboardScreen}
              options={{ title: "My Notes" }}
            />
            <Stack.Screen 
              name="Note" 
              component={NoteScreen}
              options={{ title: "Note Details" }}
            />
            <Stack.Screen 
              name="Form" 
              component={FormScreen}
              options={({ route }) => ({
                title: route.params?.note ? "Edit Note" : "New Note"
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </NotesProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
