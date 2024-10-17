import { useEffect, useMemo, useState, useReducer } from "react";
import React from "react";

class TimerComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        counter: props.startTime
      }
      this.tick = this.tick.bind(this);
    } // Constructor setting the initial state of the clock, and binding 
  
  
    tick() {
        this.setState({counter: this.state.counter + 1});
    } // This just rerenders the state to Date() again
  
    componentDidMount() {
      this.ticker = setInterval(this.tick, 1000);
    } // This just runs the tick() function every 1 second
  
    componentWillUnmount() {
      clearInterval(this.ticker);
    } // This clears the 'this.ticker' interval made above... Still need to ask why this is necessary or helpful???
  
    render() {
        let secondes = this.state.counter%60;
        let minutes = Math.floor(this.state.counter/60)%60;
        let heures = Math.floor(this.state.counter/3600);

        if (secondes < 10) {secondes = "0" + secondes};  // add zero in front of numbers < 10
        if (minutes < 10) {minutes = "0" + minutes};  // add zero in front of numbers < 10
        if (heures < 10) {heures = "0" + heures};  // add zero in front of numbers < 10
    
        return (
                <p> {heures} : {minutes} : {secondes}</p>
        );
    }
  
  
  }
  
  export default TimerComponent;