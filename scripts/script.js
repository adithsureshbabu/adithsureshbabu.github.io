function bytesToSize(bytes) {
  if (bytes > 0) {
    var sizes = ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    var i = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, i)).toFixed(2) * 1 + " " + sizes[i];
  } else {
    return "0 bytes";
  }
}
