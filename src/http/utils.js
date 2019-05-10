let Cookie = { 
    // 读取
     get: function(name){ 
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
if(arr=document.cookie.match(reg))
return unescape(arr[2]);
else
return null;
    }, 
    // 设置
     set : function(name,value,expires){ 
        var expDays = expires*24*60*60*1000; 
        var expDate = new Date(); 
        expDate.setTime(expDate.getTime()+expDays); 
        var expString = expires ? "expires="+expDate.toGMTString() : ""; 
        var pathString = ";path=/"; 
        document.cookie = name + "=" + escape(value) + expString + pathString; 
    }, 
    // 删除
     del : function(name){ 
        var date=new Date(); 
    date.setTime(date.getTime()-10000); 
    document.cookie=name+"=v; expires="+date.toGMTString(); 
    } 
};

export default Cookie
