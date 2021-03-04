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
                                    {{ item.email }}
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
                                        v-if="item.role === erole.admin">
                                        {{ item.role }}
                                    </v-chip>
                                    <v-chip small color="success" 
                                        outlined
                                        v-else-if="item.role === erole.staff">
                                        {{ item.role }}
                                    </v-chip>
                                    <v-chip small color="info" 
                                        outlined
                                        v-else-if="item.role === erole.visitor">
                                        {{ item.role }}
                                    </v-chip>
                                </td>
                                <td class="text-center">
                                    <template v-if="currentUser.email !== item.email">
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
                                            @click="showDeleteConfirmation(item.id, index)"
                                        >
                                            <v-icon>delete</v-icon>
                                        </v-btn>
                                    </template>
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
                        Edit role
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
import { TUser, ERole } from '../datamodels/User';
import * as fb from '../firebase'

@Component
export default class Users extends Vue {
    editDialog = false;
    deleteDialog = false;
    search = '';
    erole = ERole;
    currentUser = this.$store.state.preload.user;

    confirmDelete: {
        id: string | null;
        index: number | null;
    };

    headers: Array<Record<string, any>> = [
        {
            text: 'ID',
            align: 'start',
            sortable: false,
            value: 'id',
        },
        {
            text: 'Email',
            align: 'start',
            sortable: false,
            value: 'email',
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
            text: 'Role',
            align: 'start',
            sortable: true,
            value: 'role',
        },
        {
            text: '',
            align: 'center',
            value: 'action',
            sortable: false,
        },
    ];

    items: Array<TUser> = [];

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
        'email': {
            type: 'v-text-field',
            value: '',
            attr: {
                label: 'Email',
                name: 'email',
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
        'role': {
            type: 'v-select',
            value: '',
            attr: {
                label: 'Role',
                name: 'role',
                disabled: false,
                items: [
                    {
                        text: 'Admin',
                        value: 'admin'
                    },
                    {
                        text: 'Staff',
                        value: 'staff'
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
        this.confirmDelete = {
            id: null,
            index: null
        };
    }

    mounted() {
        this.loadUsers();
    }

    async loadUsers() {

        //trigger the topbar loader
        this.$root.$emit('request-loading', true);

        try {
            const usersCollection = await fb.usersCollection.get();
            if (usersCollection) {
                usersCollection.forEach((doc) => {
                    const { email, firstName, lastName, role } = doc.data();
                    this.items.push({
                        id: doc.id,
                        email,
                        firstName,
                        lastName,
                        role
                    });
                });

                this.$root.$emit('request-loading', false);
            }
        } catch(error) {
            if (error) {
                this.$root.$emit('request-loading', false);
            }
        }        
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

    showDeleteConfirmation(id: string, index: number) {
        this.confirmDelete = {
            id,
            index
        };
        this.deleteDialog = true;
    }

    /**
     * Delete a user from the table
     */
    async deleteUser() {

        //trigger the topbar loader
        this.$root.$emit('request-loading', true);

        try {

            if (this.confirmDelete.id !== null) {
                await fb.usersCollection.doc(this.confirmDelete.id).delete();

                this.items.splice((this.confirmDelete.index as number), 1);
                this.confirmDelete.index = this.confirmDelete.id = null;
                this.deleteDialog = false;
            }

            this.$root.$emit('request-loading', false);
            
        } catch(error) {
            if (error) {
                this.$root.$emit('request-loading', false);
            }
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
    async editUser() {

        //trigger the topbar loader
        this.$root.$emit('request-loading', true);

        try {

            const id: string = this.editForm.id.value;
            const role: string = this.editForm.role.value;

            if (id !== null) {
                await fb.usersCollection.doc(id).update({
                    role: role
                });

                this.items.forEach((user: TUser) => {
                    if (user.id === id) {
                        this.$set(user, 'role', role);
                    }
                });
            }

            this.editDialog = false;
            this.$root.$emit('request-loading', false);
            
        } catch(error) {
            if (error) {
                this.editDialog = false;
                this.$root.$emit('request-loading', false);
            }
        }
    }
}
</script>