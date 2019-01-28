import React, {Component} from 'react';
import {View, Text, Button, StyleSheet, Dimensions} from 'react-native';
import SidePanel from './SidePanel';
import SlidingPanel from './SlidingPanel';

const { width, height } = Dimensions.get('window');

export default class History extends Component {
    render() {
      return(
        <View style={styles.container}>                      
          <View style={styles.bodyViewStyle}>
            <Text>Hello My World</Text>
          </View>
          
          <SidePanel
              headerLayoutWidth = {25}
              panelPosition = {'left'}
              headerLayout = { () =>
                  <View style={styles.headerLayoutStyle} />
                //     <Text style={styles.commonTextStyle}>My Awesome sliding panel</Text>
                //   </View>
              }
              slidingPanelLayout = { () =>
                  <View style={styles.slidingPanelLayoutStyle}>
                    <Text style={styles.commonTextStyle}>The best thing about me is you</Text>
                  </View>
              }
          />
        </View>
      )
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    bodyViewStyle: {
      flex: 1,
      justifyContent: 'center', 
      alignItems: 'center',
    },
    headerLayoutStyle: {
      width : 25, 
      height, 
      backgroundColor: 'orange', 
      justifyContent: 'center', 
      alignItems: 'center',
    },
    slidingPanelLayoutStyle: {
      width, 
      height, 
      backgroundColor: '#7E52A0', 
      justifyContent: 'center', 
      alignItems: 'center',
    },
    commonTextStyle: {
      color: 'white', 
      fontSize: 18,
    },
  });