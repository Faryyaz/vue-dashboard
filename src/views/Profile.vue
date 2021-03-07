<template>
<v-layout wrap>
    <v-flex class="pa-1">
        <v-form @submit.prevent="updateProfile" v-model="valid">
            <v-card>
                <v-card-title>Manage User Profile</v-card-title>
                <v-card-text>
                    <template v-for="field in form">
                        <component 
                            :prepend-icon="field.icon"
                            :key="field.attr.name" 
                            :is="field.type"
                            v-model="field.value"
                            v-bind="field.attr">
                        </component>
                    </template>
                </v-card-text>
                <v-card-actions>
                    <v-btn 
                        type="submit" 
                        color="primary" 
                        block 
                        depressed
                        :disabled="!valid"
                        x-large>
                        Update
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-flex>
    <v-flex class="pa-1" shrink>
        <v-card max-width="250">
            <v-sheet
                height="150px"
                color="primary">
                <v-layout align-center fill-height>
                    <v-flex class="text-center">
                        <v-icon dark size="100">face</v-icon>
                    </v-flex>
                </v-layout>
            </v-sheet>
            <v-card-title>{{ userProfileData.firstName }} {{ userProfileData.lastName }}</v-card-title>
            <v-card-subtitle>{{ userProfileData.email }}</v-card-subtitle>
            <v-card-text>
                <div>
                    Some features may or may not be available to users based on
                    role.
                </div>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>

            <v-card-title>Role</v-card-title>

            <v-card-text>                
                <v-chip 
                    color="primary" 
                    :active="userProfileData.role === erole.admin">
                    Admin
                </v-chip>

                <v-chip
                    color="primary" 
                    :active="userProfileData.role === erole.staff">
                    Staff
                </v-chip>

                <v-chip 
                    color="primary" 
                    :active="userProfileData.role === erole.visitor">
                    Visitor
                </v-chip>
            </v-card-text>
        </v-card>
    </v-flex>
</v-layout>
    
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import * as fb from '../firebase'
import { ERole } from '../datamodels/User'

@Component
export default class Profile extends Vue {
    valid = false;
    erole = ERole;
    form = {
        email: {
            type: 'v-text-field',
            value: '',
            icon: 'email',
            isUserProfile: true,
            attr: {
                label: 'Email',
                name: 'email',
                required: true
            }
        },
        firstName: {
            type: 'v-text-field',
            value: '',
            icon: 'badge',
            isUserProfile: true,
            attr: {
                label: 'First name',
                name: 'firstName',
                required: true
            }
        },
        lastName: {
            type: 'v-text-field',
            value: '',
            icon: 'badge',
            isUserProfile: true,
            attr: {
                label: 'Last name',
                name: 'lastName',
                required: true
            }
        },
        role: {
            type: 'v-select',
            value: '',
            icon: 'accessibility',
            isUserProfile: true,
            attr: {
                label: 'Role',
                name: 'role',
                required: true,
                items: [
                    { text: 'Admin', value: 'admin' },
                    { text: 'Staff', value: 'staff' },
                    { text: 'Visitor', value: 'visitor' }
                ]
            }
        },
        changePassword: {
            type: 'v-switch',
            value: false,
            attr: {
                label: 'Change password'
            }
        },
        password: {
            type: 'v-text-field',
            value: '',
            icon: 'lock',
            attr: {
                type: 'password',
                label: 'Password',
                name: 'password',
                disabled: true,
                required: true
            }
        },
        confirmPassword: {
            type: 'v-text-field',
            value: '',
            icon: 'lock',
            attr: {
                type: 'password',
                label: 'Confirm password',
                name: 'confirmPassword',
                disabled: true,
                required: true
            }
        }
    }

    @Watch('form.changePassword.value')
    onChangePassword(value: boolean) {
        this.form.password.attr.disabled = !value;
        this.form.confirmPassword.attr.disabled = !value;
    }

    @Watch('$store.state.preload.user', { immediate: true, deep: true })
    onChangeProfile(user: any) {
        if (user) {
            for (const property in user) {
                const formField = (this.form as any)[property];
                if (formField !== undefined) {
                    this.$set(formField, 'value', user[property]);
                }
            }
        }
    }

    get userProfileData() {
        return this.$store.state.preload.user;
    }

    // @TODO update auth email and password
    async updateProfile() {
        if (this.valid) {
            const updatedProfile: any = {};
            const uid = this.userProfileData.id;

            //trigger the topbar loader
            this.$root.$emit('request-loading', true);

            for(const property in this.form) {
                const formField = (this.form as any)[property];
                if (formField.isUserProfile) {
                    updatedProfile[property] = formField.value;
                }
            }

            await fb.usersCollection.doc(uid).update(updatedProfile);

            this.$store.commit('setUserProfile', { id: uid, ...updatedProfile });
            
            // hide the loader
            this.$root.$emit('request-loading', false);
        }
    }
}
</script>