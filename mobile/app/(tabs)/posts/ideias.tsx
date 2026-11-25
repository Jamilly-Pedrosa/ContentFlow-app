import { Text, View, Image, ScrollView } from 'react-native';
import EmptyIdeias from '../../../components/ideias/EmptyIdeias';

import api from '../../../utils/api';
import { getToken } from '../../../utils/tokenServie';
import { useEffect, useState } from 'react';
import IdeiaCard from '../../../components/posts/IdeaCard';
import { useRouter } from 'expo-router';

export default function Ideias() {
  const router = useRouter();
  const [ideias, setIdeias] = useState([]);

  useEffect(() => {
    const fetchIdeias = async () => {
      try {
        const token = await getToken();

        if (!token) {
          throw new Error('Token não encontrado. Faça login novamente.');
        }

        const response = await api.get('/getAllIdeiasByUser', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setIdeias(response.data);
      } catch (error: any) {
        console.error(
          'Erro ao buscar ideias:',
          error.response?.status,
          error.response?.data ?? error.message,
        );
      }
    };

    fetchIdeias();
  }, []);


  const planejar = async (ideia: any) => {
    if (!ideia) {
      console.error("Ideia não encontrada!");
      return;
    }

    const token = await getToken();

    const response = await api.post(
      `/transformInPost/${ideia.id}`,
      {
        title: ideia.title,
        content: ideia.content,
        status: 'Planejado',
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    router.replace('/(tabs)/posts/ideias');


  };

  const deleteIdeia = async (id:number) => { 
    try {
      const token = await getToken();

      if (!token) {
        throw new Error('Token não encontrado. Faça login novamente.');
      }

      const response = await api.delete(`/deleteIdeia/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      router.replace('/(tabs)/posts/ideias');
    } catch (error: any) {
      console.error(
        'Erro ao deletar ideia:',
        error.response?.status,
        error.response?.data ?? error.message,
      );
    }
  }


  return (
    <View className="flex-1 pt-10">
      {ideias.length === 0 ? (
        <EmptyIdeias />
      ) : (
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        >
          {ideias.map((ideia: any) => (
            <IdeiaCard
              key={ideia.id}
              title={ideia.title}
              onPlan={() => planejar(ideia)}
              onDelete={() => deleteIdeia(ideia.id)}
              onEdit={() => router.push({pathname: '/(creation)/ideia/[id]', params: { id: ideia.id }})}
              isUsed={ideia.isPlanned}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
}