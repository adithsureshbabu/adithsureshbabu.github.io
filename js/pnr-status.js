var pnrdetails;
var api = 'https://api.railwayapi.com/v2/pnr-status/pnr/';
var input;
var apiKey = '/apikey/sxllotmoh2/';

function setup() { 
	var button1 = select('#submit'); 
	var button2 = select('#btnRefresh');
	input = select('#pnrinput');  
	button1.mousePressed(pnrAsk);
	button2.mousePressed(refreshPnr);
	document.getElementById("error-msg").style.display="none";
	document.getElementById("pnr-data").style.display="none";
	removeDummy();
}

function refreshPnr() {
  setTimeout(pnrAsk,500);
  alert("PNR data refreshed!");

}

function pnrAsk() {
if (input.value() == "") {
	alert("Please enter the PNR number!");
}
else if (input.value().length != 10) {
	alert("PNR number should be 10-digits!");		
}
else {
	var url = api + input.value() + apiKey;
	//url='https://rawgit.com/adithsuresh5/3684f0bfe5eb3ab3edaa45a4e3bff756/raw/8957237c3ec99864f0e8d24520fcbdb29e3ed8cb/sample-pnr-data.json';
	loadJSON(url, gotData);
}
	
}

function gotData(data) {
pnrdetails = data;
if (pnrdetails) {  
	var responsecode = pnrdetails.response_code;
	var errmsg;
	switch (responsecode) {
		case 220:
			document.getElementById("pnr-data").style.display="none";
			document.getElementById("error-msg").style.display="block";
			errmsg = "Flushed PNR!";
			break;
		case 221:
			document.getElementById("pnr-data").style.display="none";
			document.getElementById("error-msg").style.display="block";
			errmsg = "Invalid PNR!";
			break;
		case 405:
			document.getElementById("pnr-data").style.display="none";
			document.getElementById("error-msg").style.display="block";
			errmsg = "Indian Railways PNR Services are down, Please check after sometime!";
			break;
		case 500:
			document.getElementById("pnr-data").style.display="none";
			document.getElementById("error-msg").style.display="block";
			errmsg = "Api-key expired!";			
			break;		
		case 200:
			document.getElementById("error-msg").style.display="none";
			document.getElementById("pnr-data").style.display="block";
			proceed();
			break;		
		default:
			document.getElementById("pnr-data").style.display="none";
			document.getElementById("error-msg").style.display="block";
			errmsg = "PNR data could not be loaded, Please check after sometime!";
			break;	
	}
	document.getElementById("error-msg").innerHTML = errmsg;
	setTimeout(function(){document.getElementById("error-msg").style.display="none";}, 4000);
}	
}

function proceed() {
var chart = pnrdetails.chart_prepared;
if (chart === true) {
	chart = "CHART PREPARED";
} 
else {
	chart = "CHART NOT PREPARED";
}

document.getElementById("journeydate").innerHTML = pnrdetails.doj;
document.getElementById("trainno").innerHTML = pnrdetails.train.number;
document.getElementById("trainname").innerHTML = pnrdetails.train.name;
document.getElementById("fromst").innerHTML = pnrdetails.from_station.code;
document.getElementById("tost").innerHTML = pnrdetails.to_station.code;
document.getElementById("bdpt").innerHTML = pnrdetails.boarding_point.name;
document.getElementById("respt").innerHTML = pnrdetails.reservation_upto.name;
document.getElementById("jclass").innerHTML = pnrdetails.journey_class.code;
document.getElementById("chstat").innerHTML = chart;

for(var i = document.getElementById("passenger").rows.length; i > 0;i--) {
	document.getElementById("passenger").deleteRow(i -1);
}

var passenger = pnrdetails.passengers;
var tbody = document.getElementById("passenger");	
for (i = passenger.length-1; i >= 0; i--) {			
	var td = tbody.insertRow(0);
	td.insertCell(0).innerHTML=passenger[i].no;
	tbody.rows[0].cells[0].className="rc-cell";
	td.insertCell(1).innerHTML=passenger[i].booking_status;
	tbody.rows[0].cells[1].className="rc-cell";
	td.insertCell(2).innerHTML=passenger[i].current_status;
	tbody.rows[0].cells[2].className="rc-cell";
}

} 

function urlQr() {
var urlParam = function(name, w){
    w = w || window;
    var rx = new RegExp('[\&|\?]'+name+'=([^\&\#]+)'),
        val = w.location.search.match(rx);
    return !val ? '':val[1];
}
var useId = urlParam('pnr');
var upnr = useId.match(/\d/g).join("");
document.getElementById('pnrinput').value=upnr.substring(0,10);
updateURL();
	if (document.getElementById('pnrinput').value != "") {
		pnrAsk();
	}
}

function updateURL() {
      if (history.pushState) {
          var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?pnr=' + input.value() ;
          window.history.pushState({path:newurl},'',newurl);
      }  
}

function removeDummy() {
	document.getElementById('defaultCanvas0').parentNode.removeChild(document.getElementById('defaultCanvas0'));
}
