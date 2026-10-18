import { SafeAreaView } from 'react-native-safe-area-context';
import { Container } from '../../components/layout/Container';
import { Header } from '../../components/layout/Header';
import { router } from 'expo-router';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { TextArea } from '../../components/ui/TextArea';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CalendarBlankIcon } from 'phosphor-react-native';
import  CardStatusPost from '../../components/posts/CardStatusPost';

export default function CriarPost() {
  const [postTitulo, setPostTitulo] = useState('');
  //const [categoria, setCategoria] = useState('');
  const [legenda, setLegenda] = useState('');
  const [dataPublicacao, setDataPublicacao] = useState('');
  const [status, setStatus] = useState<'Planejado' | 'Em andamento' | 'Postado'>('Planejado');

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

                {/* Formulário */}
                <View className="my-4 gap-6">

                    {/* Título */}
                    <View>
                        <Input 
                            label="Título"
                            placeholder="Digite o título do post"  
                            value={postTitulo}
                            onChangeText={(text) => setPostTitulo(text)}
                            accessibilityLabel="Título do post"
                        />
                    </View>
    
                    {/* Legenda */}
                    <View className="gap-2">
                        <TextArea
                            label="Legenda"
                            placeholder="Legenda sobre sua postagem"
                            value={legenda}
                            onChangeText={setLegenda}
                            accessibilityLabel="Legenda do post"
                            //maxLength={2200}
                            //showCharacterCount
                        />
                    </View>

                    {/* Data publicação */}
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

                    {/* Categoria 
                    <View className="gap-2">
                        <Input 
                            label="Categoria do conteúdo"
                            placeholder="Ex: Marketing, Design, Desenvolvimento"  
                            helperText='Você pode escrever livremente'
                            value={categoria}
                            onChangeText={(text) => setCategoria(text)}
                            accessibilityLabel="Categoria do post"
                        />
                    </View> */}

                    {/* Anexo arquivo */}
                    <View>
                    
                    </View>

                    {/* Status */}
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
                onPress={() => router.replace('/(tabs)')}
                >
                Salvar
                </Button>
            </View>

        </Container>

    </SafeAreaView>
  );
}
