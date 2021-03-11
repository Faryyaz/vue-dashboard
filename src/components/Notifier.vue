<template>
    <v-snackbar
        v-model="show"
        :color="snackbar.color"
        :multi-line="multiLine"
        :timeout="snackbar.timeout"
        top
        right
    >
        <v-layout align-center class="my-2">
            <v-flex shrink>
                <v-icon dark>
                    {{ snackbar.icon }}
                </v-icon>
            </v-flex>
            <v-flex class="ml-3">
                <h3 class="subheading mb-1">{{ snackbar.title }}</h3>
                <p class="mb-0" v-html="snackbar.message"></p>
            </v-flex>
        </v-layout>
        <v-btn      
            color="white"
            icon
            dark
            small
            @click="show = false"
            class="btn-absolute-right">
            <v-icon>close</v-icon>
        </v-btn>
    </v-snackbar>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    
})
</script>
<style scoped>
    .v-snack .v-snack__content {
        min-width: 400px;
        height: auto;
    }
    .btn-absolute-right {
        position: absolute;
        top: 8px;
        right: 8px;
    }
</style>