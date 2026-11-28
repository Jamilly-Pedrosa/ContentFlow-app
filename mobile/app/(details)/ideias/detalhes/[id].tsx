
import { useEffect, useState } from 'react';

import {
  ActivityIndicator,
  ScrollView,
  Text,
  View,
} from 'react-native';

import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Container } from '@/components/layout/Container';
import { Header } from '@/components/layout/Header';

import api from '@/utils/api';
import { getToken } from '@/utils/tokenServie';

import { NotePencilIcon } from 'phosphor-react-native';

type IdeiaDetailsData = {
  id: string;
  title: string;
  content: string | null;
};

export default function IdeiaDetails() {
  const { id } = useLocalSearchParams<{ id: string }>(); //Recupera o ID da ideia pela rota

  const [ideia, setIdeia] = useState<IdeiaDetailsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // Buscar detalhes da ideia
  useEffect(() => {
    async function fetchIdeia() {
      try {
        setLoading(true);
        setErrorMessage('');

        const token = await getToken();

        if (!token) {
          throw new Error('Token não encontrado. Faça login novamente.');
        }

        const response = await api.get(`/getIdeiaById/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setIdeia(response.data);

        console.log(
          'DETALHES DA IDEIA:',
          JSON.stringify(response.data, null, 2),
        );

      } catch (error: any) {
        console.error(
          'Erro ao buscar detalhes da ideia:',
          error.response?.data ?? error.message,
        );

        setErrorMessage(
          error.response?.data?.error ??
          error.message ??
          'Não foi possível carregar os detalhes da ideia.',
        );

      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchIdeia();
    }
  }, [id]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Container className="flex-1">

        {/* Header */}
        <Header
          title="Detalhes"
          onBackPress={() => router.back()}
          rightIcon={NotePencilIcon}
          rightIconLabel="Opção de editar"
          onRightPress={() => {
            if (!ideia) return;

            router.push({
              pathname: '/(creation)/ideia/[id]',
              params: { id: ideia.id },
            });
          }}
        />

        {/* Conteúdo */}
        {loading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#6554EE" />

            <Text className="mt-3 text-sm text-gray-500">
              Carregando detalhes...
            </Text>
          </View>

        ) : errorMessage ? (
          <View className="flex-1 items-center justify-center px-4">
            <Text className="text-center text-base text-red-500">
              {errorMessage}
            </Text>
          </View>

        ) : ideia ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            className="flex-1"
            contentContainerStyle={{ paddingBottom: 32 }}
          >
            <View className="mt-6 gap-6">

              {/* Título */}
              <View className="gap-2 mt-4">
            
                <Text className="font-poppins-semibold text-large-text text-black">
                  {ideia.title}
                </Text>
              </View>

              {/* Legenda */}
              {ideia.content?.trim() ? (
                <View className="gap-2">

                  <Text className="font-poppins-regular text-body-text leading-6 text-black">
                    {ideia.content}
                  </Text>
                </View>
              ) : null}

            </View>
          </ScrollView>

        ) : (
          <View className="flex-1 items-center justify-center">
            <Text className="text-base text-gray-500">
              Ideia não encontrada.
            </Text>
          </View>
        )}

      </Container>
    </SafeAreaView>
  );
}
