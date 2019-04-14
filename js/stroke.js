let divs = new Array(3);
divs[0] = $('#first p.law');
divs[1] = $('#second p.law');
divs[2] = $('#third p.law');
var x1;
var x2;
var y1;
var y2;
let lines = new Array;


function createLineElement(x, y, length, angle) {
  var line = document.createElement("div");
  var styles = 'width: ' + (length + 50) + 'px; '
    + '-moz-transform: rotate(' + angle + 'rad); '
    + '-webkit-transform: rotate(' + angle + 'rad); '
    + '-o-transform: rotate(' + angle + 'rad); '  
    + '-ms-transform: rotate(' + angle + 'rad); '  
    + 'top: ' + (y) + 'px;'
    + 'left: ' + (x - 25) + 'px;';
  line.setAttribute('style', styles);  
  return line;
}

function createLine(x1, y1, x2, y2) {
  var a = x1 - x2,
    b = y1 - y2,
    c = Math.sqrt(a * a + b * b);

  var sx = (x1 + x2) / 2,
    sy = (y1 + y2) / 2;

  var x = sx - c / 2,
    y = sy;

  var alpha = Math.PI - Math.atan2(-b, a);

  return createLineElement(x, y, c, alpha);
}

function updateLine(x1, y1, x2, y2, div) {
  var a = x1 - x2,
    b = y1 - y2,
    c = Math.sqrt(a * a + b * b);

  var sx = (x1 + x2) / 2,
    sy = (y1 + y2) / 2;

  var x = sx - c / 2,
    y = sy;

  var alpha = Math.PI - Math.atan2(-b, a);

  return updateLineElement(x, y, c, alpha, div);
}

function updateLineElement(x, y, length, angle, div) {
  var line = div;
  var styles = 'width: ' + (length + 50) + 'px; '
    + '-moz-transform: rotate(' + angle + 'rad); '
    + '-webkit-transform: rotate(' + angle + 'rad); '
    + '-o-transform: rotate(' + angle + 'rad); '  
    + '-ms-transform: rotate(' + angle + 'rad); '  
    + 'top: ' + (y) + 'px;'
    + 'left: ' + (x - 25) + 'px;';
  line.setAttribute('style', styles);  
  return line;
}


for (let i = 1; i < 3; i++) {
  x1 = divs[i].offset().left + (divs[i].width()/2);
  y1 = divs[i].offset().top;
  x2 = divs[i - 1].offset().left + (divs[i - 1].width()/2);
  y2 = divs[i - 1].offset().top + (divs[i - 1].height());
  lines.push(createLine(x1, y1, x2, y2));
    $(lines[i - 1]).addClass("link");
  document.body.appendChild($(lines[i - 1])[0]);

}

let update1 = () => {
  x1 = divs[1].offset().left + (divs[1].width()/2);
  y1 = divs[1].offset().top;
  x2 = divs[0].offset().left + (divs[0].width()/2);
  y2 = divs[0].offset().top + (divs[0].height());
  updateLine(x1, y1, x2, y2, lines[0]);
}

let update2 = () => {
  x1 = divs[2].offset().left + (divs[2].width()/2);
  y1 = divs[2].offset().top;
  x2 = divs[1].offset().left + (divs[1].width()/2);
  y2 = divs[1].offset().top + (divs[1].height());
  updateLine(x1, y1, x2, y2, lines[1]);
}

class Observable {
  // each instance of the Observer class
  // starts with an empty array of things (observers)
  // that react to a state change
  constructor() {
    this.observers = [];
  }

  // add the ability to subscribe to a new object / DOM element
  // essentially, add something to the observers array
  subscribe(f) {
    this.observers.push(f);
  }

  // add the ability to unsubscribe from a particular object
  // essentially, remove something from the observers array
  unsubscribe(f) {
    this.observers = this.observers.filter(subscriber => subscriber !== f);
  }

  // update all subscribed objects / DOM elements
  // and pass some data to each of them
  notify() {
    this.observers.forEach(observer => observer());
  }
}

const headingsObserver = new Observable();

// subscribe to some observers
headingsObserver.subscribe(update1);
headingsObserver.subscribe(update2);

window.addEventListener('scroll', function(e) {
  headingsObserver.notify();
});
document.addEventListener('click', event => {
  headingsObserver.notify();
});
