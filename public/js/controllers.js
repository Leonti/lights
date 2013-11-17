'use strict';

/* Controllers */

function AppCtrl($scope, $http) {

    $scope.switchOn = function(id) {
        $http({method: 'GET', url: '/api/light/' + id + '/on'}).
        success(function(data, status, headers, config) {
            console.log(data);            
        });
    };

    $scope.switchOff = function(id) {
        $http({method: 'GET', url: '/api/light/' + id + '/off'}).
        success(function(data, status, headers, config) {
            console.log(data);            
        });
    };
}
