import React, { FC, useState } from "react";
import { Image } from "react-native";

const DEFAULT_SIZE = 96;

const getImageSourceFromId = (id: number) => {
  const imageId = ("00" + id).slice(-3);
  return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${imageId}.png`;
};

interface PokeImageProps {
  size?: number;
  pokemonId: number;
  onPress?: () => void;
}
const PokeImage: FC<PokeImageProps> = ({ pokemonId, ...props }) => {
  const [imageSource, setImageSource] = useState(
    getImageSourceFromId(pokemonId)
  );

  const setFallBack = () => {
    setImageSource("https://jolstatic.fr/www/captures/1951/6/58356.png");
  };

  return (
    <Image
      style={{
        width: props.size || DEFAULT_SIZE,
        height: props.size || DEFAULT_SIZE,
      }}
      source={{
        uri: imageSource,
      }}
      onError={() => {
        setFallBack();
      }}
    />
  );
};

export default PokeImage;
