!function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery","jquery.ui.widget"],e):e(window.jQuery)}((function(e){"use strict";e.support.fileInput=!(new RegExp("(Android (1\\.[0156]|2\\.[01]))|(Windows Phone (OS 7|8\\.0))|(XBLWP)|(ZuneWP)|(WPDesktop)|(w(eb)?OSBrowser)|(webOS)|(Kindle/(1\\.0|2\\.[05]|3\\.0))").test(window.navigator.userAgent)||e('<input type="file">').prop("disabled")),e.support.xhrFileUpload=!(!window.ProgressEvent||!window.FileReader),e.support.xhrFormDataFileUpload=!!window.FormData,e.support.blobSlice=window.Blob&&(Blob.prototype.slice||Blob.prototype.webkitSlice||Blob.prototype.mozSlice),e.widget("blueimp.fileupload",{options:{dropZone:e(document),pasteZone:e(document),fileInput:void 0,replaceFileInput:!0,paramName:void 0,singleFileUploads:!0,limitMultiFileUploads:void 0,limitMultiFileUploadSize:void 0,limitMultiFileUploadSizeOverhead:512,sequentialUploads:!1,limitConcurrentUploads:void 0,forceIframeTransport:!1,redirect:void 0,redirectParamName:void 0,postMessage:void 0,multipart:!0,maxChunkSize:void 0,uploadedBytes:void 0,recalculateProgress:!0,progressInterval:100,bitrateInterval:500,autoUpload:!0,messages:{uploadedBytes:"Uploaded bytes exceed file size"},i18n:function(t,i){return t=this.messages[t]||t.toString(),i&&e.each(i,(function(e,i){t=t.replace("{"+e+"}",i)})),t},formData:function(e){return e.serializeArray()},add:function(t,i){if(t.isDefaultPrevented())return!1;(i.autoUpload||!1!==i.autoUpload&&e(this).fileupload("option","autoUpload"))&&i.process().done((function(){i.submit()}))},processData:!1,contentType:!1,cache:!1},_specialOptions:["fileInput","dropZone","pasteZone","multipart","forceIframeTransport"],_blobSlice:e.support.blobSlice&&function(){var e=this.slice||this.webkitSlice||this.mozSlice;return e.apply(this,arguments)},_BitrateTimer:function(){this.timestamp=Date.now?Date.now():(new Date).getTime(),this.loaded=0,this.bitrate=0,this.getBitrate=function(e,t,i){var r=e-this.timestamp;return(!this.bitrate||!i||r>i)&&(this.bitrate=(t-this.loaded)*(1e3/r)*8,this.loaded=t,this.timestamp=e),this.bitrate}},_isXHRUpload:function(t){return!t.forceIframeTransport&&(!t.multipart&&e.support.xhrFileUpload||e.support.xhrFormDataFileUpload)},_getFormData:function(t){var i;return"function"===e.type(t.formData)?t.formData(t.form):e.isArray(t.formData)?t.formData:"object"===e.type(t.formData)?(i=[],e.each(t.formData,(function(e,t){i.push({name:e,value:t})})),i):[]},_getTotal:function(t){var i=0;return e.each(t,(function(e,t){i+=t.size||1})),i},_initProgressObject:function(t){var i={loaded:0,total:0,bitrate:0};t._progress?e.extend(t._progress,i):t._progress=i},_initResponseObject:function(e){var t;if(e._response)for(t in e._response)e._response.hasOwnProperty(t)&&delete e._response[t];else e._response={}},_onProgress:function(t,i){if(t.lengthComputable){var r,n=Date.now?Date.now():(new Date).getTime();if(i._time&&i.progressInterval&&n-i._time<i.progressInterval&&t.loaded!==t.total)return;i._time=n,r=Math.floor(t.loaded/t.total*(i.chunkSize||i._progress.total))+(i.uploadedBytes||0),this._progress.loaded+=r-i._progress.loaded,this._progress.bitrate=this._bitrateTimer.getBitrate(n,this._progress.loaded,i.bitrateInterval),i._progress.loaded=i.loaded=r,i._progress.bitrate=i.bitrate=i._bitrateTimer.getBitrate(n,r,i.bitrateInterval),this._trigger("progress",e.Event("progress",{delegatedEvent:t}),i),this._trigger("progressall",e.Event("progressall",{delegatedEvent:t}),this._progress)}},_initProgressListener:function(t){var i=this,r=t.xhr?t.xhr():e.ajaxSettings.xhr();r.upload&&(e(r.upload).bind("progress",(function(e){var r=e.originalEvent;e.lengthComputable=r.lengthComputable,e.loaded=r.loaded,e.total=r.total,i._onProgress(e,t)})),t.xhr=function(){return r})},_isInstanceOf:function(e,t){return Object.prototype.toString.call(t)==="[object "+e+"]"},_initXHRData:function(t){var i,r=this,n=t.files[0],s=t.multipart||!e.support.xhrFileUpload,o="array"===e.type(t.paramName)?t.paramName[0]:t.paramName;t.headers=e.extend({},t.headers),t.contentRange&&(t.headers["Content-Range"]=t.contentRange),s&&!t.blob&&this._isInstanceOf("File",n)||(t.headers["Content-Disposition"]='attachment; filename="'+encodeURI(n.name)+'"'),s?e.support.xhrFormDataFileUpload&&(t.postMessage?(i=this._getFormData(t),t.blob?i.push({name:o,value:t.blob}):e.each(t.files,(function(r,n){i.push({name:"array"===e.type(t.paramName)&&t.paramName[r]||o,value:n})}))):(r._isInstanceOf("FormData",t.formData)?i=t.formData:(i=new FormData,e.each(this._getFormData(t),(function(e,t){i.append(t.name,t.value)}))),t.blob?i.append(o,t.blob,n.name):e.each(t.files,(function(n,s){(r._isInstanceOf("File",s)||r._isInstanceOf("Blob",s))&&i.append("array"===e.type(t.paramName)&&t.paramName[n]||o,s,s.uploadName||s.name)}))),t.data=i):(t.contentType=n.type||"application/octet-stream",t.data=t.blob||n),t.blob=null},_initIframeSettings:function(t){var i=e("<a></a>").prop("href",t.url).prop("host");t.dataType="iframe "+(t.dataType||""),t.formData=this._getFormData(t),t.redirect&&i&&i!==location.host&&t.formData.push({name:t.redirectParamName||"redirect",value:t.redirect})},_initDataSettings:function(e){this._isXHRUpload(e)?(this._chunkedUpload(e,!0)||(e.data||this._initXHRData(e),this._initProgressListener(e)),e.postMessage&&(e.dataType="postmessage "+(e.dataType||""))):this._initIframeSettings(e)},_getParamName:function(t){var i=e(t.fileInput),r=t.paramName;return r?e.isArray(r)||(r=[r]):(r=[],i.each((function(){for(var t=e(this),i=t.prop("name")||"files[]",n=(t.prop("files")||[1]).length;n;)r.push(i),n-=1})),r.length||(r=[i.prop("name")||"files[]"])),r},_initFormSettings:function(t){t.form&&t.form.length||(t.form=e(t.fileInput.prop("form")),t.form.length||(t.form=e(this.options.fileInput.prop("form")))),t.paramName=this._getParamName(t),t.url||(t.url=t.form.prop("action")||location.href),t.type=(t.type||"string"===e.type(t.form.prop("method"))&&t.form.prop("method")||"").toUpperCase(),"POST"!==t.type&&"PUT"!==t.type&&"PATCH"!==t.type&&(t.type="POST"),t.formAcceptCharset||(t.formAcceptCharset=t.form.attr("accept-charset"))},_getAJAXSettings:function(t){var i=e.extend({},this.options,t);return this._initFormSettings(i),this._initDataSettings(i),i},_getDeferredState:function(e){return e.state?e.state():e.isResolved()?"resolved":e.isRejected()?"rejected":"pending"},_enhancePromise:function(e){return e.success=e.done,e.error=e.fail,e.complete=e.always,e},_getXHRPromise:function(t,i,r){var n=e.Deferred(),s=n.promise();return i=i||this.options.context||s,!0===t?n.resolveWith(i,r):!1===t&&n.rejectWith(i,r),s.abort=n.promise,this._enhancePromise(s)},_addConvenienceMethods:function(t,i){var r=this,n=function(t){return e.Deferred().resolveWith(r,t).promise()};i.process=function(t,s){return(t||s)&&(i._processQueue=this._processQueue=(this._processQueue||n([this])).pipe((function(){return i.errorThrown?e.Deferred().rejectWith(r,[i]).promise():n(arguments)})).pipe(t,s)),this._processQueue||n([this])},i.submit=function(){return"pending"!==this.state()&&(i.jqXHR=this.jqXHR=!1!==r._trigger("submit",e.Event("submit",{delegatedEvent:t}),this)&&r._onSend(t,this)),this.jqXHR||r._getXHRPromise()},i.abort=function(){return this.jqXHR?this.jqXHR.abort():(this.errorThrown="abort",r._trigger("fail",null,this),r._getXHRPromise(!1))},i.state=function(){return this.jqXHR?r._getDeferredState(this.jqXHR):this._processQueue?r._getDeferredState(this._processQueue):void 0},i.processing=function(){return!this.jqXHR&&this._processQueue&&"pending"===r._getDeferredState(this._processQueue)},i.progress=function(){return this._progress},i.response=function(){return this._response}},_getUploadedBytes:function(e){var t=e.getResponseHeader("Range"),i=t&&t.split("-"),r=i&&i.length>1&&parseInt(i[1],10);return r&&r+1},_chunkedUpload:function(t,i){t.uploadedBytes=t.uploadedBytes||0;var r,n,s=this,o=t.files[0],a=o.size,l=t.uploadedBytes,p=t.maxChunkSize||a,u=this._blobSlice,d=e.Deferred(),h=d.promise();return!(!(this._isXHRUpload(t)&&u&&(l||p<a))||t.data)&&(!!i||(l>=a?(o.error=t.i18n("uploadedBytes"),this._getXHRPromise(!1,t.context,[null,"error",o.error])):(n=function(){var i=e.extend({},t),h=i._progress.loaded;i.blob=u.call(o,l,l+p,o.type),i.chunkSize=i.blob.size,i.contentRange="bytes "+l+"-"+(l+i.chunkSize-1)+"/"+a,s._initXHRData(i),s._initProgressListener(i),r=(!1!==s._trigger("chunksend",null,i)&&e.ajax(i)||s._getXHRPromise(!1,i.context)).done((function(r,o,p){l=s._getUploadedBytes(p)||l+i.chunkSize,h+i.chunkSize-i._progress.loaded&&s._onProgress(e.Event("progress",{lengthComputable:!0,loaded:l-i.uploadedBytes,total:l-i.uploadedBytes}),i),t.uploadedBytes=i.uploadedBytes=l,i.result=r,i.textStatus=o,i.jqXHR=p,s._trigger("chunkdone",null,i),s._trigger("chunkalways",null,i),l<a?n():d.resolveWith(i.context,[r,o,p])})).fail((function(e,t,r){i.jqXHR=e,i.textStatus=t,i.errorThrown=r,s._trigger("chunkfail",null,i),s._trigger("chunkalways",null,i),d.rejectWith(i.context,[e,t,r])}))},this._enhancePromise(h),h.abort=function(){return r.abort()},n(),h)))},_beforeSend:function(e,t){0===this._active&&(this._trigger("start"),this._bitrateTimer=new this._BitrateTimer,this._progress.loaded=this._progress.total=0,this._progress.bitrate=0),this._initResponseObject(t),this._initProgressObject(t),t._progress.loaded=t.loaded=t.uploadedBytes||0,t._progress.total=t.total=this._getTotal(t.files)||1,t._progress.bitrate=t.bitrate=0,this._active+=1,this._progress.loaded+=t.loaded,this._progress.total+=t.total},_onDone:function(t,i,r,n){var s=n._progress.total,o=n._response;n._progress.loaded<s&&this._onProgress(e.Event("progress",{lengthComputable:!0,loaded:s,total:s}),n),o.result=n.result=t,o.textStatus=n.textStatus=i,o.jqXHR=n.jqXHR=r,this._trigger("done",null,n)},_onFail:function(e,t,i,r){var n=r._response;r.recalculateProgress&&(this._progress.loaded-=r._progress.loaded,this._progress.total-=r._progress.total),n.jqXHR=r.jqXHR=e,n.textStatus=r.textStatus=t,n.errorThrown=r.errorThrown=i,this._trigger("fail",null,r)},_onAlways:function(e,t,i,r){this._trigger("always",null,r)},_onSend:function(t,i){i.submit||this._addConvenienceMethods(t,i);var r,n,s,o,a=this,l=a._getAJAXSettings(i),p=function(){return a._sending+=1,l._bitrateTimer=new a._BitrateTimer,r=r||((n||!1===a._trigger("send",e.Event("send",{delegatedEvent:t}),l))&&a._getXHRPromise(!1,l.context,n)||a._chunkedUpload(l)||e.ajax(l)).done((function(e,t,i){a._onDone(e,t,i,l)})).fail((function(e,t,i){a._onFail(e,t,i,l)})).always((function(e,t,i){if(a._onAlways(e,t,i,l),a._sending-=1,a._active-=1,l.limitConcurrentUploads&&l.limitConcurrentUploads>a._sending)for(var r=a._slots.shift();r;){if("pending"===a._getDeferredState(r)){r.resolve();break}r=a._slots.shift()}0===a._active&&a._trigger("stop")}))};return this._beforeSend(t,l),this.options.sequentialUploads||this.options.limitConcurrentUploads&&this.options.limitConcurrentUploads<=this._sending?(this.options.limitConcurrentUploads>1?(s=e.Deferred(),this._slots.push(s),o=s.pipe(p)):(this._sequence=this._sequence.pipe(p,p),o=this._sequence),o.abort=function(){return n=[void 0,"abort","abort"],r?r.abort():(s&&s.rejectWith(l.context,n),p())},this._enhancePromise(o)):p()},_onAdd:function(t,i){var r,n,s,o,a=this,l=!0,p=e.extend({},this.options,i),u=i.files,d=u.length,h=p.limitMultiFileUploads,c=p.limitMultiFileUploadSize,f=p.limitMultiFileUploadSizeOverhead,g=0,_=this._getParamName(p),m=0;if(!c||d&&void 0!==u[0].size||(c=void 0),(p.singleFileUploads||h||c)&&this._isXHRUpload(p))if(p.singleFileUploads||c||!h)if(!p.singleFileUploads&&c)for(s=[],r=[],o=0;o<d;o+=1)g+=u[o].size+f,(o+1===d||g+u[o+1].size+f>c||h&&o+1-m>=h)&&(s.push(u.slice(m,o+1)),(n=_.slice(m,o+1)).length||(n=_),r.push(n),m=o+1,g=0);else r=_;else for(s=[],r=[],o=0;o<d;o+=h)s.push(u.slice(o,o+h)),(n=_.slice(o,o+h)).length||(n=_),r.push(n);else s=[u],r=[_];return i.originalFiles=u,e.each(s||u,(function(n,o){var p=e.extend({},i);return p.files=s?o:[o],p.paramName=r[n],a._initResponseObject(p),a._initProgressObject(p),a._addConvenienceMethods(t,p),l=a._trigger("add",e.Event("add",{delegatedEvent:t}),p)})),l},_replaceFileInput:function(t){var i=t.clone(!0);e("<form></form>").append(i)[0].reset(),t.after(i).detach(),e.cleanData(t.unbind("remove")),this.options.fileInput=this.options.fileInput.map((function(e,r){return r===t[0]?i[0]:r})),t[0]===this.element[0]&&(this.element=i)},_handleFileTreeEntry:function(t,i){var r=this,n=e.Deferred(),s=function(e){e&&!e.entry&&(e.entry=t),n.resolve([e])};return i=i||"",t.isFile?t._file?(t._file.relativePath=i,n.resolve(t._file)):t.file((function(e){e.relativePath=i,n.resolve(e)}),s):t.isDirectory?t.createReader().readEntries((function(e){r._handleFileTreeEntries(e,i+t.name+"/").done((function(e){n.resolve(e)})).fail(s)}),s):n.resolve([]),n.promise()},_handleFileTreeEntries:function(t,i){var r=this;return e.when.apply(e,e.map(t,(function(e){return r._handleFileTreeEntry(e,i)}))).pipe((function(){return Array.prototype.concat.apply([],arguments)}))},_getDroppedFiles:function(t){var i=(t=t||{}).items;return i&&i.length&&(i[0].webkitGetAsEntry||i[0].getAsEntry)?this._handleFileTreeEntries(e.map(i,(function(e){var t;return e.webkitGetAsEntry?((t=e.webkitGetAsEntry())&&(t._file=e.getAsFile()),t):e.getAsEntry()}))):e.Deferred().resolve(e.makeArray(t.files)).promise()},_getSingleFileInputFiles:function(t){var i,r,n=(t=e(t)).prop("webkitEntries")||t.prop("entries");if(n&&n.length)return this._handleFileTreeEntries(n);if((i=e.makeArray(t.prop("files"))).length)void 0===i[0].name&&i[0].fileName&&e.each(i,(function(e,t){t.name=t.fileName,t.size=t.fileSize}));else{if(!(r=t.prop("value")))return e.Deferred().resolve([]).promise();i=[{name:r.replace(/^.*\\/,"")}]}return e.Deferred().resolve(i).promise()},_getFileInputFiles:function(t){return t instanceof e&&1!==t.length?e.when.apply(e,e.map(t,this._getSingleFileInputFiles)).pipe((function(){return Array.prototype.concat.apply([],arguments)})):this._getSingleFileInputFiles(t)},_onChange:function(t){var i=this,r={fileInput:e(t.target),form:e(t.target.form)};this._getFileInputFiles(r.fileInput).always((function(n){r.files=n,i.options.replaceFileInput&&i._replaceFileInput(r.fileInput),!1!==i._trigger("change",e.Event("change",{delegatedEvent:t}),r)&&i._onAdd(t,r)}))},_onPaste:function(t){var i=t.originalEvent&&t.originalEvent.clipboardData&&t.originalEvent.clipboardData.items,r={files:[]};i&&i.length&&(e.each(i,(function(e,t){var i=t.getAsFile&&t.getAsFile();i&&r.files.push(i)})),!1!==this._trigger("paste",e.Event("paste",{delegatedEvent:t}),r)&&this._onAdd(t,r))},_onDrop:function(t){t.dataTransfer=t.originalEvent&&t.originalEvent.dataTransfer;var i=this,r=t.dataTransfer,n={};r&&r.files&&r.files.length&&(t.preventDefault(),this._getDroppedFiles(r).always((function(r){n.files=r,!1!==i._trigger("drop",e.Event("drop",{delegatedEvent:t}),n)&&i._onAdd(t,n)})))},_onDragOver:function(t){t.dataTransfer=t.originalEvent&&t.originalEvent.dataTransfer;var i=t.dataTransfer;i&&-1!==e.inArray("Files",i.types)&&!1!==this._trigger("dragover",e.Event("dragover",{delegatedEvent:t}))&&(t.preventDefault(),i.dropEffect="copy")},_initEventHandlers:function(){this._isXHRUpload(this.options)&&(this._on(this.options.dropZone,{dragover:this._onDragOver,drop:this._onDrop}),this._on(this.options.pasteZone,{paste:this._onPaste})),e.support.fileInput&&this._on(this.options.fileInput,{change:this._onChange})},_destroyEventHandlers:function(){this._off(this.options.dropZone,"dragover drop"),this._off(this.options.pasteZone,"paste"),this._off(this.options.fileInput,"change")},_setOption:function(t,i){var r=-1!==e.inArray(t,this._specialOptions);r&&this._destroyEventHandlers(),this._super(t,i),r&&(this._initSpecialOptions(),this._initEventHandlers())},_initSpecialOptions:function(){var t=this.options;void 0===t.fileInput?t.fileInput=this.element.is('input[type="file"]')?this.element:this.element.find('input[type="file"]'):t.fileInput instanceof e||(t.fileInput=e(t.fileInput)),t.dropZone instanceof e||(t.dropZone=e(t.dropZone)),t.pasteZone instanceof e||(t.pasteZone=e(t.pasteZone))},_getRegExp:function(e){var t=e.split("/"),i=t.pop();return t.shift(),new RegExp(t.join("/"),i)},_isRegExpOption:function(t,i){return"url"!==t&&"string"===e.type(i)&&/^\/.*\/[igm]{0,3}$/.test(i)},_initDataAttributes:function(){var t=this,i=this.options;e.each(e(this.element[0].cloneNode(!1)).data(),(function(e,r){t._isRegExpOption(e,r)&&(r=t._getRegExp(r)),i[e]=r}))},_create:function(){this._initDataAttributes(),this._initSpecialOptions(),this._slots=[],this._sequence=this._getXHRPromise(!0),this._sending=this._active=0,this._initProgressObject(this),this._initEventHandlers()},active:function(){return this._active},progress:function(){return this._progress},add:function(t){var i=this;t&&!this.options.disabled&&(t.fileInput&&!t.files?this._getFileInputFiles(t.fileInput).always((function(e){t.files=e,i._onAdd(null,t)})):(t.files=e.makeArray(t.files),this._onAdd(null,t)))},send:function(t){if(t&&!this.options.disabled){if(t.fileInput&&!t.files){var i,r,n=this,s=e.Deferred(),o=s.promise();return o.abort=function(){return r=!0,i?i.abort():(s.reject(null,"abort","abort"),o)},this._getFileInputFiles(t.fileInput).always((function(e){r||(e.length?(t.files=e,i=n._onSend(null,t).then((function(e,t,i){s.resolve(e,t,i)}),(function(e,t,i){s.reject(e,t,i)}))):s.reject())})),this._enhancePromise(o)}if(t.files=e.makeArray(t.files),t.files.length)return this._onSend(null,t)}return this._getXHRPromise(!1,t&&t.context)}})}));