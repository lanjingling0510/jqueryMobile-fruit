/**
 * Created by 陈雨天 on 2015/4/10.
 */
GLOBAL.func={};
GLOBAL.func.require=function(file,callback){
    var script=document.getElementsByTagName('script')[0],
    newjs=document.createElement('script');
    newjs.onload=function(){
        callback();
    }
    newjs.src=file;
    script.parentNode.insertBefore(newjs,script);
}