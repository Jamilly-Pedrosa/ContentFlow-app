import { Text, View, Image } from 'react-native';
import { Button } from '../../../components/ui/Button';

export default function Ideias() {
  return (

      <View className="flex-1 pt-10">
        
      {/* IMAGEM */}
      <View className="w-full h-[200px] mt-4 items-center justify-center">
        <Image 
          source={require('../../../assets/images-contentflow/empty-ideas.png')} 
          className="w-full h-full" 
          resizeMode="contain"
        />
      </View>

      {/* TÍTULO */}
      <Text className="font-poppins-semibold px-8 text-large-text text-center mt-8">
        Toda boa publicação começa com uma ideia
      </Text>

      {/* DESCRIÇÃO */}
      <Text className="font-poppins-regular text-body-text text-gray-900 text-center mt-4">
        Organize suas ideias e programe novos posts para publicar no momento certo.
      </Text>

      {/* BOTÃO */}

      <View className=" items-center mt-6">
        <Button
          type="primary"
          size="M"
          //onPress={() => router.replace('/(tabs)')}
        >
          Criar nova ideia
        </Button>
      </View>

      </View>
  );
}