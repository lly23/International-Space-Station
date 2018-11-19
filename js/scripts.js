$(function(){
  console.log('scripts loaded');

  // HTML variable
  var html = '';

  // create function with api call for space station and have it called every 5 seconds
  setInterval(function() {
    // start with API variables for space station
    var stationAPI = 'http://api.open-notify.org/iss-now.json';
    var stationData = [];
    var latitude = 0;
    var longitude = 0;

    // make API call for space station
    $.ajax({
      type: 'GET',
      data: stationData,
      dataType: 'json',
      url: stationAPI,
      async: true,
      success: function(stationData) {
        // get latitude from iss_position variable and set it to latitude variable
        latitude = stationData.iss_position.latitude;
      
        // get longitude from iss_position variable and set it to longitude variable
        longitude = stationData.iss_position.longitude;

        // call geoCode function within success function and pass the latitude and longitude variables into the function
        geoCode(latitude, longitude);
      }
    });
  }, 5000);

  // once latitude and longitude variables from previous ajax call are passed through, variables can be added to API url
  function geoCode(latitude, longitude) {
    // API variables for geocoding 
    var geocodingAPI = 'https://nominatim.openstreetmap.org/reverse?format=json&lat=' + latitude + '&lon=' + longitude;
    var geocodingData = [];
    var state = '';
    var country = '';

    // make API call for geocoding
    $.ajax({
      type: 'GET',
      data: geocodingData,
      dataType: 'json',
      url: geocodingAPI,
      async: true,
      success: function(geocodingData) {
        console.log(latitude);
        console.log(longitude);
        console.log(geocodingAPI);
        console.log(geocodingData);

        // If geocode data returns with 'unable to geocode' error, the station is over an ocean
        if (geocodingData.error == 'Unable to geocode') {
          html = 'The space station is currently over an ocean.';
        } else {
        // If geocode does not return with an error then return the state and country of where the station is into the html
          state = geocodingData.address.state;
          country = geocodingData.address.country;

          html = 'The space station is currently over ' + state + ', ' + country + '.';
        }

        $('#results').html(html);
      }
    });
  }

});
