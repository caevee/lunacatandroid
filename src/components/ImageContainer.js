import React from "react";
import { Image } from "react-native";
import { useWindowDimensions } from "react-native";

const ImageContainer = () => {
  return (
    <Image
      source={{ uri: "https://lunacatapi.herokuapp.com/cat" }}
      style={{
        width: useWindowDimensions().width,
        height: (useWindowDimensions().height / 100) * 60,
      }}
    />
  );
};

export default ImageContainer;
