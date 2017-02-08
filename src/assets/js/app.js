(function (angular) {
    //路由匹配按顺序匹配
    angular.module('myMovie',[
        'myMovie.home', //首页固定路由
        'myMovie.details', //电影详情固定路由
        'myMovie.movieList',
        'myMovie.jsonp',
        'myMovie.isActive',
    ]).controller('mainCtrl',['$scope','$location',function ($scope,$location) {
            // 电影搜索功能
            $scope.textValue = '';
            $scope.search = function () {
                // 配置公共路由jsonp参数
                $location.url('/search?q='+ $scope.textValue);
            };
        }])
})(angular);