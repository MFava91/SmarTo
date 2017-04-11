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
        };


        function getStatus(q) {
            return $http.get('/status')
                .then(function (results) {
                    return results.data;
                }).catch(function (error) {
                    return $q.reject(error.data);
                });
        }
    }
})();