import { Text, View, Image } from 'react-native';
import { Button } from '../ui/Button';

export default function EmptyPosts() {
  return (

    <View className="flex-1 pt-10">
        
      {/* IMAGEM */}
      <View className="w-full h-[200px] mt-4 items-center justify-center">
        <Image 
          source={require('../../assets/images-contentflow/empty-posts.png')} 
          className="w-full h-full" 
          resizeMode="contain"
        />
      </View>

      {/* TÍTULO */}
      <Text className="font-poppins-semibold px-8 text-large-text text-center mt-8">
        Pronto para criar um post?
      </Text>

      {/* DESCRIÇÃO */}
      <Text className="font-poppins-regular text-body-text text-gray-900 text-center mt-4">
        Planeje o conteúdo e deixe tudo preparado para sua próxima publicação.
      </Text>

      {/* BOTÃO */}

      <View className=" items-center mt-6">
        <Button
          type="primary"
          size="M"
          //onPress={() => router.replace('/(tabs)')}
        >
          Criar novo post
        </Button>
      </View>

      </View>
  );
}
  
    