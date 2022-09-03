import React, { Fragment, useEffect, useRef, useState } from 'react';
import { ScrollView, Alert, Image, ActivityIndicator } from 'react-native';
import uuid from 'react-native-uuid';
import { Controller, useForm } from 'react-hook-form';
import { RectButton, BorderlessButton } from 'react-native-gesture-handler';
import { PlusCircle, HourglassHigh, Trash } from 'phosphor-react-native';
import { launchCameraAsync, launchImageLibraryAsync, MediaTypeOptions, ImagePickerResult } from 'expo-image-picker';
import { TextInput } from '@/components/atoms/text-input';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Box } from '@/components/atoms/box';
import { Button } from '@/components/atoms/button';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Product } from '@/types/product';
import { ProductRepository } from '@/repositories/product';
import { isSuccess } from '@/either';
import { ProductModel } from '@/models/product';
import { useProduct } from '@/contexts/product';
import { useStore } from '@/contexts/store';
import { Picture } from '@/types/picture';
import { PictureRepository } from '@/repositories/picture';
import { useTheme } from 'styled-components/native';
import { basename, extname, toCents, toCurrency } from '@/utils';
import { PictureModel } from '@/models/picture';
import { StoreModel } from '@/models/store';
import { CityModel } from '@/models/city';

const schema = z.object({
  title: z.string().min(1, 'Campo obrigatório'),
  description: z.string().min(1, 'Campo obrigatório'),
  price: z.string().min(1, 'Campo obrigatório'),
});
const productRepository = ProductRepository();
const pictureRepository = PictureRepository();
const productModel = ProductModel();
const pictureModel = PictureModel();
const storeMode = StoreModel();
const cityModel = CityModel();

