import {
  Pressable,
  ScrollView,
  Text,
  View,
  Image
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

import {
  BellIcon,
  UserCircleIcon,
  NoteBlankIcon,
  NotePencilIcon,
  CheckSquareIcon,
  CaretRightIcon,
} from 'phosphor-react-native';

export default function TabOneScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="px-7 pb-6"
      >

        {/* HEADER */}
        <View className="flex-row items-center justify-between mt-2">
          <View className="flex-1">
            <Text className="text-3xl text-[#1A1A1A]">
              Olá, <Text className="font-bold">Rony!</Text>
            </Text>

            <Text className="text-bas mt-1">
              Comece a organizar as suas publicações.
            </Text>
          </View>

          <View className="flex-row items-center gap-4 ml-3">
            <UserCircleIcon
              size={39}
              color="#8B7CF6"
              weight="thin"
            />

            <BellIcon
              size={28}
              color="#111827"
              weight="regular"
            />
          </View>
        </View>


        {/* RESUMO RÁPIDO */}
        <View className="rounded-2xl overflow-hidden mt-7">
          <LinearGradient
            colors={['#3B82F6', '#8B5CF6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <View className="p-6">

              <Text className="text-white text-xl font-bold mb-9">
                Seu resumo rápido
              </Text>

              {/* ESTATÍSTICAS */}
              <View className="flex-row justify-between">

                {/* PLANEJADOS */}
                <View className="items-center">
                  <NoteBlankIcon
                    size={30}
                    color="white"
                    weight="regular"
                  />

                  <Text className="text-white font-bold text-sm mt-2">
                    Planejados
                  </Text>

                  <Text className="text-white text-3xl mt-1">
                    0
                  </Text>
                </View>


                {/* EM ANDAMENTO */}
                <View className="items-center">
                  <NotePencilIcon
                    size={30}
                    color="white"
                    weight="regular"
                  />

                  <Text className="text-white font-bold text-sm mt-2">
                    Em andamento
                  </Text>

                  <Text className="text-white text-3xl mt-1">
                    0
                  </Text>
                </View>


                {/* CONCLUÍDOS */}
                <View className="items-center">
                  <CheckSquareIcon
                    size={30}
                    color="white"
                    weight="regular"
                  />

                  <Text className="text-white font-bold text-sm mt-2">
                    Concluídos
                  </Text>

                  <Text className="text-white text-3xl mt-1">
                    0
                  </Text>
                </View>

              </View>


              {/* BOTÃO */}
              <Pressable
                className="bg-white rounded-2xl h-12 items-center justify-center mt-6"
              >
                <Text className="text-purple-500 text-lg">
                  Ver detalhes
                </Text>
              </Pressable>

            </View>
          </LinearGradient>
        </View>


        {/* BANCO DE IDEIAS */}
        <View className="flex-row items-center bg-white mt-6">

          {/* IMAGEM */}
          <View className="w-[120px] h-[120px] items-center justify-center">
            <Image
              source={require("@/assets/images-contentflow/idea-bank.png")}
              className="w-full h-full"
            />
          </View>


          {/* CONTEÚDO */}
          <View className="flex-1 ml-3">

            <Text className="text-xl font-bold text-[#1A1A1A]">
              Banco de ideias
            </Text>

            <Text className="text-sm text-gray-500 mt-2 leading-5">
              Salve sua ideia de conteúdo
              para usar quando quiser.
            </Text>

            <Pressable className="flex-row items-center mt-3">
              <Text className="text-blue-500">
                Ver todas
              </Text>

              <CaretRightIcon
                size={16}
                color="#3B82F6"
              />
            </Pressable>

          </View>
        </View>


        {/* PRÓXIMOS POSTS */}
        <View className="mt-7">

          <Text className="text-xl font-semibold text-[#111827] mb-4">
            Próximos posts
          </Text>

          <View className="bg-[#F8F9FA] rounded-2xl h-48 items-center justify-center overflow-hidden">

            <Image
              source={require("@/assets/images-contentflow/empty-next-posts.png")}
              className="w-[200px] h-[100px]"
            />

            <Text className="text-gray-500 mt-2">
              Nenhum próximo post
            </Text>

          </View>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}