
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { router } from 'expo-router';
import {
  CaretLeftIcon,
  CaretRightIcon,
} from 'phosphor-react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Container } from '../../components/layout/Container';
import { Header } from '../../components/layout/Header';

import { PostCard } from '../../components/posts/PostCard';
import CardStatusPost from '../../components/posts/CardStatusPost';

import api from '../../utils/api';
import { getToken } from '../../utils/tokenServie';

type PostStatus = 'Planejado' | 'Em andamento' | 'Postado';

type PostItem = {
  id: string;
  title: string;
  content: string;
  type: string;
  status: PostStatus;
  date: string;
};

// Dias da semana
const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

// Converte a data da API para uma data local
function parsePostDate(dateString: string): Date | null {
  if (!dateString) return null;

  // Formato dd/mm/yyyy
  const brazilianDate = dateString.match(
    /^(\d{2})\/(\d{2})\/(\d{4})$/,
  );

  if (brazilianDate) {
    const [, day, month, year] = brazilianDate;

    return new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
    );
  }

  // Formato ISO: yyyy-mm-dd ou yyyy-mm-ddTHH:mm:ss
  const isoDate = dateString.match(
    /^(\d{4})-(\d{2})-(\d{2})/,
  );

  if (isoDate) {
    const [, year, month, day] = isoDate;

    return new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
    );
  }

  return null;
}

