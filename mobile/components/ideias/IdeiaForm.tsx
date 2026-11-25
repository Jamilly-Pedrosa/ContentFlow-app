import { SafeAreaView } from 'react-native-safe-area-context';
import { Container } from '../layout/Container';
import { Header } from '../layout/Header';
import { router } from 'expo-router';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { TextArea } from '../ui/TextArea';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useEffect } from 'react';

import api from '../../utils/api';
import { getToken } from '../../utils/tokenServie';

type IdeiaFormProps = {
  mode: 'create' | 'edit';
  ideiaId?: string;
};

export default function IdeiaForm({ mode, ideiaId }: IdeiaFormProps) {
  const [ideiaTitulo, setIdeiaTitulo] = useState('');
  const [legenda, setLegenda] = useState('');

  useEffect(() => {
    if (mode === 'edit' && ideiaId) {
      const fetchIdeia = async () => {
        try {
          const token = await getToken();

          if (!token) {
            throw new Error('Token não encontrado. Faça login novamente.');
          }

          const response = await api.get(`/getIdeiaById/${ideiaId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const ideiaData = response.data;
          setIdeiaTitulo(ideiaData.title);
          setLegenda(ideiaData.content);
        } catch (error: any) {
          console.error(
            'Erro ao buscar ideia:',
            error.response?.status,
            error.response?.data ?? error.message,
          );
        }
      };

      fetchIdeia();
    }
  }, [mode, ideiaId]);

  const token = getToken();

  const handleSalvarIdeia = async () => {
    try {
      const token = await getToken();

      if (!token) {
        throw new Error('Token não encontrado. Faça login novamente.');
      }

      if(mode === 'edit' && ideiaId) {
        const response = await api.put(
          `/editIdeia/${ideiaId}`,
          {
            title: ideiaTitulo,
            content: legenda,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        router.replace('/(tabs)/posts/ideias');
      } else {
         const response = await api.post(
            '/createIdeia',
            {
              title: ideiaTitulo,
              content: legenda,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          router.replace('/(tabs)/posts/ideias');

        }
      }

    catch (error: any) {
      console.error(
        'Erro ao salvar ideia:',
        error.response?.status,
        error.response?.data ?? error.message,
      );
    }
  };
  

  return (
    <SafeAreaView className="flex-1">
        <Container className="flex-1">

            <Header
                title={mode === 'create' ? 'Nova Ideia' : 'Editar Ideia'}
                onBackPress={() => {
                    if (router.canGoBack()) {
                    router.back();
                    } else {
                    router.replace('/(tabs)');
                    }
                }}
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

                {/* Formulário */}
                <View className="my-4 gap-6">

                    {/* Título */}
                    <View>
                        <Input 
                            label="Título"
                            placeholder="Digite o título da ideia"  
                            value={ideiaTitulo}
                            onChangeText={(text) => setIdeiaTitulo(text)}
                            accessibilityLabel="Título da ideia"
                        />
                    </View>
    
                    {/* Legenda */}
                    <View className="gap-2">
                        <TextArea
                            label="Legenda"
                            placeholder="Descreva o que você está pensando"
                            value={legenda}
                            onChangeText={setLegenda}
                            accessibilityLabel="Legenda da ideia"
                        />
                    </View>

                    {/* Categoria 
                    <View>
                        <Input 
                            label="Categoria do conteúdo"
                            placeholder="Ex: Marketing, Design, Desenvolvimento"  
                            helperText='Você pode escrever livremente'
                            value={categoria}
                            onChangeText={(text) => setCategoria(text)}
                            accessibilityLabel="Categoria da ideia"
                        />
                    </View> */}

                    {/* Anexo arquivo */}
                    <View>
                    
                    </View>
    
                </View>
    
                </KeyboardAwareScrollView>
            </KeyboardAvoidingView>
    
            <View className="w-full items-center pb-8">
                <Button
                type="primary"
                size="L"
                onPress={handleSalvarIdeia}
                >
                Salvar
                </Button>
            </View>

        </Container>

    </SafeAreaView>
  );
}
