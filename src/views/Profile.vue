<template>
    <v-card max-width="374">
        <v-sheet
            height="150px"
            color="primary">
            <v-layout align-center fill-height>
                <v-flex class="text-center">
                    <v-icon dark size="100">face</v-icon>
                </v-flex>
            </v-layout>
        </v-sheet>

        <v-card-title>Jane Smith</v-card-title>
        <v-card-text>
            <div>
                This user has access to admin section.
            </div>
        </v-card-text>

        <v-divider class="mx-4"></v-divider>

        <v-card-title>Account type</v-card-title>

        <v-card-text>
            <v-chip-group
                v-model="selection"
                active-class="primary white--text"
                column
            >
                <v-chip>Visitor</v-chip>

                <v-chip>Staff</v-chip>

                <v-chip>Admin</v-chip>
            </v-chip-group>
        </v-card-text>
    </v-card>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Profile extends Vue {
    selection = 2;
    loading = false;

    change() {
        return;
    }
}
</script>