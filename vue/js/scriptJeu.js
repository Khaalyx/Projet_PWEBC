/* JEU */
let latMarker;
let lngMarker;
let countryMarker;
let latSV;
let lngSV;
let countryStreetView;
let countryCodeSV;


$(function (){

    var map = L.map("mapLeaflet").setView([51.505, -0.09], 5);
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

    //marker init in france
    var marker = L.marker([48.85741471684478, 2.344281259441162],{draggable:true}).addTo(map);

    $( "#mapLeaflet" ).resizable({handles: "ne, n, e" });

    //quand on deplace le marker
    marker.on("dragend",  function (e) {
        latMarker = marker.getLatLng().lat;
        lngMarker = marker.getLatLng().lng;

        //appel à la fonction pour recuperer le pays du marker mais seulement quand on bouge le marker 2fois
        // BIZARRE
        console.log('----------- avant : ');

        //ajaxNominatimReverseMarker(latMarker,lngMarker);
        ajaxNominatimReverse(latMarker,lngMarker,"countryMarker");
        setTimeout(function () {
            console.log(latMarker + ", " + lngMarker);
            console.log('apres : ' + countryMarker+ '-----------------');
            var layer = marker.bindPopup("<strong>" + countryMarker + "</strong><br /> Lat : " + latMarker + "<br />Lng :" + lngMarker).addTo(map);
            layer.openPopup();
            layer.closePopup();
        }, 200);

    });


    //$.getJSON("countryName.json", function(result) { //tester les 2 fichiers pour voir lequel fonctionne le plus
    $.getJSON("country.json", function(result) {
        //console.log(result.length);
        let rand=Math.floor(Math.random() * (result.length - 0 + 1) + 0);
        //console.log(rand);
        //console.log(result[2].country);
        countryStreetView=result[rand].name;
        countryCodeSV=result[rand].code;
        console.log('SV : '+ countryStreetView + ","+countryCodeSV);
        //ajaxNominatimSearch(countryStreetView);
        ajaxCountry();
        //par ajax avec nominatim en param country si success sinon avec q=..   tester avec les noms compliqué
        //toujours passer par nominatim ? pour avoir les bon nom de pays qui correspondent ?
    });
    /*
     $.getJSON("countryLatLong.json", function(result) {
         //console.log(result.length);
         let rand=Math.floor(Math.random() * (result.length - 0 + 1) + 0);
         //console.log(rand);
         //console.log(result[2].country);
         countryStreetView=result[rand].country;
         countryCodeSV=result[rand].alpha2;
         console.log('SV : '+ countryStreetView + ","+countryCodeSV);
         ajaxCountry();
         //par ajax avec nominatim en param country si success sinon avec q=..   tester avec les noms compliqué
         //toujours passer par nominatim ? pour avoir les bon nom de pays qui correspondent ?
     });*/
});

function ajaxCountry(){
    /*latSV=;
    lngSV=;
    countryStreetView=;
    countryCodeSV=;*/
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
        //http://api.openweathermap.org/geo/1.0/reverse?lat=51.5098&lon=-0.1180&limit=5&appid={API key}
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
    }, 200);
}

/**
 * Au clic sur le bouton guess :
 */
function guess(){
    ajaxNominatimReverse(latSV,lngSV,"countryStreetView");
    setTimeout(function () {
        console.log("marker : "+countryMarker+' : '+latMarker+','+lngMarker);
        console.log("SV : "+countryStreetView+' : '+latSV+','+lngSV);
        console.log(countryMarker+" / "+countryStreetView);
        if (countryStreetView==countryMarker)
            alert("YESS");
        else
            alert("NOOO");
    }, 200);
    //faire toute la partie rejouer, compter points, quitter le jeu, sauvegarder ...
}

/* FIN JEU */
