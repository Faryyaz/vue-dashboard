<template>
    <v-layout fill-height align-center>
        <v-flex>
            <v-card max-width="550px" class="mx-auto">
                <v-card-title class="pt-6">
                    <div class="d-flex align-center mx-auto">
                        <v-icon size="65" style="margin-left: -18px" class="mr-1">stacked_bar_chart</v-icon>
                        <span style="font-size: 55px" class="font-weight-bold">Vue</span>
                        <span style="font-size: 55px">-Dasboard</span>
                    </div>
                </v-card-title>
                <v-tabs fixed-tabs
                    background-color="primary"
                    hide-slider
                    dark>
                    <template v-for="name in tabs.names">
                        <v-tab ripple :key="name">{{ name }}</v-tab>
                    </template>
                    <template v-for="(component, index) in tabs.components">
                        <v-tab-item :key="index" class="py-5 px-10">
                            <component :is="component"></component>
                        </v-tab-item>
                    </template>
                </v-tabs>
            </v-card>
        </v-flex>
    </v-layout>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Login from "./Login.vue";
import SignUp from "./SignUp.vue";

@Component({
    components: {
        Login,
        SignUp,
    },
})
export default class Account extends Vue {
    tabs = {
        names: ["Login", "Sign up"],
        components: [Login, SignUp],
    };
}
</script>