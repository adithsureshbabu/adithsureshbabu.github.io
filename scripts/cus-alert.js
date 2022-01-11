(function () {
  var loaderStylesheet =
    '.cus-alert-mask{z-index:99999999;position:absolute;display:none;width:100vw;height:100vh;box-sizing:border-box;padding:0;margin:0;background:rgba(0,0,0,.2);top:50%;left:50%;transform:translate(-50%,-50%);transition:all .2s cubic-bezier(.1,.7,.4,1) 0s}.cus-alert *{-webkit-tap-highlight-color:transparent;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;font-family:sans-serif}.cus-alert :focus{outline:0}.cus-alert{z-index:999999999;display:none;position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);min-width:260px;max-width:90%;max-height:90%;text-align:center;font-size:14px;line-height:1.4;border-radius:6px;overflow:auto;background-color:#ffffff;box-shadow:0 2px 12px rgba(0,0,0,.07);-webkit-box-shadow:0 2px 12px rgba(0,0,0,.07);transition:all .2s cubic-bezier(.1,.7,.4,1) 0s}.cus-alert .cus-alert-content{padding:15px;min-height:30px}.cus-alert .cus-alert-title{font-weight:500;font-size:17px}.cus-alert .cus-alert-msg{margin-top:5px;font-size:14px}.cus-alert .cus-alert-btn{height:44px;line-height:44px;font-size:16px;color:#007aff;border-radius:0 0 13px 13px;overflow:hidden;cursor:pointer;border-top:1px solid #ddd}.cus-alert .cus-alert-btn:active{background:#eeeeee}.cus-alert .cus-alert-btn:after{content:"";position:absolute;left:0;top:0;height:1px;width:100%;display:block;background-color:#ddd;z-index:9999999999}';
  var loaderStyle = document.createElement("style");
  loaderStyle.innerText = loaderStylesheet.trim().replace(/\r?\n|\r|\s\s+/g, "");
  document.head.appendChild(loaderStyle);
})();

(function (proxied) {
  try {
    window.alert = function () {
      var alertInterval = setInterval(() => {
        if (!window.alertVisible) {
          cusAlert(arguments[0], arguments[1], arguments[2]);
          clearInterval(alertInterval);
        }
      }, 50);
    };
  } catch (err) {
    console.log(err);
  }
})(window);

Object.prototype.querySelectAll = function (query, callback) {
  var elements = this.querySelectorAll(query);
  if (typeof callback == "function") {
    for (var i = 0; i < elements.length; ++i) {
      callback.call(elements[i], elements[i], i);
    }
  }
  return elements;
};

Object.prototype.fadeOut = function (speed, removeElement) {
  try {
    var ms;
    ms = speed === "slow" ? 60 : 20;
    if (!(typeof this === "object") || !this.style) return "Invalid Element";
    var fadeTarget = this;
    var fadeEffect = setInterval(function () {
      if (!fadeTarget.style.display || fadeTarget.style.display === "none") fadeTarget.style.display = "block";
      if (!fadeTarget.style.visibility || fadeTarget.style.visibility === "hidden")
        fadeTarget.style.visibility = "visible";
      if (!fadeTarget.style.opacity) fadeTarget.style.opacity = 1;
      if (parseFloat(fadeTarget.style.opacity) > 0)
        fadeTarget.style.opacity = parseFloat(fadeTarget.style.opacity) - 0.1;
      else {
        fadeTarget.style.visibility = "hidden";
        fadeTarget.style.display = "none";
        clearInterval(fadeEffect);
        if (removeElement && fadeTarget.parentElement) fadeTarget.parentElement.removeChild(fadeTarget);
      }
    }, ms);
  } catch (err) {
    console.log(err);
  }
};

