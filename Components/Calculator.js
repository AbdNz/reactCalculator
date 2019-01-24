import React, {Component} from 'react';
import {Text, View, Alert, SafeAreaView} from 'react-native';
import {FlingGestureHandler, Directions, State, RectButton} from 'react-native-gesture-handler';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import styles from '../styles';

export default class Calculator extends Component {

    constructor() {
      super()
      this.state = {
        resultText: "",
        calculationText: "",
        modalVisible: false
      }
      this.operations = ['DEL', '÷', 'x', '-', '+']
    }
  
    calculateResult() {
      let text = this.state.resultText
      text = text.split("x").join("*")
      text = text.split("÷").join("/")
      console.log(text)
      this.setState({
        calculateResult: eval(text),
        // resultText: 
      })
    }
  
    validate() {
      let text = this.state.resultText
      this.state.resultText = text
  
      switch(text.slice(-1)) {
        case '÷':
        case 'x':
        case '-':
        case '+':
          return false;
      }
      return true;
    }
  
    buttonPressed = (text) => {
      if(text == '.' && this.state.resultText.indexOf('.') != -1) {
        return
      } 
      
      if(text == '=') {
        return this.validate() && this.calculateResult()
      }
      this.setState({
        resultText: this.state.resultText+text
      })
    }
  
    operate(operation) {
      switch(operation) {
        case 'DEL':
          let text = this.state.resultText.split('')
          text.pop()
          this.setState({
            resultText: text.join(''),
            calculateResult: ''
          })
          break
        case '÷':
        case 'x':
        case '-':
        case '+': 
          let text2 = this.state.resultText.split('')
          let lastChar = text2.pop()
          if(this.operations.indexOf(lastChar) > 0 ) {
            this.setState({
              resultText: text2.join('')+operation
            })
            return
          }
          if(this.state.resultText == "") return
          this.setState({
            resultText: this.state.resultText + operation
          })
      }
    }
  
    renderDrawer = () => {
      return (
        <View>
          <Text>I am in the drawer!</Text>
        </View>
      );
    };
  
    render() {
      let rows = []
      let nums = [[7,8,9], [4,5,6], [1,2,3], ['.',0,'=']]
      for(let i=0; i<4; i++) {
        row = []
        for(let j=0; j<3; j++) {
          row.push(
            <RectButton style={styles.btn} key={nums[i][j]} onPress={() => this.buttonPressed(nums[i][j]) }>
              <Text style={styles.btnText}>{nums[i][j]}</Text>
            </RectButton>
          )
        }
        rows.push(<View key={i} style={styles.row}>{row}</View>)
      }
  
      let ops = []
      for(let i=0; i<5; i++) {
        ops.push(
          <RectButton style={styles.btn} key={this.operations[i]} onPress={()=>this.operate(this.operations[i])} >
            <Text style={styles.btnText}>{this.operations[i]}</Text>
          </RectButton>
        )
      }
  
      return (
        <SafeAreaView style={{flex: 1}}>
          <View style={styles.container}>
          {/* <DraggableBox /> */}
          <DrawerLayout
              drawerWidth={250}
              drawerPosition={DrawerLayout.positions.LEFT}
              drawerType='front'
              drawerBackgroundColor="#ddd"
              renderNavigationView={this.renderDrawer}>
            <View style={styles.result}>
              <Text style={styles.resultText}>{this.state.resultText}</Text>
            </View>
            <View style={styles.calculation}>
              <Text style={styles.calculationText}>{this.state.calculateResult}</Text>
            </View>
            <View style={styles.buttons}>
              <View style={styles.numbers}>{rows}</View>
              <View style={styles.operations}>{ops}</View>
  
              <FlingGestureHandler
                direction={ Directions.RIGHT | Directions.LEFT}
                onHandlerStateChange={({ nativeEvent }) => {
                  if (nativeEvent.state === State.ACTIVE) {
                    Alert.alert("I'm flinged!");
                  }
                }}>
                <View style={styles.extraSpace}></View>
              </FlingGestureHandler>
            </View>
            </DrawerLayout>
          </View>
        </SafeAreaView>
      );
    }
  }