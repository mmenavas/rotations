import 'babel-polyfill';
import { Person } from './Person';
import { OneOnOne } from './OneOnOne';

let meetup = new OneOnOne();
let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const total = 4;


for (let i = 0; i < total; i++) {
    meetup.add(new Person(alphabet[i]));
}
console.log(meetup.count());


meetup.remove(4);
console.log(meetup.count());


let rotation = meetup.rotate();
console.log(rotation);



document.getElementById('output').innerHTML = meetup.htmlList();
