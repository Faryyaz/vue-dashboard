<template>
    <v-snackbar
        v-model="isVisible"
        :color="color"
        :multi-line="multiLine"
        :timeout="timeout"
        top
        right
    >
        <v-layout align-center class="my-2">
            <v-flex shrink>
                <v-icon dark>
                    {{ icon }}
                </v-icon>
            </v-flex>
            <v-flex class="ml-3">
                <h3 class="subheading mb-1">{{ title }}</h3>
                <p class="mb-0" v-html="message"></p>
            </v-flex>
        </v-layout>
        <v-btn      
            color="white"
            icon
            dark
            small
            @click="isVisible = false"
            class="btn-absolute-right">
            <v-icon>close</v-icon>
        </v-btn>
    </v-snackbar>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { INotifier, EColors, ENotificationLevel } from '../Interfaces/Interfaces'

@Component
export default class Notifier extends Vue implements INotifier {
    isVisible = false;
    color = EColors.success;
    multiLine = true;
    timeout = 15000; // 15secs
    icon = '';
    title = '';
    message = '';

    mounted() {
        this.$root.$on('successful-notification', () => {
            this.show(ENotificationLevel.success);
        });

        this.$root.$on('failed-notification', (errorMessage: string) => {
            this.show(ENotificationLevel.error, errorMessage);
        });
    }

    show(notificationLevel: ENotificationLevel, message: string|null = null) {

        switch (notificationLevel) {

            default:
            case ENotificationLevel.success:
                this.title = 'Success';
                this.icon = 'check_circle';
                this.color = EColors.success;
                this.message = 'The action has been performed successfully';
                break;

            case ENotificationLevel.error:
                this.title = 'Error';
                this.icon = 'error';
                this.color = EColors.error;
                this.message = message || 'An unknown error has occured. Please retry again later.';
                break;
        }

        this.isVisible = true;
    }

}
</script>
<style scoped>
    .v-snack /deep/ .v-snack__wrapper {
        min-width: 400px;
        height: auto;
        max-width: 400px;
    }
    
    .btn-absolute-right {
        position: absolute;
        top: 8px;
        right: 8px;
    }
</style>