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

        let tableCount = parseInt(this.people.length / 2);
        let sideA = '<ul class="side-a">\n';
        let sideB = '<ul class="side-b">\n';
        let tables = '<ul class="tables">\n';
        let output = '';

        for (let i = 0; i < tableCount; i++) {
            sideA += '<li class="person"><span class="label">' + this.people[i].getFirstName() + '</span></li>\n';
            sideB += '<li class="person"><span class="label">' + this.people[i + tableCount].getFirstName() + '</span></li>\n';
            tables += '<li class="table"><span class="label">' + (i + 1) + '</span></li>\n';
        }

        // If number of participants is odd, then add a table with one person.
        if ( this.people.length % 2) {
            tableCount++;
            sideA += '<li class="person"><span class="label">' + this.people[tableCount].getFirstName() + '</span></li>\n';
            tables += '<li class="table"><span class="label">' + tableCount + '</span></li>\n';
        }

        sideA += '</ul>\n';
        sideB += '</ul>\n';
        tables += '</ul>\n';

        output = sideA + tables + sideB;

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