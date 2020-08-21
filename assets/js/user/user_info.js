$(function () {
    // 1.自定义验证规则
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度为1~6位之间'
            }
        }
    })
    
    initUserInfo()
    var layer = layui.layer;
    //2.用户渲染
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res,message)
                }
                //表单提交
                form.val('formUserInfo',res.data)
            }
        })
    }
    //3.重置表单
    $('#btnReset').on('click',function(e){
        e.preventDefault()
        initUserInfo()
    })
    //4.修改用户信息
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url: '/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                console.log(res);
                if(res.status!==0){
                    return layer.msg(res.message)
                }
                layer.msg('修改成功')
                //调用父框架的全局方法

                window.parent.getUserInfo()
            }
        })
    })
})