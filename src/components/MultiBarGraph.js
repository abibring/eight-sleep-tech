import React from 'react';
import { Bar } from 'react-chartjs-2';
import '../styles/bargraph.scss';




const MultiBarGraph = ({ data, options, classStyle, date }) => (
  <div className={classStyle}>
    <div className="header">
      <p className="date">{date}</p>
    </div>
    <Bar data={data} options={options} />
  </div>
);

export default MultiBarGraph;