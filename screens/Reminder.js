import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text, Button, Icon, Left, Body, Right, Switch, CheckBox,
   Textarea, View,Fab  } from 'native-base';
import DialogManager,{ DialogComponent } from 'react-native-dialog-component'
import RNPickerSelect from 'react-native-picker-select';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DialogButton from 'react-native-dialog-component/dist/components/DialogButton';

class ReminderList extends Component {
    state={
        itemList:[
            {name : 'homework', checked: false},
            {name : 'lecture', checked: false}],
        open: false,
        category: [
            {name : 'School'},
            {name : 'Housecores'},
            {name : 'Leisure'},
            {name : 'Project'},
            {name : 'Uncategorised'}],
        selectedCat: '',
        reminder: '',
        selected: false
    }

checkboxPress = (index) => {
    let {itemList} =this.state;
    itemList[index].checked = !itemList[index].checked;
    this.setState({itemList})
}

selectedPress = (index) => {
  let {selected} =this.state;
  selected = !selected;
  this.setState({selected})
}

// handleSave = () => {
//   this.setState({open:false})
//   insertReminder({
//     reminder: this.state.reminder,
//     category: this.state.category
//   }).then(() => {
//     if(this.props.updateReminder) //kl updateCategory di TransactionList deleted, gbs jln
//       this.props.updateReminder()
//   })
// }

handleClose = () => {
  this.setState({open:false})
}

onChangeReminder =(event) => {
  this.setState({reminder: event.target.value});
}

onChangeCategory = (event) => {
  this.setState({selectedCat: event.target.value});
}

  render() {
      let {itemList, category} = this.state;
    return (
        <Container style = {{backgroundColor :'#1B2732'}}>
          <Content>
            <List>
              <ListItem itemDivider >
                <Text>{new Date().toDateString()}</Text>
              </ListItem>

              {
                  itemList.map((item,index)=>{
                      return (
                      <ListItem key = {index}>
                          <Left>
                          <Text style={item.checked ? {textDecorationLine: 'line-through'} : null} style={{ color: '#bcc6cf', fontSize : 18}}>{item.name}</Text>
                          </Left>
                          <Right>
                          <CheckBox checked={item.checked} onPress={()=>this.checkboxPress(index)}/>
                          </Right>
                      </ListItem>
                  )})
              }
            </List>
          </Content>
              {/* <Button onClick = {()=>this.setState({open:true})}>
                <Icon name='add-circle-outline'></Icon>
              </Button> */}
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
            <Textarea rowSpan={5} bordered placeholder="Textarea" onChange = {(event) => this.onChangeReminder(event)}/>
          </View>
          <DialogButton text = 'Cancel' onPress={()=>this.dialogComponent.dismiss()} color="primary" />
          <DialogButton text = 'Save' onPress={()=>this.dialogComponent.dismiss()} color="primary" />
        </DialogComponent>
              
              
              {/* <Textarea
                autoFocus
                margin="dense"
                id="name"
                label="Reminder"
                onChange = {(event) => this.onChangeReminder(event)}
                type="text"
                fullWidth
              /> */}
              
              
              {/* <RNPickerSelect
                  onValueChange={(event) => this.onChangeCategory(event)}
                  required
                  id="category"
                  placeholder = 'Category'
                  
                  // {
                  //   category.map((item,index)=>{
                  //       return (
                  //         <ListItem onPress={()=>this.selectedPress(index)} selected={this.state.selected} key={index}>
                  //           <Text>{item.name}</Text>
                  //         </ListItem>
                  //   )})
                  // }
                  
                  items={[
                      { label: 'Football', value: 'football' },
                      { label: 'Baseball', value: 'baseball' },
                      { label: 'Hockey', value: 'hockey' },
                  ]} */}
              {/* /> */}
        </Container>

        
    );
  }
}

const config = {
  width: "350px",
  height: "400px",
  floating: true
};

export default ReminderList;