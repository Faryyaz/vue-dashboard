<template>
    <v-main>
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </v-main>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Home extends Vue {}
</script>