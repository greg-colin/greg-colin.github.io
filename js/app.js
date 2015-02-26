// Model
//  No need to create a LocationData constructor function here
//  Use the new google.maps.LatLng() constructor instead

// View Model
var MapViewModel = function() {
  var self = this;
  var iconBase = "./images/google_map_markers/"
  var userLat = ko.observable(40.7586);
  var userLong = ko.observable(-73.9792);
  var myLocation = new google.maps.LatLng(userLat(), userLong());
  var foursquareVenues = ko.observableArray([]);
  this.mapMarkers = ko.observableArray([]);
  this.myLocationMarker = ko.observable();

  this.markOwnLocation = function() {
    self.myLocationMarker(new google.maps.Marker({
      map: self.map,
      position: myLocation,
      icon: iconBase + 'green_MarkerA.png',
      title: "My current location"
    }))
  }

  self.createMapMarker = function(venue) {
    var googleLatLng = new google.maps.LatLng(venue.location.lat, venue.location.lng);

    var marker = new google.maps.Marker({
      map: self.map,
      position: googleLatLng,
      icon: iconBase + 'purple_MarkerA.png',
      title: venue.name
    });

    google.maps.event.addListener(marker, 'click', (function(marker, map, infoWindow) {
      return function() {
        console.log("this:");
        console.log(this);
        console.log("map:");
        console.log(map);
        console.log("info window:");
        marker.setIcon(iconBase + 'red_MarkerA.png');
        infoWindow.setContent('This is: ' + marker.title);
        console.log(infoWindow);
        infoWindow.open(map, marker);
      }
    })(marker, self.map, self.infoWindow));

    mapMarkers().push(marker);
  }

  self.getVenues = function() {
    $.ajax({
        type: "GET",
        url: "https://api.foursquare.com/v2/venues/search?ll="+userLat()+","+userLong()+"&client_id=OLYPOBMQ003QZVMZGDFOEGEZOGZQPNX1X404PVV1FLPVGFMU&client_secret=3MVWXXYQ5ENWZ4MKW4Q1NDMW2P20UFO243POFRBDZUHALQ4U&v=20150217",
          success: function(data) {
            foursquareVenues(data.response.venues);
              $("#venues").html("");
              $.each(foursquareVenues(), function() {
                  if (this.contact.formattedPhone) {
                      phone = "Phone:"+this.contact.formattedPhone;
                  } else {
                      phone = "";
                  }

                  if (this.categories[0]) {
                    category = " [ " + this.categories[0].name + " ] ";
                  } else {
                    category = "";
                  }
                  
                  if (this.location.address) {
                      address = '<p class="subinfo">'+this.location.address+'<br>';
                  } else {
                      address = "";
                  }
                  
                  if (this.rating) {
                      rating = '<span class="rating">'+this.rating+'</span>';
                  } else {
                    rating = "";
                  }
                  console.log("creating marker");
                  var appendeddatahtml = '<div class="venue"><h2><span>'+this.name+category+rating+'</span></h2>'+address+phone+'</p><p><strong>Total Checkins:</strong> '+this.stats.checkinsCount+'</p></div>';
                  var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(this.location.lat, this.location.lng),
                    title: this.name,
                    icon: iconBase + 'purple_MarkerA.png',
                    map: self.map
                  });
                  //
                  console.log(marker);
                  //
                  google.maps.event.addListener(marker, 'click', function() {
                    marker.setIcon(iconBase + 'red_MarkerA.png');
                    self.infoWindow.setContent(appendeddatahtml);
                    console.log(self.infoWindow);
                    self.infoWindow.open(self.map, marker);
                  });
                  //
                  self.mapMarkers.push({marker: marker, content: appendeddatahtml});
                  //
                  //$("#venues").append(appendeddatahtml);
                  
              });
          }
    });
  }

  self.initialize = function() {
    console.log("in self.initialize");
    var mapOptions = {
      disableDefaultUI: false,
      center: myLocation, // referencing the myLocation variable
      position: myLocation,  // same as above
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoom: 16
    };
    self.map = new google.maps.Map(document.getElementById('map-div'), mapOptions);
    self.infoWindow = new google.maps.InfoWindow();
    self.markOwnLocation();
    self.getVenues();
  };

  self.initialize();

};

var myMapViewModel = new MapViewModel();
ko.applyBindings(myMapViewModel);