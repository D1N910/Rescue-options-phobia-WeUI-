$('document').ready(function() {
		var newshuruxuanxiang='<div class="weui-cells shuruxuanzeneirong"><div class="weui-cell"><div class="weui-cell__bd"><input class="weui-input" type="text" placeholder="请输入选择的内容"> </div></div><div class="querenquxiaocontainer queren68"><a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_default quxiaobotton">取消</a><a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_primary querenbotton">确认</a></div></div>';
		var newchoiceson1='<div class="weui-cell choiceson"><div class="weui-cell__bd"><p>';
		var newchoiceson2='</p></div><div class="weui-cell__ft">删除</div></div>';

		var select={
			addinput : function(){
				$('.title1').before(newshuruxuanxiang);
			},
			removeaddandaddchoice : function(){
				$('.add68').css('display','none');
				$('.queren68').css('display','block');
			},
			removequerenaddadd : function(){
				$('.add68').css('display','block');
				$('.queren68').css('display','none');
			},
			addchoiceson:function(){
				var newtext=$('input').val();
				if (newtext!=='') {
					newtext=newchoiceson1+newtext+newchoiceson2;
					$('.title1').before(newtext);
					$('.weui-cell__ft').on('click',function(){
					$(this).parents('.choiceson').remove();
					if ($('.choiceson').length<2) {
						select.adddis();
					}
					});
					if ($('.choiceson').length>=2) {
						select.removedis();
					}
				}
			},
			removedis:function(){
				$('.help_button').removeClass('weui-btn_disabled');
			},
			adddis:function(){
				$('.help_button').addClass('weui-btn_disabled');
			},
			removinput:function(){
				$('input').parents('.shuruxuanzeneirong').remove();
			},
			RandomNum:function (Max){
			var Range = Max;
			var Rand = Math.random();  
			var num =Math.round(Rand * Range);
			return num;
			}
		}

		$('.addbotton').on('click',function(){
			select.addinput();
			$("input").trigger('focus');
			select.removeaddandaddchoice();
			$('.querenbotton').on('click',function(){
			select.addchoiceson();
			select.removinput();
			select.removequerenaddadd();
			});
			$('.quxiaobotton').on('click',function(){
			select.removinput();
			select.removequerenaddadd();
		});
		});

		$('.help_button').on('click',function(){
			if ($(this).attr('class')=='weui-btn weui-btn_primary help_button') {
				var choicesonlength=$('.choiceson').length;
				var rando=select.RandomNum(choicesonlength-1);
				var choicesontext=$('.choiceson').eq(rando).find('p').text();
				
				$('#starhelp').css('display','none');
				$('#dengdaihelp').css('display','block');
				setTimeout(function(){
					$('#dengdaihelp').css('display','none');
					$('#starhelp').css('display','block');
					setTimeout(function(){
					//alert("那就选"+choicesontext+"吧！");
					$("#androidDialog1").css('z-index','99');
					$("#androidDialog1").css('opacity','1');
					$("#androidDialog1").find('.xuanzejieguo68').text(choicesontext);
					//$("#androidDialog1").animate({
					//	opacity:1
					//},200);
				},200);
				},500);
			}
		});
		$('.liaojie').on('click',function(){
					// $("#androidDialog1").animate({
					// 	opacity:0
					// },200,function(){
					// 	$("#androidDialog1").css('z-index','-1');
					// });
					$("#androidDialog1").css('opacity','0');
					setTimeout(function(){
						$("#androidDialog1").css('z-index','-1');
					},200);
		})
		$('body').keyup(function(e) {
    //alert(e.keyCode);
    		if(e.keyCode == 13) {
        		$('.querenbotton').trigger('click');
    		  }
		});
		});