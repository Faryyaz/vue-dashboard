<template>
    <div>
        <v-row class="pt-3">
            <v-col cols="12" md="3">
                <v-card>
                    <v-card-title class="pb-2">
                        <v-layout align-center>
                            <v-flex shrink>
                                <v-sheet
                                    color="primary"
                                    elevation="2"
                                    rounded
                                    class="v-sheet--offset"
                                >
                                    <v-icon color="white" size="64" dark>
                                        accessibility_new
                                    </v-icon>
                                </v-sheet>
                            </v-flex>
                            <v-flex class="text-right">
                                <div class="grey--text overline">Cases</div>
                                <h4 class="font-weight-light text--primary">
                                    112,437,714
                                </h4>
                            </v-flex>
                        </v-layout>
                    </v-card-title>
                    <v-card-text>
                        <v-divider></v-divider>
                        <div class="pt-2">
                            <v-icon>today</v-icon> Last 24 hours
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="3">
                <v-card>
                    <v-card-title class="pb-2">
                        <v-layout align-center>
                            <v-flex shrink>
                                <v-sheet
                                    color="pink"
                                    elevation="2"
                                    rounded
                                    class="v-sheet--offset"
                                >
                                    <v-icon color="white" size="64" dark>
                                        healing
                                    </v-icon>
                                </v-sheet>
                            </v-flex>
                            <v-flex class="text-right">
                                <div class="grey--text overline">Deaths</div>
                                <h4 class="font-weight-light text--primary">
                                    2,489,785
                                </h4>
                            </v-flex>
                        </v-layout>
                    </v-card-title>
                    <v-card-text>
                        <v-divider></v-divider>
                        <div class="pt-2">
                            <v-icon>today</v-icon> Last 24 hours
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="3">
                <v-card>
                    <v-card-title class="pb-2">
                        <v-layout align-center>
                            <v-flex shrink>
                                <v-sheet
                                    color="orange"
                                    elevation="2"
                                    rounded
                                    class="v-sheet--offset"
                                >
                                    <v-icon color="white" size="64" dark>
                                        priority_high
                                    </v-icon>
                                </v-sheet>
                            </v-flex>
                            <v-flex class="text-right">
                                <div class="grey--text overline">Critical</div>
                                <h4 class="font-weight-light text--primary">
                                    92,640
                                </h4>
                            </v-flex>
                        </v-layout>
                    </v-card-title>
                    <v-card-text>
                        <v-divider></v-divider>
                        <div class="pt-2">
                            <v-icon>today</v-icon> Last 24 hours
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="3">
                <v-card>
                    <v-card-title class="pb-2">
                        <v-layout align-center>
                            <v-flex shrink>
                                <v-sheet
                                    color="cyan"
                                    elevation="2"
                                    rounded
                                    class="v-sheet--offset"
                                >
                                    <v-icon color="white" size="64" dark>
                                        recommend
                                    </v-icon>
                                </v-sheet>
                            </v-flex>
                            <v-flex class="text-right">
                                <div class="grey--text overline">Recovered</div>
                                <h4 class="font-weight-light text--primary">
                                    87,994,433
                                </h4>
                            </v-flex>
                        </v-layout>
                    </v-card-title>
                    <v-card-text>
                        <v-divider></v-divider>
                        <div class="pt-2">
                            <v-icon>today</v-icon> Last 24 hours
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row class="pt-3">
            <v-col cols="12" md="4">
                <v-card>
                    <v-card-text>
                        <v-sheet
                            color="primary"
                            elevation="2"
                            rounded
                            class="v-sheet--offset"
                            width="100%"
                        >
                            <v-sparkline
                                :labels="casesPerDay.day"
                                :value="casesPerDay.value"
                                color="white"
                                line-width="2"
                                padding="16"
                                auto-draw
                                height="150px"
                            ></v-sparkline>
                        </v-sheet>
                        <v-divider></v-divider>
                        <div class="pt-2">
                            <v-icon>accessibility_new</v-icon> Total cases per
                            day for February 2021
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="4">
                <v-card>
                    <v-card-text>
                        <v-sheet
                            color="pink"
                            elevation="2"
                            rounded
                            class="v-sheet--offset"
                            width="100%"
                        >
                            <v-sparkline
                                :labels="deathsPerDay.day"
                                :value="deathsPerDay.value"
                                color="white"
                                line-width="2"
                                padding="16"
                                auto-draw
                                height="150px"
                            ></v-sparkline>
                        </v-sheet>
                        <v-divider></v-divider>
                        <div class="pt-2">
                            <v-icon>healing</v-icon> Total deaths per day for
                            February 2021
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="4"
                ><v-card>
                    <v-card-text>
                        <v-sheet
                            color="cyan"
                            elevation="2"
                            rounded
                            class="v-sheet--offset"
                            width="100%"
                        >
                            <v-sparkline
                                :labels="recoveredPerDay.day"
                                :value="recoveredPerDay.value"
                                color="white"
                                line-width="2"
                                padding="16"
                                auto-draw
                                height="150px"
                            ></v-sparkline>
                        </v-sheet>
                        <v-divider></v-divider>
                        <div class="pt-2">
                            <v-icon>recommend</v-icon> Total recovered per day
                            for February 2021
                        </div>
                    </v-card-text>
                </v-card>
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
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Overview extends Vue {
    recoveredPerDay = {
        day: [
            '01 feb',
            '02 feb',
            '03 feb',
            '04 feb',
            '05 feb',
            '06 feb',
            '07 feb',
        ],
        value: [200, 410, 390, 310, 460, 250, 240],
    };

    deathsPerDay = {
        day: [
            '01 feb',
            '02 feb',
            '03 feb',
            '04 feb',
            '05 feb',
            '06 feb',
            '07 feb',
        ],
        value: [10, 45, 60, 120, 250, 120, 100],
    };

    casesPerDay = {
        day: [
            '01 feb',
            '02 feb',
            '03 feb',
            '04 feb',
            '05 feb',
            '06 feb',
            '07 feb',
        ],
        value: [20000, 26555, 45000, 55000, 60000, 45422, 46752],
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

    footerProps = {
        'items-per-page-options': [4, 16, -1]
    }
}
</script>
<style lang="css" scoped>
.v-sheet--offset {
    top: -24px;
    position: relative;
}
</style>