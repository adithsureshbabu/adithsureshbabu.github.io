var ipdetails;
var api = 'http://ip-api.com/json';
var url = api;

function setup() {
  loadJSON(url, gotData);
  var button = select('#submit');
  button.mousePressed(refresh);
 
}

function refresh() {
  setTimeout(ipAsk,500);

}

function ipAsk() {
  loadJSON(url, gotData);

}

function gotData(data) {
  ipdetails = data;
  
}

function draw() {
 
  if (ipdetails) {
    var autsys = ipdetails.as;  
	var city = ipdetails.city;
    var provider = ipdetails.isp;
	var country = ipdetails.country;
	var councode = ipdetails.countryCode;
	var latitude = ipdetails.lat;
	var longitude = ipdetails.lon;
	var organiz = ipdetails.org;
	var ipaddress = ipdetails.query;
	var region = ipdetails.regionName;
	var tzone = ipdetails.timezone;
	var zipcode = ipdetails.zip; 	
	document.getElementById("auts").innerHTML = autsys;
	document.getElementById("city").innerHTML = city;  	
	document.getElementById("prov").innerHTML =provider;
	document.getElementById("coun").innerHTML = country;
	document.getElementById("councode").innerHTML = councode;
	document.getElementById("lati").innerHTML = latitude;
	document.getElementById("longi").innerHTML = longitude;
	document.getElementById("orga").innerHTML = organiz;
	document.getElementById("ipad").innerHTML =ipaddress;
	document.getElementById("region").innerHTML = region;
	document.getElementById("timezone").innerHTML = tzone;
	document.getElementById("zipcode").innerHTML = zipcode
  }
}
