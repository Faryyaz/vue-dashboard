<template>
    <v-card max-height="100%">
        <v-card-title>Analytics</v-card-title>
        <v-card-text>
            <canvas class="js-canvas"></canvas>
        </v-card-text>
    </v-card>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Chart, ChartData } from 'chart.js'

@Component
export default class Analytics extends Vue {
    element = this.$el.querySelector('.canvas') as HTMLCanvasElement;
    ctx = this.element.getContext('2d') as CanvasRenderingContext2D;
    labels: Array<string> = [];
    datasets = {
        cases: {
            label: 'Cases',
            data: [],
            fill: false,
            borderColor: '',
            backgroundColor: '',
            borderWidth: 2,
            pointRadius: 0
        },
        deaths: {
            label: 'Deaths',
            data: [],
            fill: false,
            borderColor: '',
            backgroundColor: '',
            borderWidth: 2,
            pointRadius: 0,
        },
        recovered: {
            label: 'Recovered',
            data: [],
            fill: false,
            borderColor: '',
            backgroundColor: '',
            borderWidth: 2,
            pointRadius: 0,
        }
    };

    mounted() {
        console.log("test");
    }

    plot() {
        new Chart(this.ctx, {
            type: 'line',
            data: {
                labels: this.labels,
                datasets: [
                    this.datasets.cases, 
                    this.datasets.recovered,
                    this.datasets.deaths
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: false,
                },
                elements: {
                    point: {
                        radius: 1,
                        hitRadius: 2,
                        hoverRadius: 5
                    }
                }
            }
        });
    }
}
</script>