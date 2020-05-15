import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View, Platform, Picker } from "react-native";
import FusionCharts from "react-native-fusioncharts";
import { getUser, getReminder, getCategory, getStatistics, reminderMM} from  '../libs/database';
import { List } from 'react-native-paper';

let dataSource = {
  chart: {
    paletteColors: '',
    caption: "Monthly Summary",
    subcaption: "For all users in 2017",
    showpercentvalues: "1",
    // defaultcenterlabel: "Android Distribution",
    aligncaptionwithcanvas: "0",
    captionpadding: "0",
    decimals: "1",
    plottooltext:
      "<b>$percentValue</b> of our Android users are on <b>$label</b>",
    centerlabel: "# Users: $value",
    theme: "fusion"
  },
  data: [
    {
      label: "Ice Cream Sandwich",
      value: "1000"
    },
    {
      label: "Jelly Bean",
      value: "5300"
    },
    {
      label: "Kitkat",
      value: "10500"
    },
    {
      label: "Lollipop",
      value: "18900"
    },
    {
      label: "Marshmallow",
      value: "17904"
    }
  ]
};

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource,
      statistics:[],
      category:[],
      itemList:[],
      year: 2020,
      month: 4,
    }

    this.libraryPath = Platform.select({
      // Specify fusioncharts.html file location
      android: { uri: "file:///android_asset/fusioncharts.html" }
    });
  }

  componentDidMount = ()=>{
    getUser('yvonne.tansu@gmail.com').then((data) => {
      getReminder(data.id).then((data) => {
      this.setState({itemList:data})
    })
    })
    getCategory().then((data)=>{
      this.setState({category:data})
    })
  }

  updateStatistics = () => {
    let {category,year,month,dataSource} = this.state;
    dataSource.data =[]
    getStatistics(month,year).then((data)=>{
      for (let i=0;i<category.length;i++){
        let obj = data.filter((item) => item.category == category[i].id)
          if (obj.length > 0){
            dataSource.push({
              label: category[i].listCat,
              value: obj[0].duration
            })
            this.setState({dataSource,statistics:data})
          }
      }
    })
    
  }

  render() {
    dataSource.chart.subcaption = 'May 2020'
    let {itemList,category,statistics,dataSource} = this.state
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>
          SUMMARY
        </Text>
        <Picker
              selectedValue={this.state.selectedMonthYear}
              style={{ height: 50, width: 150 }}
              onValueChange = {() => this.updateStatistics()}
            >
              {
                Object.keys(itemList).map((date) =>{
                  return <Picker.Item label={reminderMM(date)}/>
                })
              }
          </Picker>
        <View style={styles.chartContainer}>
          <FusionCharts
            type='doughnut2d'
            width='100%'
            height='80%'
            dataFormat='JSON'
            dataSource={dataSource}
            libraryPath={this.libraryPath} // set the libraryPath property
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  heading: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10
  },
  chartContainer: {
    height: '80%'
  }
});

// skip this line if using Create React Native App
AppRegistry.registerComponent("ReactNativeFusionCharts", () => App);
