import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text, Button, Icon, Left, Body, Right, Switch, CheckBox,
   Textarea, View  } from 'native-base';
import { Dialog, DialogContent, DialogButton, DialogTitle } from 'react-native-dialog-component'
import RNPickerSelect from 'react-native-picker-select';

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
      <View>
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
              <Button onClick = {()=>this.setState({open:true})}>
                <Icon name='add-circle-outline'></Icon>
              </Button>
        </Container>

        <Dialog open={this.state.open} onClose={this.handleClose}  aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Reminder</DialogTitle>
            <DialogContent>
              <Text>
                Add New Reminder
              </Text>
              
              {/* <Textarea
                autoFocus
                margin="dense"
                id="name"
                label="Reminder"
                onChange = {(event) => this.onChangeReminder(event)}
                type="text"
                fullWidth
              /> */}
              <Textarea rowSpan={1} bordered placeholder="Textarea" onChange = {(event) => this.onChangeReminder(event)}/>
              
              <RNPickerSelect
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
                  ]}
              />
              <List
                 >
                
              </List>

            </DialogContent>
          <Button onClick={this.handleClose} color="primary">
            <Text>Cancel</Text>
          </Button>
          <Button color="primary">
            <Text>Save</Text>
          </Button>
        </Dialog>
      </View>
    );
  }
}

const config = {
  width: "350px",
  height: "400px",
  floating: true
};

export default ReminderList;