import { SafeAreaView } from 'react-native-safe-area-context';
import { Container } from '../../components/layout/Container';
import { Header } from '../../components/layout/Header';
import { router } from 'expo-router';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { TextArea } from '../../components/ui/TextArea';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function CriarIdeia() {
  const [ideiaTitulo, setIdeiaTitulo] = useState('');
  //const [categoria, setCategoria] = useState('');
  const [legenda, setLegenda] = useState('');

  return (
    <SafeAreaView className="flex-1">
        <Container className="flex-1">

            <Header
                title="Nova Ideia"
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
                onPress={() => router.replace('/(tabs)')}
                >
                Salvar
                </Button>
            </View>

        </Container>

    </SafeAreaView>
  );
}
