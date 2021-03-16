<template>
    <v-card max-height="100%">
        <v-card-title>Analytics</v-card-title>
        <v-card-text>
            <canvas id="canvas"></canvas>
        </v-card-text>
    </v-card>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Chart, ChartData } from 'chart.js'

@Component
export default class Analytics extends Vue {
    element = <HTMLCanvasElement> this.$el.querySelector('#canvas');
    ctx =  <CanvasRenderingContext2D> this.element.getContext('2d');
    labels: Array<string> = [];
    datasets: Array<string> = [];

    mounted() {

    }

    plot() {
        new Chart(this.ctx, {
            type: 'line',
            data: <ChartData> {
                labels: this.labels,
                datasets: this.datasets
            }
        });
    }

}
</script>