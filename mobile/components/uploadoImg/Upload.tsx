
import * as DocumentPicker from 'expo-document-picker';
import { Pressable, View, Text, Image } from 'react-native';

type UploadButtonProps = {
  onSelectFile: (uri: string, name: string) => void;
};

export default function Upload({
  onSelectFile,
}: UploadButtonProps) {
  const handleAttatchFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ['image/png', 'image/jpeg', 'application/pdf'],
      copyToCacheDirectory: true,
    });

    if (!result.canceled) {
      const file = result.assets[0];

      if (file.size != null && file.size > 5 * 1024 * 1024) {
        return;
      }

      onSelectFile(file.uri, file.name);
    }
  };

  return (
    <View>
        <Text>Inserir arquivo aqui</Text>
        <Pressable onPress={handleAttatchFile}>
            <View className="flex-row items-center justify-center gap-2 rounded-lg border border-dashed border-[#8B7CF6] bg-[#F3F0FF] px-4 py-3">
                <Image
                    source={require("@/assets/images-contentflow/empty-next-posts.png")}
                    className="w-[200px] h-[100px]"
                />
            </View>
        </Pressable>
    </View>
  );
}
