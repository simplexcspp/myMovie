/**
 * Created by simplexcspp on 2017/2/1.
 */
(function (angular) {
    angular.module('myMovie.jsonp',[])
        .service('doubanJsonp',['$window',function ($window) {
            var doc = $window.document;
            /**
             *  符合豆瓣api要求的jsonp
             * @param url (string)
             * @param params (object)
             * @param callback
             */
            this.jsonp = function (url,params,callback) {
                url += "?";
                for (var key in params) {
                    url += key + "=" + params[key] + "&";
                }
                var callbackName = "xcJsonp_" + (new Date() - 0);
                url += "callback=" + callbackName;

                var script = doc.createElement("script");
                script.src = url;
                doc.body.appendChild(script);

                $window[callbackName] = function (data) {
                    callback(data);
                    //获取数据后删除动态创建的script标签和添加到window中的方法
                    document.body.removeChild(script);
                    delete $window[callbackName];
                };
            };
        }])
})(angular);