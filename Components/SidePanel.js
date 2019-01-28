import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, Text, View, Animated, TouchableOpacity, Dimensions, PanResponder } from 'react-native';

const {width, height} = Dimensions.get("window");
let sliderPosition = 0;

const styles = StyleSheet.create({
    headerPanelViewStyle: {
        height,
        backgroundColor: '#ff0032',
        position: 'absolute',
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }
})

const HeaderView = (props) => (
    <View style={{backgroundColor: 'green',}}><Text style={{color: 'white'}}>Hello world</Text></View>
)

const SlidingPanelView = (props) => (
    <View style={{height: 200, width, backgroundColor: 'blue'}}><Text style={{color: 'white'}}>Hello world</Text></View>
)

const SlidingPanelIOS = (props) => (
    <Animated.View style={props.panelPosition === 'left' ? {left: props.widthAnim, flex: 1, position: 'absolute',} : {right: props.widthAnim, flex: 1, position: 'absolute',}}>
      <Animated.View {...props.panResponder} style={{width: props.headerPanelWidth,}}>   
        {props.headerView()}
      </Animated.View>
      <View style={props.panelPosition === 'left' ? {right: props.headerPanelWidth, top: 0, position: 'absolute',} : {left: props.headerPanelWidth, top: 0, position: 'absolute',}}>
        {props.slidingPanelView()}
      </View>
    </Animated.View>
  );
  
const SlidingPanelAndroid = (props) => (
    <Animated.View style={props.panelPosition === 'left' ? {left: props.widthAnim, flex: 1, position: 'absolute',} : {right: props.widthAnim, flex: 1, position: 'absolute',}}>
    <Animated.View {...props.panResponder} style={{width: props.headerPanelWidth,}}>   
    {props.headerView()}
    </Animated.View>
    <Animated.View style={props.panelPosition === 'left' ? {right: props.headerPanelWidth, top: 0, position: 'absolute',} : {left: props.headerPanelWidth, top: 0, position: 'absolute',}}>
    {props.slidingPanelView()}
    </Animated.View>
</Animated.View>
);

export default class SidePanel extends Component {

    constructor(props) {
      super(props);
      this.state = {
        widthAnim: new Animated.Value(0),
        panResponder: {},
      };
    }
  
    componentWillMount() {
      var a = 0;
      this.state.panResponder = PanResponder.create({
        onStartShouldSetPanResponder : () => true,
        onPanResponderGrant: (evt, gestureState) => {
          a = 0;
        },
        onPanResponderMove: (event, gestureState) => {
          if(this.props.allowDragging) {
            if(a === 0) {
              this.props.onDragStart(event, gestureState);
            }
            else {
              this.props.onDrag(event, gestureState);
            }
            if(this.props.panelPosition === 'left') {
              a = gestureState.dx * 1;
            }
            else {
              a = gestureState.dx * -1;
            }

            console.log(`Slider Position: ${sliderPosition} a: ${a} width: ${width}`);

            if((sliderPosition + a < width - (this.props.headerLayoutWidth -2)) && sliderPosition + a > -2){
              console.log(`Dragging ${sliderPosition +a} < ${width-23} && ${sliderPosition +a } > -2`);
              if(sliderPosition !== 0) {
                this.state.widthAnim.setValue(sliderPosition + a)
              }
              else {
                this.state.widthAnim.setValue(a)
              }
            }
          }
        },
        onPanResponderRelease: (e, gesture) => {
          sliderPosition = sliderPosition + a
          if(a !== 0) {
            this.props.onDragStop(e, gesture)
          }
          
          if(this.props.allowAnimation) {
            if(a === 0 || (this.props.panelPosition === 'left' ? gesture.vx < -1 : gesture.vx > 1)) {
              if(sliderPosition < width-this.props.headerLayoutWidth) {
                sliderPosition = width-this.props.headerLayoutWidth
                this.props.onAnimationStart();
                Animated.timing(
                  this.state.widthAnim,
                  {
                    toValue: width-this.props.headerLayoutWidth,
                    duration: this.props.AnimationSpeed,
                  }
                ).start(() => this.props.onAnimationStop());
              }
              else {
                sliderPosition = 0
                this.props.onAnimationStart();
                Animated.timing(
                  this.state.widthAnim,
                  {
                    toValue: 0,
                    duration: this.props.AnimationSpeed,
                  }
                ).start(() => this.props.onAnimationStop()); 
              }
            }
            if(this.props.panelPosition === 'left' ? gesture.vx > 1 : gesture.vx < -1) {
              sliderPosition = 0
              this.props.onAnimationStart();
              Animated.timing(
                this.state.widthAnim,
                {
                  toValue: 0,
                  duration: this.props.AnimationSpeed,
                }
              ).start(() => this.props.onAnimationStop());
            }
          }
        },
      });
    }
  
