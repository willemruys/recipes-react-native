import * as React from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { Card, CardItem, Button, Header, Body, Title } from "native-base";

import { getListById } from "../hooks/useList";

export default function ListScreen({ route, navigation }) {
  const { listId } = route.params;
  const { data, error } = getListById(listId);
  return (
    <>
      <Header>
        <Body>
          <Title>{data?.list?.title}</Title>
        </Body>
      </Header>
      <ScrollView>
        <View>
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
                  </Card>
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>
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
