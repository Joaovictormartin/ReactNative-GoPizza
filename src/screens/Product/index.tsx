import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import storage from "@react-native-firebase/storage";
import firestore from "@react-native-firebase/firestore";
import { Platform, ScrollView, Alert } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

import { Photo } from "../../components/Photo";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { InputPrice } from "../../components/InputPrice";
import { ButtonBack } from "../../components/ButtonBack";
import { ProductProps } from "../../components/ProductCard";

import {
  Container,
  Header,
  Title,
  View,
  DeletarContainer,
  DeletarLabel,
  Upload,
  PickerImagemButton,
  Form,
  Label,
  InputGroup,
  InputGroupHeader,
  MaxCharacters,
} from "./styles";

interface ProductPropsRoutes {
  id?: string;
}

type PizzaResponse = ProductProps & {
  photo_path: string;
  prices_sizes: {
    p: string;
    m: string;
    g: string;
  };
};

export function Product() {
  const routes = useRoute();
  const { goBack, navigate } = useNavigation();
  const { id } = routes.params as ProductPropsRoutes;

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priceSizeP, setPriceSizeP] = useState("");
  const [priceSizeM, setPriceSizeM] = useState("");
  const [priceSizeG, setPriceSizeG] = useState("");
  const [photo_path, setPhoto_Path] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //função para carregar uma img da galeria
  async function handlePickerImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4],
      });

      if (!result.cancelled) {
        //@ts-ignore
        setImage(result.uri);
      }
    }
  }

  //função para cadastrar uma pizza
  async function handleAdd() {
    if (!name.trim()) {
      return Alert.alert("Cadastro", "Informe o nome da pizza");
    }
    if (!description.trim()) {
      return Alert.alert("Cadastro", "Informe a descrição da pizza");
    }
    if (!image) {
      return Alert.alert("Cadastro", "Selecione a imagem da pizza");
    }
    if (!priceSizeP.trim() || !priceSizeM.trim() || !priceSizeG.trim()) {
      return Alert.alert(
        "Cadastro",
        "Informe o preço de todos os tamanhos da pizza"
      );
    }

    setIsLoading(true);

    const fileName = new Date().getTime();
    const reference = storage().ref(`/pizzas/${fileName}.png`);

    await reference.putFile(image);
    const photo_url = await reference.getDownloadURL();

    firestore()
      .collection("pizzas")
      .add({
        name,
        name_insensitive: name.toLocaleLowerCase().trim(),
        description,
        photo_url,
        photo_path: reference.fullPath,
        prices_sizes: {
          p: priceSizeP,
          m: priceSizeM,
          g: priceSizeG,
        },
      })
      .then(() => {
        Alert.alert("Cadastro", "Pizza cadastrada com sucesso");
        navigate("home");
      })
      .catch(() =>
        Alert.alert("Cadastro", "Não foi possível cadastrar a pizza")
      );

    setIsLoading(false);
  }

  //função para deletar uma pizza
  function handleDelete() {
    firestore()
      .collection("pizzas")
      .doc(id)
      .delete()
      .then(() => {
        storage()
          .ref(photo_path)
          .delete()
          .then(() => navigate("home"));
      });
  }

  useEffect(() => {
    if (id) {
      firestore()
        .collection("pizzas")
        .doc(id)
        .get()
        .then((response) => {
          const product = response.data() as PizzaResponse;

          setName(product.name);
          setImage(product.photo_url);
          setDescription(product.description);
          setPriceSizeP(product.prices_sizes.p);
          setPriceSizeM(product.prices_sizes.m);
          setPriceSizeG(product.prices_sizes.g);
          setPhoto_Path(product.photo_path);
        });
    }
  }, [id]);

  return (
    <Container behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <Header>
        <ButtonBack onPress={() => goBack()} />
        <Title>Cadastrar</Title>

        {id ? (
          <DeletarContainer onPress={handleDelete}>
            <DeletarLabel>Deletar</DeletarLabel>
          </DeletarContainer>
        ) : (
          <View />
        )}
      </Header>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Upload>
          <Photo uri={image} />

          {!id && (
            <PickerImagemButton
              type="secondary"
              title="Carregar"
              onPress={handlePickerImage}
            />
          )}
        </Upload>

        <Form>
          <InputGroup>
            <Label>Nome</Label>
            <Input value={name} onChangeText={setName} />
          </InputGroup>

          <InputGroup>
            <InputGroupHeader>
              <Label>Descrição</Label>
              <MaxCharacters>{description.length} de 60 caracteres</MaxCharacters>
            </InputGroupHeader>

            <Input
              multiline
              maxLength={60}
              value={description}
              style={{ height: 80 }}
              onChangeText={setDescription}
            />
          </InputGroup>

          <InputGroup>
            <Label>Tamanhos e preços</Label>

            <InputPrice
              size="P"
              value={priceSizeP}
              onChangeText={setPriceSizeP}
            />

            <InputPrice
              size="M"
              value={priceSizeM}
              onChangeText={setPriceSizeM}
            />

            <InputPrice
              size="G"
              value={priceSizeG}
              onChangeText={setPriceSizeG}
            />
          </InputGroup>

          {!id && (
            <Button
              title="Cadastrar pizza"
              isLoaded={isLoading}
              onPress={handleAdd}
            />
          )}
        </Form>
      </ScrollView>
    </Container>
  );
}
