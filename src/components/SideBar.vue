<template>
    <v-navigation-drawer
        :mini-variant="miniVariant"
        app
        class="blue-grey darken-3"
        dark
        permanent
    >
        <template v-slot:prepend>
            <v-list-item two-line class="blue-grey darken-4">
                <v-list-item-icon>
                    <v-icon>face</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>Jane Smith</v-list-item-title>
                    <v-list-item-subtitle>Admin</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </template>
        <v-list>
            <template v-for="item in items">
                <template v-if="item.hasOwnProperty('to')">
                    <v-list-item
                        :key="item.title"
                        :to="{ name: item.to }"
                    >
                        <v-list-item-icon>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title 
                                v-text="item.title">
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </template>
                <template v-else>
                    <v-list-group
                        :key="item.title"
                        v-model="item.active"
                        :prepend-icon="item.icon"
                        no-action
                        color="white"
                    >
                        <template v-slot:activator>
                            <v-list-item-content>
                                <v-list-item-title
                                    :key="item.title"
                                    v-text="item.title"
                                ></v-list-item-title>
                            </v-list-item-content>
                        </template>

                        <v-list-item
                            color="white"
                            v-for="child in item.items"
                            :key="child.title"
                            :to="{ name: child.to }"
                        >
                            <v-list-item-content>
                                <v-list-item-title
                                    v-text="child.title"
                                ></v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-group>
                </template>
            </template>
        </v-list>
    </v-navigation-drawer>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class SideBar extends Vue {
    @Prop({ default: false })
    miniVariant!: boolean;

    items: Array<any> = [
        {
            title: "Dashboard",
            icon: "dashboard",
            active: true,
            items: [
                {
                    title: "Overview",
                    to: "Overview",
                },
                {
                    title: "Analytics",
                    to: "Analytics",
                },
            ],
        },
        {
            title: "Account",
            icon: "account_box",
            to: "Account",
        },
        {
            title: "Admin",
            icon: "gavel",
            active: false,
            items: [
                {
                    title: "Users",
                    to: "Users",
                },
            ],
        },
    ];
}
</script>