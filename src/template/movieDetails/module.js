/**
 * Created by simplexcspp on 2017/2/5.
 */
(function (angular) {
    angular.module('myMovie.details',['ngRoute'])
        .config(['$routeProvider',function ($routeProvider) {
            $routeProvider
                .when('/details/:id?',{
                    templateUrl: './src/template/movieDetails/view.html',
                    controller: 'movieDetailsCtrl'
                })
        }])
        .controller('movieDetailsCtrl',['$scope','$routeParams','doubanJsonp',function ($scope,$routeParams,doubanJsonp) {
            $scope.detaiLoading = true;
            var id = $routeParams.id; // 获取当前电影id
            doubanJsonp.jsonp('https://api.douban.com/v2/movie/subject/'+ id,{},function (data) {
                $scope.movieDetails = data;
                $scope.detaiLoading = false;
                $scope.$apply();
            })
        }]);
})(angular);