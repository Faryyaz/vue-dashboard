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
                    :items="tableStats"
                    :options.sync="options"
                    :server-items-length="serverItemsLength"
                    :footer-props="footerProps"
                    class="elevation-1">
                    <template v-slot:item="{ item }">
                        <tr>
                            <td class="text-capitalize">{{ item.country }}</td>
                            <td>{{ item.cases }}</td>
                            <td>{{ item.recovered }}</td>
                            <td>{{ item.critical }}</td>
                            <td>{{ item.deaths }}</td>
                            <td>{{ item.population|formatNumber() }}</td>
                        </tr>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import StatsBox from '../components/StatsBox.vue'
import OverviewGraph from '../components/OverviewGraph.vue'
import * as fb from '../firebase'

type TTableStats = { 
    country: string; 
    cases: number;
    recovered: number;
    critical: number;
    deaths: number;
    population: number;
}

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
    };

    headers = [
        {
            text: 'Country',
            align: 'start',
            sortable: false,
            value: 'country'
        },
        { 
            text: 'Cases', 
            value: 'cases',
            sortable: false
        },
        { 
            text: 'Recovered', 
            value: 'recovered',
            sortable: false
        },
        { 
            text: 'Critical', 
            value: 'critical',
            sortable: false
        },
        { 
            text: 'Deaths', 
            value: 'deaths',
            sortable: false
        },
        { 
            text: 'Population', 
            value: 'population',
            sortable: false
        }
    ];

    tableStats: Array<TTableStats> = [];

    options = {
        itemsPerPage: 4
    };

    footerProps = {
        'items-per-page-options': [4, 16, -1]
    };

    serverItemsLength = 0;

    @Watch('options', { immediate: true, deep: true })
    onOptionsChanged(options: any) {
        const { itemsPerPage, page } = options;
        let start = 0,
            limit = itemsPerPage;

        if (page > 1) {
            start = ((page - 1) * itemsPerPage) + 1;
        }

        if (itemsPerPage < 0) {
            limit = Infinity;
        }

        this.fetchCountryStats(start, limit);
    }

    mounted() {
        this.fetchGlobalStats();
        this.fetchChartStats('casesStatsCollection', 'cases');
        this.fetchChartStats('deathsStatsCollection', 'deaths');
        this.fetchChartStats('recoveredStatsCollection', 'recovered');
    }

    /**
     * get the global stats for the overview stats box
     */
    async fetchGlobalStats() {
        
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
                    const { type, value } = doc.data();
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
    async fetchChartStats(collection: string, chart: string) {

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
                    day = unixTimeStamp.getDate();
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

    /**
     * Get country stats
     * @param {number} start the starting index
     * @param {number} limit the amount of rows to be fetched at once
     */
    async fetchCountryStats(start: number, limit: number) {

        //trigger the topbar loader
        this.$root.$emit('request-loading', true);

        try {

            const countryStatsCollection = await fb.countryStatsCollection.where('index', '>=', start).limit(limit).get();

            /**
             * Not efficient when there is a lot of doc (doc > 1000)
             * But for now it will work without issue
             * The proper way would be to create some kind of trigger when data is added to
             * the doc, then increment the count and store it on firebase, some kind of meta
             * data about the doc
             */
            if (this.serverItemsLength === 0) {
                this.serverItemsLength = (await fb.countryStatsCollection.get()).docs.length;
            }

            this.tableStats = [];

            if (countryStatsCollection) {
                countryStatsCollection.forEach((doc) => {
                    const { country, cases, recovered, critical, deaths, population } = doc.data();
                    this.tableStats.push({
                        country,
                        cases,
                        recovered,
                        critical,
                        deaths,
                        population
                    });
                });
            }

            this.$root.$emit('request-loading', false);

        } catch (error) {
            if (error) {
                this.$root.$emit('request-loading', false);
                console.log(error);
            }
        }
    }
}
</script>