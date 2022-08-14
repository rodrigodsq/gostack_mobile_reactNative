import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import React, { useCallback, useMemo } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {
  Container,
  Title,
  Description,
  OkButton,
  OkButtonText,
} from './styles';

interface RouteParams {
  date: number;
}

const AppointmentCreated: React.FC = () => {
  const { reset } = useNavigation();
  const { params } = useRoute();

  const routeParams = params as RouteParams;

  // reset: esta informando para qual rota iremos;
  const handleOkPressed = useCallback(() => {
    reset({
      routes: [{ name: 'Dashboard' }], // rota que o usuario ira;
      index: 0, // indica qual a posição da rota no array de routes;
    });
  }, [reset]);

  // formtando a data recebida por parametro de rota, para um formato legivel com a lib date-fns
  const formattedDate = useMemo(() => {
    return format(
      routeParams.date,
      "EEEE', dia' dd 'de' MMMM 'de' yyyy 'ás' HH:mm'h'",
      { locale: ptBR },
    );
  }, [routeParams.date]);

  return (
    <Container>
      <Icon name="check" size={80} color="#04d361" />

      <Title>Agendamento concluido</Title>
      <Description>{formattedDate}</Description>

      <OkButton {...null} onPress={handleOkPressed}>
        <OkButtonText>Ok</OkButtonText>
      </OkButton>
    </Container>
  );
};

export default AppointmentCreated;

// const { reset } = useNavigation();  utilizado para resetar o historico de rotas, para o usuario não conseguir voltar para a tela anterior, serve para direcionar para uma nova rota e apagar o historico de rotas, para que ele não consiga voltar na tela que estava;
