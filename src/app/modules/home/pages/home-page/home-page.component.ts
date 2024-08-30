import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import {ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomePageComponent {
  cols: any[] = [];
  data: any[] = [];
  swiperData: any[] = [];
  responsiveOptions: any[] = [];
  showpopup: boolean = false;
  public chart: any;
  public chart2: any;
  public chart3: any;
  modal: any;
  ngOnInit() {
    this.modal = document.getElementById("myModal");
    setTimeout(() => {
      this.closeModel()
     }, 2000);
    this.swiperData = [
      {
        id: '1000',
        name: 'Bitcoin',
        image: 'bitcoin.png',
      },
      {
        id: '1000',
        name: 'Dodge coin',
        image: 'dogecoin.png',

      },

      {
        id: '1000',
        name: 'Ethereum',
        image: 'etherium.png',
      },
      {
        id: '1000',
        name: 'Dai DAI',
        image: 'dai.png',
      },
      {
        id: '1000',
        name: 'Polkadot DOT',
        image: 'polkadot.png',
      },
      {
        id: '1000',
        name: 'USD Coin USDC',
        image: 'usdc.png',
      },
      {
        id: '1000',
        name: 'Solana SOL',
        image: 'Solana.png',
      },
      {
        id: '1000',
        name: 'BNB BNB',
        image: 'bnb.png',
      },
      {
        id: '1000',
        name: 'Bitcoin',
        image: 'bitcoin.png',
      },
      {
        id: '1000',
        name: 'Dodge coin',
        image: 'dogecoin.png',

      },

      {
        id: '1000',
        name: 'Ethereum',
        image: 'etherium.png',
      },
      {
        id: '1000',
        name: 'Dai DAI',
        image: 'dai.png',
      },
      {
        id: '1000',
        name: 'Polkadot DOT',
        image: 'polkadot.png',
      },
      {
        id: '1000',
        name: 'USD Coin USDC',
        image: 'usdc.png',
      },
      {
        id: '1000',
        name: 'Solana SOL',
        image: 'Solana.png',
      },
      {
        id: '1000',
        name: 'BNB BNB',
        image: 'bnb.png',
      },
    ];


    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 6,
        numScroll: 6
      },
      {
        breakpoint: '1220px',
        numVisible: 4,
        numScroll: 4
      },
      {
        breakpoint: '1100px',
        numVisible: 2,
        numScroll: 2
      }
    ];

    this.cols = [
      { field: 'Score', header: 'Score' },
      { field: 'Assets', header: 'Assets' },
      { field: 'Managers Name', header: 'Managers Name' },
      { field: 'Product', header: 'Product' },
      { field: '1 D', header: '1 D' },
      { field: '1 W', header: '1 W' },
      { field: '1 M', header: '1 M' },
      { field: '6 M', header: '6 M' },
      { field: '1 Y', header: '1 Y' },
      { field: 'Total', header: 'Total' },
      { field: 'Managed', header: 'Managed' },
      { field: 'Risk', header: 'Risk' },
      { field: 'Fee', header: 'Fee' },
    ];


    this.data = [
      {
        "Score": "1283", "Assets": "Ethereum", "Managers Name": "Dhruva Adani", "Product": "ETH Managed", "1 D": "1%",
        "1 M": "5%", "6 M": "25%", "1 Y": "25%", "Total": "25%", "Managed": "$297.2%", "Risk": "4/5", "Fee": "0%"
      },

      {
        "Score": "1283", "Assets": "Ethereum", "Managers Name": "Dhruva Adani", "Product": "ETH Managed", "1 D": "1%",
        "1 M": "5%", "6 M": "25%", "1 Y": "25%", "Total": "25%", "Managed": "$297.2%", "Risk": "4/5", "Fee": "0%"
      },

      {
        "Score": "1283", "Assets": "Ethereum", "Managers Name": "Dhruva Adani", "Product": "ETH Managed", "1 D": "1%",
        "1 M": "5%", "6 M": "25%", "1 Y": "25%", "Total": "25%", "Managed": "$297.2%", "Risk": "4/5", "Fee": "0%"
      },

      {
        "Score": "1283", "Assets": "Ethereum", "Managers Name": "Dhruva Adani", "Product": "ETH Managed", "1 D": "1%",
        "1 M": "5%", "6 M": "25%", "1 Y": "25%", "Total": "25%", "Managed": "$297.2%", "Risk": "4/5", "Fee": "0%"
      },

      {
        "Score": "1283", "Assets": "Ethereum", "Managers Name": "Dhruva Adani", "Product": "ETH Managed", "1 D": "1%",
        "1 M": "5%", "6 M": "25%", "1 Y": "25%", "Total": "25%", "Managed": "$297.2%", "Risk": "4/5", "Fee": "0%"
      },
      {
        "Score": "1283", "Assets": "Ethereum", "Managers Name": "Dhruva Adani", "Product": "ETH Managed", "1 D": "1%",
        "1 M": "5%", "6 M": "25%", "1 Y": "25%", "Total": "25%", "Managed": "$297.2%", "Risk": "4/5", "Fee": "0%"
      },
      {
        "Score": "1283", "Assets": "Ethereum", "Managers Name": "Dhruva Adani", "Product": "ETH Managed", "1 D": "1%",
        "1 M": "5%", "6 M": "25%", "1 Y": "25%", "Total": "25%", "Managed": "$297.2%", "Risk": "4/5", "Fee": "0%"
      },
      {
        "Score": "1283", "Assets": "Ethereum", "Managers Name": "Dhruva Adani", "Product": "ETH Managed", "1 D": "1%",
        "1 M": "5%", "6 M": "25%", "1 Y": "25%", "Total": "25%", "Managed": "$297.2%", "Risk": "4/5", "Fee": "0%"
      },
    ];


    const canvas = document.getElementById('myChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    var gradient = ctx!.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(0, 199, 91, 0.81)');
    gradient.addColorStop(1, 'rgba(0, 199, 91, 0)');

    const getGradient = (ctx: any, chartArea: any, start_color: String, stop_color: String) => {
      let width, height, gradient;
      const chartWidth = chartArea.right - chartArea.left;
      const chartHeight = chartArea.bottom - chartArea.top;
      if (gradient === null || width !== chartWidth || height !== chartHeight) {
        // Create the gradient because this is either the first render
        // or the size of the chart has changed
        width = chartWidth;
        height = chartHeight;
        gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
        gradient.addColorStop(0, stop_color);
        gradient.addColorStop(1, start_color);
      }
      return gradient;
    }

    let myChart = new Chart("myChart", {
      type: 'line',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: 'My First Dataset',
          data: [10, 23, 26, 28, 56, 67, 67, 80],
          fill: false,
          borderColor: 'rgba(0, 199, 91, 0.81)',
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          tension: 1,
          // fillColor : gradient,
        }]
      },
      options: {
        plugins: {
          legend: {
            display: false,
          }
        },
        elements: {
          point: {
            radius: 0
          }
        },
        scales: {
          y: {
            display: false
          },
          x: {
            display: false
          }
        }
      }
    });


  }


  createChart() {
    var myCanvas: any = document.getElementById('MyChart');
    var ctx = myCanvas.getContext('2d');
    var gradient = ctx.createLinearGradient(
      0,
      myCanvas.height,
      0,
      myCanvas.width
    );
    gradient.addColorStop(0, 'rgb(0, 199, 91, 0.2)');
    gradient.addColorStop(1, 'rgb(0, 199, 91, 0)');

    this.chart = new Chart('MyChart', {
      type: 'line', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: [
          'Sep’21',
          'Oct’21',
          'Nov’21',
          'Dec’21',
          'Jan’22',
          'Feb’22',
          'Mar’22',
          'Apr’22',
          'Mar’22',
          'May’22',
          'Jun’22',
          'Jul’22',
          'Aug’22',
        ],
        datasets: [
          {
            data: [60, 51, 62, 33, 21, 62, 45, 50, 90, 40, 30, 20, 10],
            borderColor: '#00C75B',
            backgroundColor: gradient,
            pointRadius: 0,
            borderWidth: 2,
            fill: true,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        aspectRatio: 16.1,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            display: false,
            ticks: {
              color: '#ebedef',
              font: {
                family: 'Euclid Circular A', // Your font family
                size: 14,
              },
            },
            grid: {
              display: false,
              color: 'rgba(0, 0, 0, 0)',
            },
          },
          y: {
            display: false,
            ticks: {
              stepSize: 40,
              color: '#ebedef',
              // fontSize: 40,
              font: {
                family: 'Euclid Circular A', // Your font family
                size: 14,
              },
              callback: function (val, index) {
                return '$' + val + ' ' + 'T';
              },
            },
            grid: {
              display: false,
              color: 'rgba(112, 118, 136, 0.13)',
            },
          },
        },
      },
    });
  }

  createSecondChart() {

    var myCanvas: any = document.getElementById('MyChart2');
    var ctx = myCanvas.getContext('2d');
    var gradient = ctx.createLinearGradient(
      0,
      myCanvas.height,
      0,
      myCanvas.width
    );
    gradient.addColorStop(0, 'rgb(60, 113, 251, 0.2)');
    gradient.addColorStop(1, 'rgba(85, 110, 173, 0)');

    this.chart2 = new Chart('MyChart2', {
      type: 'line', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: [
          'Sep’21',
          'Oct’21',
          'Nov’21',
          'Dec’21',
          'Jan’22',
          'Feb’22',
          'Mar’22',
          'Apr’22',
          'Mar’22',
          'May’22',
          'Jun’22',
          'Jul’22',
          'Aug’22',

        ],
        datasets: [
          {
            data: [60, 51, 62, 33, 21, 62, 45, 50, 90, 40, 30, 20, 10],
            borderColor: '#3C71FB',
            backgroundColor: gradient,
            pointRadius: 0,
            borderWidth: 2,
            fill: true,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        aspectRatio: 16.1,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            display: false,
            ticks: {
              color: '#ebedef',
              font: {
                family: 'Euclid Circular A', // Your font family
                size: 14,
              },
            },
            grid: {
              display: false,
              color: 'rgba(0, 0, 0, 0)',
            },
          },
          y: {
            display: false,
            ticks: {
              stepSize: 40,
              color: '#ebedef',
              // fontSize: 40,
              font: {
                family: 'Euclid Circular A', // Your font family
                size: 14,
              },
              callback: function (val, index) {
                return '$' + val + ' ' + 'T';
              },
            },
            grid: {
              display: false,
              color: 'rgba(112, 118, 136, 0.13)',
            },
          },
        },
      },
    });

  }

  createThirdChart() {

    var myCanvas: any = document.getElementById('MyChart3');
    var ctx = myCanvas.getContext('2d');
    var gradient = ctx.createLinearGradient(
      0,
      myCanvas.height,
      0,
      myCanvas.width
    );
    gradient.addColorStop(0, 'rgba(255, 153, 0, 0.2)');
    gradient.addColorStop(1, 'rgba(255, 153, 0, 0)');

    this.chart3 = new Chart('MyChart3', {
      type: 'line', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: [
          'Sep’21',
          'Oct’21',
          'Nov’21',
          'Dec’21',
          'Jan’22',
          'Feb’22',
          'Mar’22',
          'Apr’22',
          'Mar’22',
          'May’22',
          'Jun’22',
          'Jul’22',
          'Aug’22',
        ],
        datasets: [
          {
            data: [60, 51, 62, 33, 21, 62, 45, 50, 90, 40, 30, 20, 10],
            borderColor: 'rgba(255, 153, 0, 1)',
            backgroundColor: gradient,
            pointRadius: 0,
            borderWidth: 2,
            fill: true,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        aspectRatio: 16.1,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            display: false,
            ticks: {
              color: '#ebedef',
              font: {
                family: 'Euclid Circular A', // Your font family
                size: 14,
              },
            },
            grid: {
              display: false,
              color: 'rgba(0, 0, 0, 0)',
            },
          },
          y: {
            display: false,
            ticks: {
              stepSize: 40,
              color: '#ebedef',
              // fontSize: 40,
              font: {
                family: 'Euclid Circular A', // Your font family
                size: 14,
              },
              callback: function (val, index) {
                return '$' + val + ' ' + 'T';
              },
            },
            grid: {
              display: false,
              color: 'rgba(112, 118, 136, 0.13)',
            },
          },
        },
      },
    });

  }

  ngAfterViewInit(): void {
    var myCanvas: any = document.getElementById('MyChart');
    var ctx = myCanvas.getContext('2d');
    console.log(ctx);

    this.createChart();
    this.createSecondChart();
    this.createThirdChart();
    // this.openModel();
  }

  openModel() {
    this.modal.style.display = "block";
    console.log("Open Model");
  }
   closeModel() {
    this.modal.style.display = "none";
   }
   product:any[]=[
    {
      Score:1283,
      Assets:"Ethereum",
      imageUrl1:'../../assets/pngixcon.png',
      imageUrl:'../../assets/Ellipse 2425.png',
      ManagersName:'Dhruva Adani',
      Product:'ETH Managed..',
      oneD:'1% ',
      oneW:'5%',
      oneM:'25%',
      sixM:'25%',
      oneY:'25%',
      Total:'25%',
      Managed:'$457.2%',
      Risk:'4/5',
      Fee:'0%',
      isAscending: false,

    },
    {
      Score:1283,
      Assets:"Ethereum",
      imageUrl1:'../../assets/pngixcon.png',
      imageUrl:'../../assets/Ellipse 2425.png',
      ManagersName:'2Dhruva Adani',
      Product:'ETH Managed..',
      oneD:'1% ',
      oneW:'5%',
      oneM:'25%',
      sixM:'25%',
      oneY:'25%',
      Total:'25%',
      Managed:'$457.2%',
      Risk:'4/5',
      Fee:'0%',
      isAscending: false,

    },
    {
      Score:1283,
      Assets:"Ethereum",
      imageUrl1:'../../assets/pngixcon.png',
      imageUrl:'../../assets/Ellipse 2425.png',
      ManagersName:'3Dhruva Adani',
      Product:'ETH Managed..',
      oneD:'1% ',
      oneW:'5%',
      oneM:'25%',
      sixM:'25%',
      oneY:'25%',
      Total:'25%',
      Managed:'$457.2%',
      Risk:'4/5',
      Fee:'0%',
      isAscending: true,

    }

  ];
  
}
