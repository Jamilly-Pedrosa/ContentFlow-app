import { KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Container } from '../../components/layout/Container';
import { PasswordInput } from '../../components/ui/PasswordInput';

import {useState} from 'react';
import { emailValidation, passwordValidation, confirmPasswordValidation, validateUser } from '../../utils/authValidation';

export default function Cadastro() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validated, setValidated] = useState(false);

  return (
    <SafeAreaView className="flex-1">
      <Container className="flex-1">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
          className="flex-1"
        >
          {/* Título e Subtítulo */}
          <View className="items-center pt-6">
            <Text className="font-poppins-bold text-heading-2 text-text">
              Bem Vindo!
            </Text>

            <Text className="mt-2 text-center font-poppins-regular text-small-text text-text-secondary">
              Insira seu e-mail e senha para acessar sua conta.
            </Text>
          </View>

          <KeyboardAwareScrollView
            className="flex-1"
            contentContainerStyle={{
              paddingTop: 48,
              paddingBottom: 24,
            }}
            enableOnAndroid
            extraScrollHeight={24}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
          >
            {/* Formulário */}
            <View className="my-6 gap-8">

              <View>
                <Input 
                  label="E-mail"
                  placeholder="Digite seu email" 
                  keyboardType="email-address"
                  autoCapitalize='none'
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  error={validated? emailValidation(email).error: false}
                  errorMessage={validated? emailValidation(email).errorMessage: ''}
                />
              </View>

              <View>
                <PasswordInput 
                  label="Senha"
                  placeholder="Digite sua senha" 
                  helperText='A senha deve ter no mínimo 8 caracteres.'
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  error={validated? passwordValidation(password).error: false}
                  errorMessage={validated? passwordValidation(password).errorMessage: ''}
                />
              </View>

              <View>
                <PasswordInput 
                  label="Confirmar senha"
                  placeholder="Confirmar senha" 
                  value={confirmPassword}
                  onChangeText={(text) => setConfirmPassword(text)}
                  error={validated? confirmPasswordValidation(password, confirmPassword).error: false}
                  errorMessage={validated? confirmPasswordValidation(password, confirmPassword).errorMessage: ''}
                />
              </View>

            </View>

          </KeyboardAwareScrollView>
        </KeyboardAvoidingView>

        <View className="w-full items-center pb-8">
          <Button
            type="primary"
            size="L"
            onPress={() => validateUser("firstName", "lastName", email, password, confirmPassword, "login") ? router.replace('/(tabs)') : setValidated(true)}
          >
            Entrar
          </Button>

          <View className="mt-2 flex-row items-center justify-center gap-2">
            <Text className="font-poppins-regular text-caption text-text-secondary">
              Já possui uma conta?{''}
            </Text>

            <Text
              onPress={() => router.push('/(auth)/cadastro')}
              className="font-poppins-medium text-caption underline text-secondary-300"
            >
              Cadastrar-se
            </Text>
          </View>
        </View>
      </Container>
    </SafeAreaView>
  );
}