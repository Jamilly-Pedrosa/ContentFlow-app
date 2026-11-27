
import { useEffect, useState } from 'react';

import {
  ActivityIndicator,
  ScrollView,
  Text,
  View,
  Image,
} from 'react-native';

import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Container } from '@/components/layout/Container';
import { Header } from '@/components/layout/Header';
import CardStatusPost from '@/components/posts/CardStatusPost';

import api from '@/utils/api';
import { getToken } from '@/utils/tokenServie';

import { NotePencilIcon } from 'phosphor-react-native';

type PostStatus = 'Planejado' | 'Em andamento' | 'Postado';

type PostDetailsData = {
  id: string;
  title: string;
  content: string;
  status: PostStatus;
  type: string;
  date: string;

  images: {
    id: string;
    path: string;
    mimeType: string;
    size: number;
    url: string;
  }[];

  category?: {
    id: string;
    name: string;
  } | null;
};

export default function PostDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [post, setPost] = useState<PostDetailsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [imageRatios, setImageRatios] = useState<Record<string, number>>({});

  useEffect(() => {
    async function fetchPost() {
      try {
        setLoading(true);
        setErrorMessage('');

        const token = await getToken();

        if (!token) {
          throw new Error('Token não encontrado. Faça login novamente.');
        }

        const response = await api.get(`/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPost(response.data.post);

        console.log(
          'IMAGENS DO POST:',
          JSON.stringify(response.data.post.images, null, 2),
        );

      } catch (error: any) {
        console.error(
          'Erro ao buscar detalhes do post:',
          error.response?.data ?? error.message,
        );

        setErrorMessage(
          error.response?.data?.error ??
          error.message ??
          'Não foi possível carregar os detalhes do post.',
        );
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchPost();
    }
  }, [id]);

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    });
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Container className="flex-1">

        {/* Header */}
        <Header
          title="Detalhes"
          onBackPress={() => router.back()}
          rightIcon={NotePencilIcon}
          rightIconLabel="Opção de editar"
          onRightPress={() => {
            if (!post) return;

            router.push({
              pathname: '/(creation)/post/[id]',
              params: { id: post.id },
            });
          }}
        />

        {loading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#6554EE" />

            <Text className="mt-3 text-sm text-gray-500">
              Carregando detalhes...
            </Text>
          </View>
        ) : errorMessage ? (
          <View className="flex-1 items-center justify-center px-4">
            <Text className="text-center text-base text-red-500">
              {errorMessage}
            </Text>
          </View>
        ) : post ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            className="flex-1"
            contentContainerStyle={{
              paddingBottom: 32,
            }}
          >
            <View className="mt-6 gap-6">

              {/* Informações rápidas */}
              <View className="flex-row flex-wrap justify-center gap-2 mt-4 mb-4">

                {/* Data */}
                {post.date && (
                  <View className="rounded-full bg-blue-50 px-3 py-2">
                    <Text className="font-poppins-regular text-small-text text-gray-900">
                      {formatDate(post.date)}
                    </Text>
                  </View>
                )}

                {/* Categoria */}
                {post.category?.name && (
                  <View className="rounded-full bg-blue-50 px-3 py-2">
                    <Text className="font-poppins-regular text-small-text text-gray-900">
                      {post.category.name}
                    </Text>
                  </View>
                )}

                {/* Status */}
                {post.status && (
                  <View className="rounded-full bg-blue-50 px-3 py-2">
                    <Text className="font-poppins-regular text-small-text text-gray-900">
                      {post.status}
                    </Text>
                  </View>
                )}

              </View>

              {/* Título */}
              <Text className="font-poppins-semibold text-large-text text-black">
                {post.title}
              </Text>

              {/* Imagens */}
              {post.images && post.images.length > 0 && (
                <View className="gap-3">
                  {post.images.map((image) => (
                    <Image
                      key={image.id}
                      source={{ uri: image.url }}
                      resizeMode="contain"
                      onLoad={(event) => {
                        const { width, height } = event.nativeEvent.source;

                        if (width && height) {
                          setImageRatios((current) => ({
                            ...current,
                            [image.id]: width / height,
                          }));
                        }
                      }}
                      style={{
                        width: '100%',
                        aspectRatio: imageRatios[image.id] ?? 1,
                        borderRadius: 18,
                      }}
                      accessibilityLabel={`Imagem do post ${post.title}`}
                    />
                  ))}
                </View>
              )}

              {/* Legenda */}
              {post.content ? (
                <Text className="font-poppins-regular text-body-text leading-6 text-black">
                  {post.content}
                </Text>
              ) : null}

            </View>
          </ScrollView>
        ) : (
          <View className="flex-1 items-center justify-center">
            <Text className="text-base text-gray-500">
              Post não encontrado.
            </Text>
          </View>
        )}

      </Container>
    </SafeAreaView>
  );
}
