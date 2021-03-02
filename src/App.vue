<template>
    <v-app>
        <loader :loading="loading"></loader>
        <layout></layout>
    </v-app>
</template>
<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator'
import Layout from './layout/Layout.vue'
import Loader from './components/Loader.vue'

@Component({
    components: {
        Layout,
        Loader,
    },
})
export default class App extends Vue {
    loading = false;
    
    mounted() {

        // listen for loading event
        this.$root.$on('app-loading', () => {
            this.loading = true;
        });

        // listen for when loading event is done
        this.$root.$on('app-loaded', () => {
            
            // add a small delay to make it smoother
            setTimeout(() => {
                this.loading = false;
            }, 800);
        });
    }
    
}
</script>
