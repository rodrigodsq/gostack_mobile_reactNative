import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 100,
  },
});

const Calendar: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  function onDateChange(date: any) {
    console.log(date);
  }

  return (
    <View style={styles.container}>
      <CalendarPicker
        weekdays={['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom']}
        months={[
          'Janeiro',
          'Fevereiro',
          'Março',
          'Abril',
          'Maio',
          'Junho',
          'Julho',
          'Agosto',
          'Setembro',
          'Outubro',
          'Novembro',
          'Dezembro',
        ]}
        previousTitle="<"
        nextTitle=">"
        onDateChange={(e) => onDateChange(e)}
      />

      <View>
        <Text>texto</Text>
      </View>
    </View>
  );
};

export default Calendar;
