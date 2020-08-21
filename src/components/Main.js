import React, { useState } from "react";
import axios from "axios";
import {
  SafeAreaView,
  Button,
  View,
  Text,
  StyleSheet,
  Switch,
  Image,
  useWindowDimensions,
} from "react-native";
import ImageContainer from "./ImageContainer";

const Main = () => {
  const [imageURL, setImageURL] = useState(null);
  const [jacky, setJacky] = useState(false);
  const [tommy, setTommy] = useState(false);

  async function fetchImage() {
    if (jacky && tommy) {
      const result = await axios(
        "https://lunacatapi.herokuapp.com/cat?cat=both"
      );
      setImageURL(result.data);
    } else if (jacky) {
      const result = await axios(
        "https://lunacatapi.herokuapp.com/cat?cat=jacky"
      );
      setImageURL(result.data);
    } else if (tommy) {
      const result = await axios(
        "https://lunacatapi.herokuapp.com/cat?cat=tommy"
      );
      setImageURL(result.data);
    } else {
      const result = await axios("https://lunacatapi.herokuapp.com/cat");
      setImageURL(result.data);
    }
  }
  const toggleJacky = () => setJacky((previousState) => !previousState);
  const toggleTommy = () => setTommy((previousState) => !previousState);
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>
          Feeling sad?{"\n"}I've got some cats for you
        </Text>
        <Image
          source={{ uri: imageURL }}
          style={{
            width: useWindowDimensions().width,
            height: (useWindowDimensions().height / 100) * 60,
          }}
        />
        <View style={styles.controlsContainer}>
          <Button
            onPress={fetchImage}
            title="Meow.."
            color="#eb3b5a"
            accessibilityLabel="Receive a cat picture"
            style={styles.fetchButton}
          />
          <View style={styles.switches}>
            <Text>Jacky</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#fab1a0" }}
              thumbColor={jacky ? "#eb3b5a" : "#f4f3f4"}
              onValueChange={toggleJacky}
              value={jacky}
            />
            <Text>Tommy</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#fab1a0" }}
              thumbColor={tommy ? "#eb3b5a" : "#f4f3f4"}
              onValueChange={toggleTommy}
              value={tommy}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    flex: 1,
    marginTop: 24,
    marginBottom: 6,
    marginHorizontal: 18,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontSize: 18,
    color: "#eb3b5a",
    fontWeight: "bold",
  },
  image: {
    flex: 3,
  },
  controlsContainer: {
    marginVertical: 12,
    marginHorizontal: 18,
    flex: 1,
  },
  switches: {
    display: "flex",
    marginVertical: 12,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default Main;
