import $ from 'jquery';
import App from './app';

class Base {

}

class HelloWorld extends Base {
    hello() {
        console.log('Hello flexy!');
        return this;
    }
}

$(() => {
    (new HelloWorld()).hello();
});
