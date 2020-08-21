var baseUrl = 'http://ajax.frontend.itheima.net'

$.ajaxPrefilter(function (aa) {
    //拼接服务器对应的地址
    aa.url = baseUrl + aa.url

    //对需要权限的接口配置头信息
    //必须一/my/开有才行
    if (aa.url.indexOf('/my/') !== -1) {
        aa.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // 不论成功还是失败，最终都会调用 complete 回调函数
    //拦截所有响应，判断身份信息认证
    aa.complete = function (res) {
        // console.log(res);
        var obj = res.responseJSON
        if (obj.status === 1 && obj.message === '身份认证失败！') {
            localStorage.removeItem('token')
            location.href='/login.html'
        }
    }
})