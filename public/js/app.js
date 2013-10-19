'user strict';

var ufo = angular.module('ufo', ['ngRoute', 'ngSanitize']).
    config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/', {templateUrl : 'partials/home', controller : 'HomeCtrl'})
    }])
    .controller('HomeCtrl', ['$scope', '$http', function($scope, $http){
        $scope.limit = 10;
        $scope.offset = 0;

        $http.get('api/sightings?limit='+ $scope.limit +'&offset='+ $scope.offset).success(function(data){
            $scope.sightings = data.sightings;
        });
        $scope.select = function(s) {
            $scope.selected = s;
        }
        $scope.search = function(){
            $http.get('api/sightings?limit='+ $scope.limit +'&offset='+ $scope.offset + '&s='+ $scope.searchTerm).success(function(data){
                $scope.selected = null;
                $scope.sightings = data.sightings;
            });
        }
        $scope.glimpseClass = function(s){
            if(!$scope.selected) return '';
            return s == $scope.selected ? 'selected':'';
        }
    }])
    .filter('truncate', function(){
        return function(val){
            if(!val) return val;
            var l = val.length;
            return l > 100 ? val.substring(0, 100) + '...' : val;
        }
    })
    .filter('highlight', function(){
        return function(text, val){
            if(!val || !text)
                return text;
            var tl = text.toLowerCase();
            var vl = val.toLowerCase();
            var start = tl.indexOf(val);
            if(start < 0)
                return text;
            var end = start + val.length;
            return text.substring(0, start)
                +'<span class="highlight">'
                + text.substring(start, end)
                + '</span>'
                + text.substring(end);
        }
    });