$(function(){
    var form = layui.form
    //自定义校验规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        //新密码不能和旧密码相同
        samePwd:function(value){
            if($('[name=oldPwd]').val()===value){
                return'新旧密码不能相同'
            }
        },
        //两次密码必须相同
        rePwd:function(value){
            if($('[name=newPwd]').val()!==value){
                return'输入的两次新密码不同'
            }
        }
    })
    //提交修改密码
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url: '/my/updatepwd',
            data:$(this).serialize(),
            success:function(res){
                console.log(res);
                if(res.status!==0){
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg('密码修改成功')
                $('.layui-form')[0].reset()
            }
        })
    })
})