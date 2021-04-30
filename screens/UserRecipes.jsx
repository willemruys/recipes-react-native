import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Right,
  Button,
  Icon,
  Left,
} from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useUserRecipes } from "../hooks/useRecipes";
import FabComponent from "../components/FabComponent";
import AddRecipeToListModal from "../components/modal/AddRecipeToListModal";
export default function UserRecipes({ navigation }) {
  const [userId, setUserId] = React.useState();
  const [addToListModalVisible, setAddToListModalVisible] = React.useState(
    false
  );
  const [recipeIdSelected, setRecipeIdSelected] = React.useState();
  const { data, error } = useUserRecipes(userId);

  React.useEffect(() => {
    const init = async () => {
      const userIdFromStorage = await AsyncStorage.getItem("userId");
      setUserId(userIdFromStorage);
    };
    init();
  });
  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          {data?.recipes && data?.recipes?.length === 0 && (
            <>
              <Text>You don't have any recipes added yet</Text>
              <Button
                title="ADD RECIPE"
                onPress={() => navigation.navigate("Create Recipe")}
              />
            </>
          )}
          {data?.recipes && data?.recipes?.length > 0 && (
            <View>
              {data?.recipes.map((recipe) => {
                return (
                  <Card key={recipe.ID}>
                    <CardItem header bordered>
                      <Text style={{ fontSize: 18 }}>{recipe.title}</Text>
                    </CardItem>
                    <CardItem cardBody>
                      <Image
                        style={{ height: 300, flex: 1 }}
                        source={{
                          uri:
                            "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                        }}
                      />
                    </CardItem>
                    <CardItem>
                      <Text>{recipe.ingredients}</Text>
                    </CardItem>
                    <CardItem>
                      <Left>
                        <Button
                          onPress={() => {
                            setAddToListModalVisible(true);
                            setRecipeIdSelected(recipe.ID);
                          }}
                          iconLeft
                          transparent
                          textStyle={{ color: "#87838B" }}
                        >
                          <Icon name="add" />
                          <Text>Add to list</Text>
                        </Button>
                      </Left>
                    </CardItem>
                  </Card>
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>
      <AddRecipeToListModal
        modalOpen={addToListModalVisible}
        setModalOpen={setAddToListModalVisible}
        userId={userId}
        recipeId={recipeIdSelected}
      />
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
