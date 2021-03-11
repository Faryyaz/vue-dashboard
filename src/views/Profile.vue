<template>
<v-layout wrap>
    <v-flex lg6 class="pa-1">
        <v-form ref="profileForm" @submit.prevent="updateProfile" v-model="valid">
            <v-card>
                <v-card-title>Manage User Profile</v-card-title>
                <v-card-text>
                    <template v-for="field in form">
                        <component 
                            :prepend-icon="field.icon"
                            :key="field.attr.name" 
                            :is="field.type"
                            @input="passwordConfirmationRule(field.attr.name)"
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
                        :disabled="!isValid"
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
import firebase from 'firebase/app'
import { ERole } from '../datamodels/User'
import * as _ from 'lodash'
import { ValidationRules } from '../utils'

@Component
export default class Profile extends Vue {
    valid = false;
    erole = ERole;
    validationRules = new ValidationRules();
    updatedProfile: any = {};

    form = {
        email: {
            type: 'v-text-field',
            value: '',
            icon: 'email',
            isUserProfile: true,
            attr: {
                label: 'Email',
                name: 'email',
                required: true,
                rules: [this.validationRules.required, this.validationRules.email]
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
                required: true,
                rules: [this.validationRules.required]
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
                required: true,
                rules: [this.validationRules.required]
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
                rules: [this.validationRules.required],
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
        oldPassword: {
            type: 'v-text-field',
            value: '',
            icon: 'lock',
            attr: {
                type: 'password',
                label: 'Old password',
                name: 'oldPassword',
                disabled: true,
                required: true,
                rules: []
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
                required: true,
                rules: []
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
                required: true,
                error: false,
                rules: []
            }
        }
    }

    @Watch('form.changePassword.value', { immediate: false })
    onChangePassword(value: boolean) {

        this.$set(this.form.oldPassword.attr, 'disabled', !value);
        this.$set(this.form.password.attr, 'disabled', !value);
        this.$set(this.form.confirmPassword.attr, 'disabled', !value);

        if (value) {
            this.$set(this.form.oldPassword.attr, 'rules', [this.validationRules.required]);
            this.$set(this.form.password.attr, 'rules', [this.validationRules.required]);
            this.$set(this.form.confirmPassword.attr, 'rules', [this.validationRules.required]);
        } else {
            this.$set(this.form.oldPassword.attr, 'rules', []);
            this.$set(this.form.password.attr, 'rules', []);
            this.$set(this.form.confirmPassword.attr, 'rules', []);
        }

        //reset the validation
        (this.$refs.profileForm as Vue & { resetValidation: () => void }).resetValidation();
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

    @Watch('form', { immediate: true, deep: true })
    onFormValueChanged(form: any) {
        for(const property in form) {
            const formField = (form as any)[property];
            if (formField.isUserProfile && formField.value !== this.userProfileData[property]) {
                this.$set(this.updatedProfile, property, formField.value);
            } else {
                if (Object.prototype.hasOwnProperty.call(this.updatedProfile, property)) {
                    this.$delete(this.updatedProfile, property);
                }
            }
        }
    }

    get profileIsUpdated() {
        return !_.isEmpty(this.updatedProfile);
    }

    get userProfileData() {
        return this.$store.state.preload.user;
    }

    get isValid() {
        let $valid = false;
        const passwordChange = this.form.changePassword.value;

        if (this.valid && this.profileIsUpdated && passwordChange) {
            $valid = true;
        } else if (this.valid && !this.profileIsUpdated && passwordChange) {
            $valid = true;
        } else if (this.valid && this.profileIsUpdated && !passwordChange) {
            $valid = true;
        } else {
            $valid = false;
        }
        return $valid;
    }

    /**
     * Check if password matches
     */
    passwordConfirmationRule(fieldName: string): void {
        if (fieldName === 'password' || fieldName ===  'confirmPassword') {
            if ((this.form as any)['confirmPassword'].value !== '') {
                if ((this.form as any)['password'].value === (this.form as any)['confirmPassword'].value) {
                    this.$set((this.form as any)['confirmPassword'].attr, 'error', false);
                    this.$set((this.form as any)['confirmPassword'].attr, 'errorMessages', '');
                } else {
                    this.$set((this.form as any)['confirmPassword'].attr, 'error', true);
                    this.$set((this.form as any)['confirmPassword'].attr, 'errorMessages', 'Password must match');
                }
            }
        }
    }

    //@TODO check this; update password not working correctly
    // must be login recently for it to work
    async updateProfile() {

        try {
            if (this.valid) {
                
                const uid = this.userProfileData.id;

                if (!_.isEmpty(this.updatedProfile)) {

                    //trigger the topbar loader
                    this.$root.$emit('request-loading', true);

                    await fb.usersCollection.doc(uid).update(this.updatedProfile);

                    this.$store.commit('setUserProfile', { id: uid, ...this.updatedProfile });
                }

                if (this.form.email.value !== this.userProfileData.email) {
                    await fb.auth.currentUser?.updateEmail(this.form.email.value);
                }

                if (this.form.changePassword.value && (this.form as any)['password'].value !== '') {

                    const user = fb.auth.currentUser;
                    const credentials = firebase.auth.EmailAuthProvider.credential(
                        this.form.email.value,
                        this.form.oldPassword.value
                    );
                    
                    await user?.reauthenticateWithCredential(credentials);

                    await fb.auth.currentUser?.updatePassword((this.form as any)['password'].value);
                }

                // reset
                this.updatedProfile = {};

                // hide the loader
                this.$root.$emit('request-loading', false);
                this.$root.$emit('successful-notification');
            
            } 
        } catch (error) {
            if (error) {
                // hide the loader
                this.$root.$emit('request-loading', false);
                this.$root.$emit('failed-notification', error.message);
            }
        }
    }
}
</script>