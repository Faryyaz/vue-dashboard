<template>
    <v-app>
        <layout></layout>
    </v-app>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import Layout from './layout/Layout.vue'

@Component({
    components: {
        Layout
    }
})
export default class App extends Vue {}
</script>
