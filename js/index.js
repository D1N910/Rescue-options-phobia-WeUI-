$('document').ready(function() {
		var newshuruxuanxiang='<div class="weui-cells shuruxuanzeneirong"><div class="weui-cell"><div class="weui-cell__bd"><input class="weui-input" type="text" placeholder="请输入选择的内容"> </div></div><div class="querenquxiaocontainer queren68"><a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_default quxiaobotton">删除</a></div></div>';

		var select={
			addinput : function(){
				$('.title1').before(newshuruxuanxiang);
				this.panduanbnxz();
			},
			panduanbnxz:function(){
								if ($('input').length<2) {
						select.adddis();
				}else{
						select.removedis();
					}
			},
			removedis:function(){
				$('.help_button').removeClass('weui-btn_disabled');
			},
			adddis:function(){
				$('.help_button').addClass('weui-btn_disabled');
			},
			RandomNum:function (Max){
			var Range = Max;
			var Rand = Math.random();  
			var num =Math.round(Rand * Range);
			return num;
			},
			tanchuangtishi:function(){
				var choicesonlength=$('input').length;
				var rando=select.RandomNum(choicesonlength-1);
				var choicesontext=$('input').eq(rando).val();
				$('.weui-dialog__title').text("选择结果");
				$('#starhelp').css('display','none');
				$('#dengdaihelp').css('display','block');
				setTimeout(function(){
					$('#dengdaihelp').css('display','none');
					$('#starhelp').css('display','block');
					setTimeout(function(){
					$("#androidDialog1").css('z-index','99');
					$("#androidDialog1").css('opacity','1');
					$("#androidDialog1").find('.xuanzejieguo68').text(choicesontext);
				},200);
				},500);
			},
			jianceinputkong:function(){
				var jianceinputkong=1;
				for (var i = 0; i < $('input').length; i++) {
					if($('input').eq(i).val()==''){
						jianceinputkong=0;
					}
				}
				return jianceinputkong;
			},
			tanchuangtishi2:function(){
				$('.weui-dialog__title').text("出错啦");
				var choicesontext="官人，你有的选择是空的哦，请填写它或者删了它~";
				
				$('#starhelp').css('display','none');
				$('#dengdaihelp').css('display','block');
				setTimeout(function(){
					$('#dengdaihelp').css('display','none');
					$('#starhelp').css('display','block');
					setTimeout(function(){
					$("#androidDialog1").css('z-index','99');
					$("#androidDialog1").css('opacity','1');
					$("#androidDialog1").find('.xuanzejieguo68').text(choicesontext);
				},200);
				},500);
			}
		}

		$('.addbotton').on('click',function(){
			select.addinput();
			$("input").trigger('focus');
			$(".queren68").on('click',function(){
				$(this).parents('.shuruxuanzeneirong').remove();
				select.panduanbnxz();
			});
		});

		$('.help_button').on('click',function(){
			if ($(this).attr('class')=='weui-btn weui-btn_primary help_button') {
				if(select.jianceinputkong()){
					select.tanchuangtishi();
				}else{
					select.tanchuangtishi2();
				}
			}
		});
		$('.liaojie').on('click',function(){
					$("#androidDialog1").css('opacity','0');
					setTimeout(function(){
						$("#androidDialog1").css('z-index','-1');
					},200);
		})
		// $('body').keyup(function(e) {
  //   	alert(e.keyCode);
  //   		if(e.keyCode == 13) {
  //       		$('.querenbotton').trigger('click');
  //   		  }
		// });
		});