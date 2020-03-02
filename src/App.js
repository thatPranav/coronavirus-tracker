import React, { Component } from 'react';
import axios from 'axios';
import MUIDataTable from 'mui-datatables'

import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      data:[],
      columns: ["Province/State", "Country/Region", "Total cases reported", "Changes since last day"],
      totalCasesReported: 0,
      newCasesSinceLastDay: 0
    }
  }
  render() {
    return (
      <div className="App">
        <h1>{this.state.totalCasesReported}</h1>
        <h2>Total cases reported as of today</h2>
        <h5>New cases reported since previous day: {this.state.newCasesSinceLastDay}</h5>
        <MUIDataTable 
        columns = {this.state.columns}
        data = {this.state.data.slice(1)}
        />
      </div>
    );
  }

  async componentDidMount(){
    const virusDataURL = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv'
    try
    {
      const response = await axios.get(virusDataURL)
      const rows = response.data.split('\n') //.slice(1)
      var data = []
      var totalCasesReported = [];
      var newCasesSinceLastDay = [];

      rows.forEach(element => {
        const row = element.split(',')

        const state = row[0]
        const country = row[1]
        
        var sum = 0 
        for(var i = 5; i < row.length; i++){
          sum += Number(row[i])
        }
        
        const changesSinceLastDay = row[row.length - 1]

        totalCasesReported.push(sum)
        newCasesSinceLastDay.push(Number(changesSinceLastDay))

        data.push([
          state, country, sum, changesSinceLastDay
        ])

      });

      this.setState({
        data,
        totalCasesReported: totalCasesReported.slice(1).reduce((a, b) => a + b, 0),
        newCasesSinceLastDay: newCasesSinceLastDay.slice(1).reduce((a, b) => a + b, 0)
      })
      console.log(this.state.newCasesSinceLastDay)
    } catch(e){
      console.log(e)
    }
  }
}


export default App;
