<template>
    <v-form ref="signUpForm" @submit.prevent="onSignUp" v-model="valid">
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
import { ValidationRules } from '../utils'

@Component
export default class SignUp extends Vue {
    valid = false;
    validationRules = new ValidationRules();
    form = {
        email: {
            type: 'v-text-field',
            value: '',
            icon: 'email',
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
            attr: {
                label: 'Role',
                name: 'role',
                required: true,
                items: [
                    { text: 'Admin', value: 'admin' },
                    { text: 'Staff', value: 'staff' },
                    { text: 'Visitor', value: 'visitor' }
                ],
                rules: [this.validationRules.required]
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
                required: true,
                autocomplete: "new-password",
                rules: [this.validationRules.required]
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
                required: true,
                rules: [this.validationRules.required]
            }
        }
    }

    async onSignUp() {

        try {

            //force validation
            (this.$refs.signUpForm as Vue & { validate: () => boolean }).validate();

            if (this.valid) {
                this.$root.$emit('app-loading', true);

                const { user } = await fb.auth.createUserWithEmailAndPassword(this.form.email.value, this.form.password.value);

                // create user profile object in userCollections
                if (user) {
                    await fb.usersCollection.doc(user.uid).set({
                        email: this.form.email.value,
                        firstName: this.form.firstName.value,
                        lastName: this.form.lastName.value,
                        role: this.form.role.value
                    });

                    this.$router.push({ name: 'Overview' });

                    this.$root.$emit('app-loading', false);
                }
            }
        } catch (error) {
            if (error) {
                this.$root.$emit('app-loading', false);

                this.$root.$emit('failed-notification', error.message);
            }
        }
    }
}
</script>