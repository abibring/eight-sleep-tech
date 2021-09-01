import React, { useRef, useEffect } from 'react';
import '../styles/tnt-linechart.scss';
import { Line } from 'react-chartjs-2';


const LineChart = ({ data, options, date }) => {
  const lineRef = useRef(null);
  // console.log(lineRef);
   const legend = {
     display: false
   }
   useEffect(() => {
     console.log(lineRef)
     console.log(options)
   })
 return (
  <div className='linechart-cell'>
      <p className="date">{date}</p>
    <div className="tnt-graph">
      <Line ref={lineRef} data={data} options={options} className="linegraph" />
    </div>
  </div>
);
}

export default LineChart;