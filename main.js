//var React = require('react');
//var ReactDOM = require('react-dom');

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
  

class Clock extends React.Component {
  constructor(props) {
    super(props);
	this.secondStep = 1;
	this.secondInit = 0;
	if (this.props.direct == 0) {//anti-clockwise
		this.secondStep = -1;
		this.secondInit = 300;
	}
	
    this.state = { 
      secondsElapsed: this.secondInit, 
      lastClearedIncrementer: null
    };
    this.incrementer = null;
  }  
    
  handleStartClick() {
    this.incrementer = setInterval( () => {
	  if (this.secondStep < 0 && this.state.secondsElapsed == 0) {
		clearInterval(this.incrementer);
		this.setState({
			secondsElapsed: this.secondInit
		});
		return;
	  }
      this.setState({
        secondsElapsed: this.state.secondsElapsed + this.secondStep
	})}
    , 1000);
  }
  
  handleStopClick() {
    clearInterval(this.incrementer);
    this.setState({
      lastClearedIncrementer: this.incrementer
    });
  }
  
  handleResetClick() {
    clearInterval(this.incrementer);
    this.setState({
      secondsElapsed: this.secondInit
    });
  }
  
  render() {
    return (
      <div className="stopwatch">
        <h1>{this.state.secondsElapsed}</h1>
   
        {(this.state.secondsElapsed === 0 ||
          this.incrementer === this.state.lastClearedIncrementer
          ? <Button className="start-btn" onClick={this.handleStartClick.bind(this)}>start</Button>
          : <Button className="stop-btn" onClick={this.handleStopClick.bind(this)}>stop</Button>
        )}

        {
          <Button onClick={this.handleResetClick.bind(this)}>reset</Button>
        }
      </div>
    );
  }
}

const Button = (props) =>
  <button type="button" {...props} className={"btn " + props.className } />;

class App extends Component {
  handleSelect(index, last) {
    console.log('Selected tab: ' + index + ', Last tab: ' + last);
  }
	render() {
    return (
      <Tabs
        onSelect={this.handleSelect}
        selectedIndex={2}
      >
 
        <TabList>
          <Tab>计时</Tab>
          <Tab>倒计时</Tab>
        </TabList>
 
        <TabPanel>
          <Clock direct={1}/>
        </TabPanel>
        <TabPanel>
          <Clock direct={0}/>
        </TabPanel>
      </Tabs>
    );
  }
}

ReactDOM.render(
	<div>
		<App></App>
	</div>,
  document.getElementById('react')
);