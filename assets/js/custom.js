function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return undefined;
}
$(document).ready(function(){
    $("#login").submit(function( event ) {
      var hash = $.base64.encode($( "#username" ).val()+":"+$( "#password" ).val())      
      document.cookie = "username="+$("#username").val()+";path=/"
      document.cookie = "auth_cookie="+hash+";path=/"
      $("#userlogin").text($( "#username" ).val())
      $('#login-modal').modal('toggle');
      event.preventDefault();
    });
    $("#userlogin").text(getCookie("username") || "Login");
    $('#uploader-modal').on('hidden.bs.modal', function () {
        location.reload();
    })
    $('#filer_input').filer({
        showThumbs: true,
        addMore: true,
        templates: {
            box: '<ul class="jFiler-items-list jFiler-items-default"></ul>',
            item: '<li class="jFiler-item"><div class="jFiler-item-container"><div class="jFiler-item-inner"><div class="jFiler-item-icon pull-left">{{fi-icon}}</div><div class="jFiler-item-info pull-left"><div class="jFiler-item-title" title="{{fi-name}}">{{fi-name | limitTo:30}}</div><div class="jFiler-item-others"><span>size: {{fi-size2}}</span><span>type: {{fi-extension}}</span><span class="jFiler-item-status">{{fi-progressBar}}</span></div></div></div></div></li>',
            itemAppend: '<li class="jFiler-item"><div class="jFiler-item-container"><div class="jFiler-item-inner"><div class="jFiler-item-icon pull-left">{{fi-icon}}</div><div class="jFiler-item-info pull-left"><div class="jFiler-item-title">{{fi-name | limitTo:35}}</div><div class="jFiler-item-others"><span>size: {{fi-size2}}</span><span>type: {{fi-extension}}</span><span class="jFiler-item-status"></span></div></div></div></div></li>',
            progressBar: '<div class="bar"></div>',
            itemAppendToEnd: false,
            removeConfirmation: true,
            canvasImage: true,
            _selectors: {
                list: '.jFiler-items-list',
                item: '.jFiler-item',
                progressBar: '.bar',
                remove: '.jFiler-item-trash-action'
            }
        },
        uploadFile: {
            url: "#",
            data: {},
            type: 'POST',
            enctype: 'multipart/form-data',
            beforeSend: function(){},
            success: function(data, el){
                var parent = el.find(".jFiler-jProgressBar").parent();
                data = JSON.parse(data)
                if (data.status == 'success') {
                    el.find(".jFiler-jProgressBar").fadeOut("slow", function(){
                        $("<div class=\"jFiler-item-others text-success\"><i class=\"icon-jfi-check-circle\"></i> Success</div>").hide().appendTo(parent).fadeIn("slow");
                    });
                } else {
                    el.find(".jFiler-jProgressBar").fadeOut("slow", function(){
                        $("<div class=\"jFiler-item-others text-error\"><i class=\"icon-jfi-minus-circle\"></i> Error: " + data.msg + "</div>").hide().appendTo(parent).fadeIn("slow");
                    });
                }
            },
            error: function(el,i,g,h,e,d,jqxhr,c,f){
                data = JSON.parse(jqxhr.responseText)
                var parent = el.find(".jFiler-jProgressBar").parent();
                el.find(".jFiler-jProgressBar").fadeOut("slow", function(){
                    $("<div class=\"jFiler-item-others text-error\"><i class=\"icon-jfi-minus-circle\"></i> Error: " + data.msg + "</div>").hide().appendTo(parent).fadeIn("slow");
                });
            },
            statusCode: null,
            onProgress: null,
            onComplete: null
        },
        captions: {
            button: "Add Files",
            feedback: "Choose files To Upload",
            feedback2: "files were chosen",
            drop: "Drop file here to Upload",
            removeConfirmation: "Are you sure you want to remove this file?",
            errors: {
                filesLimit: "Only {{fi-limit}} files are allowed to be uploaded.",
                filesType: "Only Images are allowed to be uploaded.",
                filesSize: "{{fi-name}} is too large! Please upload file up to {{fi-fileMaxSize}} MB.",
                filesSizeAll: "Files you've choosed are too large! Please upload files up to {{fi-maxSize}} MB.",
                folderUpload: "You are not allowed to upload folders."
            }
        }
    });
    $('#close-uploader').click(function() {
        $('#filer_input').prop("jFiler").reset()
    });
    // 新增删除确认模态框
    $('#confirm-modal').on('show.bs.modal', function (e) {
        // $(this).find('.btn-danger').attr('href', $(e.relatedTarget).data('href'));
        var file_id = $(e.relatedTarget).data('href');
        // 通过 ajax 发送异步 DELETE 请求
        $('a.btn-delete-confirm').on('click', function () {
            $.ajax({
                url: file_id,
                type: "DELETE",
                data: {},
                // * 直接请求 JSON 类型，会返回 json 对象，而非字符串
                dataType: "JSON",
                success: function (data) {
                    // 如果返回 json 字符串在传递给成功回调函数前，要通过jQuery.parse(JSON) 解析成JSON对象
                    // data = JSON.parse(data);
                    if (data.status == 'success') {
                        // data.status 等于 success 时，则说明成功，前端处理，此处为重新加载本页。
                        location.reload();
                    } else {
                        // 不等于 succes 则说明删除失败，原因有很多，具体呢，就是服务端返回的 data.msg
                        alert("Delete Failed, Reason: "+ data.msg);
                    }
                },
                // * ajax 错误返回三个参数： jqXHR, textStatus, errorThrown
                error: function (jqxhr) {
                    data = JSON.parse(jqxhr.responseText);
                    alert("Delete Failed, Reason: "+ data.msg);
                },                
            });

        });
    });    
});


