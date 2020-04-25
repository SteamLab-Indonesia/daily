import React, {Component} from 'react';
import {Doughnut} from 'react-chartjs-2';

export default function DoughnutSummary(props){
    const { classes } = this.props;
    return (
      <div>
        <h2>{props.title}</h2>
        <Doughnut 
        data={props.data}
        height={200} />
      </div>
    );

}