<template>
    <main>
        <top-bar></top-bar>
        <side-bar></side-bar>
        <v-main>
            <v-container>
                <transition name="fade" mode="out-in">
                    <router-view></router-view>
                </transition>
            </v-container>
        </v-main>
    </main>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SideBar from '../components/SideBar.vue'
import TopBar from '../components/TopBar.vue'

@Component({
    components: {
        SideBar,
        TopBar
    },
})
export default class Default extends Vue { }
</script>
<style lang="scss">
.fade-enter-active,
.fade-leave-active {
    transition-duration: 0.3s;
    transition-property: opacity;
    transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
    opacity: 0;
}
</style>