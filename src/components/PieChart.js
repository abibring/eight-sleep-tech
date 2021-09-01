import React, { useEffect, useState } from 'react';
import '../styles/piechart.scss';
import { Pie } from 'react-chartjs-2';
import { formatPieChartData } from '../utils/formatChartData';


const PieChart = ({ pieData, date, score }) => (
  <>
    <div className="piechart-cell">
      <p>Your Sleep Score on {date} is: <span className="sleep-score">{score}</span></p>
      <p className="hours">Total: {Math.floor(pieData.datasets[0].data.reduce((a,b) => a + b)/60)} hours</p>
      {/* <p className="date">{date}</p> */}
      <span className="pie">
        <Pie  data={pieData}  />
      </span>
    </div>
  </>
);


export default PieChart;