<template>
    <v-app-bar app dense elevation="1">
        <v-app-bar-nav-icon
            @click="$emit('toggle-sidebar')"
        ></v-app-bar-nav-icon>
        <v-toolbar-title>
            <div class="d-flex align-center">
                <v-icon class="mr-1">stacked_bar_chart</v-icon>
                <span class="font-weight-bold">Vue</span>
                <span class="">-Dasboard</span>
            </div>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" icon v-bind="attrs" v-on="on">
                    <v-icon>more_vert</v-icon>
                </v-btn>
            </template>
            <v-list>
                <v-list-item link>
                    <!-- <v-list-item-content > -->
                        <v-list-item-title @click.prevent="onLogout">Logout</v-list-item-title>
                    <!-- </v-list-item-content> -->
                </v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import store from '../store';

@Component
export default class TopBar extends Vue {
    onLogout() {
        store.dispatch('logout').then(() => {
            this.$router.push({ name: 'Login' });
        });
    }
}
</script>