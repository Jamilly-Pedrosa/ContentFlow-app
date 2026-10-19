
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';

import { DotsThreeVerticalIcon } from 'phosphor-react-native';
import { useState, useEffect, useCallback } from 'react';
import api from '../../../utils/api';
import { getToken } from '../../../utils/tokenServie';

type PostItem = {
  id: string;
  title: string;
  content: string;
  type: string;
  status: string;
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
        {/* Filtros */}
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
            {filteredPosts.map((post) => {
              const { day, month } = formatDate(post.date);

              return (
                <View
                  key={post.id}
                  className="flex-row items-center rounded-2xl bg-gray-50 p-2"
                >
                  {/* Data */}
                  <View className="h-[60px] w-[55px] items-center justify-center rounded-xl bg-[#EEEEEE]">
                    <Text className="text-2xl font-bold text-black">
                      {day}
                    </Text>

                    <Text className="text-xs font-semibold text-gray-600">
                      {month}
                    </Text>
                  </View>

                  {/* Informações do post */}
                  <View className="ml-3 flex-1">
                    <Text className="text-sm text-[#222]">
                      {post.title}
                    </Text>

                    <View
                      className={`mt-2 self-start rounded-full px-3 py-1 ${
                        post.status === 'Postado'
                          ? 'bg-green-50'
                          : post.status === 'Em andamento'
                            ? 'bg-blue-50'
                            : 'bg-purple-50'
                      }`}
                    >
                      <Text
                        className={`text-[10px] ${
                          post.status === 'Postado'
                            ? 'text-green-500'
                            : post.status === 'Em andamento'
                              ? 'text-blue-500'
                              : 'text-purple-500'
                        }`}
                      >
                        {post.status}
                      </Text>
                    </View>
                  </View>

                  {/* Opções */}
                  <Pressable
                    className="h-9 w-9 items-center justify-center rounded-full bg-[#E8E8E8]"
                    accessibilityLabel="Opções do post"
                  >
                    <DotsThreeVerticalIcon
                      size={20}
                      color="#777"
                    />
                  </Pressable>
                </View>
              );
            })}

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
