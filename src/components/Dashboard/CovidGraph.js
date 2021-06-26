import React from "react";
import '../../App.css';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import axios from "axios";
export default class CovidGraph extends React.Component {
  constructor(props) {
    super(props);
    //set the value of location, gender, age, status, fromDate, toDate received from parent component of Dashbaord 
    this.state = { 
        location: props.location, 
        gender:props.gender, 
        age: props.age, 
        status:props.status,
        fromDate: props.fromDate,
        toDate: props.toDate,
        options:this.getDefaultGraphOptions()
    };
  }
  

  /**
   * This method will be called when ever location, gender, age, status, fromDate, toDate 
   * parameter changes from parent dashboard component 
   */
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.newPropsReceived(prevProps)) {
      this.setState({
        location: this.props.location, 
        gender: this.props.gender, 
        age: this.props.age, 
        status: this.props.status,
        fromDate: this.props.fromDate,
        toDate: this.props.toDate
      });
      axios
      .get("https://60d79f5a307c300017a5f928.mockapi.io/graph")
      .then((response) => {
        // console.log(response.data);
        const graphData = response.data.data;
        var defaultOptions = this.getDefaultGraphOptions();
        defaultOptions.xAxis.categories = graphData.xAxisData;
        defaultOptions.series = graphData.seriesData;
        console.log(defaultOptions);
        this.setState({
            options: defaultOptions
        });
      });
    }
  }

  getDefaultGraphOptions() {
    return {
            chart: {
                type: "column"
            },
            title: {
                text: "Toll Summary"
            },
            xAxis: {
                categories: []
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Case Count'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: ( // theme
                            Highcharts.defaultOptions.title.style &&
                            Highcharts.defaultOptions.title.style.color
                        ) || 'gray'
                    }
                }
            },
            legend: {
                align: 'right',
                x: -30,
                verticalAlign: 'top',
                y: 15,
                floating: true,
                backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || 'white',
                borderColor: '#CCC',
                borderWidth: 1,
                shadow: false
            },
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            series: [{
                name: 'Active',
                data: []
            }, {
                name: 'Recovered',
                data: []
            }, {
                name: 'Deceased',
                data: []
            }]
        };
    }

    fetchGraphData() {

    }

    newPropsReceived(prevProps) {
        return this.props.location !== prevProps.location
            ||
            this.props.gender !== prevProps.gender
            ||
            this.props.age !== prevProps.age
            ||
            this.props.status !== prevProps.status
            ||
            this.props.fromDate !== prevProps.fromDate
            ||
            this.props.toDate !== prevProps.toDate;
    }

  render() {
    return (
        <HighchartsReact highcharts={Highcharts} options={this.state.options} />
    );
  }
}