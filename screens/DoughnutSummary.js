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
    
  ]
};

let month = [
  'January', 'February', 'March', 'April', 
  'May', 'June', 'July', 'August', 
  'September','October', 'November', 'December'
];

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
      selectedMonth: 1
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

	updateStatistics = (value, index) => {
		console.log('===> UPDATE STATS value: ', value, 'index:', index)
		let {category,year,dataSource} = this.state;
		dataSource.data =[]
		dataSource.chart.subcaption = month[index] + ' ' + this.state.year;
		getStatistics(value, year).then((data)=>{
			// Make sure has data statistic
			if (data)
			{
				for (let i=0;i<category.length;i++){
				let obj = data.filter((item) => item.category.id == category[i].id)
					if (obj.length > 0){
						dataSource.data.push({
							label: category[i].listCat,
							value: obj[0].duration
						})
					}
				}
			}
			this.setState({dataSource, selectedMonth: value })
		})
	}

  render() {
    let {dataSource} = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>
          SUMMARY
        </Text>
        <Picker
              selectedValue={this.state.selectedMonth}
              style={{ height: 50, width: 150 }}
              onValueChange = {(value, index) => this.updateStatistics(value, index)}
            >
              {
                month.map((item, index) =>{
                  return <Picker.Item label={item} value={index+1}/>
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
