new Vue({
  el: '#app',
  data: {
    resultList: [],
    searchQuery: ''
  },
  methods: {
    search: function(query) {
      let url = 'https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=' + query;
      let _this = this;
      this.$http.jsonp(url).then(function(response) {
        _this.resultList = response.data.query.search;
      });
    }
  }
});
