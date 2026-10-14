import { SafeAreaView } from 'react-native-safe-area-context';
import { Container } from '../../components/layout/Container';
import { Header } from '../../components/layout/Header';
import { router } from 'expo-router';


export default function Analise() {
  return (
    <SafeAreaView className="flex-1">

        <Container className="flex-1">

            <Header
                title="Criar Post"
                onBackPress={() => router.back()}
            />

        </Container>

    </SafeAreaView>
  );
}
