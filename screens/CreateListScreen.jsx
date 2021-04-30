import * as React from "react";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { createList } from "../services/list";
import { mutate } from "swr";
import { SERVER_ENDPOINT } from "@env";

export default function CreateListScreen({ navigation }) {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleCreateList = async () => {
    const token = await AsyncStorage.getItem("userToken");
    const userId = await AsyncStorage.getItem("userId");
    try {
      await createList(token, {
        title: title,
        description: description,
      });
      setTitle("");
      setDescription("");
      alert("List added!");
      mutate(`${SERVER_ENDPOINT}/user/${userId}/lists`);
      navigation.navigate("Home");
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="List title"
            placeholderTextColor="#003f5c"
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
        </View>
        <View style={styles.descriptionInput}>
          <TextInput
            multiline
            numberOfLines={6}
            style={styles.inputText}
            placeholder="Description"
            value={description}
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setDescription(text)}
          />
        </View>
        <Button title="ADD LIST" onPress={handleCreateList} />
      </View>
    </TouchableWithoutFeedback>
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
  inputView: {
    width: "80%",
    backgroundColor: "#f0f",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  descriptionInput: {
    width: "80%",
    backgroundColor: "#f0f",
    borderRadius: 25,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "white",
  },
});
