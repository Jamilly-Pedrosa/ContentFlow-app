
import * as DocumentPicker from 'expo-document-picker';
import { Pressable, View, Text, Image, Alert } from 'react-native';

type SelectedFile = {
  uri: string;
  name: string;
  mimeType: string;
  size?: number;
};

type UploadButtonProps = {
  onSelectFile: (file: SelectedFile) => void;
};

export default function Upload({ onSelectFile }: UploadButtonProps) {
  const handleAttachFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/png', 'image/jpeg', 'image/webp'],
        copyToCacheDirectory: true,
      });

      if (result.canceled) return;

      const file = result.assets[0];

      if (file.size != null && file.size > 5 * 1024 * 1024) {
        Alert.alert('Arquivo muito grande', 'O limite é de 5 MB.');
        return;
      }

      if (!file.mimeType || !['image/png', 'image/jpeg', 'image/webp'].includes(file.mimeType)) {
        Alert.alert('Formato inválido', 'Selecione uma imagem JPG, PNG ou WEBP.');
        return;
      }

      const selectedFile: SelectedFile = {
        uri: file.uri,
        name: file.name,
        mimeType: file.mimeType,
        size: file.size,
      };

      console.log('Arquivo selecionado:', selectedFile);

      onSelectFile(selectedFile);
    } catch (error) {
      console.error('Erro ao selecionar arquivo:', error);
      Alert.alert('Erro', 'Não foi possível selecionar a imagem.');
    }
  };

  return (
    <View>
      <Text>Inserir arquivo aqui</Text>

      <Pressable onPress={handleAttachFile}>
        <View className="flex-row items-center justify-center gap-2 rounded-lg border border-dashed border-[#8B7CF6] bg-[#F3F0FF] px-4 py-3">
          <Image
            source={require('@/assets/images-contentflow/upload.png')}
            className="w-[200px] h-[100px]"
          />
        </View>
      </Pressable>
    </View>
  );
}
