import Vue from "vue";

export class ValidationRules {

    required(v: any): any {
        return !!v || 'The field is required';
    }

    email(v: any): any {
        if (!v) return true;
        else return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm.test(v) || "Please input a valid email address";
    }

    integer(v: any): any {
        if (!v) return true;
        else return !isNaN(v) && Number.isInteger(parseFloat(v)) || "Please input an integer";
    }

    number(v: any): any {
        // IMPORTANT: 'number' type on input screw this up because
        // some browsers give an empty value for non-numbers.
        if (!v) return true;
        else return !isNaN(v) || "Please input a number";
    }
    
    /**
     * Check for at least 8 characters, one symbol, one Uppercase and one lowercase
     * @param v the value
     */
    password(v: any) {
        if (!v) return true;
        else return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(v) || "Please input a valid password";
    }

    /**
     * Check if password matches
     * @param {string} fieldName the password/confirmPassword field
     * @param {object} form the form object containing all the input fields
     * @param {Vue} vm the vue instance
     */
     passwordConfirmationRule(fieldName: string, form: object, vm: Vue): void {
        if (fieldName === 'password' || fieldName ===  'confirmPassword') {
            if ((form as any)['confirmPassword'].value !== '') {
                if ((form as any)['password'].value === (form as any)['confirmPassword'].value) {
                    vm.$set((form as any)['confirmPassword'].attr, 'error', false);
                    vm.$set((form as any)['confirmPassword'].attr, 'errorMessages', '');
                } else {
                    vm.$set((form as any)['confirmPassword'].attr, 'error', true);
                    vm.$set((form as any)['confirmPassword'].attr, 'errorMessages', 'Password must match');
                }
            }
        }
    }

}