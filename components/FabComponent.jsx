import * as React from "react";
import { Fab, Icon, Button, Text, View } from "native-base";

export default function FabComponent({ navigation }) {
  const [open, setOpen] = React.useState(false);
  return (
    <Fab
      active={open}
      direction="up"
      position="bottomRight"
      onPress={() => {
        if (open) {
          setOpen(false);
        } else setOpen(true);
      }}
    >
      <Icon name="open" />
      <Button onPress={() => navigation.navigate("CreateRecipeModal")}>
        <Icon name="add" />
      </Button>
      <Button
        style={{ backgroundColor: "#f0f" }}
        onPress={() => navigation.navigate("CreateListScreen")}
      >
        <Icon name="add" />
      </Button>
    </Fab>
  );
}
