<template>
    <v-app>
        <app-loader :loading="loading"></app-loader>
        <layout></layout>
    </v-app>
</template>
<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator'
import Layout from './layout/Layout.vue'
import AppLoader from './components/AppLoader.vue'

@Component({
    components: {
        Layout,
        AppLoader,
    },
})
export default class App extends Vue {
    loading = false;
    
    created() {

        // listen for loading event
        this.$root.$on('app-loading', (value: boolean) => {
            this.appLoading(value);
        });

        this.$store.watch(
            (state) => {
                return this.$store.state.preloadInitialized;
            },
            (value: boolean) => {
                if (this.$route.meta.requiresAuth) {
                    // bug here this.$route = overview when logout why?
                    console.log('Log out', this.$route);
                    this.appLoading(!value);
                } else {
                    this.appLoading(false);
                }
            },
            { immediate: true }
        );
    }

    appLoading(value: boolean) {
        if (value) {

            // show the loader
            this.loading = true;
        } else {

            // add a small delay to make it smoother
            setTimeout(() => {
                this.loading = false;
            }, 800);
        }
    }
    
}
</script>
