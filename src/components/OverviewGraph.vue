<template>
    <v-card>
        <v-card-text>
            <v-sheet
                :color="stat.color"
                elevation="2"
                rounded
                class="v-sheet--offset"
                width="100%"
            >
                <v-sparkline
                    :labels="stat.labels"
                    :value="stat.value"
                    color="white"
                    line-width="2"
                    padding="16"
                    auto-draw
                    height="150px"
                ></v-sparkline>
            </v-sheet>
            <v-divider></v-divider>
            <div class="pt-2">
                <v-icon>{{ stat.icon }}</v-icon> {{ stat.title }}
            </div>
        </v-card-text>
    </v-card>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class OverviewGraph extends Vue {

    @Prop({ 
        default: {
            title: ' - ',
            icon: '',
            color: 'primary',
            labels: [],
            value: []
        } 
    })
    stat!: { title: string; icon: string; color: string; labels: Array<string>; value: Array<number> }
}
</script>