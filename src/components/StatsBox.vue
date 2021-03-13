<template>
    <v-card>
        <v-card-title class="pb-2">
            <v-layout align-center>
                <v-flex shrink>
                    <v-sheet
                        :color="stat.icon.color"
                        elevation="2"
                        rounded
                        class="v-sheet--offset"
                    >
                        <v-icon color="white" size="64" dark>
                            {{ stat.icon.name }}
                        </v-icon>
                    </v-sheet>
                </v-flex>
                <v-flex class="text-right">
                    <div class="grey--text overline">{{ stat.title }}</div>
                    <h4 class="font-weight-light text--primary">
                        {{ stat.value|formatNumber() }}
                    </h4>
                </v-flex>
            </v-layout>
        </v-card-title>
        <v-card-text>
            <v-divider></v-divider>
            <div class="pt-2">
                <v-icon>today</v-icon> {{ stat.subText }}
            </div>
        </v-card-text>
    </v-card>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class StatsBox extends Vue {
    @Prop({ 
        default: {
            title: ' - ',
            icon: {
                name: '',
                color: 'primary'
            },
            value: 0,
            subText: 'Last 24 hours'
        } 
    })
    stat!: { title: string; icon: { name: string; color: string }; value: number; subText: string }
}
</script>

