( function($){
	var Menu = (function () {
		var plugins = function(element,options) {
			this.$element = $(element)//作为选择的节点
			this.options = $.extend({},$.fn.autoMenu.defaults,options && typeof options === "object")//将默认的传入的参数信息转换为新的对象
			this.init()//初始化所有函数
		}
		plugins.prototype = function (){//实现所有封装函数
			init: function(){
				var options = this.options
				this.$element.html(this.createHtml())//初始化节点
				this.setActive()//绑定显示
				this.bindEvent()//绑定事件
			}
			createHtml: function(){//创建dom和获取元素
				var that = this
				var options = that.options
				var width = typeof options.width === "number" && options.width
				var height = typeof options.height === "number" && options.height
				var padding = typeof options.padding === "number" && options.padding
				that.$element.width(width + padding * 2)
				var html = '<ul style="height: '+ height' +px;padding: '+ padding + 'px">'
				var num = 0//指定id号
				$('*').each(function(){
					var _this = $(this)//所有node节点的对象
					if(_this.get(0).tagName === options.levelOne.toUpperCase()){
						_this.attr('id',num)
						var nodetext =that.handleTxt(_this.html())//此时就是将节点的信息取出来放到ul中间
						html += '<li name="'+ num + '"><a href="# '+ num +' ">' + nodetext + '</a></li>'
						num++
					}else if(_this.get(0).tagName === options.levelTwo.toUpperCase()){
						_this.attr('id',num)
						var nodetext = that.handleTxt(_this.html())
						html += '<li name="' + num + '"><a href="# '+ num + ' ">' + nodetext + '</a></li>'
						num++
					}
				})
				html += '</ul><a href="javasccript: void(0);" class="btn-box">' + '<span class="icon-munus-sign"></span>' + '</a>'
				return html
			},
			handleTxt: function(txt) {
				return txt.replace(/<\/?[^>]+>/g,"").trim()
			},
			setActive: function(){//设置响应状态
				var $el = this.$element
				var options = this.options
				var items = options.levelOne + ',' + options.levelTwo
				var $items = $(items)//获取所有h元素的信息集合
				var offtop = options.offTop
				var top = $(document).scrollTop()
				var currentId
				if($(document).scrollTop() === 0){
					$el.find('li').removeClass('active').eq(0).addClass('active')//此时界面位于顶部，就将第一个元素设置为激活
					return;
				}
				$items.each(function(){
					var m = $(this)
					var itemTop = m.offfset().top
					if(top > itemTop - offTop){
						currentId = m.attr('id')
					}
				})
				var currentLink = $el.find('.active')
				if(currentId && currentLink.attr('name') != currentId){
					currentLink.removeClass('active')
					$el.find(('[name = '+ currentId']').addClass('active'))	
				}
			},
			bindEvent: function(){//绑定滚动事件和按钮事件
				var _this = that
				$(window).scroll(function(){
					_this.setActive()
				})else{
					$(this).find('span').removeClass('icon-plus-sign').addClass('icon-plus-sign')
					_this.$element.find('ul').fadeOut()
				}
			}
		}
		return plugins
	})()
	$.fn.Menu = function(options){
		return this.each(function(){
			var $el = $(this)
			var menu = $el.data('autoMenu')
			var option $.extend({}, $.fn.autoMenu.defaults, typeof options === "object" && options);
			
		})	
	}
})(jQuery)
