
import { SafeAreaView } from 'react-native-safe-area-context';
import { Container } from '../../components/layout/Container';
import { Header } from '../../components/layout/Header';
import { router } from 'expo-router';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { TextArea } from '../../components/ui/TextArea';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CalendarBlankIcon } from 'phosphor-react-native';
import CardStatusPost from '../../components/posts/CardStatusPost';
import Upload from '@/components/uploadoImg/Upload';

import { getToken } from '@/utils/tokenServie';
import api from '@/utils/api';

export default function CriarPost() {
  const [postTitulo, setPostTitulo] = useState('');
  const [legenda, setLegenda] = useState('');
  const [dataPublicacao, setDataPublicacao] = useState('');
  const [status, setStatus] = useState<
    'Planejado' | 'Em andamento' | 'Postado'
  >('Planejado');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [salvando, setSalvando] = useState(false);

  
    async function handleSave() {
    const title = postTitulo.trim();
    const content = legenda.trim();
    const dateText = dataPublicacao.trim();

    if (!title || !content || !dateText) {
        Alert.alert(
        'Campos obrigatórios',
        'Preencha o título, a legenda e a data de publicação.',
        );
        return;
    }

    if (title.length > 40) {
        Alert.alert('Título muito longo', 'O título deve ter até 40 caracteres.');
        return;
    }

    if (content.length > 200) {
        Alert.alert(
        'Legenda muito longa',
        'A legenda deve ter até 200 caracteres.',
        );
        return;
    }

    const dateMatch = dateText.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);

    if (!dateMatch) {
        Alert.alert('Data inválida', 'Use o formato DD/MM/AAAA.');
        return;
    }

    const [, dia, mes, ano] = dateMatch;

    const data = new Date(
        Number(ano),
        Number(mes) - 1,
        Number(dia),
        12,
    );

    if (
        data.getFullYear() !== Number(ano) ||
        data.getMonth() !== Number(mes) - 1 ||
        data.getDate() !== Number(dia)
    ) {
        Alert.alert('Data inválida', 'Informe uma data existente.');
        return;
    }

    const postData = {
        title,
        content,
        type: 'Post',
        status,
        date: data.toISOString(),
    };

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

        // Requisição para criar o post.
        // Ajuste '/createPost' caso sua rota no Express seja diferente.
        const response = await api.post('/createPost', postData, {
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
              <View>
                <Input
                  label="Título"
                  placeholder="Digite o título do post"
                  value={postTitulo}
                  onChangeText={setPostTitulo}
                  accessibilityLabel="Título do post"
                />
              </View>

              <View className="gap-2">
                <TextArea
                  label="Legenda"
                  placeholder="Legenda sobre sua postagem"
                  value={legenda}
                  onChangeText={setLegenda}
                  accessibilityLabel="Legenda do post"
                />
              </View>

              <View>
                <Input
                  label="Data de publicação"
                  placeholder="DD/MM/AAAA"
                  rightIcon={CalendarBlankIcon}
                  value={dataPublicacao}
                  onChangeText={setDataPublicacao}
                  accessibilityLabel="Data de publicação"
                />
              </View>

              <View>
                <Upload onSelectFile={setImageUri} />
              </View>

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
            Salvar
          </Button>
        </View>
      </Container>
    </SafeAreaView>
  );
}
