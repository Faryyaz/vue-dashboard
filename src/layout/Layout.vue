<template>
    <v-app>
        <component :is="layout"></component>
    </v-app>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import Default from './Default.vue'
import NoSideBar from './NoSideBar.vue'

@Component({
    components: {
        Default,
        NoSideBar
    }
})
export default class Layout extends Vue {
    layout: string = this.$route.meta.layout;

    mounted() {
        console.log("the layout: ", this.layout);
    }
}
</script>