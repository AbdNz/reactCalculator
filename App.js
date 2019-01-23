/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default class App extends Component {

  constructor() {
    super()
    this.state = {
      resultText: "",
      calculationText: ""
    }
    this.operations = ['DEL', '÷', 'x', '-', '+']
  }

  calculateResult() {
    let text = this.state.resultText
    text = text.replace("x","*")
    text = text.replace("÷","/")
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

  render() {
    let rows = []
    let nums = [[7,8,9], [4,5,6], [1,2,3], ['.',0,'=']]
    for(let i=0; i<4; i++) {
      row = []
      for(let j=0; j<3; j++) {
        row.push(
          <TouchableOpacity style={styles.btn} key={nums[i][j]} onPress={() => this.buttonPressed(nums[i][j])}>
            <Text style={styles.btnText}>{nums[i][j]}</Text>
          </TouchableOpacity>
        )
      }
      rows.push(<View key={i} style={styles.row}>{row}</View>)
    }

    let ops = []
    for(let i=0; i<5; i++) {
      ops.push(
        <TouchableOpacity style={styles.btn} key={this.operations[i]} onPress={()=>this.operate(this.operations[i])} >
          <Text style={styles.btnText}>{this.operations[i]}</Text>
        </TouchableOpacity>
      )
    }

    return (
      <View style={styles.container}>
        <View style={styles.result}>
          <Text style={styles.resultText}>{this.state.resultText}</Text>
        </View>
        <View style={styles.calculation}>
          <Text style={styles.calculationText}>{this.state.calculateResult}</Text>
        </View>
        <View style={styles.buttons}>
          <View style={styles.numbers}>{rows}</View>
          <View style={styles.operations}>{ops}</View>
          <View style={styles.extraSpace}></View>
        </View>
      </View>
    );
  }
}

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
    backgroundColor: '#636363'
  },
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  btn: {
    flex:1,
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 36,
    textAlign: 'center',
    color: 'white'
  },
  extraSpace: {
    flex: 0.5,
    backgroundColor: 'green'
  }
});
