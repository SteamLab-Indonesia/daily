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
    render(){
        return(
            <div className = {classes.container}>
                <DoughnutSummary
                    title='Weekly Summary'
                    data={{
                    labels:incomeSection.map((item)=>item.name),
                    datasets:[{
                        data: incomeSection.map((item)=>item.amount),
                        backgroundColor: incomeSection.map((item)=>item.color)}]
                    }}
                />
                <DoughnutSummary
                    title='Monthly Summary'
                    data={{
                    labels:expenseSection.map((item)=>item.name),
                    datasets:[{
                        data: expenseSection.map((item)=>item.amount),
                        backgroundColor: expenseSection.map((item)=>item.color)}]
                    }}
                />
            </div>
        )
    }
}

export default Report
