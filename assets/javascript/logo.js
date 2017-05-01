var elem = document.getElementById('draw-shapes'); //tell two.js where to put the logo on the html page
var params = { width: 2000, height: 400 }; //limit space logo can occupy
var two = new Two(params).appendTo(elem);

//draw various shapes which make up the letters in the logo
var triangle = two.makePolygon(100, 100, 100, 3);
var triangle2 = two.makePolygon(100, 100, 10, 3);

var rect2 = two.makeRectangle(300, 40, 120, 22);
var rect3 = two.makeRectangle(300, 100, 120, 22);
var rect4 = two.makeRectangle(300, 160, 120, 22);
var rect5 = two.makeRectangle(450, 100, 180, 25);
var rect6 = two.makeRectangle(535, 99, 180, 25);
var rect7 = two.makeRectangle(700, 90, 160, 22);
var rect8 = two.makeRectangle(700, 95, 30, 160);
var circle1 = two.makeCircle(895, 100, 80);
var circle2 = two.makeCircle(895, 100, 10);
var circle3 = two.makeCircle(1080, 100, 80);
var circle4 = two.makeCircle(1080, 100, 10);
var rect9 = two.makeRectangle(1220, 100, 40, 165);

var semi1 = two.makeCurve(1300, 85, 1375, 5, 1450, 85, true);
var line1 = two.makeLine(1300, 90, 1470, 90);
var semi2 = two.makeCurve(1310, 120, 1395, 200, 1460, 120, true);
var line2 = two.makeLine(1320, 160, 1470, 80);

var underline1 = two.makeRectangle(730, 300, 1200, 22);
var underline2 = two.makeRectangle(80,300, 20, 20);
var underline3 = two.makeRectangle(1380,300, 20, 20);

//group the shapes as letters so they can be moved together
var Dgroup = two.makeGroup(triangle, triangle2);
var Egroup = two.makeGroup(rect2, rect3, rect4);
var Vgroup = two.makeGroup(rect5, rect6);
var Tgroup = two.makeGroup(rect7, rect8);
var Ogroup1 = two.makeGroup(circle1, circle2);
var Ogroup2 = two.makeGroup(circle3, circle4);
var Sgroup = two.makeGroup(semi1, line1, semi2, line2);
var underlineGroup = two.makeGroup(underline1, underline2, underline3);

//add color and define opacity of shapes
Dgroup.fill = '#FF8000';
triangle.opacity= 1;
Dgroup.stroke = "orangered";
Dgroup.linewidth = 3;
triangle2.fill = "orangered";
triangle.linewidth = 18;
triangle2.opacity = .65;

Egroup.fill = 'rgb(0, 200, 255)';
Egroup.linewidth = 12;
Egroup.stroke = "royalblue";

Vgroup.fill = '#FF8000';
Vgroup.stroke = "orangered";
Vgroup.linewidth = 18;
rect6.opacity = .5;
rect5.opacity = .65;

Tgroup.fill = 'rgb(0, 200, 255)';
Tgroup.linewidth = 12;
Tgroup.stroke = "royalblue";
rect8.opacity = .7;

Ogroup1.fill = '#FF8000';
Ogroup1.stroke = "orangered";
Ogroup1.linewidth = 18;
circle2.opacity = .65;
circle2.fill = "orangered";
circle1.opacity = .5;

Ogroup2.fill = 'rgb(0, 200, 255)';
Ogroup2.linewidth = 12;
Ogroup2.stroke = "royalblue";
circle4.opacity = .65;
circle4.fill = "royalblue";

rect9.fill = '#FF8000';
rect9.stroke = "orangered";
rect9.linewidth = 18;
rect9.opacity = .5;

Sgroup.fill = 'rgb(0, 200, 255)';
Sgroup.linewidth = 12;
Sgroup.stroke = "royalblue";

underline1.fill = 'rgb(0, 200, 255)';
underline1.linewidth = 12;
underline1.stroke = "royalblue";

underline2.fill = 'rgb(0, 200, 255)';
underline2.linewidth = 12;
underline2.stroke = "royalblue";

underline3.fill = 'rgb(0, 200, 255)';
underline3.linewidth = 12;
underline3.stroke = "royalblue";

//rotating shapes
triangle.rotation = 9.96;
triangle2.rotation = 9.96;
rect5.rotation = 7.29;
rect6.rotation =11.56;
semi1.rotation = 5.8;
line1.rotation = 5.8;
semi2.rotation = 5.8;

//the rest of the code animates the shapes in such a way that they will spin every time the page is loaded. 
two.bind('update', function(frameCount) {
  // This code is called everytime two.update() is called, so, about every 60 sec.
 
  if (Dgroup.scale > 0.9999 && two.frameCount < 5) {
    Dgroup.scale = Dgroup.rotation = 0;
  }
  var t = (1 - Dgroup.scale) * 0.125;
  Dgroup.scale += t;
  Dgroup.rotation += t * 4 * Math.PI;
}).play(); 

two.bind('update', function(frameCount) {

  if (Egroup.scale > 0.9999 && two.frameCount < 5) {
    Egroup.scale = Egroup.rotation = 0;
  }
  var t = (1 - Egroup.scale) * 0.125;
  Egroup.scale += t;
  Egroup.rotation += t * 4 * Math.PI;
}).play(); 

two.bind('update', function(frameCount) {
  
  if (Vgroup.scale > 0.9999 && two.frameCount < 5) {
    Vgroup.scale = Vgroup.rotation = 0;
  }
  var t = (1 - Vgroup.scale) * 0.125;
  Vgroup.scale += t;
  Vgroup.rotation += t * 4 * Math.PI;
}).play(); 

two.bind('update', function(frameCount) {

  if (Tgroup.scale > 0.9999 && two.frameCount < 5) {
    Tgroup.scale = Tgroup.rotation = 0;
  }
  var t = (1 - Tgroup.scale) * 0.125;
  Tgroup.scale += t;
  Tgroup.rotation += t * 4 * Math.PI;
}).play(); 

two.bind('update', function(frameCount) {

  if (Ogroup1.scale > 0.9999 && two.frameCount < 5) {
    Ogroup1.scale = Ogroup1.rotation = 0;
  }
  var t = (1 - Ogroup1.scale) * 0.125;
  Ogroup1.scale += t;
  Ogroup1.rotation += t * 4 * Math.PI;
}).play(); 

two.bind('update', function(frameCount) {

  if (Ogroup2.scale > 0.9999 && two.frameCount < 5) {
    Ogroup2.scale = Ogroup2.rotation = 0;
  }
  var t = (1 - Ogroup2.scale) * 0.125;
  Ogroup2.scale += t;
  Ogroup2.rotation += t * 4 * Math.PI;
}).play(); 

two.bind('update', function(frameCount) {
  
  if (rect9.scale > 0.9999 && two.frameCount < 5) {
    rect9.scale = rect9.rotation = 0;
  }
  var t = (1 - rect9.scale) * 0.125;
  rect9.scale += t;
  rect9.rotation += t * 4 * Math.PI;
}).play(); 

two.bind('update', function(frameCount) {
 
  if (Sgroup.scale > 0.9999 && two.frameCount < 5) {
    Sgroup.scale = Sgroup.rotation = 0;
  }
  var t = (1 - Sgroup.scale) * 0.125;
  Sgroup.scale += t;
  Sgroup.rotation += t * 4 * Math.PI;
}).play(); 

// tells two to render everything to the screen
two.update();
two.update();
two.update();