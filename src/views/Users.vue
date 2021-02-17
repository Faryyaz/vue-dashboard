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
                                    <v-chip small color="orange darken-1" 
                                        outlined
                                        v-if="item.accountType === eAccountType.admin">
                                        {{ item.accountType }}
                                    </v-chip>
                                    <v-chip small color="info" 
                                        outlined
                                        v-else-if="item.accountType === eAccountType.visitor">
                                        {{ item.accountType }}
                                    </v-chip>
                                </td>
                                <td class="text-center">
                                    <v-btn 
                                        class="ma-2" 
                                        icon 
                                        color="primary"
                                        @click="onEditUser(item)"
                                    >
                                        <v-icon>create</v-icon>
                                    </v-btn>
                                    <v-btn
                                        class="ma-2"
                                        icon
                                        color="red darken-2"
                                        @click="showDeleteConfirmation(index)"
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
            <v-dialog v-model="editDialog" width="500" persistent>
                <v-card>
                    <v-card-title class="headline blue-grey darken-4 white--text">
                        Edit account type
                    </v-card-title>
                    <v-card-text class="pt-4">
                        <template v-for="field in editForm">
                            <component
                                :key="field.attr.name"
                                :is="field.type"
                                v-model="field.value"
                                v-bind="field.attr"
                            ></component>
                        </template>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn depressed @click="editDialog = false">
                            Cancel
                        </v-btn>
                        <v-btn depressed color="primary" @click="editUser()">
                            Save
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <!-- delete dialog -->
            <v-dialog v-model="deleteDialog" width="500" persistent>
                <v-card>
                    <v-card-title class="headline blue-grey darken-4 white--text">
                        Delete confirmation
                    </v-card-title>
                    <v-card-text class="pt-4">
                        Are you sure you want to delete this record?
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn depressed @click="deleteDialog = false">
                            Cancel
                        </v-btn>
                        <v-btn depressed color="primary" @click="deleteUser()">
                            Confirm
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-col>
    </v-row>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { TUser, EAccountType } from '../datamodels/User';

@Component
export default class Users extends Vue {
    editDialog = false;
    deleteDialog = false;
    search = '';
    eAccountType = EAccountType;

    confirmDeleteIndex: number|null;
    headers: Array<Record<string, any>> = [
        {
            text: 'ID',
            align: 'start',
            sortable: false,
            value: 'id',
        },
        {
            text: 'First name',
            align: 'start',
            sortable: false,
            value: 'firstName',
        },
        {
            text: 'Last name',
            align: 'start',
            sortable: false,
            value: 'lastName',
        },
        {
            text: 'Account type',
            align: 'start',
            sortable: true,
            value: 'accountType',
        },
        {
            text: '',
            align: 'center',
            value: 'action',
            sortable: false,
        },
    ];

    items: Array<TUser> = [
        {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            accountType: 'admin',
        },
        {
            id: 2,
            firstName: 'Jane',
            lastName: 'Smith',
            accountType: 'visitor',
        },
        {
            id: 3,
            firstName: 'Tom',
            lastName: 'Hardy',
            accountType: 'visitor',
        },
        {
            id: 4,
            firstName: 'Nicola',
            lastName: 'Cage',
            accountType: 'visitor',
        }
    ];


    editForm: { [key: string]: any } = {
        'id': {
            type: 'v-text-field',
            value: '',
            attr: {
                label: 'ID',
                name: 'id',
                disabled: true
            }
        },
        'firstName': {
            type: 'v-text-field',
            value: '',
            attr: {
                label: 'First Name',
                name: 'firstName',
                disabled: true
            }
        },
        'lastName': {
            type: 'v-text-field',
            value: '',
            attr: {
                label: 'Last Name',
                name: 'lastName',
                disabled: true
            }
        },
        'accountType': {
            type: 'v-select',
            value: '',
            attr: {
                label: 'Account Type',
                name: 'accountType',
                disabled: false,
                items: [
                    {
                        text: 'Admin',
                        value: 'admin'
                    },
                    {
                        text: 'Visitor',
                        value: 'visitor'
                    }
                ]
            }
        }
    }

    constructor () {
        super();
        this.confirmDeleteIndex = null;
    }

    /**
     * Search for a specific user
     * @param {string} value
     * @param {string} search
     */
    searchUser(value: string, search: string) {
        return (
            value != null &&
            search != null &&
            typeof value === 'string' &&
            value.toString().indexOf(search) !== -1
        );
    }

    showDeleteConfirmation(index: number) {
        this.confirmDeleteIndex = index;
        this.deleteDialog = true;
    }

    /**
     * Delete a user from the table
     */
    deleteUser() {
        //@TODO place this in axios when it is a success
        if (this.confirmDeleteIndex !== null) {
            this.items.splice(this.confirmDeleteIndex, 1);
            this.confirmDeleteIndex = null;
            this.deleteDialog = false;
        }
    }

    /**
     * show the edit dialog
     */
    onEditUser(user: any) {
        this.editDialog = true;
        for (const property in this.editForm) {
            this.editForm[property].value = user[property];
        }
    }

    /**
     * edit the user and save
     */
    editUser() {
        const id: number = this.editForm.id.value;

        //@TODO place this in axios when it is a success
        this.items.forEach((user: TUser) => {
            if (user.id === id) {
                this.$set(user, 'accountType', this.editForm.accountType.value);
            }
        });
        this.editDialog = false;
    }
}
</script>