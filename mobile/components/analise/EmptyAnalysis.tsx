import { Text, View, Image } from 'react-native';

export default function EmptyAnalysis() {
  return (
  
    <View className="flex-1 w-full pt-10">
        
      {/* IMAGEM */}
      <View className="w-full h-[200px] mt-4 items-center justify-center">
        <Image 
          source={require('../../../mobile/assets/images-contentflow/empty-analysis.png')} 
          className="w-full h-full" 
          resizeMode="contain"
        />
      </View>

      {/* TÍTULO */}
      <Text className="font-poppins-semibold px-8 text-large-text text-center mt-6">
        Nenhuma análise encontrada.
      </Text>

      {/* DESCRIÇÃO */}
      <Text className="font-poppins-regular text-body-text text-gray-900 text-center mt-4">
        Clique no ícone de + para começar a planejar seus posts e ideias e acompanhe seu progresso aqui.
      </Text>
    </View>
  );
}