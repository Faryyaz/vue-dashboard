<template>
    <v-app-bar color="white" app dense elevation="1">
        <v-app-bar-nav-icon
            @click="toggleSidebar()"
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
                <v-list-item link @click.prevent="onLogout">
                    <v-list-item-title>Logout</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
        <v-progress-linear
            v-if="loading"
            color="secondary"
            absolute
            top
            indeterminate
        ></v-progress-linear>
    </v-app-bar>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class TopBar extends Vue {
    loading = false;

    mounted() {
        this.$root.$on('request-loading', (value: boolean) => {
            this.loading = value;
        })
    }

    onLogout() {

        // show the app loader
        this.$root.$emit('app-loading', true);

        // make it smoother
        setTimeout(() => {
            this.$store.dispatch('logout').then(() => {

                //back to login
                this.$router.push('/login');

                // hide the app loader
                this.$root.$emit('app-loading', false);

                // remove the user profile state
                this.$store.commit('unsetUserProfile');
            });
        }, 300);        
    }

    toggleSidebar() {
        this.$root.$emit('toggle-sidebar');
    }
}
</script>