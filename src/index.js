import { createElement } from 'lwc';
import '@lwc/synthetic-shadow';
import FooApp from 'foo/app';


document
    .querySelector('#main')
    .appendChild(createElement('foo-app', { is: FooApp }))
