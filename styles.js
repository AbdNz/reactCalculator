import { StyleSheet, Platform} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
    },
    result: {
      flex: 3,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    resultText: {
      fontSize: 40,
      color: 'black',
      padding: 16
    },
    calculation: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    calculationText: {
      fontSize: 36,
      color: 'darkgrey',
      padding: 16
    },
    buttons: {
      flex: 6,
      flexDirection: 'row'
    },
    numbers: {
      flex: 9,
      backgroundColor: '#434343'
    },
    operations: {
      flex: 3,
      backgroundColor: '#636363',
      justifyContent:'space-evenly'
    },
    row: {
      flexDirection: 'row',
      flex: 1,
    },
    btn: {
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    btnText: {
      fontSize: 36,
      textAlign: 'center',
      color: 'white'
    },
    extraSpace: {
      flex: 0.5,
      backgroundColor: 'green'
    },
    box: {
      width: 150,
      height: 150,
      alignSelf: 'flex-end',
      backgroundColor: 'plum',
      zIndex: 200,
    },
  });

  export default styles;