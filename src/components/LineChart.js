import React, { useEffect } from 'react';
import '../styles/tnt-linechart.scss';
import { Line } from 'react-chartjs-2';


const LineChart = ({ data, options, date }) => {


 return (
  <div className='linechart-cell'>
      <p className="date">{date}</p>
    <div className="tnt-graph">
      <Line data={data} options={options} className="linegraph" />
    </div>
  </div>
);
}

export default LineChart;