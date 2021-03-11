<template>
    <v-app>
        <app-loader :loading="loading"></app-loader>
        <layout></layout>
        <notifier></notifier>
    </v-app>
</template>
<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator'
import Layout from './layout/Layout.vue'
import AppLoader from './components/AppLoader.vue'
import Notifier from './components/Notifier.vue'

@Component({
    components: {
        Layout,
        AppLoader,
        Notifier
    },
})
export default class App extends Vue {
    loading = false;
    
    created() {

        this.appLoading(true);

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
            // hide the loader
            setTimeout(() => {
                this.loading = false;
            }, 1000);
        }
    }
    
}
</script>
