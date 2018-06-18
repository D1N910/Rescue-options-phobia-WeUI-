$('document').ready(function () {
	function isWeiXin() {
		var ua = navigator.userAgent.toLowerCase();
		var isWeixin = ua.indexOf('micromessenger') != -1;
		if (isWeixin) {
			return true;
		} else {
			return false;
		}
	}
	var isWeiXinalert = 1;
	var autooption = {
		"yon": [
			"NO", "YES"
		],
		"nearbyRestaurant": [
		]
	}

	var select = {
		addinput: function (name, optiontext) {
			$('.title1').before('<div class="weui-cells shuruxuanzeneirong ' + name + '"><div class="weui-cell"><div class="weui-cell__bd"><input class="weui-input" type="text" value="' + optiontext + '" placeholder="请输入选择的内容"> </div></div><div class="querenquxiaocontainer queren68"><a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_default quxiaobotton">删除</a></div></div>');
			//删除选项
			$('.queren68').unbind();
			$(".queren68").on('click', function (e) {
				$(this).parents('.shuruxuanzeneirong').remove();
				select.panduanbnxz($(this).parents());
			});
			this.panduanbnxz();
		},
		panduanbnxz: function (e) {

			if (typeof (e) != 'undefined') {
				$getevent = e;
				var getClass = $getevent.attr('class').split(' ');
				if (getClass.length == 3) {
					if (autooption[getClass[2]]) {
						if ($('.' + getClass[2]).length <= 0) {
							var s2e = getClass[2] + '2';
							document.getElementById(s2e).checked = false;
						}
					}
				}
			}
			if ($('.weui-input').length < 2) {
				select.adddis();
			} else {
				select.removedis();
			}
			if ($('.weui-input').length < 1) {
				$('.option_title_display').css('display', 'none');
				$('.ifHaveoption_display').css('display', 'block');
			} else {
				$('.option_title_display').css('display', 'block');
				$('.ifHaveoption_display').css('display', 'none');
			}
		},
		removedis: function () {
			$('.help_button').removeClass('weui-btn_disabled');
		},
		adddis: function () {
			$('.help_button').addClass('weui-btn_disabled');
		},
		RandomNum: function (Max) {
			var Range = Max;
			var Rand = Math.random();
			var num = Math.round(Rand * Range);
			return num;
		},
		tanchuangtishi: function () {
			var choicesonlength = $('.weui-input').length;
			var rando = select.RandomNum(choicesonlength - 1);
			var choicesontext = $('.weui-input').eq(rando).val();
			$('.weui-dialog__title').text("选择结果");
			$('#starhelp').css('display', 'none');
			$('#dengdaihelp').css('display', 'block');
			setTimeout(function () {
				$('#dengdaihelp').css('display', 'none');
				$('#starhelp').css('display', 'block');
				setTimeout(function () {
					$("#androidDialog1").css('z-index', '99');
					$("#androidDialog1").css('opacity', '1');
					$("#androidDialog1").find('.xuanzejieguo68').text(choicesontext);
				}, 200);
			}, 500);
		},
		jianceinputkong: function () {
			var jianceinputkong = 1;
			for (var i = 0; i <= $('.weui-input').length - 1; i++) {
				if ($('.weui-input').eq(i).val() == '') {
					jianceinputkong = 0;
					return jianceinputkong;
				}
			}
			return jianceinputkong;
		},
		tanchuangtishi2: function () {
			$('.weui-dialog__title').text("出错啦");
			var choicesontext = "官人，你有的选择是空的哦，请填写它或者删了它~";
			$('#starhelp').css('display', 'none');
			$('#dengdaihelp').css('display', 'block');
			setTimeout(function () {
				$('#dengdaihelp').css('display', 'none');
				$('#starhelp').css('display', 'block');
				setTimeout(function () {
					$("#androidDialog1").css('z-index', '99');
					$("#androidDialog1").css('opacity', '1');
					$("#androidDialog1").find('.xuanzejieguo68').text(choicesontext);
				}, 200);
			}, 500);
		},
		waitshow: function () {
			$('#loadingToast').css('display', 'block');
			$('#loadingToast').css('opacity', '1');
		},
		waitunshow: function () {
			$('#loadingToast').css('opacity', '0');
			setTimeout(function () {
				$('#loadingToast').css('display', 'none');
			}, 500);
		},
		autoaddopiton: function (name, e) {
			if (autooption[name]) {
				for (var i = autooption[name].length - 1; i >= 0; i--) {
					select.addinput(name, autooption[name][i]);
				}
			} else {
				alert("系统出错，没有这个帮助选项啦");
				e.checked = false;//让按钮回弹
			}
		},
		searchfujing: function () {
			if (isWeiXin() && isWeiXinalert) {
				isWeiXinalert = 0;
				alert("各位使用微信的老爷们，使用此功能建议在其他浏览器（chrome浏览器等）打开，微信浏览器的定位功能蛋糕还在学习，可能会有偏差哦~");
			}
			var map = new BMap.Map("allmap");
			var getlnglat = new Object();
			var geolocation = new BMap.Geolocation();
			geolocation.getCurrentPosition(function (r) {
				if (this.getStatus() == BMAP_STATUS_SUCCESS) {
					getlnglat.lng = r.point.lng;
					getlnglat.lat = r.point.lat;
					var main_ci = $(".fujing_input").val();
					if (main_ci == '') {
						alert("要填写您要添加的选项的关键词");
						select.waitunshow();
						document.getElementById('nearbyRestaurant2').checked = false;
						$('.fujing_input').focus();
						return;
					}

					// var mPoint = new BMap.Point(113.68218290686,24.779547719611);
					var mPoint = new BMap.Point(getlnglat.lng, getlnglat.lat);
					map.centerAndZoom(mPoint, 11);

					var options = {
						onSearchComplete: function (results) {
							var totalResults = results.getNumPois();  // 需要获取当前搜索总共有多少条结果  
							var totalPages = results.getNumPages();
							var currPage = results.getPageIndex();// 获取当前是第几页数据 
							if (totalPages > 4) {
								totalPages = 4;
							}
							// 判断状态是否正确
							for (var i = 0; i < results.getCurrentNumPois(); i++) {
								autooption['nearbyRestaurant'].push(results.getPoi(i).title + ", " + results.getPoi(i).address);
							}
							if (results.getPageIndex() < totalPages - 1) {
								local.gotoPage(results.getPageIndex() + 1); // 遍历到最后一页之后不再进行下一页搜索，此时，已经获取到全部的搜索结果，  }
							} else {
								select.autoaddopiton('nearbyRestaurant', document.getElementById('nearbyRestaurant2'));
								select.panduanbnxz();
								select.waitunshow();
							}
						}
					};
					var local = new BMap.LocalSearch(map, options);
					local.searchNearby(main_ci, mPoint, 500);
					// alert('您的位置：'+r.point.lng+','+r.point.lat);
				}
				else {
					alert('failed' + this.getStatus());
				}
			}, { enableHighAccuracy: true })
		}
	}

	$('.addbotton').on('click', function () {
		select.addinput("", "");
		$("input").trigger('focus');
	});

	$('.help_button').on('click', function (e) {
		if ($(this).attr('class') == 'weui-btn weui-btn_primary help_button') {
			if (select.jianceinputkong()) {
				select.tanchuangtishi();
			} else {
				select.tanchuangtishi2();
			}
		}
	});
	$('.liaojie').on('click', function () {
		$("#androidDialog1").css('opacity', '0');
		setTimeout(function () {
			$("#androidDialog1").css('z-index', '-1');
		}, 200);
	})
	//yes/no 实现
	$('.weui-switch').on('click', function (e) {
		autooption['nearbyRestaurant'] = [];
		var thisparentID = $(this).parent().parent().attr('id');
		if (this.checked) {
			if (thisparentID == "nearbyRestaurant") {
				select.waitshow();
				select.searchfujing();
			}
			select.autoaddopiton(thisparentID, this);
			select.panduanbnxz();
		} else {
			$('.' + thisparentID).remove();
			select.panduanbnxz();
		}
	});
	//附近餐馆功能实现
	//读取地址
});