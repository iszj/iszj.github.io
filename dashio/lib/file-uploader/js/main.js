$((function(){"use strict";$("#fileupload").fileupload({xhrFields:{withCredentials:!0},url:"localhost/dashio/dashboard/assests/js/file-uploader/server/php/"}),$("#fileupload").fileupload("option","redirect",window.location.href.replace(/\/[^\/]*$/,"/cors/result.html?%s")),"blueimp.github.io"===window.location.hostname?($("#fileupload").fileupload("option",{url:"localhost/dashio/dashboard/assests/js/file-uploader/server/php/",disableImageResize:/Android(?!.*Chrome)|Opera/.test(window.navigator.userAgent),maxFileSize:5e6,acceptFileTypes:/(\.|\/)(gif|jpe?g|png)$/i}),$.support.cors&&$.ajax({url:"localhost/dashio/dashboard/assests/js/file-uploader/server/php/",type:"HEAD"}).fail((function(){$('<div class="alert alert-danger"/>').text("Upload server currently unavailable - "+new Date).appendTo("#fileupload")}))):($("#fileupload").addClass("fileupload-processing"),$.ajax({url:$("#fileupload").fileupload("option","url"),dataType:"json",context:$("#fileupload")[0]}).always((function(){$(this).removeClass("fileupload-processing")})).done((function(e){$(this).fileupload("option","done").call(this,$.Event("done"),{result:e})})))}));