Object.prototype.fadeIn = function (speed, removeElement) {
  try {
    var ms;
    ms = speed === "slow" ? 60 : 20;
    if (!(typeof this === "object") || !this.style) return "Invalid Element";
    var fadeTarget = this;
    var fadeEffect = setInterval(function () {
      if (!fadeTarget.style.display || fadeTarget.style.display === "none") fadeTarget.style.display = "block";
      if (!fadeTarget.style.visibility || fadeTarget.style.visibility === "hidden")
        fadeTarget.style.visibility = "visible";
      if (!fadeTarget.style.opacity) fadeTarget.style.opacity = 0;
      if (parseFloat(fadeTarget.style.opacity) < 1)
        fadeTarget.style.opacity = parseFloat(fadeTarget.style.opacity) + 0.1;
      else {
        clearInterval(fadeEffect);
        if (removeElement && fadeTarget.parentElement) fadeTarget.parentElement.removeChild(fadeTarget);
      }
    }, ms);
  } catch (err) {
    console.log(err);
  }
};

function cusAlert() {
  try {
    window.alertVisible = true;
    var divAlert = document.querySelectorAll(".cus-alert")[0];
    var divAlertMask = document.querySelectorAll(".cus-alert-mask")[0];
    if (divAlert) divAlert.parentElement.removeChild(divAlert);
    if (divAlertMask) divAlertMask.parentElement.removeChild(divAlertMask);
    if (arguments[0] !== undefined)
      arguments[0] = typeof arguments[0] === "object" ? JSON.stringify(arguments[0]) : String(arguments[0]);
    if (!arguments[0]) arguments[0] = "";
    if (arguments[1] !== undefined && arguments[1] !== null && arguments[1] !== false)
      arguments[1] = typeof arguments[1] === "object" ? JSON.stringify(arguments[1]) : String(arguments[1]);
    if (arguments[1] === "" || arguments[1] === false || arguments[1] === null) arguments[1] = "";
    if (arguments[1] !== "" && !arguments[1])
      arguments[1] = window.location.host ? window.location.host + " says" : "This page says";
    var divClasses = [
      "cus-alert",
      "cus-alert-content",
      "cus-alert-title",
      "cus-alert-msg",
      "cus-alert-btn",
      "cus-alert-mask",
    ];
    var divElements = [];
    for (var i = 0; i < divClasses.length; i++) {
      var div = document.createElement("div");
      div.classList.add(divClasses[i]);
      if (divClasses[i] === "cus-alert-title") div.innerText = arguments[1];
      if (divClasses[i] === "cus-alert-msg") div.innerText = arguments[0];
      if (divClasses[i] === "cus-alert-btn") div.innerText = "OK";
      divElements.push(div);
      if (i === divClasses.length - 1) {
        divElements[1].appendChild(divElements[2]);
        divElements[1].appendChild(divElements[3]);
        divElements[0].appendChild(divElements[1]);
        divElements[0].appendChild(divElements[4]);
        divAlertMask = divElements[5];
        divAlert = divElements[0];
        divElements = [];
      }
    }
    if (arguments[2] === "dark") {
      divAlert.style.backgroundColor = "#292a2d";
      divAlert.querySelectAll(".cus-alert *", function (el) {
        el.style.color = "#e8eaed";
      });
      divAlert.querySelector(".cus-alert-btn").style.color = "#8ab4f8";
      divAlert.querySelector(".cus-alert-btn").style.borderTop = "1px solid #555555";
      divAlert.querySelectAll(".cus-alert .cus-alert-btn", function (el) {
        el.addEventListener(
          "mousedown",
          function () {
            el.style.background = "#333333";
          },
          false
        );
        document.addEventListener(
          "mouseup",
          function () {
            el.style.background = "#292a2d";
          },
          false
        );
      });
    }
    divAlert.querySelectorAll(".cus-alert-btn")[0].addEventListener("click", function () {
      divAlert.fadeOut(null, true);
      divAlertMask.fadeOut(null, true);
      setTimeout(() => {
        window.alertVisible = false;
      }, 200);
    });
    document.querySelectorAll("body")[0].appendChild(divAlertMask);
    document.querySelectorAll("body")[0].appendChild(divAlert);
    divAlert.fadeIn();
    divAlertMask.fadeIn();
    return;
  } catch (err) {
    console.log(err);
  }
}
