(function () {
  'use strict';

  /**
   * @ngdoc Service
   * @name MainService
   * @description
   */

  angular
    .module('app')
    .factory('MainService', MainService);

  function MainService($http, $q) {

    return {
      getStatus: getStatus,
      getBooking: getBooking,
      setBooking: setBooking
    };


    function getStatus(q) {
      return $http.get('/status')
        .then(function (results) {
          return results.data;
        }).catch(function (error) {
          return $q.reject(error.data);
        });
    }

    function getBooking() {
      return $http.get('/booking')
        .then(function (results) {
          return results.data;
        }).catch(function (error) {
          return $q.reject(error.data);
        });
    }

    function setBooking(name) {

      var parameters = {
        name: name
      };

      return $http.put('/booking', parameters)
        .then(function (results) {
          return results.data;
        }).catch(function (error) {
          return $q.reject(error.data);
        });
    }
  }
})();