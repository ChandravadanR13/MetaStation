import { Component } from '@angular/core';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-fund-manager-details',
  templateUrl: './fund-manager-details.component.html',
  styleUrls: ['./fund-manager-details.component.scss']
})
export class FundManagerDetailsComponent {
  public chart: any;
  id : number = 1;

  onCLickedButton(id: number) {
    this.id = id;
  }

  createChart() {
    var myCanvas: any = document.getElementById('MyChart6');
    var ctx = myCanvas.getContext('2d');
    var gradient = ctx.createLinearGradient(
      0,
      myCanvas.height,
      0,
      myCanvas.width
    );
    gradient.addColorStop(0, 'rgb(60, 113, 251, 0.2)');
    gradient.addColorStop(1, 'rgba(85, 110, 173, 0)');

    this.chart = new Chart('MyChart6', {
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
              color: 'rgba(112, 118, 136, 0.13)',
            },
          },
        },
      },
    });
  }

  ngAfterViewInit(): void {
    var myCanvas: any = document.getElementById('MyChart6');
    var ctx = myCanvas?.getContext('2d');
    console.log(ctx);

    this.createChart();
  }
}
