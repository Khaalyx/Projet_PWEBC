/* JEU */
let latMarker;
let lngMarker;
let countryMarker;
let latSV;
let lngSV;
let countryStreetView;
let countryCodeSV;


let map;
$(function (){ /*//init map leaflet en bas a gauche*/
    map = L.map("mapLeaflet").setView([51.505, -0.09], 5);
    L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        minZoom:1,
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken: "pk.eyJ1IjoidHJhY3loZyIsImEiOiJja3pybnNhdzExNzJkMnhwZTJ6NW5vZWNlIn0.j3ZaOT6jf_ke1P_WaQav4g"
    }).addTo(map);

    //** pour les border de la map,
    var southWest = L.latLng(-89.98155760646617, -180),
        northEast = L.latLng(89.99346179538875, 180);
    var bounds = L.latLngBounds(southWest, northEast);
    map.setMaxBounds(bounds);
    map.on('drag', function() {
        map.panInsideBounds(bounds, { animate: false });
    });
    var markIcon = L.icon({
        iconUrl: 'markerMan.png',
        iconSize:     [30, 35], // size of the icon
        iconAnchor:   [15, 34], // point of the icon which will correspond to marker's location
    });

    //marker init in france
    var marker = L.marker([48.85741471684478, 2.344281259441162],{icon:markIcon,draggable:true}).addTo(map);

    $( "#mapLeaflet" ).resizable({handles: "ne, n, e" });

    //quand on deplace le marker
    marker.on("dragend",  function (e) {
        latMarker = marker.getLatLng().lat;
        lngMarker = marker.getLatLng().lng;

        console.log('----------- avant : ');

        ajaxNominatimReverse(latMarker,lngMarker,"countryMarker");
        setTimeout(function () {
            console.log(latMarker + ", " + lngMarker);
            console.log('apres : ' + countryMarker+ '-----------------');
            var layer = marker.bindPopup("<strong>" + countryMarker + "</strong><br /> Lat : " + latMarker + "<br />Lng :" + lngMarker).addTo(map);
            layer.openPopup();
            layer.closePopup();
        }, 200);
    });
});
//recuperer un pays au hasard
function getRandomCountry(){
    $.getJSON("country.json", function(result) {
        let rand=Math.floor(Math.random() * (result.length - 0 + 1) + 0);
        countryStreetView=result[rand].name;
        countryCodeSV=result[rand].code;
        console.log('SV : '+ countryStreetView + ","+countryCodeSV);
        ajaxCountry();
    });
}

//requete ajax pour recuperer les coordonnée du pays
function ajaxCountry(){
    $.ajax({
        type: "GET",
        url: "http://api.openweathermap.org/geo/1.0/direct?q="+countryStreetView+","+countryCodeSV+"&limit=1&appid=7c916eb4cc0f00b78c437bec9900786f",
        success:  function (result) {
            getCoord(result[0].lat,result[0].lon);
        },
        error: function (){ alert  ("Pb!!");
        }
    });
}
function getCoord(lat,lng){
    latSV=parseFloat(lat);
    lngSV=parseFloat(lng);
    console.log("coord : "+latSV+','+lngSV);
}

/** function pour récuperer le pays avec une requete ajax sur nominatim */
function ajaxNominatimReverse(lat,lng,countrySet){
    $.ajax({
        type: "GET",
        url: "https://nominatim.openstreetmap.org/reverse?format=json&lat="+lat+"&lon="+lng+"&limit=1&zoom=4&addressdetails=1",
        success:  function (result) {
            getCountry(result.address.country,countrySet);
        },
        error: function (){ alert  ("Pb!!");
        }
    });
}

/** function callback pour stocker le resultat de la requete dans countryMarker ou countryStreetView */
function getCountry(country,countrySet){
    if (countrySet=="countryMarker") countryMarker=country;
    else
        countryStreetView=country;
    console.log('pendant : '+countrySet+ countryMarker+"/"+countryStreetView);
}

/*STREET VIEW*/
function initialize() {
    getRandomCountry();
    setTimeout(function () {
        const fenway = { lat: latSV, lng: lngSV};
        //console.log(fenway);
        const map = new google.maps.Map(document.getElementById("street-view"), {
            center: fenway,
            zoom: 14,
        });
        const panorama = new google.maps.StreetViewPanorama(
            document.getElementById("street-view"),
            {
                position: fenway,
                pov: {
                    heading: 34,
                    pitch: 10,
                },
                addressControl: false,
                showRoadLabels: false
            }
        );
        map.setStreetView(panorama);
    }, 300);
}

/**
 * Au clic sur le bouton guess :
 * creer une variable cpt, boucle while >3 rejouer
 */

function guess(){
    ajaxNominatimReverse(latSV,lngSV,"countryStreetView");
    setTimeout(function () {
        console.log("marker : "+countryMarker+' : '+latMarker+','+lngMarker);
        console.log("SV : "+countryStreetView+' : '+latSV+','+lngSV);
        console.log(countryMarker+" / "+countryStreetView);
        var pinIcon = L.icon({
            iconUrl: 'pin.png',
            iconSize:     [30, 35], // size of the icon
            iconAnchor:   [15, 34], // point of the icon which will correspond to marker's location
        });

        var polylinePoints = [
            [latMarker, lngMarker],
            [latSV, lngSV]
        ];

        L.marker([latSV,lngSV ],{icon:pinIcon}).addTo(map);
        var polyline = L.polyline(polylinePoints,{color:"black",dashArray: "5,5"}).addTo(map);
        setTimeout(function () {
        if (countryStreetView==countryMarker) //rajouter une condition ici si on fait par round
            if (confirm('Gagné ! Rejouer ?')) {
                rejouer();
            } else {
                //rejouer(); //a modifier
            }
        else {
            if (confirm('Perdu ! Rejouer ?')) {
                rejouer();
            } else {
                //rejouer();//a modifier
            }
        }
        }, 200);
    }, 200);
    //faire toute la partie rejouer, compter points, quitter le jeu, sauvegarder ...
}

function rejouer(){
    location.reload(); //refresh page
}


/* FIN JEU */
