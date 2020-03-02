import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      data:''
    }
  }
  render() {
    return (
      <div className="App">
        lol
      </div>
    );
  }

  async componentDidMount(){
    const virusDataURL = 'https://raw.cgithubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv'
    try
    {
      const response = await axios.get(virusDataURL)
      // console.log(response.data)
      const rows = response.data.split('\n') //.slice(1)
     
      var data = []
      rows.forEach(element => {
        const row = element.split(',')
        const state = row[0]
        const country = row[1]
        var sum = 0
        var i = 0
        for(i = 5; i < row.length; i++){
          sum += Number(row[i])
        }
        const today = row[row.length - 1]
        data.push({
          state, country, sum, today
        })
      });
      this.setState({data})
      console.log(this.state.data)
      
    } catch(e){
      console.log(e)
    }
  }
}


export default App;
