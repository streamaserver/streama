'use strict';

angular.module('streama').factory('mediaListService', function () {
  var LIST_MAX = 30;

  return{
    init: function (enpoint) {
      var mediaListConfig = {
        total: 0,
        currentSort: {sort: 'title', order: 'ASC'},
        list: [],
        currentOffset: 0,
        isLoading: true,
        sorter: _.getterSetter(setSort, getSort),
        filter: {
          tags: null,
          genre: null,
          title: null
        },
        fetch: enpoint,
        loadMore: loadMore,
        getThumbnail: getThumbnail
      };

      fetchData(mediaListConfig);

      return mediaListConfig;

      function getSort() {
        return mediaListConfig.currentSort;
      }

      function setSort(sort) {
        mediaListConfig.currentSort = sort;
        mediaListConfig.currentOffset = 0;
        fetchData(mediaListConfig);
      }

      function loadMore() {
        mediaListConfig.currentOffset += LIST_MAX;
        fetchData(mediaListConfig);
      }

      function getThumbnail(movie) {
        if(!movie.poster_image_src){
          return $rootScope.basePath + 'assets/poster-not-found.png';
        }

        if(movie.poster_image_src){
          return movie.poster_image_src;
        }

      }
    }
  };


  function fetchData(mediaConfig) {
    mediaConfig.fetch({max: LIST_MAX, offset: mediaConfig.currentOffset, sort: mediaConfig.currentSort.sort, order: mediaConfig.currentSort.order}).success(function (response) {
      mediaConfig.total = response.total;
      if(mediaConfig.currentOffset > 0){
        mediaConfig.list = _.unionBy(mediaConfig.list, response.list, 'id');
      }else{
        mediaConfig.list = response.list;
      }
      mediaConfig.isLoading = false;
    });
  }

});
