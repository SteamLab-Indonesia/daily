import React, { Component } from 'react';
import {Picker, Dimensions} from 'react-native'
import { Container, Header, Content, List, ListItem, Text, Button, Icon, Left, Body, Right, Switch, CheckBox,
   Textarea, View,Fab  } from 'native-base';
import DialogManager,{ DialogComponent } from 'react-native-dialog-component'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DialogButton from 'react-native-dialog-component/dist/components/DialogButton';
import {getReminder, getCategory, updateReminder, insertReminder, reminderDate, timeToString} from  '../libs/database';
import { format } from "date-fns";


class ReminderList extends Component {
    state={
        itemList:{}, // id,date,task,complete
        open: false,
        category: [],
        selectedCat: '',
        reminder: '',
        selected: false
    }

componentDidMount = () =>{
  getReminder().then((data) => {
    this.setState({itemList:data})
  })
  getCategory().then((data)=>{
    this.setState({category:data})
  })
}

checkboxPress = (key,index) => {
    let {itemList} =this.state;
    itemList[key][index].complete = !itemList[key][index].complete;
    this.setState({itemList})
    console.log(itemList)
}

onChangeCategoryPress = ((value) =>{ //simpan di state
  let selectedCat = this.state.selectedCat;
  selectedCat=value;
  this.setState({selectedCat});
  console.log(this.state.selectedCat)
})

// selectedPress = (index) => {
//   let {selected} =this.state;
//   selected = !selected;
//   this.setState({selected})
// }

handleSave = () => {
  let {itemList, reminder, category, selectedCat} = this.state;
  this.dialogComponent.dismiss();
  let newReminder = { //save di database
    date: new Date(),
    task: reminder,
    complete: false,
    category: selectedCat
  };
  insertReminder(newReminder).then((id)=>{
    newReminder.id = id;
    itemList[timeToString(newReminder.date)].push({name: reminder, complete: false, date: new Date(), id:id, category: selectedCat})
    this.setState({itemList}) //tampilan di hp
  })
}
//   if (itemList['date'][index] != '')
//     {
//       updateReminder(itemList['date'][index].id, itemList['date'][index])
//     }
//     // else
//     // {
//     //   insertReminder(itemList['date'][index]).then((id) => {
//     //     collate[index].id = id;
//     //     this.setState({collate});
//     //   })
//     // }    
// }

// handleSaveCategory = () => {
//   this.dialogComponent.dismiss()
//   insertCategory({
//     date: new Date(),
//     task: this.state.reminder,
//     complete: false
//   }).then((id)=>{
//     itemList['date'].push({name: this.state.reminder, complete: false, date: new Date(), id:id})
//     this.setState({itemList})
//   })
// }

handleClose = () => {
  this.setState({open:false})
}

onChangeReminder =(value) => {
  this.setState({reminder: value});
}

  getCategoryName = (categoryId) => {
    let {category} = this.state;
    let foundCategory = category.filter((item) => item.id == categoryId);
    console.log(foundCategory);
    if (foundCategory.length > 0)
      return foundCategory[0].category;
    else
      return '';
  }

  render() {
      let {itemList, category} = this.state;
    return (
        <Container style = {{backgroundColor :'#1B2732'}}>
          <Content>
            
              {
                Object.keys(itemList).map((date) =>{
                  return(
                  <List>
                    <ListItem itemDivider >
                      <Text>{reminderDate(date)}</Text>
                    </ListItem>
                      {
                      itemList[date].map((item,index)=>{
                          return (
                          <ListItem key = {index}>
                              <Left>
                                <Text style={item.complete ? {textDecorationLine: 'line-through'} : null} style={{ color: '#bcc6cf', fontSize : 18}}>{item.name}</Text>
                                <Text>{this.getCategoryName(item.category.id)}</Text>
                              </Left>
                              <Right>
                              <CheckBox checked={item.complete} onPress={()=>this.checkboxPress(date,index)}/>
                              </Right>
                          </ListItem>
                          )}
                      )}
                    </List>)
                })
              }
        <View style={{ flex: 1 }}>
          <Fab
            containerStyle={{ }}
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={() => this.dialogComponent.show()}>
            <MaterialIcons name='add' />
          </Fab>
        </View>
        <DialogComponent
          ref={(dialogComponent) => { this.dialogComponent = dialogComponent; }}
        >
          <View>
            <Text>
              Add New Reminder
            </Text>
            <Textarea rowSpan={5} bordered placeholder="Textarea" onChangeText = {(text) => this.onChangeReminder(text)}/>
          </View>
          <View>
            <Picker
              selectedValue={this.state.selectedCat}
              style={{ height: 50, width: 150 }}
              onValueChange = {(event) => this.onChangeCategoryPress(event)}
            >
              {category.map((item)=>{
                return <Picker.Item label={item.category} value={item.id} />
              })}
            </Picker>
            <Button onPress={()=>this.dialogComponent2.show()} style={{width:60, backgroundColor:'gray'}}>
              <Icon name='add-circle' />
            </Button>
            <DialogComponent
              ref={(dialogComponent2) => { this.dialogComponent = dialogComponent2; }}
            >
              <View>
                <Text>
                  Add New Category
                </Text>
                <Textarea rowSpan={3} bordered placeholder="Input New Category"/>
              </View>
              <DialogButton text = 'Cancel' onPress={()=>this.dialogComponent.dismiss()} color="primary" />
              <DialogButton text = 'Save' onPress={this.handleSaveCategory} color="primary" />
            </DialogComponent>
          </View>
          <DialogButton text = 'Cancel' onPress={()=>this.dialogComponent.dismiss()} color="primary" />
          <DialogButton text = 'Save' onPress={this.handleSave} color="primary" />
        </DialogComponent>
          </Content>
              {/* <Button onClick = {()=>this.setState({open:true})}>
                <Icon name='add-circle-outline'></Icon>
              </Button> */}

        </Container>

        
    );
  }
}

export default ReminderList;