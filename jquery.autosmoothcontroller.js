/*
----------------------------------------------------------
* jQuery AutoSmoothController 1.0
* (https://github.com/Manabu-Fukai/AutoSmothController.js)

*　Blogでの使用に特化したページスムーズスクロールプラグインです。
・アンカーをページ内のどのエレメントへも自由にいくつでも設置
・tipsの表示テキストをアンカーから自動取得
・スクロールコントローラーはドラッガブルで任意の位置へ移動可能＋位置記憶

* Copyright(c) 2014 Manabu Fukai
* Licensed under the MIT license.
*
* Depends:
*  jQuery UI
*  jQuery UI Touch Punch
*  jQuery Cookie Plugin
---------------------------------------------------------
*/

(function($) {
WindowH=$(window).height(),
WindowW=$(window).width();
var deviceW,deviceH;

	$.fn.autoSmoothController = function(options){

	//**Option Setting**
	var options = $.extend({

		target: '.section',
		speed: 1200,
		distance: 0,
		stick:[false,'outer'],
		setX: 'right',
		setY: 'top',
		manualX: 0,
		manualY: null,
		addLast: true,
		easing: 'swing',

		//Tips Options
		autoStrings:true,
		maxStrings:15,
		autoReverse:true,
		dataname:'asc',
		message: 'section',

		//Draggable Oprions
		draggable:true,
		axis:false,

		//Cookie Expires
		period:14,

		//CustomClass
		customClass:'default'

	},options);

	//Initialize
	var navi = $(this),
		scrollNavi,
		targetObj = $(options.target).length,
		tips = '.tips';
	
		var setup = function(){
			 return $.Deferred(function(df){
				navi.append("<ul id='control' />");
				scrollNavi=$('#control');
				scrollNavi.append("<li id='topback'><p class='tips'></p></li>");

				for (var n=1 ; n<=targetObj ; n++){
					scrollNavi.append("<li><p class='tips'></p></li>");
				}
				df.resolve()
			});
		}
		setup().promise().done(function(){
			scrollNaviHeight=scrollNavi.outerHeight(true);
			scrollNaviWidth=scrollNavi.outerWidth();

			if( options.setX==='left'){scrollNavi.addClass('reverse');}

			if($.cookie('ascLeft')!==undefined){
				var ascPosLeft,ascPosTop;
				if($.cookie('ascLeft')>WindowW){
					ascPosLeft=WindowW-scrollNaviWidth;
				}else{
					ascPosLeft=parseInt($.cookie('ascLeft'));
				}
				if($.cookie('ascTop')>WindowH){
					ascPosTop=WindowH-scrollNaviHeight;
				}else{
					ascPosTop=parseInt($.cookie('ascTop'));
				}
				scrollNavi.css({left:ascPosLeft,top:ascPosTop});
			}//If you use 'manualY'. 'placement' is not function.
			else if(!options.manualY){
				scrollNavi.css({top:[WindowH-scrollNaviHeight]/2});
			}else if(options.manualY!==null){
				if(options.setY==='top'){
					scrollNavi.css({ top: options.manualY});
				}else if(options.setY==='bottom'){
					scrollNavi.css({ top: WindowH-scrollNaviHeight-options.manualY});
				}
			}

			//If You use 'stick'. 'manualX' is not function. 
			if(options.manualX && options.stick[0]!==true){
				if(options.setX==='left'){
					scrollNavi.css({ left: options.manualX});
				}else if(options.setX==='right'){
					scrollNavi.css({ left: WindowW-scrollNaviWidth-options.manualX});
				}
			}

			//'Stick' is This controler stick any element left or right. 
			if(options.stick[0]){
				var parentEl=$(options.stick[0]),
					parentWidth= parentEl.outerWidth(),
					parentLeft= parentEl.offset().left;

				stickPosition();
			}

			function stickPosition(){
				if($.cookie('ascLeft')!==undefined||$.cookie('ascTop')!==undefined) return;
				if( options.setX === 'left'){
					if(options.stick[1]==='inner'){
						scrollNavi.css({left:parentLeft});
					}else{
						scrollNavi.css({left:parentLeft-scrollNaviWidth});
					}
				}else if(options.setX==='right'){
					if(options.stick[1]==='inner'){
						scrollNavi.css({left:parentLeft+parentWidth-scrollNaviWidth});
					}else{
						scrollNavi.css({left:parentLeft+parentWidth});
					}
				}
			}

			scrollNavi.children('li').each(function(i){
				if(i==0){$(this).children(tips).text('Page Top');
				}else{
					var myself=scrollNavi.children('li').index(this),
						strTrg=$(options.target).eq(myself-1),
						str=strTrg.html();

					var targetLeng,targetName;

					//auto Strings gain
					if( options.autoStrings ){
						if($(options.target).eq(myself-1).data(options.dataname)){
							targetName=strTrg.data(options.dataname);
						}else{
							targetLeng=strTrg.html(str).text().length;
							targetName=strTrg.html(str).text().substr(0,(options.maxStrings));

							if(targetLeng>targetName.length) targetName+='…';

						}
					}else{
						targetName=strTrg.data(options.dataname);
					}

					if(typeof targetName !=='undefined'){
						$(this).children(tips).text(targetName);
					}else{
						targetName=options.message+i;
						$(this).children(tips).text(targetName);
					}
				}
			});
		});

		var navTop=scrollNavi.css('top'),
			navLeft=scrollNavi.css('left');


		//Draggable
		if(options.draggable){
			scrollNavi.draggable({
				containment: 'body',
				scroll: false,
				axis: options.axis,
				stop: function(event,ui){
					if( options.autoReverse && options.setX === 'right'){
						if($(this).position().left < WindowW/2){
							$(this).addClass('reverse');
						}else{
							$(this).removeClass('reverse');
						}
					}else if( options.autoReverse && options.setX === 'left'){ 
						if($(this).position().left > WindowW/2){
							$(this).removeClass('reverse')
						}else{
							$(this).addClass('reverse');
						}
					}
						//cookie
						$.cookie('ascLeft', ui.position.left,{expires:options.period,path:'/'});
						$.cookie('ascTop', ui.position.top,{expires:options.period,path:'/'});
				}
			});
		}else{ scrollNavi.addClass('draggable-false'); }



		//Smooth Scroll Target
		var smooth = $('#control li'),
			ln = smooth.length,
			targetPos;
		if(options.addLast && ln > 1 )scrollNavi.children('li').last().addClass('last');

		$(document).on('click','#control li', function(){
			var n = smooth.index(this);

			if(n==0 || !options.target){
				targetPos=0;
			}else{
				targetPos = $(options.target).eq(n-1).offset().top-options.distance;
			}
			$('body,html').stop().animate({scrollTop:targetPos}, options.speed ,options.easing);
			return false;
		});

		//Tips Animation
		scrollNavi.children('li').on({
			'mouseenter':function(){$(this).children(tips).stop(true,true).fadeIn(400);},
			'mouseleave':function(){$(this).children(tips).delay(200).fadeOut();
			}
		});

	//Custom Class ** If you need class switch for each page.
	scrollNavi.addClass(options.customClass);



	//Active Change
	var secTopArr = new Array();
	function positionSearch(){
		$(options.target).each(function (i) {
			secTopArr[i] = $(this).offset().top;
		});
	}
	positionSearch();

	$(window).scroll(function(){
		var moved = $(this).scrollTop();
		for (var i = secTopArr.length-1; i>=0; i--){
			if ($(window).scrollTop() > secTopArr[i]-400){
				activeChange(i);
				break;
			}
		}
		function activeChange(){
				smooth.siblings().removeClass('active');
				if(moved <= secTopArr[0]-200 ) return;
					smooth.eq(i+1).addClass('active');
		}

	});

	$.fn.autoSmoothController.cookieInit = function(){
		navTop=scrollNavi.css('top'),
		navLeft=scrollNavi.css('left');
		$.cookie('ascLeft', navLeft.slice(0,-2),{expires:options.period,path:'/'});
		$.cookie('ascTop', navTop.slice(0,-2),{expires:options.period,path:'/'});
		$.cookie('windowW',WindowW,{expires:options.period,path:'/'});
	}
	$.fn.autoSmoothController.cookieInit();

	//Resize...
	$(window).resize(function(){
		resizedH = $(window).height(),
		resizedW = $(window).width();

			deviceW=resizedW-WindowW;
			deviceH=resizedH-WindowH;

				if($.cookie('ascLeft')!==undefined){
					scrollNavi.css({left:parseInt($.cookie('ascLeft'))+deviceW,top:parseInt($.cookie('ascTop'))+deviceH });
				}else{
					scrollNavi.css({left:parseInt(navLeft)+deviceW,top:parseInt(navTop)+deviceH});
				}
				navTop=scrollNavi.css('top'),
				navLeft=scrollNavi.css('left');
				$.cookie('ascLeft', navLeft.slice(0,-2),{expires:options.period,path:'/'});
				$.cookie('ascTop', navTop.slice(0,-2),{expires:options.period,path:'/'});

		WindowH = resizedH;
		WindowW = resizedW;
		if(options.stick[0]==true){
			parentLeft= parentEl.offset().left;
			stickPosition();
		}
		positionSearch();
		$.cookie('windowW',WindowW,{expires:options.period,path:'/'});
	});

	}//$.fn
})(jQuery);