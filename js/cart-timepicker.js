
//================选择日期=======================
/*
 * 动画过度兼容transition
 *变换transform
 * */
var TRANSITION="transition";
var TRANSITIONEND="transitionend";
var TRANSITION_CSS="transition";
if(typeof document.body.style.webkitTransition==="string"){
    TRANSITION="webkitTransition";
    TRANSITION_CSS="-webkit-transition";
    TRANSITIONEND="webkitTransitionEnd";
}else if(typeof document.body.style.MozTransition==="string"){
    TRANSITION="MozTransition";
}
var TRANSFORM=(typeof document.body.style.webkitTransform=="string")? 'webkitTransform':'transform';
var TRANSFORM_CSS=(typeof document.body.style.webkitTransform=="string")? '-webkit-transform':'transform';

GLOBAL.time={};
GLOBAL.time.dataList_day=["今天","明天","后天","4月14日","4月15日","4月16日"];
GLOBAL.time.dataList_hour=["1小时送达","17:00-18:00","18:00-19:00","19:00-20:00","20:00-21:00"];
GLOBAL.time.slideList_day=[];
GLOBAL.time.slideList_hour=[];

/*
 *
 * @function
 * @constructor
 * @param   obj     $对象
 * @param   index   当前的位置
 *
 *
 * */
 GLOBAL.time.Slide=function(index,content,angle){
     this.index=index;
     this.content='';
     this.tpl='<li>{{content}}</li>';
     this.angle=angle;
     this._build(content);
}



GLOBAL.time.Slide.prototype.render=function(template,data){
    var regexp=/(?:\{\{)([a-zA-z][^\s\}}]+)(?:\}\})/g;//这里匹配的是多个{{xxx}}
    return template.replace(regexp,function($1,$2){//这里$2是xxx,$1是{{xxx}}
        if(data[$2]){
            return data[$2]
        }else{
            return $1;
        }
    })
}
//初始化，将数据和模块绑定
GLOBAL.time.Slide.prototype._build=function(content){
    var that=this;
    that.content=that.render(that.tpl,{content:content});
    that.obj=$(that.content);
    that.obj.css(TRANSFORM_CSS,"rotateX("+that.angle+"deg) translate3d(0,0,100px)");
}




/*
 *
 *
 *选择日期控制器模块
 *
 *
 *
 *
 * */

