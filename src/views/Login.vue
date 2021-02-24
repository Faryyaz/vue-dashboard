<template>
    <v-form>
        <template v-for="field in form">
            <component 
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
    form = {
        email: {
            type: 'v-text-field',
            value: '',
            attr: {
                label: 'Email',
                name: 'email',
                required: true
            }
        },
        password: {
            type: 'v-text-field',
            value: '',
            attr: {
                type: 'password',
                label: 'Password',
                name: 'password',
                required: true
            }
        }
    }
}
</script>