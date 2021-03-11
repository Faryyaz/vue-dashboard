<template>
    <v-form ref="loginForm" @submit.prevent="onLogin" v-model="valid">
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
import { ValidationRules } from '../utils'

@Component
export default class Login extends Vue {
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
        password: {
            type: 'v-text-field',
            value: '',
            icon: 'lock',
            attr: {
                type: 'password',
                label: 'Password',
                name: 'password',
                required: true,
                rules: [this.validationRules.required]
            }
        }
    }

    onLogin() {
        
        //force validation
        (this.$refs.loginForm as Vue & { validate: () => boolean }).validate();

        if (this.valid) {

            this.$root.$emit('app-loading', true);

            const email = this.form.email.value,
            password = this.form.password.value; 
            const vm = this;
            this.$store.dispatch('authenticate', { email, password, vm })
                .then(() => {
                    this.$root.$emit('app-loading', false);

                    // change route to dashboard
                    this.$router.push({ name: 'Overview' });
                });
        }
    }
}
</script>