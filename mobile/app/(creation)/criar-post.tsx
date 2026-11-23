
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { router } from 'expo-router';
import { CalendarBlankIcon } from 'phosphor-react-native';

import { Container } from '../../components/layout/Container';
import { Header } from '../../components/layout/Header';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { TextArea } from '../../components/ui/TextArea';
import CardStatusPost from '../../components/posts/CardStatusPost';
import Upload from '@/components/uploadoImg/Upload';

import { getToken } from '@/utils/tokenServie';
import api from '@/utils/api';

type PostStatus = 'Planejado' | 'Em andamento' | 'Postado';

type SelectedFile = {
  uri: string;
  name: string;
  mimeType: string;
  size?: number;
};

export default function CriarPost() {
  const [postTitulo, setPostTitulo] = useState('');
  const [legenda, setLegenda] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [dataPublicacao, setDataPublicacao] = useState('');

  const [status, setStatus] = useState<PostStatus>('Planejado');
  const [selectedImage, setSelectedImage] = useState<SelectedFile | null>(null);
  const [salvando, setSalvando] = useState(false);

  function validarData(dateText: string): string | null {
    const dateMatch = dateText.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);

    if (!dateMatch) return null;

    const [, dia, mes, ano] = dateMatch;

    const data = new Date(
      Number(ano),
      Number(mes) - 1,
      Number(dia),
      12,
    );

    const dataValida =
      data.getFullYear() === Number(ano) &&
      data.getMonth() === Number(mes) - 1 &&
      data.getDate() === Number(dia);

    return dataValida ? data.toISOString() : null;
  }

  function validarFormulario(): string | null {
    const title = postTitulo.trim();
    const content = legenda.trim();
    const category = categoryName.trim();

    if (!title || !content || !dataPublicacao.trim() || !category) {
      return 'Preencha o título, a legenda, a categoria e a data de publicação.';
    }

    if (title.length > 40) {
      return 'O título deve ter até 40 caracteres.';
    }

    if (content.length > 200) {
      return 'A legenda deve ter até 200 caracteres.';
    }

    if (!validarData(dataPublicacao.trim())) {
      return 'Informe uma data válida no formato DD/MM/AAAA.';
    }

    return null;
  }

  async function handleSave() {
    if (salvando) return;

    const erroValidacao = validarFormulario();

    if (erroValidacao) {
      Alert.alert('Verifique os dados', erroValidacao);
      return;
    }

    try {
      setSalvando(true);

      const token = await getToken();

      if (!token) {
        Alert.alert(
          'Sessão expirada',
          'Faça login novamente para criar um post.',
        );
        return;
      }

      const formData = new FormData();

      formData.append('title', postTitulo.trim());
      formData.append('content', legenda.trim());
      formData.append('type', 'Post');
      formData.append('status', status);
      formData.append('date', validarData(dataPublicacao.trim())!);
      formData.append('categoryName', categoryName.trim());

      if (selectedImage) {
        formData.append(
          'image',
          {
            uri: selectedImage.uri,
            name: selectedImage.name,
            type: selectedImage.mimeType,
          } as any,
        );
      }

      console.log('Categoria enviada:', categoryName.trim());
      console.log('Imagem enviada:', selectedImage ?? 'Nenhuma imagem');

      const response = await api.post('/createPost', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Post criado:', response.data);

      Alert.alert(
        'Sucesso!',
        'Seu post foi criado com sucesso.',
        [
          {
            text: 'OK',
            onPress: () => router.replace('/(tabs)'),
          },
        ],
      );
    } catch (error: any) {
      console.error(
        'Erro ao criar post:',
        error.response?.data ?? error.message,
      );

      const mensagem =
        error.response?.data?.error ??
        'Não foi possível criar o post. Tente novamente.';

      Alert.alert('Erro ao criar post', mensagem);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <SafeAreaView className="flex-1">
      <Container className="flex-1">
        <Header
          title="Novo Post"
          onBackPress={() => router.back()}
        />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
          className="flex-1"
        >
          <KeyboardAwareScrollView
            className="flex-1"
            contentContainerStyle={{
              paddingTop: 38,
              paddingBottom: 32,
            }}
            enableOnAndroid
            extraScrollHeight={24}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
          >
            <View className="my-4 gap-6">
              <Input
                label="Título"
                placeholder="Digite o título do post"
                value={postTitulo}
                onChangeText={setPostTitulo}
                accessibilityLabel="Título do post"
              />

              <View className="gap-2">
                <TextArea
                  label="Legenda"
                  placeholder="Legenda sobre sua postagem"
                  value={legenda}
                  onChangeText={setLegenda}
                  accessibilityLabel="Legenda do post"
                />
              </View>

              <Input
                label="Categoria"
                placeholder="Digite a categoria do post"
                value={categoryName}
                onChangeText={setCategoryName}
                accessibilityLabel="Categoria do post"
              />

              <Input
                label="Data de publicação"
                placeholder="DD/MM/AAAA"
                rightIcon={CalendarBlankIcon}
                value={dataPublicacao}
                onChangeText={setDataPublicacao}
                accessibilityLabel="Data de publicação"
              />

              <Upload onSelectFile={setSelectedImage} />

              <View>
                <Text className="mb-4 font-poppins-medium text-small-text text-[#1A1A1A]">
                  Status
                </Text>

                <View className="flex-row items-center justify-between">
                  <CardStatusPost
                    status="Planejado"
                    selected={status === 'Planejado'}
                    onPress={() => setStatus('Planejado')}
                  />

                  <CardStatusPost
                    status="Em andamento"
                    selected={status === 'Em andamento'}
                    onPress={() => setStatus('Em andamento')}
                  />

                  <CardStatusPost
                    status="Postado"
                    selected={status === 'Postado'}
                    onPress={() => setStatus('Postado')}
                  />
                </View>
              </View>
            </View>
          </KeyboardAwareScrollView>
        </KeyboardAvoidingView>

        <View className="w-full items-center pb-8">
          <Button
            type="primary"
            size="L"
            onPress={handleSave}
          >
            {salvando ? 'Salvando...' : 'Salvar'}
          </Button>
        </View>
      </Container>
    </SafeAreaView>
  );
}
