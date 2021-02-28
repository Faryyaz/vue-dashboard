<template>
    <v-form>
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
import firebase from 'firebase/app'
import 'firebase/auth'

@Component
export default class SignUp extends Vue {
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

    test() {
        const auth = firebase.auth();
        return auth;
    }
}
</script>