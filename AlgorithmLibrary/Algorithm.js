


function addControlToAlgorithmBar(type, name) {
  var element = document.createElement("input");

  element.setAttribute("type", type);
  element.setAttribute("value", name);
  element.setAttribute("class", "btn btn-primary");

  var controlBar = document.getElementById("CustomAlgorithmControl");

  //Append the element in page (in span).
  controlBar.appendChild(element);
  return element;
}

function Algorithm(am) {}

Algorithm.prototype.init = function (am, w, h) {
  this.animationManager = am;
  am.addListener("AnimationStarted", this, this.disableUI);
  am.addListener("AnimationEnded", this, this.enableUI);
  am.addListener("AnimationUndo", this, this.undo);
  this.canvasWidth = w;
  this.canvasHeight = h;

  this.actionHistory = [];
  this.recordAnimation = true;
  this.commands = [];
};

Algorithm.prototype.disableUI = function (event) {

};

Algorithm.prototype.enableUI = function (event) {
};

function controlKey(keyASCII) {
  return (
    keyASCII == 8 ||
    keyASCII == 9 ||
    keyASCII == 37 ||
    keyASCII == 38 ||
    keyASCII == 39 ||
    keyASCII == 40 ||
    keyASCII == 46
  );
}

Algorithm.prototype.returnSubmit = function (field, funct, maxsize, intOnly) {
  if (maxsize != undefined) {
    field.size = maxsize;
  }
  return function (event) {
    var keyASCII = 0;
    if (window.event) {
      // IE
      keyASCII = event.keyCode;
    } else if (event.which) {
      // Netscape/Firefox/Opera
      keyASCII = event.which;
    }

    if (keyASCII == 13 && funct !== null) {
      funct();
    } else if (
      keyASCII == 190 ||
      keyASCII == 59 ||
      keyASCII == 173 ||
      keyASCII == 189
    ) {
      return false;
    } else if (
      (maxsize != undefined && field.value.length >= maxsize) ||
      (intOnly && (keyASCII < 48 || keyASCII > 57))
    ) {
      if (!controlKey(keyASCII)) return false;
    }
  };
};



Algorithm.prototype.reset = function () {
};

Algorithm.prototype.undo = function (event) {

  this.actionHistory.pop();

  this.reset();

  var len = this.actionHistory.length;
  this.recordAnimation = false;
  for (var i = 0; i < len; i++) {
    this.actionHistory[i][0](this.actionHistory[i][1]);
  }
  this.recordAnimation = true;
};

Algorithm.prototype.clearHistory = function () {
  this.actionHistory = [];
};


Algorithm.prototype.cmd = function () {
  if (this.recordAnimation) {
    var command = arguments[0];
    for (i = 1; i < arguments.length; i++) {
      command = command + "<;>" + String(arguments[i]);
    }
    this.commands.push(command);
  }
};
