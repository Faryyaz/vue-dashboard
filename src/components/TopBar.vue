<template>
    <v-app-bar app dense elevation="1">
        <v-app-bar-nav-icon @click="$emit('toggle-sidebar')"></v-app-bar-nav-icon>
        <v-toolbar-title>
            <div class="d-flex align-center">
                <v-icon class="mr-1">star_half</v-icon>
                <span class="font-weight-bold">Vue</span>
                <span class="">-Dasboard</span>
            </div>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
            <v-icon>more_vert</v-icon>
        </v-btn>
    </v-app-bar>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class TopBar extends Vue {}
</script>