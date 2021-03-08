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

}