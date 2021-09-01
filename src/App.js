import React, { useState, useEffect  } from 'react';
import './styles/App.scss';

import axios from 'axios';
import moment from 'moment';

import { formatPieChartData, formatDataForBarGraph, formatTNTForUser } from './utils/formatChartData';

import PieChart from './components/PieChart';
import MultiBarGraph from './components/MultiBarGraph';
import LineChart from './components/LineChart';

export default function App() {
  const url = 'https://s3.amazonaws.com/eight-public/challenge/';
  const fragA = '2228b530e055401f81ba37b51ff6f81d.json';
  const fragB = 'd6c1355e38194139b8d0c870baf86365.json';
  const fragC = 'f9bf229fd19e4c799e8c19a962d73449.json';
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [tntDay, setTntDay] = useState(null);


  const fetchSleepData = async (frag) =>  {
    setLoading(true);
    const { data: { intervals } } = await axios.get(`${url}${frag}`);
    intervals.sort(orderByDate);
    setCurrentUser(intervals);
    setLoading(false); 
  };


    const updateUser = (frag) => {
      fetchSleepData(frag);
    }
    
    const orderByDate = (a, b) => {
      const aDate = moment(a.ts);
      const bDate = moment(b.ts);
      return aDate.unix() - bDate.unix();
    }

    return (
      !loading 
    ?
     (
      <div className="App">
      <p className="main-title">Welcome To Your Sleep Health</p>
      <div className="button-container">
        <button onClick={() => updateUser(fragA)}>View User A</button>
        <button onClick={() => updateUser(fragB)}>View User B</button>
        <button onClick={() => updateUser(fragC)}>View User C</button>
      </div>
      <h3 className="sleep-stage-title">Sleep Stages <span className="subtitle-stages">(This denotes the type of sleep you've gotten)</span></h3>
      <div className="piechart-container">

        {currentUser.map(user => {
          const formattedUserData = formatPieChartData(user.stages);
          return <PieChart
                      key={user.id + `${Math.floor(Math.random() * 10000) + 1}`}
                      pieData={formattedUserData} date={moment(user.ts).format('L')}
                      score={user.score}
                    />;
        })}
        </div>
        <p className="bar-graph-title">Review Key Figures During Sleep</p>
        <div className="bar-graph-container">
          {currentUser.map(user => {
                const rateInfo = formatDataForBarGraph(user);
                return (
                  <>
                    <MultiBarGraph
                      key={user.id + `${Math.floor(Math.random() * 10000) + 1}`}
                      data={rateInfo.data}
                      options={rateInfo.options}
                      title="Heart Rate Info"
                      classStyle="heart-rate"
                      date={moment(user.ts).format('LL')}
                    />
                  </>
                )
          })}
          </div>
          <p className="tnt-title">These are your 'tosses and turns'</p>
          <div className="tnt-container">
            {currentUser.map(user => {
              const { options, data } = formatTNTForUser(user);
              return <LineChart options={options} data={data} date={moment(user.ts).format('LL')} />;
            })}
          </div>
      </div>
      )
      : 
      <div>
        {/* <h4>Welcome To Your Sleep Health</h4> */}
        <p className="welcome">Please select a user to view their sleep results</p>
      <button className="no-data-btn" onClick={() => updateUser(fragA)}>View User A</button>
      <button className="no-data-btn" onClick={() => updateUser(fragB)}>View User B</button>
      <button className="no-data-btn" onClick={() => updateUser(fragC)}>View User C</button>
      </div>
    )
}
