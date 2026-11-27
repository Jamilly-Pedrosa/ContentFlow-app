
import { useEffect, useState } from 'react';

import {
  ActivityIndicator,
  ScrollView,
  Text,
  View,
} from 'react-native';

import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Container } from '@/components/layout/Container';
import { Header } from '@/components/layout/Header';

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
  images: any[];
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

        console.log(
          'Dados do post:',
          JSON.stringify(response.data, null, 2),
        );

        setPost(response.data.post);
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

  return (
    <SafeAreaView className="flex-1">
      <Container className="flex-1">
        <Header
          title="Detalhes do post"
          onBackPress={() => router.back()}
          rightIcon={NotePencilIcon}
          rightIconLabel="Opção de editar"
          onRightPress={() => {
            router.push({
              pathname: '/(creation)/post/[id]',
              params: { id: post?.id },
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
          >
            <View className="mt-6 gap-5 pb-8">

              {/* Título */}
              <View className="gap-1">
                <Text className="text-sm text-gray-500">
                  Título
                </Text>

                <Text className="text-xl font-bold text-gray-900">
                  {post.title}
                </Text>
              </View>

              {/* Status */}
              <View className="gap-1">
                <Text className="text-sm text-gray-500">
                  Status
                </Text>

                <Text className="text-base font-medium text-gray-900">
                  {post.status}
                </Text>
              </View>

              {/* Categoria */}
              {post.category?.name && (
                <View className="gap-1">
                  <Text className="text-sm text-gray-500">
                    Categoria
                  </Text>

                  <Text className="text-base text-gray-900">
                    {post.category.name}
                  </Text>
                </View>
              )}

              {/* Data de publicação */}
              {post.date && (
                <View className="gap-1">
                  <Text className="text-sm text-gray-500">
                    Data de publicação
                  </Text>

                  <Text className="text-base text-gray-900">
                    {new Date(post.date).toLocaleDateString('pt-BR')}
                  </Text>
                </View>
              )}

              {/* Legenda */}
              {post.content && (
                <View className="gap-1">
                  <Text className="text-sm text-gray-500">
                    Legenda
                  </Text>

                  <Text className="text-base leading-6 text-gray-900">
                    {post.content}
                  </Text>
                </View>
              )}

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
