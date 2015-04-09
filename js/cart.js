/**
 * 购物车：工厂模式
 * Created by 陈雨天 on 2015/3/28.
 */
GLOBAL.myApp.CartMaker=function(){
// 公共方法
    //渲染模版
    this.render=function(template,data){
        var regexp=/(?:\{\{)([a-zA-z][^\s\}}]+)(?:\}\})/g;//这里匹配的是多个{{xxx}}
        return template.replace(regexp,function($1,$2){//这里$2是xxx,$1是{{xxx}}
            if(data[$2]){
                return data[$2]
            }else{
                return $1;
            }
        })
    };
};


/*
*
* 首页购物车构造器
*
* */



GLOBAL.myApp.CartMaker.Home=function(){
    this.template= '<li data-id="{{id}}" class="ui-grid-b">\
                <p class="ui-block-a">\
        {{name}}<br>\
                <span class="delete"></span>\
                </p>\
                <p class="num ui-block-b text-ct">\
       {{num}}份\
                </p>\
                <div class="ui-block-c">\
                <div class="cart-aside">\
                    <span class="price">￥{{count}}</span><br>\
                    <img src="images/reduce2.png" class="reduce" width="20" alt=""/>\
                    <img src="images/add2.png" class="add"  width="20" alt=""/>\
                </div>\
                </div>\
                </li>';
    //初始化首页购物车
    this.initCart=function(){
        $(".cartWrap ul").empty();
        for (var i = 0; i < GLOBAL.cartList.length; i++) {
                this._addFruitToCart(i);
        }
        this.calculateMoney();
    }
    this._addFruitToCart=function(index){
        var data={};
        $.extend(data,GLOBAL.cartList[index]);
        data.name=data.name.slice(0,13)+"...";
        var str=this.render(this.template,data);
        $(".cartWrap ul").append(str);
    }

    //添加模版到首页购物车
    this.addFruitToCart=function (index) {
        var data={};
        $.extend(data,GLOBAL.allList[index]);
        data.name=data.name.slice(0,13)+"...";
        var str=this.render(this.template,data);
        $(".cartWrap ul").append(str);
    }
    //删除首页购物车里的模版
    this.deleteFruitToCart=function(index) {
        var data = GLOBAL.allList[index];
        var id = data.id;
        var obj=$(".cartWrap ul li").filter("[data-id='" + id + "']").slideUp(300,function(){
            obj.remove();
        })
    }
    //更新首页购物车视图
    this.updateCart=function(index) {
        var data = GLOBAL.allList[index];
        var id = data.id;
        var CartLi = $(".cartWrap li[data-id='" + id + "']");
        CartLi.find('.price').text("￥" + data.count);
        CartLi.find('.num').text(data.num + "份");
    }
    //更新总首页的钱数视图
    this.calculateMoney=function(){
        var value = 0;
        for(var i=0;i<GLOBAL.cartList.length;i++){
            value+=GLOBAL.cartList[i].count;
        }
        if(value==0){
            this.hideCart();
            $('.cartBar').slideUp(300);
            $('#fruit-list').show();
            $('#fruitQie-list-2').show();
            $('#store-list2').show();
        }else{
            $('.cartBar').slideDown(300);
        }
        $(".cartBar .price").text("￥" + value + ".00");
        $(".cartBar .cart-count").text(GLOBAL.cartList.length);
    }
    //隐藏购物车
    this.hideCart=function() {
        $(".cart-btn").data('isShow',false).prev('img').attr('src','images/arrow-u.png');
        $('.cartWrap').slideUp(300);
    }
}

/*
 *
 *  鲜果切页面构造器
 *
 **/


//GLOBAL.myApp.CartMaker.fruitQie=function(){
//
//}
/*
*
*  购物车页面构造器
*
**/
GLOBAL.myApp.CartMaker.Cart=function(){
    this.template='<li data-id="{{id}}" class="width-big">\
            <div class="fruit-list-l" style="width:26%">\
            <img src="{{image}}" width="100%">\
            </div>\
            <div class="fruit-list-l" style="width:68%">\
            <p class="text-p">{{name}}</p>\
            <p class="text-p">\
            <span class="price color-red">￥{{price}}/盒</span>\
            <span class="fr num2">\
            <img src="images/reduce.png" class="reduce" width="15" alt="">\
            <cite>{{num}}</cite>\
            <img src="images/add.png" class="add" width="15" alt="">\
            </span>\
            </p>\
            </div>\
            </li>';
    //
    this.initCart=function(){
        $('#cart-wrap-cart').empty();
        var storeList={};

        for(var i=0;i<GLOBAL.cartList.length;i++){
            if(!storeList[GLOBAL.cartList[i].store]){
                storeList[GLOBAL.cartList[i].store]=[];
            }
            storeList[GLOBAL.cartList[i].store].push(GLOBAL.cartList[i]['id']);
        }
        for(i in storeList){
            var storeArr=storeList[i];
            var storeName='<p style="background:rgb(111,186,44);color:#fff" class="text-title text-ct">'+i+'</p>';
            storeName+='<ul class="home-list clearfix"></ul>';
            $("#cart-wrap-cart").append(storeName);
            for(var j=0;j<storeArr.length;j++){
                var index=GLOBAL.allMap[storeArr[j]];
                this.addFruitToCart(index);
            }
        }
        this.calculateMoney();
    }
    //
    this.addFruitToCart=function(index){
        var data={};
        $.extend(data,GLOBAL.allList[index]);
        var str=this.render(this.template,data);
        $('#cart-wrap-cart ul:last').append(str);
    }
    //
    this.deleteFruitToCart=function(index){
        var data = GLOBAL.allList[index];
        var id = data.id;
        var obj = $("#cart-wrap-cart ul li").filter("[data-id='" + id + "']").slideUp(300, function () {
            var ul = obj.parent('ul');
            obj.remove();
            if (!ul.html()) {
                ul.prev('p').remove().end().remove();
            }

        });
    }
    //
    this.updateCart=function(index){
        var data = GLOBAL.allList[index];
        var id = data.id;
        var CartLi = $("#cart-wrap-cart li[data-id='" + id + "']");
        CartLi.find('.num2 cite').text(data.num);
    }
    //
    this.calculateMoney=function(){
        var value = 0;
        for(var i=0;i<GLOBAL.cartList.length;i++){
            value+=GLOBAL.cartList[i].count;
        }
        $("#price-view").text(value +".00元");
    }
}




GLOBAL.myApp.CartMaker.factory=function(type){
    var f=function(){};
    var obj;
    var newCart;
    f.prototype=new GLOBAL.myApp.CartMaker();
     obj=new f();
    GLOBAL.myApp.CartMaker[type].prototype=obj;
    GLOBAL.myApp.CartMaker[type].prototype.constructor=GLOBAL.myApp.CartMaker[type];
    newCart=new GLOBAL.myApp.CartMaker[type]();
    return newCart;
}

