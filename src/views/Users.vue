<template>
    <v-row>
        <v-col cols="12" sm="12" xl="8">
            <v-card>
                <v-card-title>Manage Users</v-card-title>
                <v-card-text>
                    <v-data-table
                        :headers="headers"
                        :items="items"
                        :search="search"
                    >
                        <template v-slot:top>
                            <v-text-field
                                v-model="search"
                                label="Search"
                                class="mx-4"
                                append-icon="mdi-magnify"
                                :custom-filter="searchUser"
                            ></v-text-field>
                        </template>
                        <template v-slot:item="{ item, index }">
                            <tr>
                                <td>
                                    {{ item.id }}
                                </td>
                                <td>
                                    {{ item.firstName }}
                                </td>
                                <td>
                                    {{ item.lastName }}
                                </td>
                                <td>
                                    {{ item.accountType }}
                                </td>
                                <td class="text-center">
                                    <v-btn 
                                        class="ma-2" 
                                        icon 
                                        color="primary"
                                        @click="editUser(item)"
                                    >
                                        <v-icon>create</v-icon>
                                    </v-btn>
                                    <v-btn
                                        class="ma-2"
                                        icon
                                        color="red darken-2"
                                        @click="deleteUser(index)"
                                    >
                                        <v-icon>delete</v-icon>
                                    </v-btn>
                                </td>
                            </tr>
                        </template>
                    </v-data-table>
                </v-card-text>
            </v-card>

            <!-- edit dialog -->
            <v-dialog v-model="dialog" width="500">
                <v-card>
                    <v-card-title class="headline blue-grey darken-4 white--text">
                        Edit account type
                    </v-card-title>
                    <v-card-text>
                        //@TODO complete this content
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn depressed @click="dialog = false">
                            Cancel
                        </v-btn>
                        <v-btn depressed color="primary" >
                            Save
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <!-- @TODO add delete dialog -->
        </v-col>
    </v-row>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TUser from "../datamodels/User";

@Component
export default class Users extends Vue {
    dialog = false;
    search = '';
    headers: Array<Record<string, any>> = [
        {
            text: "ID",
            align: "start",
            sortable: false,
            value: "id",
        },
        {
            text: "First name",
            align: "start",
            sortable: false,
            value: "firstName",
        },
        {
            text: "Last name",
            align: "start",
            sortable: false,
            value: "lastName",
        },
        {
            text: "Account type",
            align: "start",
            sortable: true,
            value: "accountType",
        },
        {
            text: "",
            align: "center",
            value: "action",
            sortable: false,
        },
    ];

    items: Array<TUser> = [
        {
            id: 1,
            firstName: "John",
            lastName: "Doe",
            accountType: "admin",
        },
        {
            id: 2,
            firstName: "Jane",
            lastName: "Smith",
            accountType: "visitor",
        },
        {
            id: 3,
            firstName: "Tom",
            lastName: "Hardy",
            accountType: "visitor",
        },
        {
            id: 4,
            firstName: "Nicola",
            lastName: "Cage",
            accountType: "visitor",
        }
    ];

    //@TODO define form for dialog

    /**
     * Search for a specific user
     * @param {string} value
     * @param {string} search
     */
    searchUser(value: string, search: string) {
        return (
            value != null &&
            search != null &&
            typeof value === "string" &&
            value.toString().indexOf(search) !== -1
        );
    }

    /**
     * Delete a user from the table
     * @param {number} index
     */
    deleteUser(index: number) {
        // @TODO add delete dialog
        //@TODO place this in axios when it is a success
        this.items.splice(index, 1);
    }

    /**
     * edit user's account type
     */
    editUser(user: TUser) {
        this.dialog = true;
    }
}
</script>