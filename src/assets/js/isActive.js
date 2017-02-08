/**
 * Created by simplescspp on 2017/2/5.
 */
(function (angular) {
    angular.module('myMovie.isActive',[])
        .directive('isActive',['$location',function ($location) {
            return {
                link: function (scope,element) {
                    scope.location = $location;
                    scope.$watch('location.url()',function (curValue) {
                        var links = element.children().attr('href');
                        if(links.indexOf(curValue) > -1) {
                            element.parent().children().removeClass('active');
                            element.addClass('active');
                        }
                    });
                }
            }
        }]);
})(angular);
