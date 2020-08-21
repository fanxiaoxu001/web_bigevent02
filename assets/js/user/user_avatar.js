$(function(){
    var layer = layui.layer
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)
    //2.模拟点击上传
    $('#btnChooseImage').on('click',function(){
        $('#file').click()
    })
    // 3.文件长传就触发change事件
    $('#file').on('change',function(e){
        // console.log(e);
        var file = e.target.files[0]
        var newImgUrl = URL.createObjectURL(file)
        $image
        .cropper('destroy')//销毁旧的裁剪区域
        .attr('src',newImgUrl)//重新设置图片路径
        .cropper(options)//重新初始化裁剪区
    })
    //点击上传图片
    $('#btnUpload').on('click',function(){
         var dataURL = $image
             .cropper('getCroppedCanvas', {
                 // 创建一个 Canvas 画布
                 width: 100,
                 height: 100
             })
             .toDataURL('image/png')
        $.ajax({
            method:'POST',
            url: '/my/update/avatar',
            data:{
                avatar: dataURL
            },
            success:function(res){
                // console.log(res);
                if(res.status!==0){
                    return layer.msg(res.message)
                }
                layer.msg('恭喜您，修改成功')
                window.parent.getUserInfo()
            }
        })
    })
})