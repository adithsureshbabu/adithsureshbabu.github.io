var characters = {
  upperLetters: "QWERTYUIOPASDFGHJKLZXCVBNM",
  lowerLetters: "qwertyuiopasdfghjklzxcvbnm",
  numbers: "0123456789",
  symbols: "~!@#$%^&*_.",
};

String.prototype.shuffle = function () {
  if (!this) return this;
  var a = this.split(""),
    n = a.length;
  for (var i = n - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a.join("");
};

function debounce(func, wait, immediate) {
  wait = parseInt(wait, 10);
  if (wait !== 0 && !wait) wait = wait || 250;
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var delayed = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(delayed, wait);
    if (callNow) func.apply(context, args);
  };
}

function getLowercase() {
  return characters.lowerLetters[Math.floor(Math.random() * characters.lowerLetters.length)];
}

function getUppercase() {
  return characters.upperLetters[Math.floor(Math.random() * characters.upperLetters.length)];
}

function getNumber() {
  return characters.numbers[Math.floor(Math.random() * characters.numbers.length)];
}

function getSymbol() {
  return characters.symbols[Math.floor(Math.random() * characters.symbols.length)];
}

function generatePassword(length, options) {
  length = parseInt(length, 10);
  if (length !== 0 && !length) length = length || 8;
  if (!options || (!options.upperletter && !options.lowerletter && !options.number && !options.symbol)) {
    options = {
      upperletter: true,
      lowerletter: true,
      number: true,
      symbol: true,
    };
  }
  var password = "";
  if (length > 0 && options.lowerletter) {
    password += getLowercase();
  }
  if (length > 1 && options.upperletter) {
    password += getUppercase();
  }
  if (length > 2 && options.number) {
    password += getNumber();
  }
  if (length > 3 && options.symbol) {
    password += getSymbol();
  }
  for (var i = password.length; i < length; i++) {
    var rdmCharacter = generateCharacter(options);
    password += rdmCharacter;
  }
  return password;
}

function generateCharacter(options) {
  var rdmCharacters = [];
  if (options.upperletter) {
    rdmCharacters.push(getUppercase());
  }
  if (options.lowerletter) {
    rdmCharacters.push(getLowercase());
  }
  if (options.number) {
    rdmCharacters.push(getNumber());
  }
  if (options.symbol) {
    rdmCharacters.push(getSymbol());
  }
  if (rdmCharacters.length === 0) return "";
  return rdmCharacters[Math.floor(Math.random() * rdmCharacters.length)];
}

var domLoaded = setInterval(function () {
  if (document.readyState !== "complete") return;
  clearInterval(domLoaded);
  txtOutPasswordEl.value = generatePassword().shuffle();
}, 50);

var btnCopyEl = document.querySelector("#btnCopy");
var btnGeneratePwdEl = document.querySelector("#btnGeneratePwd");
var txtOutPasswordEl = document.querySelector("#txtOutPassword");
var txtInpPwdLengthEl = document.querySelector("#txtInpPwdLength");
var chkUppercaseEl = document.querySelector("#chkUppercase");
var chkLowercaseEl = document.querySelector("#chkLowercase");
var chkNumbersEl = document.querySelector("#chkNumbers");
var chkSymbolsEl = document.querySelector("#chkSymbols");
var txtOutPwdToolTipEl = document.querySelector("#txtOutPwdToolTip");

function onCbOptnChnge(el) {
  var activeSettings = document.querySelectorAll("input[type='checkbox']:checked");
  if (activeSettings.length == 1) activeSettings[0].disabled = true;
  else {
    for (var i = 0; i < activeSettings.length; i++) {
      var element = activeSettings[i];
      element.disabled = false;
    }
  }
}

btnGeneratePwdEl.addEventListener(
  "click",
  debounce(function () {
    txtOutPasswordEl.value = generatePassword(txtInpPwdLengthEl.value, {
      upperletter: chkUppercaseEl.checked,
      lowerletter: chkLowercaseEl.checked,
      number: chkNumbersEl.checked,
      symbol: chkSymbolsEl.checked,
    }).shuffle();
  })
);

btnCopyEl.addEventListener(
  "click",
  debounce(function () {
    var input = document.createElement("input");
    document.body.appendChild(input);
    input.value = txtOutPasswordEl.value;
    if (window.navigator.clipboard) {
      window.navigator.clipboard
        .writeText(txtOutPasswordEl.value)
        .then(function () {
          if (txtOutPwdToolTipEl.classList.contains("showtip")) return;
          txtOutPwdToolTipEl.classList.add("showtip");
          setTimeout(function () {
            txtOutPwdToolTipEl.classList.remove("showtip");
          }, 2000);
        })
        .catch(function (err) {
          console.log(err);
        });
    } else if (document.execCommand) {
      input.select();
      document.execCommand("copy", false);
      if (txtOutPwdToolTipEl.classList.contains("showtip")) return;
      txtOutPwdToolTipEl.classList.add("showtip");
      setTimeout(function () {
        txtOutPwdToolTipEl.classList.remove("showtip");
      }, 2000);
    }
    input.remove();
  })
);
