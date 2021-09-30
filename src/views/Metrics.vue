<template>
    <div>
        <grid-layout :layout.sync="layout"
                 :col-num="12"
                 :row-height="40"
                 :responsive="true"
                 :is-draggable="draggable"
                 :is-resizable="resizable"
                 :vertical-compact="true"
                 :use-css-transforms="true"
        >
            <template v-for="item in layout">
                <grid-item 
                    :static="item.static"
                    :x="item.x"
                    :y="item.y"
                    :w="item.w"
                    :h="item.h"
                    :i="item.i"
                    :key="item.i"
                    :preserveAspectRatio="item.preserveAspectRatio"
                    @resized="resizeGraph">
                    <template>
                        <div :class="item.name" class="chart elevation-1"></div>
                    </template>
                </grid-item>
            </template>
        </grid-layout>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { GridLayout, GridItem } from 'vue-grid-layout'
import * as Plotly from 'plotly.js'

@Component({
    components: {
        GridLayout,
        GridItem
    }
})
export default class Overview extends Vue {
    layout = [
        {"x":0,"y":0,"w":5,"h":6,"i":"0","static":false,"name":"line-graph","preserveAspectRatio":false},
        {"x":0,"y":0,"w":5,"h":6,"i":"1","static":false,"name":"pie-chart","preserveAspectRatio":false},
        {"x":5,"y":6,"w":5,"h":6,"i":"2","static":false,"name":"bar-chart","preserveAspectRatio":false},
        {"x":5,"y":6,"w":5,"h":6,"i":"3","static":false,"name":"mixed-chart","preserveAspectRatio":false}
    ];
    draggable = true;
    resizable = true;

    config = {
        responsive: true
    };

    mounted() {
        this.plotLineGraph();
        this.plotPieChart();
        this.plotBarChart();
        this.plotMixedChart();
        this.resizeGraph();
    }

    resizeGraph(): void {

        // trigger the window resize event
        // for plotly to resize graph dynamically
        window.dispatchEvent(new Event('resize'));

    }

    plotLineGraph() {
        const trace1 = {
            x: [1, 2, 3, 4],
            y: [10, 15, 13, 17],
            type: 'scatter'
        };

        const trace2 = {
            x: [1, 2, 3, 4],
            y: [16, 5, 11, 9],
            type: 'scatter'
        };

        const layout = { 
            title: 'Line graph'
        };

        const data: any = [trace1, trace2];
        const element: any = document.querySelector('.line-graph');

        Plotly.newPlot(element, data, layout, this.config);
    }

    plotPieChart() {
        const data: any = [{
            values: [19, 26, 55],
            labels: ['Residential', 'Non-Residential', 'Utility'],
            type: 'pie'
        }];

        const layout = {
            title: 'Pie'
        };

        const element: any = document.querySelector('.pie-chart');

        Plotly.newPlot(element, data, layout, this.config);
    }

    plotBarChart() {
        const data: any = [
            {
                x: ['Area 1', 'Area 2', 'Area 3'],
                y: [20, 14, 23],
                type: 'bar'
            }
        ];

        const layout = {
            title: 'Bar chart'
        };

        const element: any = document.querySelector('.bar-chart');

        Plotly.newPlot(element, data, layout, this.config);
    }

    plotMixedChart() {
        const trace1 = {
            x: [0, 1, 2, 3, 4, 5],
            y: [1.5, 1, 1.3, 0.7, 0.8, 0.9],
            type: 'scatter'
        };

        const trace2 = {
            x: [0, 1, 2, 3, 4, 5],
            y: [1, 0.5, 0.7, -1.2, 0.3, 0.4],
            type: 'bar'
        };

        const data = [trace1, trace2];

        const layout = {
            title: 'Mixed chart'
        };

        const element: any = document.querySelector('.mixed-chart');

        Plotly.newPlot(element, data, layout, this.config);
    }


}
</script>
<style lang="scss" scoped>
    .chart {
        width: 100%;
        height: 100%;
        position: relative;
    }
</style>