export function ProductPage() {
  const navigation = useNavigation();
  const route = useRoute();
  const { productId } = route.params as { productId?: string };
  const {
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema), defaultValues: { title: '', description: '', price: '' } });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const statusRef = useRef<Product.Status>('inactive');
  const [product, setProduct] = useState(() => ({
    ...productModel.empty(),
    store: {
      ...storeMode.empty(),
      city: cityModel.empty(),
    },
  }));
  const products = useProduct((context) => context.products);
  const setProducts = useProduct((context) => context.setProducts);
  const stores = useStore((context) => context.stores);
  const theme = useTheme();
  const scrollViewRef = useRef<ScrollView>(null);

  async function findOne(productId: string) {
    setErrorMessage('');
    const result = await productRepository.findOne(productId);
    if (isSuccess(result)) {
      setProduct(result.success);
    } else {
      setErrorMessage(result.failure.message);
    }
    setIsRefreshing(false);
  }

  async function submit(fields: z.infer<typeof schema>) {
    setIsSubmitting(true);
    setErrorMessage('');
    const [store] = stores;
    const productToSave: Product = {
      id: productId!,
      storeId: store.id,
      title: fields.title,
      description: fields.description,
      price: {
        cents: toCents(fields.price),
        formatted: fields.price,
      },
      pictures: product.pictures,
      status: statusRef.current,
    };
    if (!productModel.isValidPrice(productToSave)) {
      setError('price', { message: 'Informe um preço maior que zero' });
      return;
    }
    if (!productId) {
      const result = await productRepository.create(productToSave);
      if (isSuccess(result)) {
        setProducts([result.success, ...products]);
        navigation.navigate('pages/products');
        return;
      }
      setErrorMessage(result.failure.message);
    } else {
      const result = await productRepository.update(productToSave);
      if (isSuccess(result)) {
        setProducts(products.map((product) => (product.id === result.success.id ? result.success : product)));
        navigation.navigate('pages/products');
        return;
      }
      setErrorMessage(result.failure.message);
    }
    setIsSubmitting(false);
  }

  async function addPicture(imagePicker: ImagePickerResult) {
    if (!imagePicker.cancelled) {
      const pictureToAdd: Picture = {
        id: uuid.v4().toString(),
        isUploading: true,
        variants: [
          {
            size: 'md',
            name: basename(imagePicker.uri)!,
            url: imagePicker.uri,
            width: undefined!,
            height: undefined!,
            ext: extname(imagePicker.uri)!,
          },
        ],
      };

      setProduct((product) => ({
        ...product,
        ...productModel.addPicture(product, pictureToAdd),
      }));
      const result = await pictureRepository.create(pictureToAdd.variants[0]);
      if (isSuccess(result)) {
        setProduct((product) => ({
          ...product,
          pictures: product.pictures.map((picture) => (picture.id === pictureToAdd.id ? result.success : picture)),
        }));
      } else {
        setErrorMessage(result.failure.message);
      }
    }
  }

  function removePicture(pictureToRemove: Picture) {
    setProduct((product) => ({
      ...product,
      pictures: product.pictures.filter((picture) => picture.id !== pictureToRemove.id),
    }));
  }

  async function pickCamera() {
    const result = await launchCameraAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    addPicture(result);
  }

  async function pickLibrary() {
    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      allowsMultipleSelection: false,
    });
    addPicture(result);
  }

  useEffect(() => {
    if (errorMessage) Alert.alert('Atenção', errorMessage);
  }, [errorMessage]);

  useEffect(() => {
    if (productId) {
      findOne(productId);
    } else {
      setIsRefreshing(false);
    }
  }, [productId]);

  useEffect(() => {
    if (product) {
      setValue('title', product.title);
      setValue('description', product.description);
      setValue('price', product.price.formatted);
    }
  }, [product]);

  if (isRefreshing) {
    return (
      <Box
        flex={1}
        alignItems="center"
        justifyContent="center">
        <ActivityIndicator />
      </Box>
    );
  }

  return (
    <ScrollView>
      <Box padding="md">
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Título"
              onChange={onChange}
              value={value}
              error={errors.title?.message}
            />
          )}
        />
        <Box height="md" />
        <Controller
          control={control}
          name="price"
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Preço"
              keyboardType="numeric"
              onChange={(money) => onChange(toCurrency(money))}
              value={value}
              error={errors.price?.message}
            />
          )}
        />
        <Box height="md" />
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Descrição"
              multiline
              numberOfLines={3}
              onChange={onChange}
              value={value}
              error={errors.description?.message}
            />
          )}
        />
        <Box height="md" />
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ alignContent: 'center' }}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}>
          {product.pictures.map((picture) => {
            const size: Picture.Size = picture.isUploading ? 'md' : 'sm';
            const variant = pictureModel.findVariant(picture.variants, size);
            return (
              <Fragment key={picture.id}>
                <Box alignItems="center">
                  <Box
                    width={75}
                    height={75}
                    border={1}
                    radius={5}
                    alignItems="center"
                    justifyContent="center"
                    background="shape.100">
                    {picture.isUploading ? (
                      <HourglassHigh
                        size={24}
                        weight="light"
                      />
                    ) : (
                      <Image
                        source={{
                          uri: variant.url,
                          width: 75,
                          height: 75,
                        }}
                        resizeMode="cover"
                      />
                    )}
                  </Box>
                  {!picture.isUploading && (
                    <Fragment>
                      <Box height="xs" />
                      <BorderlessButton
                        onPress={() => {
                          Alert.alert('Atenção', 'Deseja excluir essa imagem?', [
                            {
                              text: 'Não',
                            },
                            {
                              text: 'Sim',
                              onPress: () => removePicture(picture),
                            },
                          ]);
                        }}>
                        <Trash
                          size={24}
                          weight="light"
                        />
                      </BorderlessButton>
                    </Fragment>
                  )}
                </Box>
                <Box width="md" />
              </Fragment>
            );
          })}
          {productModel.canAddMorePictures(product) && (
            <RectButton
              onPress={() => {
                Alert.alert(
                  'Imagem',
                  'Selecione onde a imagem está',
                  [
                    {
                      text: 'Galeria',
                      onPress: pickLibrary,
                      style: 'cancel',
                    },
                    {
                      text: 'Câmera',
                      onPress: pickCamera,
                      style: 'default',
                    },
                  ],
                  { cancelable: true },
                );
              }}
              style={{
                borderRadius: 5,
                overflow: 'hidden',
                alignSelf: 'flex-start',
                backgroundColor: theme.colors['shape.100'],
              }}>
              <Box
                width={75}
                height={75}
                border={1}
                radius={5}
                justifyContent="center"
                alignItems="center">
                <PlusCircle
                  size={24}
                  weight="light"
                />
              </Box>
            </RectButton>
          )}
        </ScrollView>
        <Box height="md" />
        <Button
          loading={isSubmitting && statusRef.current === 'active'}
          disabled={isSubmitting}
          title="Salvar e publicar"
          color="shape.100"
          background="primary"
          onPress={() => {
            statusRef.current = 'active';
            handleSubmit(submit)();
          }}
        />
        <Box height="md" />
        <Button
          loading={isSubmitting && statusRef.current === 'inactive'}
          disabled={isSubmitting}
          title="Salvar como rascunho"
          color="shape.100"
          background="secondary"
          onPress={() => {
            statusRef.current = 'inactive';
            handleSubmit(submit)();
          }}
        />
      </Box>
    </ScrollView>
  );
}

ProductPage.URL = 'pages/product';
