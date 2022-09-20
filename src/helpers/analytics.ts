import moment from 'moment';
import { Programme, Student, Transfer } from '../interfaces';

const getLabels = () => {
  let labels: string[] = [];
  for (let m = 0; m < 12; m++) {
    let month = moment(new Date()).subtract(m, 'months').format('MMM');
    labels.push(month);
  }
  return labels;
};

export const getAreaChartDataPoints = (
  students: Student[],
  programmes: Programme[],
  transfers: Transfer[]
) => {
  let labels = getLabels();
  let studentsAreaChart = {},
    programmesAreaChart = {},
    transferAreaChart = {},
    studentsData: number[] = [],
    programmesData: number[] = [],
    transfersData: number[] = [];

  labels = labels.reverse();
  for (let lbl of labels) {
    const {
      totalStudents,
      totalProgrammes,
      totalTransfers,
    } = calculateAreaValues(students, programmes, transfers, lbl);
    studentsData.push(totalStudents);
    programmesData.push(totalProgrammes);
    transfersData.push(totalTransfers);
  }
  studentsAreaChart = areaChart(labels, studentsData, '#1976D2', '#BBDEFB');
  programmesAreaChart = areaChart(labels, programmesData, '#FFA000', '#FFE082');
  transferAreaChart = areaChart(labels, transfersData, '#1ce1ac', '#1ce1ac50');

  return { studentsAreaChart, programmesAreaChart, transferAreaChart };
};

export const getBarAndPieChartDataPoints = (students: Student[]) => {
  let barLabels = ['Total', 'Pending', 'Accessed', 'Blocked'];
  let pieLabels = ['Pending', 'Accessed', 'Blocked'];
  let bar = {};
  let pie = {};
  let barData: number[] = [];
  let pieData: number[] = [];

  const { total, pending, accessed, blocked } = calculateBarAndPieValues(
    students
  );

  barData.push(total, pending, accessed, blocked);
  pieData.push(pending, accessed, blocked);

  bar = barChart(barLabels, barData);
  pie = pieChart(pieLabels, pieData);

  return { bar, pie };
};

const calculateAreaValues = (
  students: Student[],
  programmes: Programme[],
  transfers: Transfer[],
  month: string
) => {
  let totalStudents = 0;
  let totalProgrammes = 0;
  let totalTransfers = 0;

  students.map((s) => {
    const m = moment(s.created_at, 'YYYY-MM-DD HH:mm:ss').format('MMM');
    if (m === month) {
      totalStudents += 1;
    }
    return totalStudents;
  });

  programmes.map((p) => {
    const m = moment(p.created_at, 'YYYY-MM-DD HH:mm:ss').format('MMM');
    if (m === month) {
      totalProgrammes += 1;
    }
    return totalProgrammes;
  });

  transfers.map((t) => {
    const m = moment(t.created_at, 'YYYY-MM-DD HH:mm:ss').format('MMM');
    if (m === month) {
      totalTransfers += 1;
    }
    return totalTransfers;
  });

  return { totalStudents, totalProgrammes, totalTransfers };
};

const calculateBarAndPieValues = (students: Student[]) => {
  let total = 0;
  let pending = 0;
  let accessed = 0;
  let blocked = 0;
  students.map((s) => {
    total += 1;
    if (s.status === 0) {
      pending += 1;
    }
    if (s.status === 1) {
      accessed += 1;
    }
    if (s.status === 2) {
      blocked += 1;
    }
    return { total, pending, accessed, blocked };
  });
  return { total, pending, accessed, blocked };
};

const areaChart = (
  labels: string[],
  dataPoints: any[],
  borderColor: string,
  backgroundColor: string
) => {
  const data = {
    height: 100,
    labels: labels,
    datasets: [
      {
        data: dataPoints,
        borderColor: borderColor,
        borderWidth: 1,
        fill: true,
        backgroundColor: backgroundColor,
        pointHoverBorderColor: 'transparent',
      },
    ],
    options: {
      maintainAspectRatio: true,
      responsive: true,
      hover: {
        mode: 'nearest',
        intersect: false,
      },

      layout: {
        padding: {
          left: -10,
          right: 0,
          top: 2,
          bottom: -10,
        },
      },
      legend: {
        display: false,
        labels: {
          display: false,
        },
      },
      elements: {
        point: {
          radius: 0,
        },
      },
      scales: {
        yAxes: [
          {
            stacked: true,
            gridLines: {
              display: false,
              color: '#e5e9f2',
            },
            ticks: {
              beginAtZero: true,
              fontSize: 10,
              display: false,
              stepSize: 20,
            },
          },
        ],
        xAxes: [
          {
            stacked: true,
            gridLines: {
              display: false,
            },

            ticks: {
              beginAtZero: true,
              fontSize: 11,
              display: false,
            },
          },
        ],
      },
      tooltips: {
        position: 'nearest',
        intersect: false,
        custom: function (tooltip: any) {
          if (!tooltip) return;
          // disable displaying the color box;
          tooltip.displayColors = false;
        },
        callbacks: {
          // use label callback to return the desired label
          label: function (tooltipItem: any, data: any) {
            return tooltipItem.xLabel + ': ' + tooltipItem.yLabel;
          },
          // remove title
          title: function (tooltipItem: any, data: any) {
            return;
          },
        },
      },
    },
  };
  return data;
};

const barChart = (labels: string[], points: number[]) => {
  const data = {
    height: 200,
    labels: labels,
    datasets: [
      {
        data: points,
        backgroundColor: [
          'rgba(54, 162, 235, 0.4)',
          'rgba(201, 203, 207, 0.4)',
          'rgba(75, 192, 192, 0.4)',
          'rgba(255, 99, 132, 0.4)',
        ],
        borderColor: [
          'rgb(54, 162, 235)',
          'rgb(201, 203, 207)',
          'rgb(75, 192, 192)',
          'rgb(255, 99, 132)',
        ],
        borderWidth: 1,
      },
    ],
    options: {
      maintainAspectRatio: true,
      responsive: true,
      legend: {
        display: false,
        // position: 'bottom',
        // labels: {
        //   fontSize: 10,
        //   padding: 30,
        //   boxWidth: 10,
        // },
      },
      scales: {
        yAxes: [
          {
            gridLines: {
              color: '#e5e9f2',
            },
            ticks: {
              beginAtZero: true,
              fontSize: 10,
              fontColor: '#182b49',
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              display: false,
            },
            ticks: {
              beginAtZero: true,
              fontSize: 11,
              fontColor: '#182b49',
            },
          },
        ],
      },
    },
  };
  return data;
};

const pieChart = (labels: string[], points: number[]) => {
  const data = {
    data: {
      labels: labels,
      datasets: [
        {
          data: points,
          backgroundColor: [
            'rgb(201, 203, 207)',
            'rgb(75, 192, 192)',
            'rgb(255, 99, 132)',
          ],
          hoverOffset: 4,
          borderColor: [
            'rgb(54, 162, 235)',
            'rgb(54, 162, 235)',
            'rgb(54, 162, 235)',
            'rgb(54, 162, 235)',
          ],
          borderWidth: [1, 1, 1, 1],
        },
      ],
    },
  };

  return data;
};
