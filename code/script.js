document.getElementById("toRealTime").addEventListener("click", function () {
  document
    .getElementById("map")
    .scrollIntoView({ behavior: "smooth", block: "nearest" });
});

document.getElementById("toCountry").addEventListener("click", function () {
  document
    .getElementById("map2")
    .scrollIntoView({ behavior: "smooth", block: "nearest" });
});

var areaRate = 1637.94;
var circle = 0;
var today;
var date1;
var timeDiff;
var diffDays;
var timePassed;
var interval;
var intervalRate = 1000;

var getJSON = function (url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "json";
  xhr.onload = function () {
    var status = xhr.status;
    if (status === 200) {
      callback(null, xhr.response);
    } else {
      callback(status, xhr.response);
    }
  };
  xhr.send();
};

function initMap() {
  var styler = [
    {
      featureType: "road",
      elementType: "all",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "administrative.country",
      elementType: "all",
      stylers: [{ visibility: "on" }, { invert_lightness: true }],
    },
    {
      featureType: "administrative.province",
      elementType: "all",
      stylers: [
        { visibility: "simplified" },
        { invert_lightness: true },
        { weight: 1.43 },
      ],
    },
    {
      featureType: "poi",
      elementType: "all",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "administrative.neighborhood",
      elementType: "all",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "all",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "poi.park",
      elementType: "all",
      stylers: [{ visibility: "on" }],
    },
    {
      featureType: "water",
      elementType: "all",
      stylers: [{ visibility: "on" }, { color: "#44a9b0" }],
    },
    {
      featureType: "landscape.man_made",
      elementType: "all",
      stylers: [{ color: "#e3e0bf" }],
    },
  ];

  var algiers = { lat: 24.7538, lng: 3.0588 };
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 2,
    center: algiers,
    styles: styler,
  });
  var pos;

  navigator.geolocation.getCurrentPosition(function (position) {
    pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    if (pos == undefined) {
      pos = { lat: 36.1627, lng: -86.7816 };
    }
    map.setCenter(algiers);
    circle = new google.maps.Circle({
      map: map,
      center: pos,
      //radius        : parseInt(document.getElementById("areaChange").value),
      editable: false,
      draggable: true,
      geodesic: true,
      strokeColor: "transparent",
      strokeOpacity: 1,
      strokeWeight: 2,
      fillColor: "#FF4136",
      fillOpacity: 0.5,
    });
  });

  var map2 = new google.maps.Map(document.getElementById("map2"), {
    zoom: 2,
    center: { lat: 24.7538, lng: 3.0588 },
    styles: styler,
  });

  getJSON("https://api.myjson.com/bins/wd2pt", function (err, data) {
    for (var i = 0; i < data.length; i++) {
      var lat = data[i].Latitude;
      var lng = data[i].Longitude;
      var latLng = new google.maps.LatLng(lat, lng);
      var sqrtKmLost = data[i].SquareKilometersLost;
      if (sqrtKmLost < 0) {
        var countryCenter = new google.maps.Circle({
          editable: false,
          draggable: true,
          geodesic: true,
          strokeColor: "transparent",
          strokeOpacity: 1,
          strokeWeight: 2,
          fillColor: "#FF8C00",
          fillOpacity: 0.5,
          map: map2,
          center: latLng,
          radius: sqrtKmLost,
        });
      } else if (sqrtKmLost > 0) {
        var countryCenter = new google.maps.Circle({
          editable: false,
          draggable: true,
          geodesic: true,
          strokeColor: "transparent",
          strokeOpacity: 1,
          strokeWeight: 2,
          fillColor: "#FF4136",
          fillOpacity: 0.5,
          map: map2,
          center: latLng,
          radius: sqrtKmLost,
        });
      }
    }
  });
  var geocoder = new google.maps.Geocoder();

  document.getElementById("btn2").addEventListener("click", function () {
    geocodeAddress(geocoder, map2);
  });
}

function calculateRadius() {
  today = new Date();
  date1 = new Date(document.getElementById("date").value);
  timeDiff = Math.abs(today.getTime() - date1.getTime());
  diffDays = Math.ceil(timeDiff / 1000);
  timePassed = areaRate * diffDays;
  //console.log(intervalRate);
  interval = setInterval(function () {
    console.log(timePassed);
    var radius = Math.sqrt(timePassed / Math.PI);
    //document.getElementById("areaChange").value = timePassed / 1000000;
    document.getElementById("kmLost").innerHTML = timePassed / 1000000;
    console.log("circle", circle);
    circle.setRadius(radius);
    timePassed += areaRate;
  }, intervalRate);
}

document.getElementById("resetBtn").addEventListener("click", function () {
  clearInterval(interval);
  // console.log(interval);
});

function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById("address").value;
  geocoder.geocode({ address: address }, function (results, status) {
    resultsMap.setCenter(results[0].geometry.location);
    if (results[0].geometry.viewport)
      resultsMap.fitBounds(results[0].geometry.viewport);
  });
}
