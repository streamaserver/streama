'use strict';

angular.module('streama')
  .controller('adminTranscodingCtrl',
    ['$scope', 'apiService', '$interval',
    function ($scope, apiService, $interval) {
      var vm = this;
      var statusPollInterval = null;

      vm.loading = true;
      vm.status = null;
      vm.files = [];
      vm.pendingFiles = [];
      vm.cacheStats = null;
      vm.pagination = {
        currentPage: 1
      };
      vm.maxPerPage = 20;

      // Public methods
      vm.refreshStatus = refreshStatus;
      vm.refreshFiles = refreshFiles;
      vm.transcode = transcode;
      vm.transcodeAll = transcodeAll;
      vm.clearCache = clearCache;
      vm.clearAllCache = clearAllCache;
      vm.probe = probe;
      vm.probeAll = probeAll;
      vm.pageChanged = pageChanged;

      // Initialize
      init();

      function init() {
        refreshStatus();
        refreshFiles();

        // Poll for status updates every 5 seconds
        statusPollInterval = $interval(function () {
          if (vm.status && vm.status.available) {
            refreshPending();
            refreshCacheStats();
          }
        }, 5000);

        $scope.$on('$destroy', function () {
          if (statusPollInterval) {
            $interval.cancel(statusPollInterval);
          }
        });
      }

      function refreshStatus() {
        apiService.transcoding.status().then(function (response) {
          vm.status = response.data;
          vm.loading = false;

          if (vm.status.available) {
            refreshCacheStats();
            refreshPending();
          }
        }, function (error) {
          vm.loading = false;
          vm.status = { available: false, error: 'Could not load transcoding status' };
        });
      }

      function refreshCacheStats() {
        apiService.transcoding.cacheStats().then(function (response) {
          vm.cacheStats = response.data;
        });
      }

      function refreshPending() {
        apiService.transcoding.pending().then(function (response) {
          vm.pendingFiles = response.data;
        });
      }

      function refreshFiles() {
        var params = {
          max: vm.maxPerPage,
          offset: (vm.pagination.currentPage - 1) * vm.maxPerPage
        };

        apiService.transcoding.list(params).then(function (response) {
          vm.files = response.data.files;
          vm.totalFiles = response.data.total;
        });
      }

      function transcode(file) {
        file.transcoding = true;
        apiService.transcoding.transcode(file.id).then(function (response) {
          alertify.success('Transcoding started for ' + file.originalFilename);
          refreshFiles();
        }, function (error) {
          file.transcoding = false;
          alertify.error('Failed to start transcoding');
        });
      }

      function transcodeAll() {
        alertify.confirm('Start transcoding for all ' + vm.pendingFiles.length + ' pending files?', function (confirmed) {
          if (confirmed) {
            apiService.transcoding.transcodeAll().then(function (response) {
              alertify.success('Batch transcoding started for ' + response.data.count + ' files');
              refreshFiles();
            }, function (error) {
              alertify.error('Failed to start batch transcoding');
            });
          }
        });
      }

      function clearCache(file) {
        alertify.confirm('Clear transcoded cache for ' + file.originalFilename + '?', function (confirmed) {
          if (confirmed) {
            apiService.transcoding.clearCache(file.id).then(function (response) {
              alertify.success('Cache cleared');
              refreshFiles();
              refreshCacheStats();
            }, function (error) {
              alertify.error('Failed to clear cache');
            });
          }
        });
      }

      function clearAllCache() {
        alertify.confirm('Clear ALL transcoded audio cache? This cannot be undone.', function (confirmed) {
          if (confirmed) {
            apiService.transcoding.clearAllCache().then(function (response) {
              alertify.success('Cleared ' + response.data.count + ' cached files');
              refreshFiles();
              refreshCacheStats();
            }, function (error) {
              alertify.error('Failed to clear cache');
            });
          }
        });
      }

      function probe(file) {
        file.probing = true;
        apiService.transcoding.probe(file.id).then(function (response) {
          alertify.success('File probed: ' + response.data.audioCodec);
          file.probing = false;
          refreshFiles();
        }, function (error) {
          file.probing = false;
          alertify.error('Failed to probe file');
        });
      }

      function probeAll() {
        alertify.confirm('Probe all unscanned video files for audio codec information?', function (confirmed) {
          if (confirmed) {
            apiService.transcoding.probeAll().then(function (response) {
              alertify.success('Probed ' + response.data.probed + ' files, ' + response.data.failed + ' failed');
              refreshFiles();
            }, function (error) {
              alertify.error('Failed to probe files');
            });
          }
        });
      }

      function pageChanged() {
        refreshFiles();
      }
}]);
