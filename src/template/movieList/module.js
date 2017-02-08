/**
 * Created by xc on 2017/1/31.
 */
(function (angular) {
    angular.module('myMovie.movieList',['ngRoute'])
        .config(['$routeProvider',function ($routeProvider) {
            $routeProvider
            // 路由规则（增加匹配当前页，默认从第1页开始）
                .when('/:listType/:urlPage?',{
                    templateUrl: './src/template/movieList/view.html',
                    controller: 'movieListCtrl'
                })
        }])
        .controller('movieListCtrl',['$scope','$http','$routeParams','$route','doubanJsonp',function ($scope,$http,$routeParams,$route,doubanJsonp) {
            // 加载动画
            $scope.isLoading = true;
            // 分页功能
            $scope.pageCount = 10; //当前页展示的数据条数
            $scope.curPage = $routeParams.urlPage || 1; //当前页面,默认从1开始
            var pageStart = ($scope.curPage - 1) * $scope.pageCount;

            doubanJsonp.jsonp(
                'https://api.douban.com/v2/movie/'+$routeParams.listType,
                {
                    start: pageStart,
                    count: $scope.pageCount,
                    q:$routeParams.q || 0  // 电影搜索功能路由参数
                },
                function (data) {
                    $scope.movies = data;
                    //总页数
                    $scope.pageTotal = Math.ceil(data.total / $scope.pageCount);
                    $scope.isLoading = false;
                    // 异步操作（强制执行angular脏值检查机制）
                    $scope.$apply();
                }
            );

            // 点击上下页功能
            $scope.turnPage = function (currentPage) {
                // 限制翻页范围
                if(currentPage <= 0 || currentPage > $scope.pageTotal) {
                    return;
                }
                // 通过传入页码更新当前页码
                $scope.curPage = currentPage;
                // 使用$route.updateParams更新路由中的路由参数
                $route.updateParams({urlPage:currentPage});
            };
        }]);
})(angular);