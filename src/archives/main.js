import 'babel-polyfill';
import { Person } from './Person';
import { OneOnOne } from './OneOnOne';

let meetup = new OneOnOne();

document.getElementById('action--add-person').addEventListener('click', function() {
    let name = document.getElementById('new-user').value;
    if (name !== '') {
        meetup.addPerson(new Person(name));
        document.getElementById('new-user').value = '';
        document.getElementById('output').innerHTML = meetup.getHtmlList();
    }
    else {
        document.getElementById('new-user').setAttribute('class', 'validation-error');
    }
})

document.getElementById('action--reset').addEventListener('click', function() {
    meetup.reset();
    document.getElementById('output').innerHTML = meetup.getHtmlList();
    document.getElementById('info-rotations').innerText = meetup.getRotationsCount();
});

document.getElementById('action--rotate').addEventListener('click', function() {
    meetup.rotate();
    document.getElementById('output').innerHTML = meetup.getHtmlList();
    document.getElementById('info-rotations').innerText = meetup.getRotationsCount();
});

