import React, { Component } from "react";
import DoughnutSummary from '../components/DoughtnutSummary';

const styles = {
    card: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    container:{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'flexstart'
    },
    bigContainer:{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'flexstart'
    }
  };


class Report extends Component{
  state={
    category:[],

  }

  componentDidMount = () =>{
    getCategory().then((data)=>{
      this.setState({category:data})
    })
  }

    render(){
        return(
            <div className = {classes.container}>
                <DoughnutSummary
                    title='Summary'
                    data={{
                    labels:category.map((item)=>item.listCat),
                    datasets:[{
                        data: category.map((item)=>{
                          let number=0;
                          for (i=0; i< item.listCat.length; i++){
                            number+=1
                            return number;
                          }
                        }),
                        backgroundColor: category.map((item)=>item.color)}]
                    }}
                />
                {/* <DoughnutSummary
                    title='Monthly Summary'
                    data={{
                    labels:category.map((item)=>item.name),
                    datasets:[{
                        data: category.map((item)=>item.amount),
                        backgroundColor: category.map((item)=>item.color)}]
                    }}
                /> */}
            </div>
        )
    }
}

export default Report
