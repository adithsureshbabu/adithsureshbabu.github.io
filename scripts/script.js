function bytesToSize(bytes) {
  if (bytes > 0) {
    var sizes = ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    var i = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, i)).toFixed(2) * 1 + " " + sizes[i];
  } else {
    return "0 bytes";
  }
}

Number.prototype.padLeft = function (base, chr) {
  var len = String(base || 10).length - String(this).length + 1;
  return len > 0 ? new Array(len).join(chr || "0") + this : this;
};

function getIcon(file, type) {
  if (type === "dir" || type === "directory" || type === "folder") return "icon-folder.svg";
  file = file.split(".").pop();
  var fileTextTypes = ["cql", "css", "csv", "dns", "htm", "html", "ics", "js", "json", "md", "mjs", "rtf", "rtx", "scss", "ts", "txt", "xhtml", "xml", "xsl"];
  var fileFontTypes = ["otf", "ttf", "woff", "woff2"];
  var fileImageTypes = ["bmp", "gif", "ico", "jpeg", "jpg", "png", "svg", "tif", "tiff", "webp"];
  if (fileTextTypes.indexOf(file) > -1) return "icon-file-text.svg";
  if (fileFontTypes.indexOf(file) > -1) return "icon-file-font.svg";
  if (fileImageTypes.indexOf(file) > -1) return "icon-image.svg";
  return "icon-file.svg";
}

var getLastModifiedDate = (...args) => {
  var result = {};
  var lm_api = "https://api.github.com/repos/adithsuresh/adithsuresh.github.io/commits?path=" + args[0] + "&page=1&per_page=1";
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return;
    if (xhr.status >= 200 && xhr.status < 300) {
      var data = JSON.parse(xhr.responseText);
      var utcdate = data[0].commit.committer.date;
      var ld = new Date(utcdate),
        formattedDate =
          [ld.getFullYear(), (ld.getMonth() + 1).padLeft(), ld.getDate().padLeft()].join("-") +
          " " +
          [ld.getHours().padLeft(), ld.getMinutes().padLeft()].join(":");
      result.time = new Date(utcdate).getTime();
      result.date = formattedDate;
      args[1].datetime = result;
      getLastModifiedDateCallback(args[1]);
    } else {
      console.log("ERROR WHILE FETCHING DATA");
    }
  };
  xhr.open("GET", lm_api);
  xhr.onerror = function (err) {
    console.log(err);
  };
  xhr.send();
};

function getLastModifiedDateCallback({ tbody, data, i, datetime }) {
  var tr = tbody.insertRow(data[i].type === "dir" ? 1 : -1);
  var a = document.createElement("a");
  var img = document.createElement("img");
  img.classList.add("icon");
  img.src = "/images/icons/" + getIcon(data[i].name, data[i].type);
  img.alt = data[i].type === "dir" ? "dir" : "file";
  a.target = data[i].type === "dir" ? "_self" : "_blank";
  if (data[i].type == "dir") {
    a.href = "./" + data[i].name + "/";
  } else {
    a.href = "./" + data[i].name;
  }
  a.appendChild(img);
  a.appendChild(document.createTextNode(data[i].name));
  var td1 = tr.insertCell(0);
  td1.appendChild(a);
  td1.setAttribute("data-sort", data[i].name);
  td1.className = "rc-cell";
  var td2 = tr.insertCell(1);
  td2.innerText = datetime.date;
  td2.setAttribute("data-sort", datetime.time);
  td2.className = "rc-cell";
  var td3 = tr.insertCell(2);
  td3.innerText = data[i].type === "dir" ? "-" : bytesToSize(data[i].size);
  td3.setAttribute("data-sort", data[i].size);
  td3.className = "rc-cell";
}

function getData(path) {
  var api = "https://api.github.com/repositories/147058348/contents/" + path;
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return;
    if (xhr.status >= 200 && xhr.status < 300) {
      var data = JSON.parse(xhr.responseText);
      processData(data);
    } else {
      processError();
    }
  };
  xhr.open("GET", api);
  xhr.onerror = function (err) {
    processError(err);
  };
  xhr.send();
}

var processData = function (data) {
  var tbody = document.querySelector("#files-list");
  tbody.innerHTML =
    "<tr data-sort-method='none'> <td class='rc-cell'> <a href='../'><img class='icon' src='/images/icons/icon-corner-left-up.svg' alt='Up' />Parent Directory</a> </td> <td></td> <td></td> </tr>";
  if (!data.length || data.length < 1) {
    processError();
  } else {
    for (i = 0; i < data.length; i++) {
      var ftype;
      if (data[i].name != "index.html" && data[i].name != "index.htm") {
        var lmd_path = encodeURIComponent(data[i].html_url.split("master/")[1]);
        getLastModifiedDate(lmd_path, { tbody, data, i });
      }
    }
  }
  document.querySelector("#content").style.display = "block";
};

var processError = function (err) {
  var tbody = document.querySelector("#files-list");
  tbody.innerHTML =
    "<tr data-sort-method='none'> <td class='rc-cell'> <a href='../'><img class='icon' src='/images/icons/icon-corner-left-up.svg' alt='Up' />Parent Directory</a> </td> <td></td> <td></td> </tr>";
  // var tr = tbody.insertRow(-1);
  // tr.style.textAlign = "center";
  // var td = tr.insertCell(0);
  // td.innerText = "No Data";
  // td.className = "rc-cell";
  // td.colSpan = 3;
  document.querySelector("#content").style.display = "block";
};

var documentLoad = setInterval(function () {
  if (document.readyState !== "complete") return;
  var indexpath = "/";
  if (window.location.pathname) indexpath = window.location.pathname.substring(1);
  // else indexpath = window.location.hostname;
  var indexof = "Index of /" + indexpath.substring(0, indexpath.lastIndexOf("/"));
  document.title = indexof;
  document.querySelector(".title").innerText = indexof;
  clearInterval(documentLoad);
}, 100);
