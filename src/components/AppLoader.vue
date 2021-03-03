<template>
    <transition name="fade">
        <div class="app-loader" v-if="loading">
            <v-layout align-center justify-center fill-height>
                <v-flex shrink>
                    <v-progress-linear
                        color="secondary"
                        absolute
                        top
                        indeterminate
                        height="4"
                    ></v-progress-linear>
                    <div class="d-flex align-center">
                        <v-icon
                            size="65"
                            style="margin-left: -18px"
                            class="mr-1">
                            stacked_bar_chart</v-icon>
                        <span style="font-size: 55px" class="font-weight-bold">Vue</span>
                        <span style="font-size: 55px">-Dasboard</span>
                    </div>
                </v-flex>
            </v-layout>
        </div>
    </transition>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class AppLoader extends Vue {
    @Prop({ default: false })
    loading!: boolean;
}
</script>
<style lang="css">
    .app-loader {
        background-color: #f1f1f1;
        width: 100%;
        height: 100%;
        z-index: 1000;
        position: absolute;
    }
</style>
<style lang="css" scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.25s ease-in;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0
    }
</style>