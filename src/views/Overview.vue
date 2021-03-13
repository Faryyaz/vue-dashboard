<template>
    <div>
        <v-row class="pt-3">
            <v-col cols="12" sm="6" md="3" 
                v-for="item of overviewBoxStats" 
                :key="item.stat.title">
                <stats-box :stat="item.stat"></stats-box>
            </v-col>
        </v-row>
        <v-row class="pt-3">
            <v-col cols="12" sm="12" md="4" 
                v-for="item of overviewChartStats" 
                :key="item.stat.title">
                <overview-graph :stat="item.stat"></overview-graph>
            </v-col>
        </v-row>
        <v-row class="pt-3">
            <v-col cols="12" sm="12">
                <v-data-table
                    :headers="headers"
                    :items="desserts"
                    :items-per-page="4"
                    :footer-props="footerProps"
                    class="elevation-1"
                ></v-data-table>
            </v-col>
        </v-row>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import StatsBox from '../components/StatsBox.vue'
import OverviewGraph from '../components/OverviewGraph.vue'
import * as fb from '../firebase'

@Component({
    components: {
        StatsBox,
        OverviewGraph
    }
})
export default class Overview extends Vue {

    overviewBoxStats = {
        cases: {
            stat: {
                title: 'Cases',
                icon: {
                    name: 'accessibility_new',
                    color: 'primary'
                },
                value: 0,
                subText: 'Last 24 hours'
            }
        },
        deaths: {
            stat: {
                title: 'Deaths',
                icon: {
                    name: 'healing',
                    color: 'pink'
                },
                value: 0,
                subText: 'Last 24 hours'
            }
        },
        critical: {
            stat: {
                title: 'Critical',
                icon: {
                    name: 'priority_high',
                    color: 'orange'
                },
                value: 0,
                subText: 'Last 24 hours'
            }
        },
        recovered: {
            stat: {
                title: 'Recovered',
                icon: {
                    name: 'recommend',
                    color: 'cyan'
                },
                value: 0,
                subText: 'Last 24 hours'
            }
        },
    };

    overviewChartStats = {
        cases: {
            stat: {
                title: 'Total cases',
                icon: 'accessibility_new',
                color: 'primary',
                labels: [ ' - ', ' - ' ],
                value: [ 0, 0 ]
            }
        },
        deaths: {
            stat: {
                title: 'Total deaths',
                icon: 'healing',
                color: 'pink',
                labels: [ ' - ', ' - ' ],
                value: [ 0, 0 ]
            }
        },
        recovered: {
            stat: {
                title: 'Total recovered',
                icon: 'recommend',
                color: 'cyan',
                labels: [ ' - ', ' - ' ],
                value: [ 0, 0 ]
            }
        }
    }

    mounted() {
        this.getGlobalStats();
        this.getChartStats('casesStatsCollection', 'cases');
        this.getChartStats('deathsStatsCollection', 'deaths');
        this.getChartStats('recoveredStatsCollection', 'recovered');
    }

    /**
     * get the global stats for the overview stats box
     */
    async getGlobalStats() {
        
        //trigger the topbar loader
        this.$root.$emit('request-loading', true);

        try {

            // hardcoded date for example
            // should normally use date now
            const date = new Date('2021-03-13');
            date.setHours(0);
            date.setMinutes(0);
            date.setMilliseconds(0);
            date.setSeconds(0);

            const globalStatsCollection = await fb.globalStatsCollection.where('date', '==', date).get();

            if (globalStatsCollection) {
                globalStatsCollection.forEach((doc) => {
                    const { date, type, value } = doc.data();
                    this.$set((this.overviewBoxStats as any)[type].stat, 'value', value);
                });

                this.$root.$emit('request-loading', false);
            }
        } catch(error) {
            if (error) {
                this.$root.$emit('request-loading', false);
            }
        }     
    }

    /**
     * Get chart data
     * @param {string} collection, the db collection name
     * @param {string} chart,  the chart's name
     */
    async getChartStats(collection: string, chart: string) {

        //trigger the topbar loader
        this.$root.$emit('request-loading', true);

        try {

            // hardcoded date for example
            // should normally use date now
            const date = new Date('2021-03-13');
            date.setHours(0);
            date.setMinutes(0);
            date.setMilliseconds(0);
            date.setSeconds(0);

            const chartStats = await (fb as any)[collection].where('date', '<=', date).limit(7).get();

            if (chartStats) {

                const labels: Array<string> = [],
                      values: Array<number> = [];
                let unixTimeStamp: Date,
                    day = 0,
                    month = '',
                    monthLong = '',
                    year = 0;

                chartStats.forEach((doc: any) => {
                    const { date, value } = doc.data();

                    //date manipulation
                    unixTimeStamp = new Date(date.seconds * 1000);
                    day = unixTimeStamp.getDay();
                    month = unixTimeStamp.toLocaleString('default', { month: 'short' });
                    monthLong = unixTimeStamp.toLocaleString('default', { month: 'long' });
                    year = unixTimeStamp.getFullYear();

                    labels.push(`${day} ${month}`);
                    values.push(value);
                });

                const title = `Total ${chart} per day for ${monthLong} ${year}`;

                this.$set((this.overviewChartStats as any)[chart].stat, 'labels', labels);
                this.$set((this.overviewChartStats as any)[chart].stat, 'value', values);
                this.$set((this.overviewChartStats as any)[chart].stat, 'title', title);

                this.$root.$emit('request-loading', false);
            }
        } catch(error) {
            if (error) {
                this.$root.$emit('request-loading', false);
            }
        }
    }

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

    footerProps = {
        'items-per-page-options': [4, 16, -1]
    }
}
</script>