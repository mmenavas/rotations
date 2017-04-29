import 'babel-polyfill';
import { Person } from './Person';
import { OneOnOne } from './OneOnOne';

let meetup = new OneOnOne();
let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

document.getElementById('action-start').addEventListener('click', function() {
    let total = document.getElementById('count').value;
    meetup.reset();
    for (let i = 0; i < total; i++) {
        meetup.addPerson(new Person(alphabet[i]));
    }
    document.getElementById('output').innerHTML = meetup.getHtmlList();
    document.getElementById('info-rotations').innerText = meetup.getRotationsCount();
});

document.getElementById('action-rotate').addEventListener('click', function() {
    meetup.rotate();
    document.getElementById('output').innerHTML = meetup.getHtmlList();
    document.getElementById('info-rotations').innerText = meetup.getRotationsCount();
});

