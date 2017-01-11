new Vue({
  el: '#app',
  data: {
    weather: {},
    tempC: 0,
    locationName: '',
    showTempC: true
  },
  computed: {
    tempF: function() {
      return this.tempC * 1.8 + 32 | 0;
    }
  },
  created: function() {
    this.getLocation().then(this.getWeatherByLocation);
  },
  methods: {
    getLocation: function() {
      var _this = this;
      return this.$http.jsonp('http://ipinfo.io/json')
        .then(function(response) {
          var data = response.data;
          _this.locationName = data.city + ', ' + data.region + ', ' + data.country;
          return response.data;
        });
    },
    getWeatherByLocation: function(location) {
      var _this = this;
      var loc = location.loc.split(',');
      var url = 'http://api.openweathermap.org/data/2.5/weather?appid=05d041c8f2b57c5f6133614a6480c5ba&lat=' +
        loc[0] + '&lon=' + loc[1];

      return this.$http.get(url).then(function(response) {
        var data = response.data;
        _this.weather = data.weather[0];
        _this.weather.iconUrl = 'http://openweathermap.org/img/w/' + _this.weather.icon + '.png';
        _this.tempC = data.main.temp - 273.15 | 0;
      });
    }
  }
});
