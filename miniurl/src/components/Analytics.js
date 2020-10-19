import React from 'react';
import { FormattedMessage } from 'react-intl';
import Chart from 'chart.js';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4geodata_worldHigh from "@amcharts/amcharts4-geodata/worldHigh";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import mapjson from "../json/map.json";

class Analytics extends React.Component{
    constructor(props){
        super(props);  
        this.currentView = {
            'MAP' : 'dis_mp',
            'LINE' : 'dis_line',
            'PIE' : 'dis_pie'
        }
        this.state = {
            type: 'MAP'
        }
    }

    componentDidMount(prevProps, prevState, snapshot){
        // this.renderAnalytics();
        this.renderMap();
    }

    renderMap = () => {
        try{
            var chart = am4core.create("dis_mp", am4maps.MapChart);
            chart.geodata = am4geodata_worldLow;
            chart.projection = new am4maps.projections.Miller();
            var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
            polygonSeries.useGeodata = true;
            polygonSeries.mapPolygons.template.events.on("hit", function(ev) {
            chart.zoomToMapObject(ev.target);
            });
        }catch(err){
            console.error('Error in renderMap', err.stack);
        }
    }

    renderLine = () => {
        try{
            // let ctx = document.querySelector('#myChart');
            // var myChart = new Chart(ctx, {
            //     type: 'line',
            //     data: {
            //         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            //         datasets: [{
            //             label: '# of Votes',
            //             data: [12, 19, 3, 5, 2, 3],
            //             backgroundColor: [
            //                 'rgba(255, 99, 132, 0.2)',
            //                 'rgba(54, 162, 235, 0.2)',
            //                 'rgba(255, 206, 86, 0.2)',
            //                 'rgba(75, 192, 192, 0.2)',
            //                 'rgba(153, 102, 255, 0.2)',
            //                 'rgba(255, 159, 64, 0.2)'
            //             ],
            //             borderColor: [
            //                 'rgba(255, 99, 132, 1)',
            //                 'rgba(54, 162, 235, 1)',
            //                 'rgba(255, 206, 86, 1)',
            //                 'rgba(75, 192, 192, 1)',
            //                 'rgba(153, 102, 255, 1)',
            //                 'rgba(255, 159, 64, 1)'
            //             ],
            //             borderWidth: 1
            //         }]
            //     },
            //     options: {
            //         scales: {
            //             yAxes: [{
            //                 ticks: {
            //                     beginAtZero: true
            //                 }
            //             }]
            //         }
            //     }
            // });
            // am4core.useTheme(am4themes_animated);
            console.log('came ', document.getElementById('dis_line'))
            // let chart = am4core.create("dis_line", am4maps.MapChart);
            let chart = am4core.create("dis_line", am4charts.XYChart);
            chart.geodata = am4geodata_worldLow;
            chart.paddingRight = 20;

            let data = [];
            let visits = 10;
            for (let i = 1; i < 366; i++) {
              visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
              data.push({ date: new Date(2020, 0, i), name: "name" + i, value: visits });
            }
        
            chart.data = data;
        
            let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
            dateAxis.renderer.grid.template.location = 0;
        
            let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.tooltip.disabled = true;
            valueAxis.renderer.minWidth = 35;
        
            let series = chart.series.push(new am4charts.LineSeries());
            series.dataFields.dateX = "date";
            series.dataFields.valueY = "value";
        
            series.tooltipText = "{valueY.value}";
            chart.cursor = new am4charts.XYCursor();
        
            let scrollbarX = new am4charts.XYChartScrollbar();
            scrollbarX.series.push(series);
            chart.scrollbarX = scrollbarX;
            // map.geodataSource.url =  "../json/map.json";
            // map.projection = new am4maps.projections.Miller();
            this.map = chart;
        }catch(err){
            console.error('Error in renderLine', err.stack);
        }
    }

    componentDidUpdate(prevProp, prevState, snapshot){
        try{
            if(prevState.type !== this.state.type){
                if(this.state.type === 'MAP'){
                    this.renderMap();
                }else if(this.state.type === 'LINE'){
                    this.renderLine();
                }
            }
        }catch(err){
            console.error('Error in componentDidUpdate ', err.stack);
        }
    }

    setAnalyticType = (e) => {
        try{
            // e.preventDefault();
            // e.stopPropagation();
            // document.querySelectorAll('.chk_holder').forEach(ele => {
            //     ele.querySelector('.any_li').removeAttribute('checked');
            // })
            // e.target.closest('.chk_holder').querySelector('.any_li').setAttribute('checked', true);
            console.log('came here ', e.target.closest('.chk_holder'), this.state.type);

            if(e.target.closest('.chk_holder') && this.state.type !== e.target.closest('.chk_holder').getAttribute('vtype')){
                this.setState({
                    type: e.target.closest('.chk_holder').getAttribute('vtype') 
                 })
            console.log('came here ', document.querySelectorAll('.chk_holder'));

            }
            
        }catch(err){
            console.error('Error in setAnalyticType ', err.stack);
        }
    }
    render(){
        
        return(
            <div className="analy_wrappers">
                {/* <canvas id="myChart" width="400" height="400"></canvas> */}
                <section className="ana_vi">
                    <div id={this.currentView[this.state.type]}></div>
                </section>
                <aside>
                    <div className="analy_types" onClick={e => this.setAnalyticType(e)}>
                        <div className="chk_holder"  vtype="MAP">
                            <input type="checkbox" checked={this.state.type === 'MAP' ? true : false} className="any_li"/>
                            <FormattedMessage id="an.cou" children={val => <span className="an_cou">{val}</span>}></FormattedMessage>
                        </div>
                        <div className="chk_holder" vtype="LINE">
                            <input type="checkbox" checked={this.state.type === 'LINE' ? true : false} className="any_li"/>
                            <FormattedMessage id="an.dt" children={val => <span className="an_dt">{val}</span>}></FormattedMessage>
                        </div>
                        <div className="chk_holder" vtype="PIE">
                            <input type="checkbox" checked={this.state.type === 'PIE' ? true : false} className="any_li"/>
                            <FormattedMessage id="an.dev" children={val => <span className="an_dev">{val}</span>}></FormattedMessage>
                        </div>
                    </div>
                </aside>

            </div>
        )
    }
}

export default Analytics;