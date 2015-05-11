
    var GLOBAL={
        start:0,//解决第一次加载应用时，pagebeforecreate与pagechange的重复问题
        addressList:[
            "武汉大学工商部大学生创新创业实践中心1",
            "武汉大学工商部大学生创新创业实践中心2",
            "武汉大学工商部大学生创新创业实践中心3"
        ],


        fruitList: [
            {id: 1, price: 100, num: 1, name: "现货8斤 不知火丑柑现货新鲜水谷臭橘子 臭橘子桔子", image: "images/fruit-1.png",store:"街道口店"},
            {id: 2, price: 100, num: 1, name: "现货8斤 不知火丑柑现货新鲜水谷臭橘子 臭橘子桔子", image: "images/fruit-2.png",store:"武大店"},
            {id: 3, price: 80, num: 1, name: "现货8斤 不知火丑柑现货新鲜水谷臭橘子 臭橘子桔子", image: "images/fruit-3.png",store:"武大店"},
            {id: 4, price: 50, num: 1, name: "现货8斤 不知火丑柑现货新鲜水谷臭橘子 臭橘子桔子", image: "images/fruit-4.png",store:"街道口店"},
            {id: 17, price: 50, num: 1, name: "现货8斤 不知火丑柑现货新鲜水谷臭橘子 臭橘子桔子", image: "images/fruit-1.png",store:"光谷鲁巷杨家湾店"}
        ],
        fruitQieList:[
            {id: 5, price: 100, num: 0, name: "火龙果", image: "images/qie1.png",store:"武大店",desc:"香味浓郁 核薄肉多"},
            {id: 6, price: 100, num: 0, name: "奇异果", image: "images/qie2.png",store:"武大店",desc:"颜美红嫩 健康之选"},
            {id: 7, price: 100, num: 0, name: "圣女果", image: "images/qie3.png",store:"武大店",desc:"天然野生 清甜多汁"},
            {id: 8, price: 100, num: 0, name: "黄金梨", image: "images/qie4.png",store:"武大店",desc:"香味浓郁 汁多微甜"},
            {id: 9, price: 100, num: 0, name: "火龙果", image: "images/qie1.png",store:"街道口店",desc:"香味浓郁 核薄肉多"},
            {id: 10, price: 100, num: 0, name: "奇异果", image: "images/qie2.png",store:"街道口店",desc:"颜美红嫩 健康之选"},
            {id: 11, price: 100, num: 0, name: "圣女果", image: "images/qie3.png",store:"街道口店",desc:"天然野生 清甜多汁"},
            {id: 12, price: 100, num: 0, name: "黄金梨", image: "images/qie4.png",store:"街道口店",desc:"香味浓郁 汁多微甜"},
            {id: 13, price: 100, num: 0, name: "火龙果", image: "images/qie1.png",store:"光谷鲁巷杨家湾店",desc:"香味浓郁 核薄肉多"},
            {id: 14, price: 100, num: 0, name: "奇异果", image: "images/qie2.png",store:"光谷鲁巷杨家湾店",desc:"颜美红嫩 健康之选"},
            {id:15, price: 100, num: 0, name: "圣女果", image: "images/qie3.png",store:"光谷鲁巷杨家湾店",desc:"天然野生 清甜多汁"},
            {id:16, price: 100, num: 0, name: "黄金梨", image: "images/qie4.png",store:"光谷鲁巷杨家湾店",desc:"香味浓郁 汁多微甜"}
        ],
        fruitQieList_now:[],
        fruitStoreList_now:[],
        allList:[],
        cartList:[],
        fruitQieTypeObj:{},
        fruitStoreTypeObj:{},
        allMap:{}

    };

    //todo myApp
    GLOBAL.myApp=(function(){
        function init(str) {
            switch(str){
                case "Home":
                    _initHome();
                    GLOBAL.cart_home.initCart();
                    break;
                case "Cart":
                    GLOBAL.cart_cart.initCart();
                    break;
                case "fruitQie-2":
                    _initFruitQie_2();
                    break;
                case "store-2":
                    _initStore_2();
                    GLOBAL.cart_home.initCart();
                    break;
            }

        }
        //初始化首页
        function _initHome() {
            $('#fruit-list ul').empty();
            for (var i = 0; i < GLOBAL.fruitList.length; i++) {
                addFruitToHome(i,GLOBAL.fruitList,$("#fruit-list ul"));
            }
        }
        function _initStore_2(){
            $("#store-list2 ul").empty();
            for(var i=0;i<GLOBAL.fruitStoreList_now.length;i++){
                addFruitToStore2(i,GLOBAL.fruitStoreList_now,$("#store-list2 ul"));
            }
            $(".store-store-name").text(GLOBAL.fruitStoreList_now[0].store);
        }
        //添加模板到首页
        function addFruitToHome(index,list,parent) {
            var tpl = '<li data-id="'+list[index].id+'">\
             <div class="fruit-list-l">\
                 <img class="fruit-img" src="' + list[index].image + '" alt="" width="100%"/>\
             </div>\
             <div  class="fruit-list-r">\
                <p class="title text-p">' + list[index].name + '</p>\
                <p class="text-p" style="height: 40px;">\
                <span class="price-name fl">\
                    <cite class="price color-red">￥' + list[index].price + '/盒</cite>\
                    <cite class="name color-red">'+list[index].store+'</cite>\
                </span>\
                 <span class="num fr">\
                <img class="reduce" src="images/reduce.png"  width="18"/>\
                <cite>' + list[index].num + '</cite>\
                <img class="add" src="images/add.png"  width="18"/>\
                </span>\
                </p>\
              </div>\
            </li>';
            parent.append(tpl);
        }

        function addFruitToStore2(index,list,parent){
            var tpl = '<li data-id="'+list[index].id+'">\
             <div class="fruit-list-l">\
                 <img class="fruit-img" src="' + list[index].image + '" alt="" width="100%"/>\
             </div>\
             <div  class="fruit-list-r">\
                <p class="title text-p">' + list[index].name + '</p>\
                <p class="text-p">\
                <span class="price-name">\
                    <cite class="price color-red">￥' + list[index].price + '/盒</cite>\
                </span>\
                 <span class="num fr" style="margin-top:0">\
                <img class="reduce" src="images/reduce.png"  width="18"/>\
                <cite>' + list[index].num + '</cite>\
                <img class="add" src="images/add.png"  width="18"/>\
                </span>\
                </p>\
              </div>\
            </li>';
            parent.append(tpl);
        }


        //添加所有水果到鲜果切
        function _initFruitQie_2(){
            $("#fruitQie-list-2 .fruit-list").empty();
            var tpl;
            for(var i=0;i<GLOBAL.fruitQieList_now.length;i++){
                 tpl = '<li data-id="'+GLOBAL.fruitQieList_now[i].id+'">\
             <div class="fruit-list-l">\
                 <img class="fruit-img" src="' + GLOBAL.fruitQieList_now[i].image + '" alt="" width="100%"/>\
             </div>\
             <div  class="fruit-list-r">\
                <p class="fruit-list-pd font-fy-heiti font-s14">\
                 <span class="num fr">\
                <img class="reduce" src="images/reduce.png"  width="18"/>\
                <cite>' + GLOBAL.fruitQieList_now[i].num + '</cite>\
                <img class="add" src="images/add.png"  width="18"/>\
                </span>\
                <span>'
                 + GLOBAL.fruitQieList_now[i].name +
                 '</span><br/><span class="price-name color-green2">'+
                 GLOBAL.fruitQieList_now[i].desc+
                 ' </span>\
                 </p>\
              </div>\
            </li>';
                $("#fruitQie-list-2 .fruit-list").append(tpl);
                $(".fruitQie-store-name").text(GLOBAL.fruitQieList_now[0].store);
            }
        }
        // 更新水果数据层
        function updateAllList(index, direction) {
            var id=GLOBAL.allList[index].id;
            var fruit=GLOBAL.allList[index];
            if (direction == "-") {
                if(fruit.num==0){
                    return false;
                }else{
                    fruit.num --;
                }
            } else if(direction=="+") {
                fruit.num++;
            }else if(direction=="cl"){
                fruit.num=0;
            }
            fruit.count=fruit.num*fruit.price;
        }
        function updateCartList(index,id,direction){
            var num=GLOBAL.allList[index].num;
            for(i= 0,len=GLOBAL.cartList.length;i<len;i++){
                var obj=GLOBAL.cartList[i];
                if(num==0&&obj.id==id&&direction=="-"){
                    GLOBAL.cartList.splice(i,1);
                    return;
                }else if(direction=="cl"){
                    GLOBAL.cartList.splice(i,1);
                    return;
                }
            }
         if(num==1&&direction=="+"){
                GLOBAL.cartList.push(GLOBAL.allList[index]);
         }

        }
        //清空数据层
        function clearDataList() {
            for (var i = 0, len = GLOBAL.allList.length; i < len; i++) {
                GLOBAL.allList[i].num = 0;
            }
            GLOBAL.cartList=[];
        }
        //更新主页视图
        function updateHome(index) {
            var id=GLOBAL.allList[index].id;
            var li = $("#fruit-list li[data-id="+id+"],#store-list2 li[data-id="+id+"]");
            li.find('.num cite').text(GLOBAL.allList[index].num);
        }
        //更新鲜果切视图
        function updateFruitQie(index,direction) {
            var obj=GLOBAL.allList[index];
            var id=obj.id;
            var num=obj.num;
            var name=obj.name;
            var li = $("#fruitQie-list-2 .fruit-list [data-id="+id+"]");
            li.find('.num cite').text(num);

            //更新生成套餐Bar的视图
            var fruit=$("#cart-bar-fruitQie2 .fruit");
            if(direction=="-"){
                    fruit.find('span:contains('+name+'):last').remove();
            }else if(direction=="+"){
                    fruit.append('<span class="color-red">'+name+'</span>');
            }


            //显示、隐藏生成套餐Bar
            if(returnFruitQieSum()>0){
                $("#cart-bar-fruitQie2").slideDown(200);
            }else{
                $("#cart-bar-fruitQie2").slideUp(200);
            }
        }
        //检测鲜果切是否可更新数据
        function checkCanUpdateFruitQie(index){
            var name=GLOBAL.allList[index].name;
            var count=returnFruitQieSum();
            if(count==3){
                alert('最多只能选择3个水果。');
                return false;
            }
            return true;
        }
        //返回鲜果切套餐选中的单品数量
        function returnFruitQieSum(){
            var result=0;
            for(var i= 0,len=GLOBAL.fruitQieList_now.length;i<len;i++){
                if(GLOBAL.fruitQieList_now[i].num>0){
                    result+=GLOBAL.fruitQieList_now[i].num;
                }
            }
            return result;
        }
        //将鲜果切套餐的数据插入到购物车
        function updateCartList2(){
           // {id: 5, price: 100, num: 0, name: "火龙果", image: "images/qie1.png",store:"武大店"},
            var newObj={id:Math.random()*10000|0};
            var obj;
            var nameList=[];
            var num=0;
            var price=0;
            var image;
            var store=GLOBAL.fruitQieList_now[0].store;
            for(var i=0,len=GLOBAL.fruitQieList_now.length;i<len;i++){
                obj=GLOBAL.fruitQieList_now[i];
                if(obj.num>0){
                    num+=obj.num;
                    price+=obj.num*obj.price;
                    nameList.push(obj.name);
                    image=obj.image;
                }
                //清空每个对象的数据
                obj.num=0;
                obj.count=0;
            }
            var name=nameList.join("+");
            newObj.price=price;
            newObj.num=1;
            newObj.name=name;
            newObj.store=store;
            newObj.count=price;
            newObj.image=image;
            GLOBAL.cartList.push(newObj);
            var index=GLOBAL.allList.push(newObj)-1;
            GLOBAL.allMap[newObj.id]=index;



        }
            return {
                init: init,
                addFruitToHome: addFruitToHome,//添加模板到首页
                updateCartList:updateCartList,
                updateAllList: updateAllList,//更新数据层
                clearDataList: clearDataList,//清空数据层
                updateHome: updateHome,//更新主页视图
                updateFruitQie:updateFruitQie,
                checkCanUpdateFruitQie:checkCanUpdateFruitQie,
                updateCartList2:updateCartList2,
                returnFruitQieSum:returnFruitQieSum
            }

    })();
    //todo global.event
    GLOBAL.event=(function(){


        //应用初始化事件
        $(document).on('mobileinit', function () {
            console.log('mobileinit...');
            //设置首页名字
            var src = $('script').filter("[src*='main.js']").attr('src').match(/main.js\?p=(.*)/)[1];
            GLOBAL.myApp.firstPage = src;
            //初始化cartlist
            //初始化fruitStoreTypeObj
            for (var i = 0,len=GLOBAL.fruitList.length; i <len; i++) {
                var obj= GLOBAL.fruitList[i];
                if(obj.num>0){
                    GLOBAL.cartList.push(obj);
                }
                GLOBAL.allList.push(obj);
                obj.count=obj.price*obj.num;


                if(!GLOBAL.fruitStoreTypeObj[obj.store]){
                    GLOBAL.fruitStoreTypeObj[obj.store]=[];
                }
                GLOBAL.fruitStoreTypeObj[obj.store].push(obj);
            }


            //初始化fruitQieTypeObj
            for ( i = 0,len=GLOBAL.fruitQieList.length; i <len; i++) {
                 obj=GLOBAL.fruitQieList[i];
                if(!GLOBAL.fruitQieTypeObj[obj.store]){
                    GLOBAL.fruitQieTypeObj[obj.store]=[];
                }
                GLOBAL.fruitQieTypeObj[obj.store].push(obj);
                GLOBAL.allList.push(obj);
                obj.count=obj.price*obj.num;
            }


            //建立所有水果数据的索引
            for(i=0,len=GLOBAL.allList.length;i<len;i++){
                GLOBAL.allMap[GLOBAL.allList[i].id]=i;
            }


            //创建三个购物车对象
            GLOBAL.cart_home=GLOBAL.myApp.CartMaker.factory("Home");
            //GLOBAL.cart_fruitQie=GLOBAL.myApp.CartMaker.factory("fruitQie");
            GLOBAL.cart_cart=GLOBAL.myApp.CartMaker.factory("Cart");
            $("body").fadeIn();
        })
        //点击header-nav1的下拉选择框
        $(document).on('touchstart','[class|=nav1]>p',function(){
            var obj=$(this);
            if(!obj.data('isDown')){

                $('[class|=nav1]>p').removeClass('active').data('isDown',false);
                $('[class|=nav1]>ul').slideUp(200);

                obj.addClass('active');
                obj.next('ul').slideDown(200);
                obj.data('isDown',true);
            }else{
                obj.removeClass('active');
                obj.next('ul').slideUp(200);
                obj.data('isDown',false);
            }
        })

        $(document).on('click','[class|=nav1] span',function(){
            var obj=$(this);
            var parent=obj.parents('ul');
            var p=parent.prev('p');
            parent.slideUp(200);
            p.data('isDown',false);
            p.removeClass('active');
            p.html(obj.text()+' <img src="images/arrow-d.png" width="10">');
        })
        $(document).on('touchstart','.nav1-col2',function(){
            var obj=$(this);
            if(!obj.data('isDown')){
                obj.addClass('active');
                obj.data('isDown',true);
            }else{
                obj.removeClass('active');
                obj.data('isDown',false);
            }
        })

        //点击首页果实的加减号
        $(document).on('click','#fruit-list li,#store-list2 li', function (event) {
            var obj = $(event.target);
            var li = obj.closest('li');
            var id=li.data('id');
            var index = GLOBAL.allMap[id];
            if (event.target.className == 'reduce') {
                //更新数据层
                GLOBAL.myApp.updateAllList(index, "-");
                GLOBAL.myApp.updateCartList(index,id,"-");
                //更新视图
                if (GLOBAL.allList[index].num == 0) {
                    GLOBAL.cart_home.deleteFruitToCart(index);
                }else{
                    GLOBAL.cart_home.updateCart(index);
                }
                GLOBAL.myApp.updateHome(index);
                GLOBAL.cart_home.calculateMoney();
            } else if (event.target.className == 'add') {
                //更新数据层
                GLOBAL.myApp.updateAllList(index, "+");
                GLOBAL.myApp.updateCartList(index,id,"+");
                //更新视图
                if(GLOBAL.allList[index].num==1){
                    GLOBAL.cart_home.addFruitToCart(index);
                }else{
                    GLOBAL.cart_home.updateCart(index);
                }
                GLOBAL.myApp.updateHome(index);
                GLOBAL.cart_home.calculateMoney();
            }else if(event.target.className=="fruit-img"){
                $('.home-fruit-wrap').fadeIn(500);
            }
        })
        //点击店铺，首页和鲜果切购物车里的加减号
        $(document).on('touchstart','.cartWrap', function (event) {
            var obj = $(event.target);
            var li = obj.closest('li');
            var id=li.data('id');
            var index=GLOBAL.allMap[id];
            if (event.target.className == 'reduce') {
                GLOBAL.myApp.updateAllList(index, "-");
                GLOBAL.myApp.updateCartList(index,id,"-");
                if (GLOBAL.allList[index].num == 0) {
                    GLOBAL.cart_home.deleteFruitToCart(index);
                }else{
                    GLOBAL.cart_home.updateCart(index);
                }
                GLOBAL.myApp.updateHome(index);
                GLOBAL.cart_home.calculateMoney();

            } else if (event.target.className == 'add') {
                GLOBAL.myApp.updateAllList(index, "+");
                GLOBAL.myApp.updateCartList(index,id,"+");
                GLOBAL.cart_home.updateCart(index);
                GLOBAL.myApp.updateHome(index);
                GLOBAL.cart_home.calculateMoney();
            }else if(event.target.className=='delete'){
                GLOBAL.myApp.updateAllList(index, "cl");
                GLOBAL.myApp.updateCartList(index,id,"cl");
                GLOBAL.cart_home.deleteFruitToCart(index);
                GLOBAL.myApp.updateHome(index);
                GLOBAL.cart_home.calculateMoney();
            }else if(event.target.className.indexOf('clearCart_btn')>-1){
                //点击清空按钮
                GLOBAL.myApp.clearDataList();
                GLOBAL.myApp.init('Home');
                GLOBAL.myApp.init('store-2');
            }
        })
        //点击鲜果切页面水果的加减号
        $(document).on('touchstart',"#fruitQie-list-2 .fruit-list li",function(event){
            var obj = $(event.target);
            var li = obj.closest('li');
            var id=li.data('id');
            var index = GLOBAL.allMap[id];
            if(event.target.className=='reduce'){
                //更新数据层
                GLOBAL.myApp.updateAllList(index, "-");
                GLOBAL.myApp.updateFruitQie(index,"-");
            }else if (event.target.className == 'add') {
                //更新数据层
                if(!GLOBAL.myApp.checkCanUpdateFruitQie(index)) return;
                GLOBAL.myApp.updateAllList(index, "+");
                GLOBAL.myApp.updateFruitQie(index,"+");
            }


        })
        //点击购物车页面的加减号
        $(document).on('touchstart','#cart-wrap-cart',function(event){
            var obj = $(event.target);
            var li = obj.closest('li');
            var id=li.data('id');
            var index=GLOBAL.allMap[id];
            if (event.target.className == 'reduce') {
                GLOBAL.myApp.updateAllList(index, "-");
                GLOBAL.myApp.updateCartList(index,id,"-");
                if (GLOBAL.allList[index].num == 0) {
                    GLOBAL.cart_cart.deleteFruitToCart(index);
                }else{
                    GLOBAL.cart_cart.updateCart(index);
                }
                GLOBAL.cart_cart.calculateMoney();

            } else if (event.target.className == 'add') {
                GLOBAL.myApp.updateAllList(index, "+");
                GLOBAL.myApp.updateCartList(index,id,"+");
                GLOBAL.cart_cart.updateCart(index);
                GLOBAL.cart_cart.calculateMoney();
            }
        })
        //点击收藏按钮
        $(document).on('touchstart','.store_collect_btn',function(event){
            event.stopPropagation();
            var obj=$(this);
            if(!obj.data('isCollect')){
                obj.attr('src','images/collect-2.png');
                obj.data('isCollect',true)
            }else{
                obj.attr('src','images/collect.png');
                obj.data('isCollect',false)
            }
            return false;
        })
        //点击鲜果切商店
        $(document).on('click','#fruitQie-list .store-list li',function(event){
                var li=$(this);
                GLOBAL.fruitQieList_now=GLOBAL.fruitQieTypeObj[li.data('store')];
                $.mobile.changePage( "fruitQie-2.html", { transition: "fade"});
        })
        //点击店铺的商店
        $(document).on('click','#store-list .store-list li',function(){
            var li=$(this);
            GLOBAL.fruitStoreList_now=GLOBAL.fruitStoreTypeObj[li.data('store')];
            $.mobile.changePage( "store-2.html", { transition: "fade"});
        })


        //点击切换购物车
        $(document).on('touchstart','.cartBar',function(event){
            var obj=$(this);
            if(event.target.className.indexOf("clearCart_btn")>-1){
                //点击清空按钮
                GLOBAL.myApp.clearDataList();
                GLOBAL.myApp.init('Home');
                GLOBAL.myApp.init('store-2');
            }else{
                if(!obj.data('isShow')){
                    $(".cartWrap").slideDown(300);
                   obj.data('isShow',true).find('.cart-btn').attr('src','images/arrow-d2.png');
                    $('#fruit-list').hide();
                    $('#fruitQie-list-2').hide();

                }else{
                    $(".cartWrap").slideUp(300);
                    obj.data('isShow',false).find('.cart-btn').attr('src','images/arrow-u.png');
                    $('#fruit-list').show();
                    $('#fruitQie-list-2').show();

                }
            }
        })
        //pagebeforecreate：每跳转一个页面时，页面代码被添加到DOM之前执行的事件,首页就触发一次
        $(document).on('pagebeforecreate','#Home',function(){
            console.log('pagebeforecreate...----home');
            GLOBAL.myApp.init('Home');

        })

        $(document).on('pagebeforecreate','#fruitQie-2',function() {
            console.log('pagebeforecreate---fruitQie-2')
            GLOBAL.myApp.init('fruitQie-2');
        })
        $(document).on('pagebeforecreate','#Store2',function(){
            console.log('pagebeforecreate---Store2')
            GLOBAL.myApp.init('store-2');
        })
        //
        $(document).on('pagebeforecreate','#Cart',function() {
            console.log('pagebeforecreate---cart')
            GLOBAL.myApp.init('Cart');
        })
        //
        $(document).on('pagechange',function(){
            //避免应用一开始就执行pagechange
            if(GLOBAL.start==0){
                GLOBAL.start++;
                return;
            }
            //更新第一次打开的页面通过pagechange
            if($("[data-role=page]").length==1){
                console.log('pagechange...');
                GLOBAL.myApp.init(GLOBAL.myApp.firstPage);
            }
            if(GLOBAL.myApp.firstPage=="Home"){
                GLOBAL.cart_home.hideCart();
                $('#fruit-list').show();
            }else if(GLOBAL.myApp.firstPage=="Cart"){
                $('.cart-input-icon.active').removeClass('active').addClass('unactive');
                $('.cart-input-icon:first').removeClass('unactive').addClass('active');
            }

        })

        })();









