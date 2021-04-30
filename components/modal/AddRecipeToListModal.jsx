import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { SERVER_ENDPOINT } from "@env";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Button,
} from "react-native";
import { Item, Picker, Form, Icon } from "native-base";
import { useUserLists } from "../../hooks/useList";

import { addRecipeToList } from "../../services/list";
import { AuthContext } from "../../navigation";
import { mutate } from "swr";
export default function AddRecipeToListModal({
  modalOpen,
  setModalOpen,
  userId,
  recipeId,
}) {
  const [selectedList, setSelectedList] = React.useState();

  const { data, error } = useUserLists(userId);

  const handleAddRecipeToList = async () => {
    const token = await AsyncStorage.getItem("userToken");

    try {
      const res = await addRecipeToList(token, selectedList, recipeId);
      console.log(res);
      alert("Added to list");
      setModalOpen(!modalOpen);
      mutate(`${SERVER_ENDPOINT}/user/${userId}/lists`);
      setSelectedList("");
    } catch (err) {
      console.error(err.response);
    }
  };
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalOpen}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalOpen(!modalOpen);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Add recipe to list</Text>
            <Form style={styles.formContainer}>
              <Item picker>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="add" />}
                  style={{ width: undefined }}
                  placeholder="Select a list"
                  selectedValue={selectedList}
                  onValueChange={(value) => setSelectedList(value)}
                >
                  {data?.lists?.length > 0 &&
                    data?.lists?.map((list) => {
                      return <Picker.Item label={list.title} value={list.ID} />;
                    })}
                </Picker>
              </Item>
            </Form>
            <Button
              title="Add to list"
              onPress={() => handleAddRecipeToList()}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalOpen(!modalOpen);
                setSelectedList("");
              }}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: "80%",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  formContainer: {
    padding: 10,
  },
});
