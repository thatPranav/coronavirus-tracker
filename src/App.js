import React, { Component } from "react";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      columns: [
        {
          name: "State",
          label: "State",
          options: {
            filter: true,
            sort: true
          }
        },
        {
          name: "Region",
          label: "Region",
          options: {
            filter: true,
            sort: false
          }
        },
        {
          name: "Total cases reported",
          label: "Total cases reported",
          options: {
            filter: false,
            sort: true
          }
        },
        {
          name: "Changes since last day",
          label: "Changes since last day",
          options: {
            filter: false,
            sort: true
          }
        }
      ],
      options: {
        selectableRows: "none",
        print: false,
        filter: false,
        download: false,
        viewColumns: false
      },
      totalCasesReported: 0,
      newCasesToday: 0
    };
  }
  render() {
    return (
      <div className="App">
        <div className="App-title">
          <h2>Coronavirus Tracker Application!</h2>
          <p>
            This application lists the current number of cases reported across
            the globe
          </p>
        </div>
        <Card className="Card">
          <CardActionArea>
            <CardContent className="Card-action">
              <Typography
                className="Typo"
                gutterBottom
                variant="h3"
                component="h2"
              >
                {this.state.totalCasesReported}
              </Typography>
              <Typography
                className="Typo"
                variant="body2"
                color="textSecondary"
                component="p"
              >
                Total cases reported as of today
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card className="Card">
          <CardActionArea>
            <CardContent className="Card-action">
              <Typography
                className="Typo"
                variant="body2"
                color="textSecondary"
                component="p"
              >
                New cases reported since previous day:{" "}
                {this.state.newCasesToday}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <MUIDataTable
          className="Table"
          columns={this.state.columns}
          data={this.state.data.slice(1)}
          options={this.state.options}
        />
      </div>
    );
  }

  async componentDidMount() {
    const virusDataURL =
      "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv";
    try {
      const response = await axios.get(virusDataURL);
      // console.log(response.data.split("\n"));
      const rows = response.data.split("\n"); //.slice(1)
      var data = [];
      var totalCasesReported = [];
      var newCasesToday = [];

      rows.forEach(element => {
        const row = element.split(",");

        const state = row[0];
        const country = row[1];
        const today = row[row.length - 1];
        const yesterday = row[row.length - 2];

        totalCasesReported.push(Number(today));
        newCasesToday.push(today - yesterday);

        data.push([state, country, today, today - yesterday]);
      });

      this.setState({
        data,
        totalCasesReported: totalCasesReported
          .slice(1)
          .reduce((a, b) => a + b, 0),
        newCasesToday: newCasesToday.slice(1).reduce((a, b) => a + b, 0)
      });
    } catch (e) {
      console.log(e);
    }
  }
}

export default App;
