class OneOnOne {
    constructor(_people = []) {
        this.people = _people;
        this.states = [];
    }

    add(person) {
        this.people.push(person);
    }

    remove(index) {
        let success = false;

        if (index < this.people.length) {
            delete this.people[index];
            success = true;
        }

        return success;
    }

    count() {
        return this.people.length;
    }

    htmlList() {
        let output = '<ul>\n';
        for (let i of this.people) {
            if (i instanceof Object) {
                output += '<li>' + i.getFirstName() + '</li>\n';
            }
            else {
                output += '<li>--</li>\n';
            }
        }

        output += '</ul>\n';

        return output;
    }

    rotate() {
        let setup = [];
        let pairs = parseInt(this.people.length / 2);

        for (let i = 0; i < pairs; i++) {
            setup.push([
                this.people[2 * i].getFirstName(),
                this.people[2 * i + 1].getFirstName()
            ]);
        }

        return setup;
    }

}

export { OneOnOne };