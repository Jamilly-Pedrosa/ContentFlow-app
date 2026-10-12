import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Container } from '../../components/layout/Container';
import EmptyAnalysis from '../../components/analise/EmptyAnalysis';

export default function Analise() {
  return (
    <SafeAreaView className="flex-1">

        <Container className="flex-1">

            <View className="flex-1 pt-10">
              <EmptyAnalysis />
            </View>

        </Container>

    </SafeAreaView>
  );
}
