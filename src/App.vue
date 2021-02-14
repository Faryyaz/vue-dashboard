<template>
    <v-app>
        <component :is="layout"></component>
    </v-app>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import Default from './layout/Default.vue'
import NoSideBar from './layout/NoSideBar.vue'

@Component({
    components: {
        Default,
        NoSideBar
    }
})
export default class App extends Vue {
    layout: string = this.$route.meta.layout;
}
</script>
