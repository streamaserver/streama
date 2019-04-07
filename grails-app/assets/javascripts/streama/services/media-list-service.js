'use strict';

angular.module('streama').factory('mediaListService', function () {
  var LIST_MAX;

  return{
    init: function (endpoint, defaultSort, currentUser) {
      LIST_MAX = _.get(currentUser, 'amountOfMediaEntries', 30);
      var mediaListConfig = {
        total: 0,
        currentSort: defaultSort || {sort: 'title', order: 'ASC'},
        list: [],
        currentOffset: 0,
        isLoading: true,
        sorter: _.getterSetter(setSort, getSort),
        setFilter: setFilter,
        filter: {
          tags: null,
          genre: [],
          title: null
        },
        fetch: endpoint,
        search: search,
        loadMore: loadMore
      };

      fetchData(mediaListConfig);

      return mediaListConfig;


      function setFilter() {
        fetchData(mediaListConfig);
      }

      function search() {
        fetchData(mediaListConfig);
      }

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
    }
  };


  function fetchData(mediaConfig) {
    var params = {
      max: LIST_MAX,
      offset: mediaConfig.currentOffset,
      sort: mediaConfig.currentSort.sort,
      order: mediaConfig.currentSort.order
    };
    angular.extend(params, mediaConfig.filter);

    mediaConfig.fetch(params).then(function (response) {
      var data = response.data;
      mediaConfig.total = data.total;
      if(mediaConfig.currentOffset > 0){
        mediaConfig.list = _.unionBy(mediaConfig.list, data.list, 'id');
      }else{
        mediaConfig.list = data.list;
      }
      mediaConfig.isLoading = false;
    });
  }

});
