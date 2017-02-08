/**
 * Created by xc on 2017/1/31.
 */
(function (angular) {
    angular.module('myMovie.home',['ngRoute'])
        .config(['$routeProvider',function ($routeProvider) {
            $routeProvider
                .when('/home_page',{
                    // 相对于index.html来计算路径
                    templateUrl: './src/template/home/homeView.html'
                })
                .otherwise({
                    redirectTo: '/home_page'
                })
        }]);
})(angular);