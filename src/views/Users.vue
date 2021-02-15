<template>
    <v-card>
        <v-card-title>Manage Users</v-card-title>
        <v-card-text>
            <v-data-table
                :headers="headers"
                :items="items"
            >
                <template v-slot:item="{ item }">
                    <tr>
                        <td>
                            {{ item.firstName }}
                        </td>
                        <td>
                            {{ item.lastName }}
                        </td>
                        <td>
                            {{ item.accountType }}
                        </td>
                        <td>
                            
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </v-card-text>
    </v-card>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Users extends Vue {
    headers: Array<Record<string, any>> = [
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
            sortable: false,
            value: 'accountType',
        },
        {
            text: '',
            value: 'action'
        }        
    ];

    items: Array<Record<string, any>> = [
        {
            firstName: 'John',
            lastName: 'Doe',
            accountType: 'admin',
        },
        {
            firstName: 'Jane',
            lastName: 'Smith',
            accountType: 'visitor',
        }
    ];
}
</script>