// Compara datas sem considerar horário
function getDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export default function Calendario() {
  const today = new Date();

  const [posts, setPosts] = useState<PostItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const [selectedDate, setSelectedDate] = useState(today);

  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );

  // Buscar posts da API
  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMessage('');

      const token = await getToken();

      if (!token) {
        throw new Error('Token não encontrado. Faça login novamente.');
      }

      const response = await api.get('/getAllPosts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPosts(response.data.posts ?? []);

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

  // Posts com datas válidas
  const postsWithDates = useMemo(() => {
    return posts.map((post) => ({
      ...post,
      parsedDate: parsePostDate(post.date),
    })).filter((post) => post.parsedDate !== null);
  }, [posts]);

  // Posts da data selecionada
  const selectedPosts = useMemo(() => {
    const selectedKey = getDateKey(selectedDate);

    return postsWithDates.filter(
      (post) => getDateKey(post.parsedDate!) === selectedKey,
    );
  }, [postsWithDates, selectedDate]);

  // Dias do calendário
  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1).getDay();

    const totalDays = new Date(
      year,
      month + 1,
      0,
    ).getDate();

    return [
      ...Array(firstDay).fill(null),
      ...Array.from(
        { length: totalDays },
        (_, index) => index + 1,
      ),
    ];
  }, [currentMonth]);

  // Verifica se um dia possui posts
  function hasPosts(day: number) {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day,
    );

    const dateKey = getDateKey(date);

    return postsWithDates.some(
      (post) => getDateKey(post.parsedDate!) === dateKey,
    );
  }

  // Selecionar dia
  function handleSelectDay(day: number) {
    setSelectedDate(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day,
      ),
    );
  }

  // Navegar entre meses
  function changeMonth(direction: number) {
    const newMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + direction,
      1,
    );

    setCurrentMonth(newMonth);

    // Seleciona o primeiro dia do novo mês
    setSelectedDate(new Date(
      newMonth.getFullYear(),
      newMonth.getMonth(),
      1,
    ));
  }

  // Nome do mês
  const monthName = currentMonth.toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric',
  });

  // Abrir detalhes do post
  function handleViewDetails(post: PostItem) {
    router.push({
      pathname: '/(details)/post/detalhes/[id]',
      params: {
        id: post.id,
      },
    });
  }

  return (
    <SafeAreaView className="flex-1">

      <Container className="flex-1">

        <Header
          title="Calendário"
          onBackPress={() => router.back()}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >

          {/* Calendário mensal */}
          <View className="mt-8 rounded-2xl bg-gray-100 px-4 py-4">

            {/* Cabeçalho do mês */}
            <View className="mb-3 flex-row items-center justify-between">

              <Text className="font-poppins-medium text-body-text capitalize mb-2">
                {monthName}
              </Text>

              <View className="flex-row items-center gap-4 mb-2">

                <Pressable
                  onPress={() => changeMonth(-1)}
                  accessibilityRole="button"
                  accessibilityLabel="Mês anterior"
                  className="p-1"
                >
                  <CaretLeftIcon size={22} color="#777777" />
                </Pressable>

                <Pressable
                  onPress={() => changeMonth(1)}
                  accessibilityRole="button"
                  accessibilityLabel="Próximo mês"
                  className="p-1"
                >
                  <CaretRightIcon size={22} color="#777777" />
                </Pressable>

              </View>
            </View>

            {/* Dias da semana */}
            <View className="mt-2 mb-4 flex-row">

              {weekDays.map((day, index) => (
                <View
                  key={index}
                  className="w-[14.285%] items-center"
                >
                  <Text className="font-poppins text-small-text text-gray-700">
                    {day}
                  </Text>
                </View>
              ))}

            </View>

            {/* Dias do mês */}
            <View className="flex-row flex-wrap">

              {calendarDays.map((day, index) => {

                if (day === null) {
                  return (
                    <View
                      key={`empty-${index}`}
                      className="w-[14.285%] items-center justify-center py-1"
                    />
                  );
                }

                const isSelected =
                  getDateKey(selectedDate) ===
                  getDateKey(
                    new Date(
                      currentMonth.getFullYear(),
                      currentMonth.getMonth(),
                      day,
                    ),
                  );

                const dayHasPosts = hasPosts(day);

                return (
                  <View
                    key={day}
                    className="w-[14.285%] items-center justify-center py-1 mb-2"
                  >

                    <Pressable
                      onPress={() => handleSelectDay(day)}
                      accessibilityRole="button"
                      accessibilityLabel={`${day} de ${monthName}${dayHasPosts ? ', possui posts' : ''}`}
                      accessibilityState={{
                        selected: isSelected,
                      }}
                      className={`h-8 w-8 items-center justify-center rounded-full ${
                        isSelected
                          ? 'bg-[#D9D0FF]'
                          : 'bg-transparent'
                      }`}
                    >

                      <Text
                        className={`font-poppins-medium text-small-text ${
                          isSelected
                            ? 'text-[#6554EE]'
                            : 'text-gray-900'
                        }`}
                      >
                        {day}
                      </Text>

                    </Pressable>

                    {/* Indicador de posts */}
                    {dayHasPosts && (
                      <View className="absolute bottom-0 h-[5px] w-[5px] rounded-full bg-[#6554EE]" />
                    )}

                  </View>
                );
              })}

            </View>

          </View>

          {/* Título da lista */}
          <Text className="mb-3 mt-6 font-poppins-medium text-body-text">
            Seus posts
          </Text>

          {/* Carregamento */}
          {loading ? (

            <View className="items-center justify-center py-16">

              <ActivityIndicator
                size="large"
                color="#6554EE"
              />

              <Text className="mt-3 font-poppins text-sm text-gray-500">
                Carregando posts...
              </Text>

            </View>

          ) : errorMessage ? (

            /* Erro */
            <View className="items-center py-12">

              <Text className="text-center font-poppins text-sm text-red-500">
                {errorMessage}
              </Text>

              <Pressable
                onPress={fetchPosts}
                className="mt-4 rounded-full bg-purple-50 px-5 py-2"
              >
                <Text className="font-poppins-medium text-sm text-[#6554EE]">
                  Tentar novamente
                </Text>
              </Pressable>

            </View>

          ) : selectedPosts.length > 0 ? (

            /* Posts da data selecionada */
            <View className="gap-2">

              {selectedPosts.map((post) => (
                <PostCard
                  key={post.id}
                  title={post.title}
                  date={post.date}
                  status={
                    <CardStatusPost
                      status={post.status}
                      size="small"
                    />
                  }
                  action="navigate"
                  onPress={() => handleViewDetails(post)}
                  onDetails={() => handleViewDetails(post)}
                />
              ))}

            </View>

          ) : (

            /* Estado vazio */
            <View className="h-[220px] items-center justify-center">

              <Text className="font-poppins-medium text-body-text text-gray-900">
                Nenhum post para este dia
              </Text>

              <Text className="mt-1 text-center font-poppins text-small-text text-gray-900">
                Os posts planejados para este dia
                {'\n'}
                aparecerão aqui.
              </Text>

            </View>

          )}

        </ScrollView>

      </Container>

    </SafeAreaView>
  );
}
