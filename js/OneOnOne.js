class OneOnOne {
    constructor(_people = []) {
        this.people = _people;
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

        let head = this.people.shift();
        let tail = this.people.pop();

        this.people.unshift(tail);
        this.people.unshift(head);

        return tail;

    }

}

export { OneOnOne };