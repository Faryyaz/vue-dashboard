<template>
    <v-navigation-drawer
        v-model="drawer"
        app
        class="blue-grey darken-3"
        dark
    >
        <template v-slot:prepend>
            <v-list-item two-line class="blue-grey darken-4">
                <v-list-item-icon>
                    <v-icon>face</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{ fullName }}</v-list-item-title>
                    <v-list-item-subtitle>{{ role }}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </template>
        <v-list>
            <template v-for="item in items">
                <template v-if="item.permissions.includes(role)">
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

                            <template v-for="child in item.items">
                                <template v-if="child.permissions.includes(role)">
                                    <v-list-item
                                        color="white"
                                        :key="child.title"
                                        :to="{ name: child.to }">
                                        <v-list-item-content>
                                            <v-list-item-title
                                                v-text="child.title"
                                            ></v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </template>
                            </template>
                        </v-list-group>
                    </template>
                </template>
            </template>
        </v-list>
    </v-navigation-drawer>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { ERole } from '../datamodels/User'

@Component
export default class SideBar extends Vue {
    @Prop({ default: true })
    value!: boolean;

    items: Array<any> = [
        {
            title: "Dashboard",
            icon: "dashboard",
            active: true,
            items: [
                {
                    title: "Overview",
                    to: "Overview",
                    permissions: [ ERole.admin, ERole.staff, ERole.visitor ]
                },
                {
                    title: "Analytics",
                    to: "Analytics",
                    permissions: [ ERole.admin, ERole.staff ]
                },
            ],
            permissions: [ ERole.admin, ERole.staff, ERole.visitor ]
        },
        {
            title: "Profile",
            icon: "account_box",
            to: "Profile",
            permissions: [ ERole.admin, ERole.staff, ERole.visitor ]
        },
        {
            title: "Admin",
            icon: "gavel",
            active: false,
            items: [
                {
                    title: "Users",
                    to: "Users",
                    icon: "gavel",
                    permissions: [ ERole.admin ]
                },
            ],
            permissions: [ ERole.admin ]
        },
        {
            title: "About",
            icon: "help",
            to: "About",
            permissions: [ ERole.admin, ERole.staff, ERole.visitor ]
        },
    ];

    get drawer() {
        return this.value;
    }

    set drawer(value: boolean) {
        this.$emit('toggle-sidebar', value);
    }

    get fullName() {
        const user = this.$store.state.preload.user;
        return `${user.firstName} ${user.lastName}`;
    }

    get role() {
        const user = this.$store.state.preload.user;
        return user.role;
    }
}
</script>