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

    get layout() {
        return this.$route.meta.layout || 'default';
    }
}
</script>