<template>
    <v-form @submit.prevent="onSignUp" v-model="valid">
        <template v-for="field in form">
            <component 
                :prepend-icon="field.icon"
                :key="field.attr.name" 
                :is="field.type"
                v-model="field.value"
                v-bind="field.attr">
            </component>
        </template>
        <v-btn 
            type="submit" 
            color="primary" 
            block 
            depressed 
            class="my-5"
            x-large>
            Submit
        </v-btn>
    </v-form>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import * as fb from '../firebase'

@Component
export default class SignUp extends Vue {
    valid = false;
    form = {
        email: {
            type: 'v-text-field',
            value: '',
            icon: 'email',
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
        password: {
            type: 'v-text-field',
            value: '',
            icon: 'lock',
            attr: {
                type: 'password',
                label: 'Password',
                name: 'password',
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
                required: true
            }
        }
    }

    async onSignUp() {
        if (this.valid) {
            const { user } = await fb.auth.createUserWithEmailAndPassword(this.form.email.value, this.form.password.value);

            // create user profile object in userCollections
            if (user) {
                await fb.usersCollection.doc(user.uid).set({
                    email: this.form.email.value,
                    firstName: this.form.firstName.value,
                    lastName: this.form.lastName.value,
                    role: this.form.role.value
                });
            }
            
        }
    }
}
</script>