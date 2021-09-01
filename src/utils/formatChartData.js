import moment from 'moment';


const formatDataForBarGraph = ({ timeseries }) => {
  const heartRate = timeseries.heartRate.map(rate => `${rate[1]}`);
  const respRate = timeseries.respiratoryRate.map(rate => `${rate[1]}`);
  const bedTemp = timeseries.tempBedC.map(temp => temp[1]);
  const roomTemp = timeseries.tempRoomC.map(temp =>temp[1]);
  const labels = timeseries.heartRate.map(rate => moment(rate[0]).format('LT'))

  const data = {
    labels,
    datasets: [
      {
        label: 'Heart Rate',
        data: heartRate,
        backgroundColor: 'rgb(255, 99, 132)',
      },
      {
        label: 'Respiratory Rate (breathes per minutes)',
        data: respRate,
        backgroundColor: 'rgb(54, 162, 235)',
      },
      {
        label: 'Bed Temperature (C°)',
        data: bedTemp,
        backgroundColor: 'rgb(75, 192, 192)',
      },
      {
        label: 'Room Temperature (C°)',
        data: roomTemp,
        backgroundColor: 'rgb(75, 180, 212)',
      },
    ],
  };
  
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return { data, options };
}


const formatPieChartData = (stages) => {
  const sleepStages = {};
  stages.forEach((state) => {
    const { stage } = state;
    const { duration } = state
    if (!sleepStages[stage]) {
      sleepStages[stage] = duration
    } else {
      sleepStages[stage] += duration;
    }
  })
  const bkgColors = [
          'rgba(215, 101, 91, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(9, 58, 115, 0.2)',
          'rgba(215, 215, 91, 0.2)',
        ]

  const brdColors = [
          'rgba(215, 101, 91, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(9, 58, 115, 1)',
          'rgba(215, 215, 91, 1)',
        ]
  const values = Object.values(sleepStages).map(count => Math.floor(count/60));
  const labels = Object.keys(sleepStages).map((stage, i) =>  `${stage}: ${values[i]} minutes`);
  const backgroundColor = [...labels].map((l, i) => bkgColors[i]);
  const borderColor = [...labels].map((l, i) => brdColors[i]);
  const data = {
    labels,
    datasets: [
      {
        label: 'States of Sleep',
        data: Object.values(sleepStages).map(x => Math.floor(x/60)),
        backgroundColor,
        borderColor,
        borderWidth: 1,
      },
    ],
  };
  return data;
}


const formatTNTForUser = ({ timeseries }) => {
  console.log(timeseries);
  const labels = timeseries.tnt.map(tosses => moment(tosses[0]).format('LT'));
  const tntData = timeseries.tnt.map(tosses => tosses[1]);
  const data = {
    labels,
    datasets: [
      {
        label: '',
        data: tntData,
        fill: false,
        backgroundColor: 'rgb(255, 255, 255)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };
  
  const options = {
    scales: {
      yAxes: [{
          ticks: {
            stepSize: 1,
            suggestedMin: 0,
            suggestedMax: 1,
          },
        }],
    },
  };
  return { data, options };
}

export {
  formatPieChartData,
  formatDataForBarGraph,
  formatTNTForUser,
};