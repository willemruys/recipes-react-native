import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { Container, Header, Content, Card, CardItem } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useUserLists } from "../hooks/useList";
import FabComponent from "../components/FabComponent";
export default function UserRecipes({ navigation }) {
  const [userId, setUserId] = React.useState();

  React.useEffect(() => {
    const init = async () => {
      const userIdFromStorage = await AsyncStorage.getItem("userId");
      setUserId(userIdFromStorage);
    };
    init();
  });

  const { data, error } = useUserLists(userId);

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          {data?.lists && data?.lists?.length === 0 && (
            <>
              <Text>You don't have any lists added yet</Text>
              <Button
                title="ADD LIST"
                onPress={() => navigation.navigate("CreateListModal")}
              />
            </>
          )}
          {data?.lists && data?.lists?.length > 0 && (
            <View>
              {data?.lists.map((list) => {
                return (
                  <TouchableWithoutFeedback
                    onPress={() =>
                      navigation.navigate("ListScreen", { listId: list.ID })
                    }
                  >
                    <Card key={list.ID}>
                      <CardItem header bordered>
                        <Text>{list.title}</Text>
                      </CardItem>
                      <CardItem cardBody>
                        <Image
                          style={{ height: 300, flex: 1 }}
                          source={{
                            uri:
                              "https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80",
                          }}
                        />
                      </CardItem>
                      <CardItem>
                        <Text>{list.description}</Text>
                      </CardItem>
                    </Card>
                  </TouchableWithoutFeedback>
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>
      <FabComponent navigation={navigation} />
    </>
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
