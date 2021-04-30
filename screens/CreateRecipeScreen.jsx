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

import { createRecipe } from "../services/recipes";
import { mutate } from "swr";
import { SERVER_ENDPOINT } from "@env";

export default function CreateRecipeScreen({ navigation }) {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleAddRecipe = async () => {
    const token = await AsyncStorage.getItem("userToken");
    const userId = await AsyncStorage.getItem("userId");
    try {
      await createRecipe(token, {
        Title: title,
        Ingredients: description,
      });
      setTitle("");
      setDescription("");
      alert("Recipe added!");
      mutate(`${SERVER_ENDPOINT}/user/${userId}/recipes`);
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
            placeholder="Recipe title"
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
        <Button title="ADD RECIPE" onPress={() => handleAddRecipe()} />
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
