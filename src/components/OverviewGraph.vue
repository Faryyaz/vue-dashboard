<template>
    <v-card height="100%">
        <v-card-text>
            <v-sheet
                :color="stat.color"
                elevation="2"
                rounded
                width="100%"
                class="v-sheet--offset"
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
            <v-divider class="my-2"></v-divider>
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