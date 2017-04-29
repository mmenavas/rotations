class Person {

    constructor(_firstName = '', _lastName = '', _email = '', _phone = '') {
        this.firstName = _firstName;
        this.lastName = _lastName;
        this.email = _email;
        this.phone = _phone;
    }

    setFirstName(input) {
       this.firstName = input;
    }

    getFirstName() {
       return this.firstName;
    }

    setLastName(input) {
        this.lastName = input;
    }

    getLastName() {
        return this.lastName;
    }

    setEmail(input) {
        this.email = input;
    }

    getEmail() {
        return this.email;
    }

    setPhone(input) {
        this.phone = input;
    }

    getPhone() {
        return this.phone;
    }

    toObject() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            phone: this.phone
        }
    }

}

export { Person };