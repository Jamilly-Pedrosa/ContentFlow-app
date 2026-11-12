import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';

import { PostCard } from '../../../components/posts/PostCard';
import CardStatusPost from '../../../components/posts/CardStatusPost';

import { useState, useEffect, useCallback } from 'react';
import api from '../../../utils/api';
import { getToken } from '../../../utils/tokenServie';

type PostStatus = 'Planejado' | 'Em andamento';

type PostItem = {
  id: string;
  title: string;
  content: string;
  type: string;
  status: PostStatus;
  date: string;
};

export default function Post() {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [myposts, setMyposts] = useState<PostItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMessage('');

      const token = await getToken();

      if (!token) {
        throw new Error(
          'Token não encontrado. Faça login novamente.',
        );
      }

      // A rota identifica o usuário pelo token JWT.
      // Não é necessário enviar o ID do usuário na URL.
      const response = await api.get('/getAllPostsById', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // O controller retorna: { posts: [...] }
      setMyposts(response.data.posts ?? []);
    } catch (error: any) {
      console.error(
        'Erro ao buscar posts:',
        error.response?.status,
        error.response?.data ?? error.message,
      );

      setErrorMessage(
        error.response?.data?.error ??
          error.message ??
          'Não foi possível carregar os posts.',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const filteredPosts =
    activeFilter === 'Todos'
      ? myposts
      : myposts.filter(
          (post) => post.status === activeFilter,
        );

  const planejados = myposts.filter(
    (post) => post.status === 'Planejado',
  ).length;

  const emAndamento = myposts.filter(
    (post) => post.status === 'Em andamento',
  ).length;

  function formatDate(dateString: string) {
    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return { day: '--', month: '--' };
    }

    return {
      day: String(date.getUTCDate()).padStart(2, '0'),
      month: date
        .toLocaleDateString('pt-BR', {
          month: 'short',
          timeZone: 'UTC',
        })
        .replace('.', '')
        .toUpperCase(),
    };
  }

  return (
    <View className="flex-1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        Filtros 
        <View className="mt-2 flex-row flex-wrap gap-2">
          <Pressable
            onPress={() => setActiveFilter('Todos')}
            className={`rounded-full px-3 py-2 ${
              activeFilter === 'Todos'
                ? 'bg-purple-50'
                : 'bg-gray-50'
            }`}
          >
            <Text className="text-xs">
              Todos ({myposts.length})
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setActiveFilter('Planejado')}
            className={`rounded-full px-3 py-2 ${
              activeFilter === 'Planejado'
                ? 'bg-purple-50'
                : 'bg-gray-50'
            }`}
          >
            <Text className="text-xs">
              Planejados ({planejados})
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setActiveFilter('Em andamento')}
            className={`rounded-full px-3 py-2 ${
              activeFilter === 'Em andamento'
                ? 'bg-purple-50'
                : 'bg-gray-50'
            }`}
          >
            <Text className="text-xs">
              Em andamento ({emAndamento})
            </Text>
          </Pressable>
        </View>

        {/* Carregamento */}
        {loading ? (
          <View className="items-center py-10">
            <ActivityIndicator
              size="large"
              color="#7C3AED"
            />

            <Text className="mt-3 text-sm text-gray-500">
              Carregando posts...
            </Text>
          </View>
        ) : errorMessage ? (
          /* Erro */
          <View className="items-center px-4 py-10">
            <Text className="text-center text-sm text-red-500">
              {errorMessage}
            </Text>

            <Pressable
              onPress={fetchPosts}
              className="mt-4 rounded-full bg-purple-50 px-4 py-2"
            >
              <Text className="text-sm text-purple-700">
                Tentar novamente
              </Text>
            </Pressable>
          </View>
        ) : (
          /* Lista de posts */
          <View className="mt-4 gap-2 bg-white">
            {filteredPosts.map((post) => (
              <PostCard
                key={post.id}
                title={post.title}
                date={post.date}
                status={<CardStatusPost status={post.status} />}
                action="options"
                onActionPress={() => {
                  console.log('Opções do post:', post.id);
                }}
              />
            ))}

            {filteredPosts.length === 0 && (
              <Text className="py-10 text-center text-sm text-gray-500">
                Nenhum post encontrado.
              </Text>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