GLOBAL.time.controller=(function(){
    //依赖注入
    var time=GLOBAL.time;
    var slideList_day=time.slideList_day;
    var slideList_hour=time.slideList_hour;
    var dataList_day=time.dataList_day;
    var dataList_hour=time.dataList_hour;
    var Slide=time.Slide;


    //私有属性
    var direction= 0;
    var touchY;
    var moving=false;
    var touchLen=15;
    var parent_day=$(".cart-time-content1");
    var parent_hour=$(".cart-time-content2");
    var parent;
    var index_day= 0,index_hour=0;//当前选择的日期的索引值
    var angle_now_day= 0,angle_now_hour=0;//当前日期选择器旋转的角度
    var transitionEndList=[];//变换执行完后调用的函数数组


    _init_day();
    _init_hour();
    $(document).on("touchstart",".cart-time-wrap",_handleTouch);
    $(document).on("touchmove",".cart-time-wrap",_handleTouch);
    $(document).on("touchend",".cart-time-wrap",_handleTouch);

    $(document).on(TRANSITIONEND,".cart-time-content1",function(){
        for(var i= 0,len=transitionEndList.length;i<len;i++){
            transitionEndList[i]();
        }
        moving=false;
    });

    $(document).on(TRANSITIONEND,".cart-time-content2",function(){
        for(var i= 0,len=transitionEndList.length;i<len;i++){
            transitionEndList[i]();
        }
        moving=false;
    });


    function _init_day(){
        var slide;
        var angle=0;
        for(var i= 0,len=dataList_day.length;i<len;i++){
            slide=new Slide(i,dataList_day[i],angle);
            _setOpacity(slide.obj,angle);
            slideList_day.push(slide);
            parent_day.append(slide.obj);
            angle-=22.5;
        }
    }
    function _init_hour(){
        var slide;
        var angle=0;
        for(var i= 0,len=dataList_hour.length;i<len;i++){
            slide=new Slide(i,dataList_hour[i],angle);
            _setOpacity(slide.obj,angle);
            slideList_hour.push(slide);
            parent_hour.append(slide.obj);
            angle-=22.5;
        }
    }


    function _handleTouch(e){
        console.log("handleTouch...");
        e.preventDefault();
        var pageY;
        if(moving){
            return false;
        }
        switch(e.type){
            case "touchstart":
                touchY= e.originalEvent.targetTouches[0].pageY;
                _clearTransition(parent);

                break;
            case "touchmove":
                pageY=e.originalEvent.targetTouches[0].pageY;
                var dir=pageY-touchY;
                var angle=-22.5*dir/180|0;
                if(parent[0]==parent_day[0]){

                    for(var i= 0,len=slideList_day.length;i<len;i++){
                        _setOpacity(slideList_day[i].obj,angle+slideList_day[i].angle+angle_now_day);
                    }
                    _rotateTop(parent,angle+angle_now_day);

                }else{

                    for( i= 0,len=slideList_hour.length;i<len;i++){
                        _setOpacity(slideList_hour[i].obj,angle+slideList_hour[i].angle+angle_now_hour);
                    }
                    _rotateTop(parent,angle+angle_now_hour);

                }


                break;
            case "touchend":

                pageY=e.originalEvent.changedTouches[0].pageY;
                dir=pageY-touchY;
                direction=dir>0? -1:1;

                if(parent[0]==parent_day[0]) {

                    if ((direction == 1 && slideList_day[index_day + 1] && touchLen < -dir) || (direction == -1 && slideList_day[index_day - 1] && touchLen < dir)) {
                        _goTo_day(direction);
                    } else {
                        _moveRotateTop(parent, angle_now_day);
                    }

                }else{

                    if ((direction == 1 && slideList_hour[index_hour + 1] && touchLen < -dir) || (direction == -1 && slideList_hour[index_hour - 1] && touchLen < dir)) {
                        _goTo_hour(direction);
                    } else {
                        _moveRotateTop(parent, angle_now_hour);
                    }

                }

                break;
        }

    }
//    变换日期
    function _goTo_day(direction){
        moving=true;
        if(direction==1){
            angle_now_day+=22.5;
            _moveRotateTop(parent,angle_now_day);

            transitionEndList.push(function(){
                transitionEndList=[];
                index_day++;
                $("#cart-time-day-btn").text(slideList_day[index_day].obj.text());
                moving=false;
            })
        }else{
            angle_now_day-=22.5;
            _moveRotateTop(parent,angle_now_day);

            transitionEndList.push(function(){
                transitionEndList=[];
                index_day--;
                $("#cart-time-day-btn").text(slideList_day[index_day].obj.text());
                moving=false;
            })
        }

    }
    function _goTo_hour(direction){
        moving=true;
        if(direction==1){
            angle_now_hour+=22.5;
            _moveRotateTop(parent,angle_now_hour);

            transitionEndList.push(function(){
                transitionEndList=[];
                index_hour++;
                $("#cart-time-hour-btn").text(slideList_hour[index_hour].obj.text());
                moving=false;
            })
        }else{
            angle_now_hour-=22.5;
            _moveRotateTop(parent,angle_now_hour);

            transitionEndList.push(function(){
                transitionEndList=[];
                index_hour--;
                $("#cart-time-hour-btn").text(slideList_hour[index_hour].obj.text());
                moving=false;
            })
        }

    }
//设置透明度
    function _setOpacity(obj,angle){
        var opacity;
        if(angle>0){
            opacity=((22.5-angle)/22.5*100|0)/100;
        }else{
            opacity=((67.5+angle)/67.5*100|0)/100;
        }
       obj.css('opacity',opacity);
    }

    //设置旋转角度
    function _rotateTop(obj,angle){
        obj.css(TRANSFORM_CSS,"rotateX("+angle+"deg)");
    }
//css3动画过度旋转角度
    function _moveRotateTop(obj,angle){
        obj.css(TRANSITION_CSS,TRANSFORM_CSS+" .2s ease-out");
        obj.css(TRANSFORM_CSS,"rotateX("+angle+"deg)");
        if(parent[0]==parent_day[0]){

            for(var i= 0,len=slideList_day.length;i<len;i++){
                _setOpacity(slideList_day[i].obj,angle+slideList_day[i].angle);
            }


        }else{

            for( i= 0,len=slideList_hour.length;i<len;i++){
                _setOpacity(slideList_hour[i].obj,angle+slideList_hour[i].angle);
            }

        }
    }
//清除css3 transition样式
    function _clearTransition(obj){
        obj.css(TRANSITION_CSS,"none");
    }
    function setParent(obj){
        parent=obj;
    }

    return{
        setParent:setParent
    }
}());
