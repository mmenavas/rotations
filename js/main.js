import 'babel-polyfill';
import { Person } from './Person';
import { OneOnOne } from './OneOnOne';

let meetup = new OneOnOne();
let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const total = 4;
const time = 1500;


for (let i = 0; i < total; i++) {
    meetup.add(new Person(alphabet[i]));
}
console.log(meetup.count());

document.getElementById('output').innerHTML = meetup.htmlList();

setTimeout(function() {

    meetup.rotate();
    document.getElementById('output').innerHTML = meetup.htmlList();

    setTimeout(function() {

        meetup.rotate();
        document.getElementById('output').innerHTML = meetup.htmlList();

        setTimeout(function() {

            meetup.rotate();
            document.getElementById('output').innerHTML = meetup.htmlList();

        }, time);

    }, time);

}, time);



