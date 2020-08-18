    var baseUrl = 'http://ajax.frontend.itheima.net'

$.ajaxPrefilter(function(aa){
    aa.url = baseUrl+aa.url
})