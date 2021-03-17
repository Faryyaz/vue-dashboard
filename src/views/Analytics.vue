<template>
    <v-card min-height="500px">
        <v-card-title>Analytics</v-card-title>
        <v-card-text>
            <canvas class="js-canvas"></canvas>
        </v-card-text>
    </v-card>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Chart, ChartData } from 'chart.js'
import * as fb from '../firebase'
import { VuetifyThemeItem } from 'node_modules/vuetify/types/services/theme'

@Component
export default class Analytics extends Vue {
    element!: HTMLCanvasElement;
    ctx!: CanvasRenderingContext2D;
    labels: Array<string> = [];
    infoColor: VuetifyThemeItem = this.$vuetify.theme.currentTheme.info;
    primaryColor: VuetifyThemeItem = this.$vuetify.theme.currentTheme.primary;
    errorColor: VuetifyThemeItem = this.$vuetify.theme.currentTheme.error;

    datasets = {
        cases: {
            label: 'Cases',
            data: [] as Array<number>,
            fill: false,
            borderColor: this.infoColor,
            backgroundColor: this.infoColor,
            borderWidth: 2,
            pointRadius: 3
        },
        deaths: {
            label: 'Deaths',
            data: [] as Array<number>,
            fill: false,
            borderColor: this.errorColor,
            backgroundColor: this.errorColor,
            borderWidth: 2,
            pointRadius: 3
        },
        recovered: {
            label: 'Recovered',
            data: [] as Array<number>,
            fill: false,
            borderColor: this.primaryColor,
            backgroundColor: this.primaryColor,
            borderWidth: 2,
            pointRadius: 3
        }
    };

    mounted() {
        this.element = this.$el.querySelector('.js-canvas') as HTMLCanvasElement;
        this.ctx = this.element.getContext('2d') as CanvasRenderingContext2D;
        this.fetchStats();
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
            } as ChartData,
            options: {
                responsive: true,
                title: {
					display: true,
					text: 'Overall Stats'
				},
                maintainAspectRatio: true,
                legend: {
                    display: true,
                },
                tooltips: {
					mode: 'index',
					intersect: false,
				},
				hover: {
					mode: 'nearest',
					intersect: true
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

    async fetchStats() {

        //trigger the topbar loader
        this.$root.$emit('request-loading', true);

        try {
            const casesStats = await fb.casesStatsCollection.get();
            const deathsStats = await fb.deathsStatsCollection.get();
            const recoveredStats = await fb.recoveredStatsCollection.get();

            if (casesStats) {
                casesStats.forEach((doc) => {
                    const { date, value } = doc.data();
                    this.datasets.cases.data.push(value);


                    const unixTimeStamp = new Date(date.seconds * 1000);
                    const day = unixTimeStamp.getDate();
                    const month = unixTimeStamp.toLocaleString('default', { month: 'short' });
                    const year = unixTimeStamp.getFullYear();

                    this.labels.push(`${day} ${month} ${year}`);
                });
            }

            if (deathsStats) {
                deathsStats.forEach((doc) => {
                    const { date, value } = doc.data();
                    this.datasets.deaths.data.push(value);
                });
            }

            if (recoveredStats) {
                recoveredStats.forEach((doc) => {
                    const { date, value } = doc.data();
                    this.datasets.recovered.data.push(value);
                });
            }

            this.$root.$emit('request-loading', false);
            this.plot();
        } catch (error) {
            if (error) {
                console.log(error);
                this.$root.$emit('request-loading', false);
            }
        }
    }
}
</script>