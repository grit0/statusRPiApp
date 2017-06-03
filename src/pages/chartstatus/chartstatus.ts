import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
/*
  Generated class for the Chartstatus page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-chartstatus',
  templateUrl: 'chartstatus.html'
})
export class ChartstatusPage {

  private ref: FirebaseObjectObservable<any>;
  path: any;
  cpuChart: any;
  ramChart: any;
  tempChart: any;
  testChart: any;
  cpuData = []
  ramData = []
  tempData = []
  constructor(public af: AngularFire, public navCtrl: NavController, public navParams: NavParams) {
    this.path = this.navParams.get('path');
    console.log("path : " + this.path);
    this.ref = af.database.object(this.path);
    this.ref.subscribe(item => {
      // console.log(item);
      // this.status = item;
      // this.rpi=Object.keys(item)
      // console.log(JSON.stringify(item));
      console.log(item["physical"]["cpu"]["cpu_usage"])

      // return item;
      this.cpuData.push(100 - Number(item["physical"]["cpu"]["cpu_usage"]["id"]))
      // this.cpuData.shift()
      this.tempData.push(Number(item["basic"]["temperature"]))
      // this.tempData.shift()
      this.ramData.push(Number(item["physical"]["ram"]["used"]))
      // this.ramData.shift()
      this.cpuChart = {
        title: { text: 'CPU Used chart' },
        // series: [{
        //   data: this.cpuData,
        // }]
        // chart: {
        //   zoomType: 'x'
        // },
        // xAxis: {
        //   type: 'datetime'
        // },
        // yAxis: {
        //   title: {
        //     text: 'CPU used Percentage %'
        //   }
        // },
                xAxis: {
          type: 'datetime',
          tickPixelInterval: 150
        },
        yAxis: {
          title: {
            text: 'Value'
          },
          plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
          }]
        },
        legend: {
          enabled: false
        },
        series: [{
          type: 'area',
          name: 'cpu used',
          data: this.cpuData
        }]
      };


      this.ramChart = {
        title: { text: 'RAM Used chart' },
        series: [{
          data: this.ramData,
        }]
      };
      this.tempChart = {
        title: { text: 'Temperature chart' },
        series: [{
          data: this.tempData,
        }]
      };
      this.testChart = {
        chart: {
          type: 'spline',
          // animation: Highcharts.svg, // don't animate in old IE
          marginRight: 10
        //   events: {
        //     load: function () {

        //       // set up the updating of the chart each second
        //       var series = this.series[0];
        //       setInterval(function () {
        //         var x = (new Date()).getTime(), // current time
        //           y = Math.random();
        //         series.addPoint([x, y], true, true);
        //       }, 1000);
        //     }
        //   }
        },
        title: {
          text: 'Live random data'
        },
        xAxis: {
          type: 'datetime',
          tickPixelInterval: 150
        },
        yAxis: {
          title: {
            text: 'Value'
          },
          plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
          }]
        },
        // tooltip: {
        //     formatter: function () {
        //         return '<b>' + this.series.name + '</b><br/>' +
        //             Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
        //             Highcharts.numberFormat(this.y, 2);
        //     }
        // },
        legend: {
          enabled: false
        },
        exporting: {
          enabled: false
        },
        series: [{
          name: 'Random data',
          data: (function () {
            // generate an array of random data
            var data = [],
              time = (new Date()).getTime(),
              i;

            
              data.push({
                x: time,
                y: 100 - Number(item["physical"]["cpu"]["cpu_usage"]["id"])
              });
            
            return data;
          }())
        }]
      }

    });




  }

}
