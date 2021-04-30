import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import FabComponent from "../components/FabComponent";
export default function HomeScreen({ navigation }) {
  const [userId, setUserId] = React.useState();

  React.useEffect(() => {
    const getUserId = async () => {
      const userIdFromStorage = await AsyncStorage.getItem("userId");
      setUserId(userIdFromStorage);
    };
    getUserId();
  });
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hi user {userId}</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <FabComponent navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
