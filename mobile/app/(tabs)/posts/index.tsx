import {
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';

import {
  DotsThreeVerticalIcon,
} from 'phosphor-react-native';

import { Link } from 'expo-router';

import { useState } from 'react';

export default function Post() {
  const [activeFilter, setActiveFilter] = useState('Todos');

  const posts = [
    {
      day: '26',
      month: 'SET',
      title: 'Novo sofá de couro',
      status: 'Em andamento',
    },
    {
      day: '24',
      month: 'SET',
      title: 'Novo sofá de couro',
      status: 'Em andamento',
    },
    {
      day: '19',
      month: 'SET',
      title: 'Novo sofá de couro',
      status: 'Concluído',
    },
    {
      day: '15',
      month: 'SET',
      title: 'Novo sofá de couro',
      status: 'Concluído',
    },
    {
      day: '01',
      month: 'SET',
      title: 'Novo sofá de couro',
      status: 'Planejado',
    },
  ];

  // FILTRO
  const filteredPosts =
    activeFilter === 'Todos'
      ? posts
      : posts.filter((post) => post.status === activeFilter);

  // CONTADORES
  const planejados = posts.filter(
    (post) => post.status === 'Planejado'
  ).length;

  const emAndamento = posts.filter(
    (post) => post.status === 'Em andamento'
  ).length;

  return (
    <View className="flex-1 bg-white">

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="px-4 pb-6"
      >
        <View className="flex-row gap-2 mt-4">

          <Pressable
            onPress={() => setActiveFilter('Todos')}
            className={`rounded-full px-3 py-2 ${
              activeFilter === 'Todos'
                ? 'bg-purple-50'
                : 'bg-gray-50'
            }`}
          >
            <Text className="text-xs">
              Todos ({posts.length})
            </Text>
          </Pressable>


          {/* PLANEJADOS */}
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


          {/* EM ANDAMENTO */}
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


        {/* POSTS */}
        <View className="mt-4 gap-2">

          {filteredPosts.map((post, index) => (

            <View
              key={index}
              className="flex-row items-center bg-gray-50 rounded-2xl p-2"
            >

              {/* DATA */}
              <View className="w-[55px] h-[60px] rounded-xl bg-[#EEEEEE] items-center justify-center">

                <Text className="text-2xl font-bold text-black">
                  {post.day}
                </Text>

                <Text className="text-xs font-semibold text-gray-600">
                  {post.month}
                </Text>

              </View>


              {/* INFORMAÇÕES */}
              <View className="flex-1 ml-3">

                <Text className="text-sm text-[#222]">
                  {post.title}
                </Text>

                <View
                  className={`self-start rounded-full px-3 py-1 mt-2 ${
                    post.status === 'Concluído'
                      ? 'bg-green-50'
                      : post.status === 'Em andamento'
                        ? 'bg-blue-50'
                        : 'bg-purple-50'
                  }`}
                >

                  <Text
                    className={`text-[10px] ${
                      post.status === 'Concluído'
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


              {/* MENU */}
              <Pressable className="w-9 h-9 rounded-full bg-[#E8E8E8] items-center justify-center">

                <DotsThreeVerticalIcon
                  size={20}
                  color="#777"
                />

              </Pressable>

            </View>

          ))}

        </View>

      </ScrollView>

    </View>
  );
}