    onRequestClose() {
      sliderPosition = 0
      console.log(`ReqClose SliderPosition ${sliderPosition}`);
      Animated.timing(
        this.state.widthAnim,
        {
          toValue: 0,
          duration: this.props.AnimationSpeed,
        }
      ).start();
    }
  
    onRequestStart() {
      sliderPosition = width-this.props.headerLayoutWidth
      console.log(`ReqStart SliderPosition ${sliderPosition}`);
      
      Animated.timing(
        this.state.widthAnim,
        {
          toValue: width-this.props.headerLayoutWidth,
          duration: this.props.AnimationSpeed,
        }
      ).start();
    }
  
    render() {
      return (
        <View style={this.props.panelPosition === 'left' ? {position: 'absolute', left: 0} : {position: 'absolute', right: 0}}>
          {
            Platform.OS === 'ios' && this.props.visible === true ?
              <SlidingPanelIOS
                  panResponder = {this.state.panResponder.panHandlers}
                  panelPosition={this.props.panelPosition}
                  headerPanelWidth={this.props.headerLayoutWidth}
                  headerView = {() => this.props.headerLayout()}
                  widthAnim={this.state.widthAnim}
                  visible={this.props.visible}
                  slidingPanelView={() => this.props.slidingPanelLayout()}
              /> : this.props.visible === true &&
              <SlidingPanelAndroid
                  panResponder = {this.state.panResponder.panHandlers}
                  panelPosition={this.props.panelPosition}
                  headerPanelWidth={this.props.headerLayoutWidth}
                  headerView = {() => this.props.headerLayout()}
                  widthAnim={this.state.widthAnim}
                  visible={this.props.visible}
                  slidingPanelView={() => this.props.slidingPanelLayout()}
              />
          }
        </View>
      );
    }
  }
  
  SidePanel.propTypes = {
    visible: PropTypes.bool,
    allowDragging: PropTypes.bool,
    allowAnimation: PropTypes.bool,
    AnimationSpeed: PropTypes.number,
    panelPosition: PropTypes.string,
    headerLayoutWidth: PropTypes.number.isRequired,
    slidingPanelLayoutWidth: PropTypes.number,

    headerLayout: PropTypes.func.isRequired,
    slidingPanelLayout: PropTypes.func.isRequired,
    onDragStart: (event, gestureState) => {},
    onDragStop: (event, gestureState) => {},
    onDrag: (event, gestureState) => {},
    onAnimationStart: () => {},
    onAnimationStop: () => {},
  };
  
  SidePanel.defaultProps = {
    visible: true,
    allowDragging: true,
    allowAnimation: true,
    AnimationSpeed: 1000,
    panelPosition: 'left',
    headerLayoutWidth: 25,
    slidingPanelLayoutWidth: 0,
    
    headerLayout: () => {},
    slidingPanelLayout: () => {},
    onDragStart: (event, gestureState) => {},
    onDragStop: (event, gestureState) => {},
    onDrag: (event, gestureState) => {},
    onAnimationStart: () => {},
    onAnimationStop: () => {},
  };