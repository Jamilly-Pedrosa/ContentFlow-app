import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Container } from '../../components/layout/Container';
import EmptyAnalysis from '../../components/analise/EmptyAnalysis';
import { Header } from '../../components/layout/Header';
import { router } from 'expo-router';


export default function Analise() {
  return (
    <SafeAreaView className="flex-1">

        <Container className="flex-1">

            <Header
                title="Dashboard"
                onBackPress={() => router.back()}
            />

            <View className="flex-1 pb-14 items-center justify-center">
              <EmptyAnalysis />
            </View>

        </Container>

    </SafeAreaView>
  );
}
