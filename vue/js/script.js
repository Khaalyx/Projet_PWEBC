document.querySelector("#show-login").addEventListener("click",function(){
    document.querySelector(".popup_login").classList.add("active");
  });
  document.querySelector(".popup_login .close-btn").addEventListener("click",function(){
    document.querySelector(".popup_login").classList.remove("active");
  });
  document.querySelector(".show-signup").addEventListener("click",function(){
    document.querySelector(".popup_login").classList.remove("active");
    document.querySelector(".popup_signup").classList.add("active");
  });
  document.querySelector(".popup_signup .close-btn").addEventListener("click",function(){
    document.querySelector(".popup_signup").classList.remove("active");
  });
  document.querySelector(".show-login").addEventListener("click",function(){
    document.querySelector(".popup_signup").classList.remove("active");
    document.querySelector(".popup_login").classList.add("active");
  });

/* JEU */
$(function() {
  $( "#mapLeaflet" ).resizable({handles: 'ne, n, e' });
});

/*LEAFLET*/
$(

    function initLeafletMap(){
      var map = L.map('mapLeaflet').setView([51.505, -0.09], 5);
      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoidHJhY3loZyIsImEiOiJja3pybnNhdzExNzJkMnhwZTJ6NW5vZWNlIn0.j3ZaOT6jf_ke1P_WaQav4g'
      }).addTo(map);

      var marker = L.marker([48.85741471684478, 2.344281259441162],{title:"Tour Eiffel avec un marqueur draggable",alt:"LA TOUR EIFFEL",draggable:true}).addTo(map);
    }
);


/*STREET VIEW*/
function initialize() {
  const fenway = { lat: 38.20551, lng: -1.39907 };
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
}

/* FIN JEU */

/* Pour menu apres connexion */
/*
function openFunction(){
    document.getElementById("menu").style.width="300px";
    document.getElementById("mainbox").style.marginLeft="300px";
    document.getElementById("mainbox").innerHTML="Menu";
}
function closeFunction(){
    document.getElementById("menu").style.width="0px";
    document.getElementById("mainbox").style.marginLeft="0px";
    document.getElementById("mainbox").innerHTML="&#9776; GuessUp";
}
*/
