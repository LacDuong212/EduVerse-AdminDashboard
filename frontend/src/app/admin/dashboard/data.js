export const earningChat = {
  series: [
    {
      name: 'Payout',
      data: [2909, 1259, 950, 1563, 1825, 2526, 2010, 3260, 3005, 3860, 4039],
    },
  ],
  chart: {
    height: 300,
    type: 'area',
    toolbar: { show: false },
  },
  dataLabels: { enabled: true },
  stroke: { curve: 'smooth' },
  colors: ['#0d6efd'], 
  xaxis: {
    type: 'category',
    categories: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  yaxis: [
    {
      axisTicks: { show: false },
      axisBorder: { show: false },
    },
  ],
  tooltip: {
    y: {
      title: {
        formatter: () => '$',
      },
    },
    marker: { show: false },
  },
};

export const chartTrafficViews = {
  series: [70, 15, 10, 5],
  labels: ['Course-1', 'Course-2', 'Course-3', 'Course-4'],
  chart: {
    height: 200,
    width: 200,
    offsetX: 0,
    type: 'donut',
    sparkline: { enabled: true },
  },
  colors: ['#0d6efd', '#198754', '#ffc107', '#dc3545'],
  tooltip: { theme: 'dark' },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: { width: 200, height: 200 },
        legend: { position: 'bottom' },
      },
    },
  ],
};
