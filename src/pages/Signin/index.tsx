import React, { useCallback, useRef } from 'react';
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import Input from '../../components/input';
import Button from '../../components/button';
import logoImg from '../../assets/logo.png';
import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText,
} from './styles';
import getValidationErrors from '../../utils/getValidationsErrors';
import { useAuth } from '../../hooks/auth';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  // FormHandles  :   é a interface de tipagem do unform;
  // formRef  : utilizado para fazer submit, pois o button ñ pode fazer diretamente, esta referenciando o nosso Form nas tags;
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);

  const { signIn, user } = useAuth();

  console.log(user);

  // para referenciar o proximo campo de input;
  const passwordInputRef = useRef<TextInput>(null);

  // essa função esta sendo emitida por um component unform, consegue pegar os valores por referencia vindo do component Input;
  const handleSignIn = useCallback(async (data: SignInFormData) => {
    try {
      // limpando os erros;
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatorio')
          .email('Digite um e-mail valido'),
        password: Yup.string().required('Senha obrigatoria'),
      });

      // executa as verificações a cima, com as informações do nosso form (data);
      await schema.validate(data, {
        abortEarly: false, // para retorna todos os erros que ocorreu;
      });

      // função vinda do useContext; que esta executando no arquivo context/AuthContext.tsx;
      await signIn({
        email: data.email,
        password: data.password,
      });
    } catch (err) {
      // verificando se o error é uma instancia de Yup. (se o erro veio do yup)
      if (err instanceof Yup.ValidationError) {
        // getValidationErrors: função onde filtra todos os errors;
        const errors = getValidationErrors(err);

        // coloca os errors em tela ???
        formRef.current?.setErrors(errors);
        return;
      }

      Alert.alert(
        'Erro na autenticação',
        'Ocorreu um erro ao fazer login, cheque as credenciais.',
      );
    }
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Image source={logoImg} />
            <View>
              <Title> Faça seu logon </Title>
            </View>

            <Form ref={formRef} onSubmit={handleSignIn}>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />
              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Senha"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />
              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Entrar
              </Button>
            </Form>

            <ForgotPassword
              onPress={() => {
                console.log('esqueci senha!!');
              }}
            >
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
        <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
          <Icon name="log-in" size={20} color="#ff9000" />
          <CreateAccountButtonText> Criar uma conta </CreateAccountButtonText>
        </CreateAccountButton>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignIn;

// autoCorrect={false}  :   p não autocompletar;
// autoCapitalize :   desabilitar começar com letra maiuscula;
// keyboardType   :   tipo de input;
// secureTextEntry  :   define como campo do tipo password;
// returnKeyType  :   define a funcionalidade do botão enviar do teclado, (s vai disparar o submit, se vai passar p campo de baico, e etc...);
// onSubmitEditing  : função para boto~es com returnKeyType="send" pois dispara o submit do form;
