<template>
    <v-layout fill-height align-center>
        <v-flex>
            <v-card max-width="550px" class="mx-auto">
                <v-card-title class="pt-6">
                    <div class="d-flex align-center mx-auto">
                        <v-icon
                            size="65"
                            style="margin-left: -18px"
                            class="mr-1"
                            >stacked_bar_chart</v-icon>
                        <span style="font-size: 55px" class="font-weight-bold">Vue</span>
                        <span style="font-size: 55px">-Dasboard</span>
                    </div>
                </v-card-title>
                <v-tabs
                    v-model="tab"
                    fixed-tabs
                    background-color="primary"
                    hide-slider
                    dark
                    active-class="primary darken-1"
                    icons-and-text>
                    <template v-for="tab in tabs">
                        <v-tab ripple :key="tab.title">
                            {{ tab.title }}
                            <v-icon>{{ tab.icon }}</v-icon>
                        </v-tab>
                    </template>
                    <v-tabs-items v-model="tab">
                        <template v-for="(tab, index) in tabs">
                            <v-tab-item :key="index" class="py-5 px-10">
                                <component :is="tab.component"></component>
                            </v-tab-item>
                        </template>
                    </v-tabs-items>
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
        login: {
            title: "Login",
            component: Login,
            icon: "account_circle",
        },
        signUp: {
            title: "Sign Up",
            component: SignUp,
            icon: "app_registration",
        },
    };

    get tab() {
        if (this.$route.name === 'SignUp') {
            return 1;
        }
        return 0;
    }

    set tab(value: number) {
        if (value === 1) {
            this.$router.push({ name: 'SignUp' });
        } else {
            this.$router.push({ name: 'Login' });
        }
    }
}
</script>