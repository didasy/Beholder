# Created by Jesus Islam with MIT License

*Dependency : [JQuery](http://jquery.com), duh*

## API

    Beholder(buttonElement);

buttonElement -> an object containing 3 properties `el`, `className`, and `html`
- `el` is an element selector/tag in string, e.g: 'div', 'button', etc.
- `className` well, it is... self-explanatory. (A class name for your button element).
- `html` html string or any text to put into the button element. e.g:'This is My Button', '+', `<div class='lel'></div>`, etc.

### Usage Example

    $('.yourelementtowatch').Beholder();

As simple as that, you didn't even have to pass any arguments, it is optional.

### Demo

JSBin is down, and I don't like JSFiddle.