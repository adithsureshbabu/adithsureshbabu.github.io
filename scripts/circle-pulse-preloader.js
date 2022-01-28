var cpPreloader = (function () {
  var cpp = {};
  cpp.start = function (theme, progress_bar_increment) {
    var circle_pulse_el = document.createElement("div");
    circle_pulse_el.classList.add("circle-pulse");
    circle_pulse_el.appendChild(document.createElement("div"));
    circle_pulse_el.appendChild(document.createElement("div"));
    var load_progress_wrap_el = document.createElement("div");
    load_progress_wrap_el.classList.add("load-progress-wrap");
    load_progress_wrap_el.appendChild(document.createElement("span"));
    var preloader_wrap_el = document.createElement("div");
    preloader_wrap_el.classList.add("preloader-wrap");
    preloader_wrap_el.appendChild(circle_pulse_el);
    preloader_wrap_el.appendChild(load_progress_wrap_el);
    var cp_preloader_el = document.createElement("div");
    cp_preloader_el.classList.add("cp-preloader");
    if (theme === "dark") cp_preloader_el.classList.add("cp-preloader-dark-theme");
    cp_preloader_el.appendChild(preloader_wrap_el);
    document.body.appendChild(cp_preloader_el);
    var load_progress_el = load_progress_wrap_el.querySelector("span");
    var progress = 0;
    var progress_interval = setInterval(function () {
      if (document.readyState !== "complete") {
        progress += progress_bar_increment || 2;
        if (progress < 100) load_progress_el.style.width = progress + "%";
        else {
          progress = 100;
          load_progress_el.style.width = progress + "%";
        }
      }
      if (document.readyState === "complete") {
        progress = 100;
        load_progress_el.style.width = progress + "%";
        setTimeout(() => {
          cp_preloader_el.style.opacity = 0;
        }, 200);
        setTimeout(function () {
          cp_preloader_el.style.display = "none";
        }, 1000);
        clearInterval(progress_interval);
        console.log("page loaded");
      }
    }, 100);
  };
  return cpp;
})();
