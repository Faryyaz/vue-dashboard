<template>
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
                drag-allow-from=".draggable-handle"
                :preserveAspectRatio="item.preserveAspectRatio"
                @resized="resizeGraph"
                class="rounded elevation-1 white pa-1">
                <template v-if="item.type === 'chart'">
                    <div :class="item.name" class="chart rounded"></div>
                    <v-icon small color="secondary lighten-4" class="draggable-handle">open_with</v-icon>
                </template>
                <template v-else-if="item.type === 'table'">
                    <div class="grid-table">
                        <v-data-table
                            :headers="headers"
                            :items="desserts"
                            :items-per-page="5"
                            class="mt-4"
                        ></v-data-table>
                        <v-icon small color="secondary lighten-4" class="draggable-handle">open_with</v-icon>
                    </div>
                </template>
            </grid-item>
        </template>
    </grid-layout>
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
        {"x":0,"y":0,"w":5,"h":6,"i":"0","static":false, type: "chart", "name":"line-graph","preserveAspectRatio":false},
        {"x":0,"y":0,"w":5,"h":6,"i":"1","static":false, type: "chart", "name":"pie-chart","preserveAspectRatio":false},
        {"x":5,"y":6,"w":5,"h":6,"i":"2","static":false, type: "chart", "name":"bar-chart","preserveAspectRatio":false},
        {"x":5,"y":6,"w":5,"h":6,"i":"3","static":false, type: "chart", "name":"mixed-chart","preserveAspectRatio":false},
        {"x":0,"y":12,"w":10,"h":8,"i":"4","static":false, type: "table", "name":"table","preserveAspectRatio":false}
    ];
    draggable = true;
    resizable = true;

    config = {
        responsive: true
    };

    headers = [
        {
          text: 'Dessert (100g serving)',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Iron (%)', value: 'iron' },
    ];

    desserts = [
        {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%',
        },
        {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: '1%',
        },
        {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: '7%',
        },
        {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: '8%',
        },
        {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: '16%',
        },
        {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: '0%',
        },
        {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: '2%',
        },
        {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: '45%',
        },
        {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: '22%',
        },
        {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%',
        },
    ];

    mounted() {
        this.$nextTick(() => {
            this.plotLineGraph();
            this.plotPieChart();
            this.plotBarChart();
            this.plotMixedChart();
            this.resizeGraph();
        });
    }

    resizeGraph(): void {

        // trigger the window resize event
        // for plotly to resize graph dynamically
        // window.dispatchEvent(new Event('resize'));
        const elements: Array<HTMLElement> = Array.from(document.querySelectorAll('.chart'));
        elements.forEach((element: HTMLElement) => {
            Plotly.Plots.resize(element);
        });

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
            title: 'Line graph',
            autosize: true,
            margin: {
                l: 30,
                r: 30,
                b: 30,
                t: 50
            },
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
            title: 'Pie',
            autosize: true,
            margin: {
                l: 30,
                r: 30,
                b: 30,
                t: 50
            },
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
            title: 'Bar chart',
            autosize: true,
            margin: {
                l: 30,
                r: 30,
                b: 30,
                t: 50
            },
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

        const data: any = [trace1, trace2];

        const layout = {
            title: 'Mixed chart',
            autosize: true,
            margin: {
                l: 30,
                r: 30,
                b: 30,
                t: 50
            },
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

    .draggable-handle {
        position: absolute;
        top: 4px;
        left: 4px;
    }

    .grid-table {
        overflow: auto;
        position: relative;
        width: 100%;
        height: 100%;
    }
</style>