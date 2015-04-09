/*
 *param int/string   height 		//高度
 *param  int/string   autoscroll     //自动滚动的时间间隔
 *param  array（）	 urls			//图片的url数组
 *
 */

$.fn.extend({
	cyt_slider: function(obj) {
		return this.each(
			function() {
				/*var...*/
				var height = obj.height ? obj.height * 1 : 400;
				var autoScroll = obj.autoscroll ? obj.autoscroll * 1 : 2500;
				var index = 1; //图片的页码
				var offsetX; //wrap的left偏移量
				var slider = $(this); //插件元素
				var wrap; //包含所有图片的ul盒子
				var width = slider.width();
				var timeHandle; //setintertcal返回值
				var oldTime = new Date().getTime(); //获取现在的时间，用来控制点击箭头过快事件
				var number = obj.urls.length;
				var str = "<ul class='wrap'>";
				/*init...*/
				for (var i = 0; i < number; i++) {
					str += "<li class='li" + (i + 1) + "'></li>";
				}
				str += "</ul>";
				str += "<div class=\"slider-btn\">"
				for (var i = number; i > 0; i--) {
					str += "<span class='slider-btn" + i + "'></span>";
				}
				//str += "</div><div class=\"arrow-l\"></div><div class=\"arrow-r\"></div>"
				slider.append(str); //向页面插入生成的字符串

				$(".slider-btn span:last").addClass("active");
				wrap = slider.find(".wrap");
				wrap.find('li').each(function(i) { //设置每个li的背景图片
					$(this).css('background-image', 'url(' + obj.urls[i] + ')');
				})

				wrap.find('li:last').clone().prependTo(wrap).css('background-image', 'url(' + obj.urls[number - 1] + ')');
				//将最后一个li复制放到ul的最前面
				wrap.find('.li1').clone().appendTo(wrap).css('background-image', 'url(' + obj.urls[0] + ')');
				//将第一个li复制放到ul的最后面
				slider.height(height);
				wrap.width((number + 2) * 100 + '%');
				wrap.find('li').width(100 / (number + 2) + '%');
				setTimeScroll();

				/*click arrow...*/
				slider.find(".arrow-l").click(function() {
					var newTime = new Date().getTime();
					if (newTime - oldTime < 500) return;
					oldTime = newTime;
					index--;
					translate();
				})
				slider.find(".arrow-r").click(function() {
					var newTime = new Date().getTime();
					if (newTime - oldTime < 500) return;
					oldTime = newTime;
					index++;
					translate();
				})
				/*hover slider-btn...*/
				slider.find(".slider-btn span").each(function(i) {
					i = number - i - 1;
					$(this).mouseover(function() {
						slider.find(".slider-btn span").filter('.active').removeClass('active');
						$(this).addClass('active');
						wrap.hide();
						index = i + 1;
						offsetX = -index * 100 + '%';
						wrap.css({
							'left': offsetX
						});
						wrap.fadeIn(200);
					})

				})
				/*set autoScroll...*/
				//slider.hover(function() {
				//	window.clearInterval(timeHandle);
				//}, function() {
				//	setTimeScroll();
				//})
				/*function...*/
				function setTimeScroll() {
					timeHandle = window.setInterval(function() {
						index++;
						translate();
					}, autoScroll);
				}

				function translate() {
					offsetX = -index * 100 + '%';
					wrap.stop(true, true).animate({
						'left': offsetX
					}, 350, function() {
						if (index == number + 1) {
							index = 1;
							offsetX = -index * 100 + '%';
							wrap.css({
								'left': offsetX
							});
						} else if (index == 0) {
							index = number;
							offsetX = -index * 100 + '%';
							wrap.css({
								'left': offsetX
							});
						}
						slider.find(".slider-btn span").filter('.active').removeClass('active');
						slider.find(".slider-btn .slider-btn" + index).addClass('active');
					});
				}
			}

		)
	}
})