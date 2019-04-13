let divs = new Array(3);
divs[0] = $('#first p.law');
divs[1] = $('#second p.law');
divs[2] = $('#third p.law');
var x1;
var x2;
var y1;
var y2;



function createLineElement(x, y, length, angle) {
  var line = document.createElement("div");
  var styles = 'border: 1px solid black; '
    + 'width: ' + length + 'px; '
    + 'height: 0px; '
    + 'z-index: -5'
    + '-moz-transform: rotate(' + angle + 'rad); '
    + '-webkit-transform: rotate(' + angle + 'rad); '
    + '-o-transform: rotate(' + angle + 'rad); '  
    + '-ms-transform: rotate(' + angle + 'rad); '  
    + 'position: absolute; '
    + 'top: ' + y + 'px; '
    + 'left: ' + x + 'px; ';
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


for (let i = 1; i < 3; i++) {
  console.log(divs[i]);
  x1 = divs[i].offset().left + (divs[i].width()/2);
  y1 = divs[i].offset().top;
  x2 = divs[i - 1].offset().left + (divs[i - 1].width()/2);
  y2 = divs[i - 1].offset().top + (divs[i - 1].height());
  console.log(x1,y1,x2,y2);
  document.body.appendChild(createLine(x1, y1, x2, y2));
}

