import React, { Component } from 'react';
import {Picker, Dimensions} from 'react-native'
import { Container, Header, Content, List, ListItem, Text, Button, Icon, Left, Body, Right, Switch, CheckBox,
   Textarea, View,Fab  } from 'native-base';
import DialogManager,{ DialogComponent } from 'react-native-dialog-component'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import DialogButton from 'react-native-dialog-component/dist/components/DialogButton';
import {deleteReminder, getReminder, getCategory, updateReminder, insertReminder, reminderDate, timeToString, insertCategory} from  '../libs/database';
import { format } from "date-fns";
import { getLatestEmail, getLatestUserID } from '../libs/cache';
import GmailSwipe from '../components/GmailSwipe';

const styles = {
  floatingFab: {
    position: 'absolute', 
    width: 50, 
    height: 50, 
    alignItems: 'center', 
    justifyContent: 'center', 
    right: 5, 
    bottom: 5,
    zIndex: 9
  }
};

class ReminderList extends Component {
    state={
        itemList:{}, // id,date,task,complete
        open: false,
        category: [],
        selectedCat: '',
        reminder: '',
        selected: false,
        newCategory: '',
        usernameID: '',
        active: false
    }

componentDidMount = () =>{
  let userId = getLatestUserID()
  this.setState({usernameID:userId})
  getReminder(userId).then((data) => {
    if (data)
    {
      this.setState({itemList:data})
      console.log(data)
    }
  })
	getCategory(userId).then((data)=>{
		this.setState({category:data})
	})
}

checkboxPress = (key,index) => {
    let {itemList} =this.state;
    itemList[key][index].complete = !itemList[key][index].complete;
    // Only update complete field
    updateReminder(itemList[key][index].id, {complete: itemList[key][index].complete });
    this.setState({itemList});
}

onNewCategory = (value) => {
  this.setState({newCategory:value})
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
  let {itemList, reminder, category, selectedCat, usernameID} = this.state;
  this.dialogComponent.dismiss();
  let newReminder = { //save di database
    date: new Date(),
    task: reminder,
    complete: false,
    category: selectedCat,
    user: usernameID
  };
  insertReminder(newReminder).then((id)=>{
    newReminder.id = id;
    itemList[timeToString(newReminder.date)].push({name: reminder, complete: false, date: new Date(), id:id, category: selectedCat, user: usernameID})
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

handleSaveCategory = () => {
  let {newCategory, category} = this.state;
  this.dialogComponent2.dismiss();
  insertCategory({listCat: newCategory, color: 'black'}).then((id)=>{
    category.push({id:id, listCat: newCategory, color: 'black'})
    this.setState({category}) //tampilan di hp
  })
}

onDeleteReminder = (id,index,date) => {
  deleteReminder(id)
  let {itemList} = this.state
  itemList[date].splice(index,1)
  this.setState({itemList})
}

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
      return foundCategory[0].listCat;
    else
      return '';
  }

  render() {
      let {itemList, category} = this.state;
      const windowWidth = Dimensions.get('screen').width;
      const windowHeight = Dimensions.get('screen').height;
    return (
        <Container>        
          <Content>            
              {
                itemList && Object.keys(itemList).map((date) =>{
                  return(
                  <List>
                    <ListItem itemDivider style={{height:40, borderRadius:10, borderColor:'gray', borderWidth:0.5}}>
                      <Text style={{fontFamily: 'Roboto'}}>{reminderDate(date)}</Text>
                    </ListItem>
                      {
                      itemList[date].map((item,index)=>{
                          return (
                            <GmailSwipe>
                            {/* //this is class not function unlike Login, makanya perlu this.props, dapat dari navigation container dari App.js */}
                              <ListItem key = {index} style={{height:70}}>
                                  <Left>
                                    <View style={{flex:1, flexDirection:'column'}}>
                                      <Text style={item.complete ? {textDecorationLine: 'line-through'} : null} style={{ color: '#45535e', fontSize : 18, fontFamily: 'Roboto'}}
                                      onPress={()=>this.props.navigation.navigate('Timer', {itemDate: item.date, itemName:item.name, itemCategory:item.category})}>{item.name}</Text> 
                                      <Text style={{ color: 'grey', fontSize:14, fontFamily: 'Roboto'}}>{this.getCategoryName(item.category.id)}</Text>
                                    </View>
                                  </Left>
                                  <Right>
                                  <CheckBox checked={item.complete} onPress={()=>this.checkboxPress(date,index)}/>
                                  </Right>
                              </ListItem>
                            </GmailSwipe>
                          )}
                      )}
                    </List>)
                })
              }

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
                return <Picker.Item label={item.listCat} value={item.id} />
              })}
            </Picker>
            
          </View>
          <DialogButton text = 'Cancel' onPress={()=>this.dialogComponent.dismiss()} color="primary" />
          <DialogButton text = 'Save' onPress={this.handleSave} color="primary" />
        </DialogComponent>
          <DialogComponent
              ref={(dialogComponent2) => { this.dialogComponent2 = dialogComponent2; }}
            >
              <View>
                <Text>
                  Add New Category
                </Text>
                <Textarea rowSpan={3} bordered placeholder="Input New Category" onChangeText = {(text) => this.onNewCategory(text)}/>
              </View>
              <DialogButton text = 'Cancel' onPress={()=>this.dialogComponent2.dismiss()} color="primary" />
              <DialogButton text = 'Save' onPress={this.handleSaveCategory} color="primary" />
            </DialogComponent>
          </Content>
            <Fab
              active={this.state.active}
              direction="up"
              style={[{backgroundColor: '#579e81'}, styles.floatingFab]}
              position="bottomRight"
              onPress={() => this.setState({ active: !this.state.active })}
              >
              <MaterialIcons name='add' />
            <Button onPress={()=>this.dialogComponent2.show()} style={{ backgroundColor: '#8dc7d9' }} >
              <SimpleLineIcons name="grid" size={20}/>
            </Button>
            <Button onPress={()=>this.dialogComponent.show()} style={{ backgroundColor: '#d9a18d' }} >
              <MaterialCommunityIcons name="playlist-edit" size={25} />
            </Button>              
            </Fab>
        </Container>

        
    );
  }
}

export default ReminderList;