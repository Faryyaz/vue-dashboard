<template>
    <v-form @submit.prevent="onLogin" v-model="valid">
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

@Component
export default class Login extends Vue {
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
        }
    }

    onLogin() {
        if (this.valid) {
            const email = this.form.email.value,
              password = this.form.password.value;
            this.$store.dispatch('authenticate', { email, password })
                .then(() => {

                    // change route to dashboard
                    this.$router.push({ name: 'Overview' });
                });
        }        
    }
}
</script>