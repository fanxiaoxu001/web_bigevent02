$(function () {
    //1.点击去注册
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show();
    })
    //2.点击去登录
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide();
    })
    // 3.自定义表单验证
    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        // 4.确认密码一致
        repwd: function (value) {
            var pwd = $('#form_reg [name = password]').val()
            if (value !== pwd) {
                return '两次密码不一致'
            }
        }
    })
    //5.注册事件
    var layer = layui.layer;
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                $('#link_login').click()
                $('#form_reg')[0].reset()
            }
        })
    })
    // 6.登录事件
    $('#form_login').submit(function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }

        })
    })
})