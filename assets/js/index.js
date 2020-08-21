$(function () {
    getUserInfo()
    //2.推出框架提供
    $('#btnLogout').on('click',function(){
        layer.confirm('是否退出', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //清空本地储存token
            localStorage.removeItem('token')
            //跳转到登录页
            location.href="/login.html"

            layer.close(index);
        });
    })
})
//1.获取用户信息
function getUserInfo() {
    //发送ajax
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            renderAvatar(res.data)
        }
    })
}
//封装渲染头像
function renderAvatar(user) {
    //1.用户名（昵称优先，没有用username）
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp&nbsp' + name)
    //用户头像
    if (user.user_pic) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.user-avatar').hide()
    }else{
        $('.layui-nav-img').hide();
        var text = name[0].toUpperCase()
        $('.user-avatar').show().html(text)
    }
}