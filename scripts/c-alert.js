(function () {
  var loaderStylesheet =
    ".c-alert-mask{z-index:99999999;position:fixed;display:none;width:100vw;height:100vh;box-sizing:border-box;padding:0;margin:0;background:rgba(0,0,0,.2);top:50%;left:50%;transform:translate(-50%,-50%);transition:all .2s cubic-bezier(.1,.7,.4,1) 0s}.c-alert-mask,.c-alert-mask *{-webkit-tap-highlight-color:transparent;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}.c-alert,.c-alert *{-webkit-tap-highlight-color:transparent;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;font-family:sans-serif}.c-alert :focus{outline:0}.c-alert{z-index:999999999;display:none;position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);min-width:260px;max-width:90%;max-height:90%;text-align:center;font-size:14px;line-height:1.4;border-radius:6px;overflow:auto;background-color:#ffffff;box-shadow:0 2px 12px rgba(0,0,0,.07);-webkit-box-shadow:0 2px 12px rgba(0,0,0,.07);transition:all .2s cubic-bezier(.1,.7,.4,1) 0s}.c-alert .c-alert-content{padding:15px;min-height:30px}.c-alert .c-alert-title{font-weight:500;font-size:17px}.c-alert .c-alert-msg{margin-top:5px;font-size:14px}.c-alert .c-alert-btn{height:44px;line-height:44px;font-size:16px;color:#007aff;border-radius:0 0 6px 6px;overflow:hidden;cursor:pointer;border-top:1px solid #ddd}.c-alert .c-alert-btn:active{background:#eeeeee}";
  var loaderStyle = document.createElement("style");
  loaderStyle.innerText = loaderStylesheet.trim().replace(/\r?\n|\r|\s\s+/g, "");
  document.head.appendChild(loaderStyle);
})();

(function (proxied) {
  try {
    window.alert = function () {
      var args = arguments;
      var alertInterval = setInterval(function () {
        if (!window.alertVisible) {
          cAlert(args[0], args[1], args[2]);
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

function cAlert(message, title, theme) {
  try {
    window.alertVisible = true;
    var divAlert = document.querySelectorAll(".c-alert")[0];
    var divAlertMask = document.querySelectorAll(".c-alert-mask")[0];
    if (divAlert) divAlert.parentElement.removeChild(divAlert);
    if (divAlertMask) divAlertMask.parentElement.removeChild(divAlertMask);
    if (message !== undefined) message = typeof message === "object" ? JSON.stringify(message) : String(message);
    if (!message) message = "";
    if (title !== undefined && title !== null && title !== false)
      title = typeof title === "object" ? JSON.stringify(title) : String(title);
    if (title === "" || title === false || title === null) title = "";
    if (title !== "" && !title) title = window.location.host ? window.location.host + " says" : "This page says";
    var divClasses = ["c-alert", "c-alert-content", "c-alert-title", "c-alert-msg", "c-alert-btn", "c-alert-mask"];
    var divElements = [];
    for (var i = 0; i < divClasses.length; i++) {
      var div = document.createElement("div");
      div.classList.add(divClasses[i]);
      if (divClasses[i] === "c-alert-title") div.innerText = title;
      if (divClasses[i] === "c-alert-msg") div.innerText = message;
      if (divClasses[i] === "c-alert-btn") div.innerText = "OK";
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
    if (theme === "dark") {
      divAlert.style.backgroundColor = "#292a2d";
      divAlert.querySelectAll(".c-alert *", function (el) {
        el.style.color = "#e8eaed";
      });
      divAlert.querySelector(".c-alert-btn").style.color = "#8ab4f8";
      divAlert.querySelector(".c-alert-btn").style.borderTop = "1px solid #555555";
      divAlert.querySelectAll(".c-alert .c-alert-btn", function (el) {
        var onclickstart = function () {
          el.style.background = "#333333";
          return;
        };
        var onclickend = function () {
          el.style.background = "#292a2d";
          return;
        };
        el.addEventListener("mousedown", onclickstart, false);
        el.addEventListener("touchstart", onclickstart, false);
        document.addEventListener("mouseup", onclickend, false);
        document.addEventListener("touchmove", onclickend, false);
        document.addEventListener("touchend", onclickend, false);
      });
    }
    divAlert.querySelectorAll(".c-alert-btn")[0].addEventListener("click", function () {
      divAlert.fadeOut(null, true);
      divAlertMask.fadeOut(null, true);
      setTimeout(function () {
        window.alertVisible = false;
      }, 200);
    });
    divAlert.oncontextmenu = function () {
      return false;
    };
    divAlertMask.oncontextmenu = function () {
      return false;
    };
    document.querySelectorAll("body")[0].appendChild(divAlertMask);
    document.querySelectorAll("body")[0].appendChild(divAlert);
    divAlert.fadeIn();
    divAlertMask.fadeIn();
    return;
  } catch (err) {
    console.log(err);
  }
}
