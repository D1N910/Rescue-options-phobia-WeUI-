/**
 * 解救选择恐惧症 v2.0
 * 作者：D1n910
 * Github:https://github.com/D1N910/Rescue-options-phobia-WeUI-
 */
$('document').ready(function () {
	/***
 	* @param isWeiXinalert 记录是否有弹出过微信浏览器不兼容提示框，1代表未弹出过，0表示弹出过
	* @param autooption 自动添加选项对象数组设置
	* @param autooption["yon"] yes or no 是或否的配置，修改数组中的元素内容/数量，自动增加对应的选项
	* @param autooption["nearbyRestaurant"] 附近餐厅 实际上不止餐厅
 	*/
	var isWeiXinalert = 1;
	var autooption = {
		"yon": [
			"NO", "YES"
		],
		"nearbyRestaurant": [
		]
	}
	/**
	 * 检查是不是微信登录
	 * @param ua 获取当前对象的用户代理的小写字母表示
	 * @param isWeixin 将ua与micromessenger匹配查看有没有micromessenger
	 */
	function isWeiXin() {
		//获取当前的用户代理
		var ua = navigator.userAgent.toLowerCase();
		//匹配用户代理的内容，看是不是微信浏览器打开的
		var isWeixin = ua.indexOf('micromessenger') != -1;
		// 如果是微信打开的
		if (isWeixin) {
			return true;
		} else {
			return false;
		}
	}
	//	select 单例模式 集合了选项方法的对象
	var select = {
		/**
		* 添加选项
		* @param name 选项类名，通过添加选项类名来作为快速选项的显示和隐藏方案
		* @param optiontext 选项内容
		*/
		addinput: function (name, optiontext) {
			//在添加选项按钮之前插入选项，Container-to-show-option后面记得加空格，不然会和name在一起为同一字符串
			$('.Button-to-add-options').before('<div class="weui-cells Container-to-show-options ' + name + '"><div class="weui-cell"><div class="weui-cell__bd"><input class="weui-input" type="text" value="' + optiontext + '" placeholder="请输入选择的内容"> </div></div><div class="querenquxiaocontainer Button-to-delete-options"><a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_default quxiaobotton">删除</a></div></div>');
			//将所有用以删除选项的按钮解除事件绑定
			$('.Button-to-delete-options').unbind();
			//为所有用以删除选项的按钮绑定点击事件
			$(".Button-to-delete-options").on('click', function (e) {
				//移除被删除的选项
				$(this).parents('.Container-to-show-options').remove();
				//调用删除选项后的回调方法
				select.panduanbnxz($(this).parents());
			});
			//调用删除选项后的回调方法
			this.panduanbnxz();
		},
		/**
		* 调用删除选项后的回调方法
		* @param e 输入框对象
		*/
		panduanbnxz: function (e) {
			// 获得选项的数量
			var WeuiInputNum = $('.weui-input').length;
			// 切换显示帮忙选择按钮的样式
			select.ToggleTheStateOfTheButtonThatHelpedSelect(WeuiInputNum);
			// 切换显示交互提示文字
			select.ToggleDisplayInteractivePromptText(WeuiInputNum);
			// 修改快速添加按钮的选择状态的方法
			select.ToModifyTheStatuOfTheQuickButton(e);
		},
		/**
		* 修改快速添加按钮的选择状态的方法
		* @param e 输入框对象
		*/
		ToModifyTheStatuOfTheQuickButton: function (e) {
			if (typeof (e) != 'undefined') {
				// 给getevent赋值e
				$getevent = e;
				//  选项容器的类名赋值
				var classNameOfTheOptionsContainer = $getevent.attr('class').split(' ');
				//  如果选项容器的类名有三个
				if (classNameOfTheOptionsContainer.length == 3) {
					//  如果选项容器的第三个类名是在快速添加里的
					if (autooption[classNameOfTheOptionsContainer[2]]) {
						//  如果某类快速添加的选项长度为0
						if ($('.' + classNameOfTheOptionsContainer[2]).length <= 0) {
							//  找到这个快速添加的按钮
							var s2e = classNameOfTheOptionsContainer[2] + '2';
							//  让这个快速添加的按钮的选择状态为未选择状态
							document.getElementById(s2e).checked = false;
						}
					}
				}
			}
		},
		/**
		 * 切换显示帮忙选择按钮的样式
		 * @param WeuiInputNum 选项的数量
		 */
		ToggleTheStateOfTheButtonThatHelpedSelect: function (WeuiInputNum) {
			// 如果选项少于两个
			if (WeuiInputNum < 2) {
				$('.help_button').addClass('weui-btn_disabled');
			} else {
				$('.help_button').removeClass('weui-btn_disabled');
			}
		},
		/**
		 * 切换显示交互文字
		 * @param WeuiInputNum 选项的数量
		 */
		ToggleDisplayInteractivePromptText: function (WeuiInputNum) {
			if (WeuiInputNum < 1) {
				$('.option_title_display').css('display', 'none');
				$('.ifHaveoption_display').css('display', 'block');
			} else {
				$('.option_title_display').css('display', 'block');
				$('.ifHaveoption_display').css('display', 'none');
			}
		},
		/**
		 * 获取随机数
		 * @param Max 最大值
		 */
		RandomNum: function (Max) {
			var Range = Max;
			var Rand = Math.random();
			var num = Math.round(Rand * Range);
			return num;
		},
		/** 
		* 用以显示选择结果的弹窗
		*/
		PopupWowToShowSelectionResult: function () {
			// 修改弹窗的标题
			$('.weui-dialog__title').text("选择结果");
			$('#starhelp').css('display', 'none');
			$('#dengdaihelp').css('display', 'block');
			//定时显示，显得很专业
			setTimeout(function () {
				$('#dengdaihelp').css('display', 'none');
				$('#starhelp').css('display', 'block');
				setTimeout(function () {
					$("#androidDialog1").css('z-index', '99');
					$("#androidDialog1").css('opacity', '1');
					$("#androidDialog1").find('.xuanzejieguo68').text($('.weui-input').eq(select.RandomNum($('.weui-input').length - 1)).val());
				}, 200);
			}, 500);
		},
		/** 
		* 检测input有没有空的
		*/
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
		/** 
		* 用以显示错误信息的弹窗
		*/
		PopupWindowToDisplayErrorMessage: function () {
			//修改标题投
			$('.weui-dialog__title').text("出错啦");
			$('#starhelp').css('display', 'none');
			$('#dengdaihelp').css('display', 'block');
			setTimeout(function () {
				$('#dengdaihelp').css('display', 'none');
				$('#starhelp').css('display', 'block');
				setTimeout(function () {
					$("#androidDialog1").css('z-index', '99');
					$("#androidDialog1").css('opacity', '1');
					$("#androidDialog1").find('.xuanzejieguo68').text("官人，你有的选择是空的哦，请填写它或者删了它~");
				}, 200);
			}, 500);
		},
		// 等待显示
		waitshow: function () {
			$('#loadingToast').css('display', 'block');
			$('#loadingToast').css('opacity', '1');
		},
		// 等待隐藏
		waitunshow: function () {
			$('#loadingToast').css('opacity', '0');
			setTimeout(function () {
				$('#loadingToast').css('display', 'none');
			}, 500);
		},
		// 自动添加快速选项的信息
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
		// 查找附近的餐厅
		searchfujing: function () {
			// 是不是浏览器打开的
			if (isWeiXinalert && isWeiXin()) {
				isWeiXinalert = 0;
				alert("各位使用微信的老爷们，使用此功能建议在其他浏览器（chrome浏览器等）打开，微信浏览器的定位功能蛋糕还在学习，可能会有偏差哦~");
			}
			// 定义地图变量
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
					// 选项的配置
					var options = {
						// 搜索完成后的回调函数
						onSearchComplete: function (results) {
							// 获取当前搜索总共有多少条结果 
							// var totalResults = results.getNumPois();   
							var totalPages = results.getNumPages();
							// 获取当前是第几页数据
							var currPage = results.getPageIndex();
							if (totalPages > 4) {
								totalPages = 4;
							}
							// 判断状态是否正确
							for (var i = 0; i < results.getCurrentNumPois(); i++) {
								autooption['nearbyRestaurant'].push(results.getPoi(i).title + ", " + results.getPoi(i).address);
							}
							// 获取其他页数的内容
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
	// 添加选项按钮绑定点击事件
	$('.addbotton').on('click', function () {
		select.addinput("", "");
		$("input").trigger('focus');
	});
	//帮忙选择按钮绑定事件
	$('.help_button').on('click', function (e) {
		if ($(this).attr('class') == 'weui-btn weui-btn_primary help_button') {
			if (select.jianceinputkong()) {
				select.PopupWowToShowSelectionResult();
			} else {
				select.PopupWindowToDisplayErrorMessage();
			}
		}
	});
	//弹窗确认按钮绑定事件
	$('.confirm').on('click', function () {
		$("#androidDialog1").css('opacity', '0');
		setTimeout(function () {
			$("#androidDialog1").css('z-index', '-1');
		}, 200);
	})
	//快速选择按钮绑定事件
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
});