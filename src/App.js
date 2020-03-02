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
      sumOfAllCountries: ''
    }
  }
  render() {
    return (
      <div className="App">
        <h1>
          {this.state.sumOfAllCountries}
        </h1>
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
      var sumOfAllCountries = 0;
      rows.forEach(element => {
        const row = element.split(',')

        const state = row[0]
        const country = row[1]
        
        var sum = 0 
        for(var i = 5; i < row.length; i++){
          sum += Number(row[i])
        }
        
        const changesSinceLastDay = row[row.length - 1]
        console.log(typeof(sum), typeof(sumOfAllCountries))
        data.push([
          state, country, sum, changesSinceLastDay
        ])

      });
      console.log(sumOfAllCountries)
      this.setState({data, sumOfAllCountries})
    } catch(e){
      console.log(e)
    }
  }
}


export default App;
