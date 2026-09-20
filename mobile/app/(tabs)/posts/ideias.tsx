import { Pressable, Text, View, Image } from 'react-native';

export default function Ideias() {
  return (
    <View className="flex-1 bg-white px-5 items-center">

      {/* IMAGEM */}
      <View className="w-full h-[220px] items-center justify-center">
        <Image source={require('../../../assets/images-contentflow/empty-ideas.png')} className="w-full h-full" />
      </View>

      {/* TÍTULO */}
      <Text className="text-xl font-semibold text-center mt-3">
        Toda boa publicação começa
        {'\n'}
        com uma ideia
      </Text>

      {/* DESCRIÇÃO */}
      <Text className="text-sm text-gray-500 text-center mt-3 leading-5">
        Organize suas ideias e programe novos
        {'\n'}
        posts para publicar no momento certo.
      </Text>

      {/* BOTÃO */}
      <Pressable className="bg-[#6952F5] rounded-xl px-5 py-2.5 mt-4">
        <Text className="text-white text-sm">
          Criar nova ideia
        </Text>
      </Pressable>

    </View>
  );
}