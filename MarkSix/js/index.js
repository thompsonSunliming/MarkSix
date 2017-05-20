(function(){
	// 弹出layer  滚动事件 计数器
	var scrollTopcount = 0;
	(function(){
		$('.MarkSix-table').bind('contextmenu',function(e){
			//return false;
		});
		$(document).bind('selectstart',function(e){
			return false;
		});
	})();
	// table init
	(function(){
		initTableOne();
		initTableThree();
		initMoreList();
		//table init
		function initTableOne(){
			var tableNum =48;
			var tableCol = 12;
			var $tableRow1 = $('.table-row1'),
				$tableRow2 = $('.table-row2');
			var html='';
			for (var i=1;i <= tableNum ;i++ )
			{
				var n = parseInt(i/12);
				html +='<div class="row1_'+i+' tmItem" chip-text="一码中特" date-type="'+i+'"><span class="title"><span class="title-text">0.00</span><span class="title-arrow"></span></span></div>';
			}
			$tableRow1.html(html);
			var sxHtml = '';
			var sxArr = ['10|22|34|46','9|21|33|45','8|20|32|44','7|19|31|43','6|18|30|42','5|17|29|41','4|16|28|40','3|15|27|39','2|14|26|38','1|13|25|37|49','12|24|36|48','11|23|35|47'];
			var ctext = ['特码生肖鼠','特码生肖牛','特码生肖虎','特码生肖兔','特码生肖龙','特码生肖蛇','特码生肖马','特码生肖羊','特码生肖猴','特码生肖鸡','特码生肖狗','特码生肖猪'];
			for (var i=0;i < tableCol ;i++ )
			{
				sxHtml +='<div class="row2_'+(i+1)+' sxItem" animalnum="'+sxArr[i]+'" chip-text="'+ctext[i]+'"><span class="title"><span class="title-text">0.00</span><span class="title-arrow"></span></span></div>';
			}
			$tableRow2.html(sxHtml);
		};
		
		function initTableThree(){
			var tableNum =48;
			var html='';
			for (var i=1;i <= tableNum ;i++ )
			{
				var n = parseInt(i/12);
				html +='<div class="row1_'+i+' zmItem" chip-text="一码不定位" date-type="'+i+'"><span class="title"><span class="title-text">0.00</span><span class="title-arrow"></span></span></div>';
			}
			$('.MarkSix-table-three .table-row7').html(html);
		}

		function initMoreList(){
			var tableRow = 50;
			var html = '';
			for (var i=0;i < tableRow ;i++ )
			{
				html+='<tr><td class="histroy-issue"></td><td class="histroy-num"></td><td class="histroy-num"></td><td class="histroy-num"></td><td class="histroy-num"></td><td class="histroy-num"></td><td class="histroy-num"></td><td class="histroy-num"></td><td class="histroy-time"></td></tr>';
			}
			$('.moreList-body .moreList-body-histroy table tbody').append(html);
		}
		//title 居中
		$('.MarkSix-table .title').each(function(){
			var widDiff = $(this).parent().width() - $(this).width();
			$(this).css('marginLeft',widDiff/2+'px');
		});
	})();
	//controller
	(function (){
		var nowTime = new Date();
		var chipArr = [],chipCount = 0;
		// 投注记录 toggle
		$('.MarkSix-top-record .record-click').click(function(ev){
			var $body = $('.record-show-body');
			var $child = $body.find('tr');
			//滚动条 是否显示
			openTep($body,$child.length);
			$(".record-show").show().animate({
				height:'310px'
			},500);
			
		});
		
		$('.record-show-close').click(function(ev){
			$('.record-show').hide().css('height','0');
			$('.record-show-body .page-scallBar').hide();
		});
		
		// 最新开奖 toggle
		$(".MarkSix-top-newOpen").click(function(){
			$(this).find('.newOpen-show').show().animate({
				height:'522px'
			},500);
		});
		$('.newOpen-show-topClose').click(function(ev){
			ev.stopPropagation();
			$('.newOpen-show').hide().css('height','0');
		});
		$('.newOpen-show-close').click(function(ev){
			ev.stopPropagation();
			$('.newOpen-show').hide().css('height','0');
		});
		/*btn toggle*/
		$('.MarkSix-btnGroup .MarkSix-btnGroup-btn').click(function(){
			// table 切换时先清空桌面
			clearChip();
			var i = $(this).index();
			$('.MarkSix-table .table-container').eq(i).show().siblings().hide();
			$(this).addClass('MarkSix-btnGroup-active').siblings().removeClass('MarkSix-btnGroup-active');
		});
		/* more btn*/
		$('.option-btn-more').click(function(){
			$('.option-weight').toggle();
			$('.option-weight-hide').toggle();
		});

		/* hide close btn*/
		$('.option-weight-hide .hide-close').click(function(){
			$(this).parent().hide();
			$('.option-weight').show();
		});
		
		//help hover
		$('.table-help-item').hover(function(){
			$(this).find('.help-text').show();
		},function(){
			$(this).find('.help-text').hide();
		});
		
		//chip 切换
		$('.option-weight .chip').click(function(){
			$(this).addClass('chip-selected').siblings().removeClass('chip-selected');
		});
		
		//清空
		$('.option-btn-clear').click(function(){
			clearChip();
		});
		//撤销
		$('.option-btn-cancel').click(function(){
			cancelChip();
		});
		
	
		//Chip增加、减少封装
		function addChip(This,ev){
			var timeDiff = new Date() - nowTime;
			var ev = ev || window.event;
			if(timeDiff > 500){
				var pTop,pLeft;
				var topDis = 2;
				//当前点击下的砝码个数
				var count = This.find('.chip').length;
				//当前点击下的金额
				This.money =parseFloat(This.find('.title-text ').html());
				//下注总金额
				var bettingMoney = parseFloat($('.option-money-pour').html());
				//点击格子的 宽、高、Top、Left
				var oTop = This.offset().top,
					oLeft = This.offset().left,
					oWidth  = This.width(),
					oHeight  = This.height();

				var mL = Math.ceil((oWidth - 55)/2),
					mT = Math.ceil((oHeight - 55)/2);
				// title的marginTop
				var tTop = parseInt(This.find('.title').css('marginTop'));

				//左键添加chip
				if(ev.which == '1'){
					// 更改筹码是否打开
					var $chip;
					if($('.option-weight').css('display') == 'block'){
						$chip = $('.option-weight .chip-selected');
						$chip.cn = 'chip-selected';
					}else if($('.option-weight-hide').css('display') == 'block'){
						$chip = $('.option-weight-hide .select-active');
						$chip.cn = 'select-active';
					}

					//当前选择的Chip的位置
					pTop =  $chip.offset().top;
					pLeft = $chip.offset().left;
					
					var clone = $chip.clone(true);

					clone.css({
						position:'absolute',
							top:pTop+'px',
							left:pLeft + 'px'
					});

					$('body').append(clone);
					
					clone.removeClass($chip.cn);
					var cn = clone[0].className,
						val = clone.attr('chip-value'),
						sel = clone.attr('select');
					// 当前点击金额统计
					This.money += parseFloat($chip.attr('chip-value'));
					//总金额统计
					bettingMoney += parseFloat($chip.attr('chip-value'));
					//title位置
					This.find('.title').css('marginTop',(tTop-topDis)+'px');
					//克隆的Chip的运动
					chipCount++;
					var childChip= $('<div class="'+cn+'" chip-value="'+val+'" chip-count="'+chipCount+'" select="'+sel+'" style="position:absolute;top:'+(mT+count*-2)+'px;left:'+mL+'px;"></div>'); 
					
					clone.animate({
						top:(oTop + mT) +'px',
						left:(oLeft + mL)+'px',
					},400,'swing',function(){
						This.append(childChip);
						$(this).remove();
					});
					
					This.find('.title').show();
					chipArr.push(childChip);
				}else if(ev.which == '3'){
					//右键撤销
					if(count){
						//获取当前点击下格子下最后一个chip
						var cliChip = This.find('.chip').eq(count-1);
						//根据chip-count 判断点击
						var cliCount = cliChip.attr('chip-count');
						for (var i=0;i < chipArr.length ;i++ )
						{
							if(chipArr[i].attr('chip-count') === cliCount){
								chipArr.splice(i,1);//撤销后从数组中删除
								break;
							}
						}

						chipMove(cliChip);
						
						// 当前点击金额统计
						This.money -= parseFloat(cliChip.attr('chip-value'));
						if(!This.money){
							This.find('.title').hide();
						}
						bettingMoney -= parseFloat(cliChip.attr('chip-value'));
						//title位置
						This.find('.title').css('marginTop',(tTop+topDis)+'px');

						cliChip.remove();
					}
				}
				This.find('.title-text').html(This.money.toFixed(2));
				$('.option-money-pour').html(bettingMoney.toFixed(2));
				nowTime = new Date();
			}
		}

		//逐一撤销
		function cancelChip(){
			var len = chipArr.length;
			if(len){
				var chip = chipArr[len-1];
				var oParent=chip.parent();
				// title的marginTop
				var tTop = parseInt(oParent.find('.title').css('marginTop'));

				chipMove(chip);

				//下注总金额
				var bettingMoney = parseFloat($('.option-money-pour').html());
				// 金额统计
				oParent.money = oParent.find('.title-text').html();
				oParent.money -= parseFloat(chip.attr('chip-value'));
				if(!oParent.money){
					oParent.find('.title').hide();
				}
				oParent.find('.title-text').html(oParent.money.toFixed(2));
				bettingMoney -= parseFloat(chip.attr('chip-value'));
				$('.option-money-pour').html(bettingMoney.toFixed(2));
				//title位置
				oParent.find('.title').css('marginTop',(tTop+2)+'px');

				chip.remove();

				chipArr.pop();
			}
		}

		//清空
		function clearChip(){
			if(chipArr.length){
				chipArr.forEach(function(chip,i){
					chipMove(chip)
					
					chip.parent().find('.title-text').html('0');
					$('.option-money-pour').html("0.00");
					chip.parent().find('.title').hide();
					//title位置
					chip.parent().find('.title').css('marginTop','0px');
					chip.remove();
				});
				chipArr.length = 0;
			}
		}
		
		function chipMove(chip){
			var targetChip,pTop,pLeft;
			var val = chip.attr('chip-value');
			// 更改筹码是否打开，获取移动目标Chip
			if($('.option-weight').css('display') == 'block'){
				if(parseInt(val) > 20){
					targetChip = $('.option-weight .chip[chip-value="1"]');
				}else{
					targetChip = $('.option-weight .chip[chip-value="'+val+'"]');
				}
			}else if($('.option-weight-hide').css('display') == 'block'){
				targetChip = $('.option-weight-hide .chip[chip-value="'+val+'"]');
			}
			
			pTop = targetChip.offset().top;
			pLeft = targetChip.offset().left;
			//克隆chip,固定位置
			var clone = chip.clone(true);
			clone.css({
				'position':'absolute',
				'top':chip.offset().top + 'px',
				'left':chip.offset().left + 'px'
			});

			$('body').append(clone);
			//克隆的Chip进行移动动画
			
			clone.animate({
				'top':pTop+'px',
				'left':pLeft + 'px'
			},400,'swing',function(){
				$(this).remove();
			});
			
		}
		
		//玩法绑定hover / click 

		//table one
		//tmItem点击投注
		$('.tmItem').mousedown(function(ev){
			addChip($(this),ev);
		});
		$('.tmItem').hover(function(){
			var money = parseInt($(this).find('.title-text ').html());
			if(money){
				$(this).find('.title').show();
			}
		},function(){
			$(this).find('.title').hide();
		});
		//生肖
		$('.sxItem').mousedown(function(ev){
			addChip($(this),ev);
		});
		$('.sxItem').hover(function(){
			var index = $(this).index();
			var money = parseInt($(this).find('.title-text ').html());
			if(money){
				$(this).find('.title').show();
			}
			$(this).css('background','url(images/gameTm1-hover.png) '+(-70*index)+'px -296px no-repeat');
			var numArr = $(this).attr('animalnum').split('|');
			for (var i=0;i < numArr.length ;i++ )
			{
				$('.tmItem ').eq(numArr[i]-1).css('background','url(images/gameTm1-hover.png) no-repeat');
			}
		},function(){
			$(this).find('.title').hide();
			$(this).css('background','');
			$('.tmItem ').css('background','');
		});
		//彩波
		$('.row3_large').mousedown(function(ev){
			addChip($(this),ev);
		});
		$('.row3_large').hover(function(){
			var numArr = $(this).attr('animalnum').split('|');
			var money = parseInt($(this).find('.title-text ').html());
			if(money){
				$(this).find('.title').show();
			}
			for (var i=0;i < numArr.length ;i++ )
			{
				$('.tmItem ').eq(numArr[i]-1).css('background','url(images/gameTm1-hover.png) no-repeat');
			}
		},function(){
			$(this).find('.title').hide();
			$(this).css('background','');
			$('.tmItem ').css('background','');
		});
		/**********************************************************************/
		//table two 
		//尾数

		$('.wsItem').mousedown(function(ev){
			addChip($(this),ev);
		});
		$('.wsItem').hover(function(){
			var money = parseInt($(this).find('.title-text ').html());
			if(money){
				$(this).find('.title').show();
			}
		},function(){
			$(this).find('.title').hide();
		});
		//单双
		$('.dsItem').mousedown(function(ev){
			addChip($(this),ev);
		});
		$('.dsItem').hover(function(){
			var money = parseInt($(this).find('.title-text ').html());
			if(money){
				$(this).find('.title').show();
			}
		},function(){
			$(this).find('.title').hide();
		});
		//大小
		$('.bsItem').mousedown(function(ev){
			addChip($(this),ev);
		});
		$('.bsItem').hover(function(){
			var money = parseInt($(this).find('.title-text ').html());
			if(money){
				$(this).find('.title').show();
			}
		},function(){
			$(this).find('.title').hide();
		});
		/**************************************************************************/
		//table three
		// 正码
		$('.zmItem').mousedown(function(ev){
			addChip($(this),ev);
		});

		$('.zmItem').hover(function(){
			var money = parseInt($(this).find('.title-text ').html());
			if(money){
				$(this).find('.title').show();
			}
		},function(){
			$(this).find('.title').hide();
		});
		//大小单双
		$('.dxdsItem').mousedown(function(ev){
			addChip($(this),ev);
		});
		$('.dxdsItem').hover(function(){
			var money = parseInt($(this).find('.title-text ').html());
			if(money){
				$(this).find('.title').show();
			}
		},function(){
			$(this).find('.title').hide();
		});
		// 确认出款
		$('.option-btn-confirm').click(function(){
			//投注有效
			if(chipArr.length){
				var oParent,money,chipText,num;
				var $tbody = $(".page-body-right table tbody");
				$tbody.html("");
				$(".page-body-right table").css('top','0px');
				$('.page-money-sum').html($('.option-money-pour').html());
				$('.page-title-issue').html($('.record-issue').html());
				/*
				var newArr = unique(chipArr).sort(function(a,b){
					console.log(b.parent().width()-a.parent().
					width())
					return a.parent().width()-b.parent().width();
				});
				record-issue
				*/
				var uniqueArr = unique(chipArr);
				//添加投注详情
				uniqueArr.forEach(function(chip,inedex){
					oParent = $(chip).parent();
					money = parseInt(oParent.find('.title-text').html());
					chipText = oParent.attr("chip-text");
					num =  oParent.attr('date-type');
					if(num){
						num =num+'号，';
					}else{
						num = '';
					}
					$tbody.append("<tr><td>【"+chipText+"】投注："+num+money+"元<td></tr>");
				});
				//滚动条高度设置
				openTep($(".page-body-right"),uniqueArr.length);
				// layer  弹出 投注详情
				var confirmLayer = layer.open({
					type: 1,
					title:0,
					closeBtn: 0, //不显示关闭按钮
					area: ['606px', '263px'],
					content: $(".chip-confirm")
				});
				$('.chip-confirm .page-option-cancel').click(function(){
					// layuiAuto($(".chip-confirm"));
					// $('.chip-confirm .page-scallBar').hide();
					layer.close(confirmLayer);
				});
			}else{
				//投注无效
				invalidChip()
			}
		});
		


		//点击追号  生成追号表单  
		$('.option-btn-zhuihao').click(function(){
			if(chipArr.length){
				var html = '',row = 30;
				var $body = $('.zhuihao-content-body tbody');
				// 初始化table
				$body.html("");
				$body.parent().css('top','0px');
				//获取当前期数
				var record = parseInt($('.record-date').html());
				// 获取当天投注总金额 ， 
				var money =  parseInt($('.option-money-pour').html());
				for (var i=1;i <= row ;i++ )
				{
					html+="<tr>"+
								"<td class='body-num'>"+i+"</td>"+
								"<td class='body-select'><input type='checkbox'></td>"+
								"<td class='body-periods'>"+(record+i)+"</td>"+
								"<td class='body-money'>"+
									"<div class='add-btn money-btn'></div>"+
									"￥"+
									"<span class='add-money'>"+money+"</span>"+
									".00"+
									"<div class='minus-btn money-btn'></div>"+
								"</td>"+
								"<td class='body-time'>2017-04-11 04:46:25</td>"+
							"</tr>"
				}
				$body.append(html);
				//滚动条高度设置
				openTep($('.zhuihao-content-body'),row);
				// layer 弹出
				var zhuihaoLayer = layer.open({
					type: 1,
					title:0,
					closeBtn: 0, //不显示关闭按钮
					area: ['606px', '506px'],
					content: $(".chip-zhuihao")
				});
				//追号 close
				$('.chip-zhuihao .zhuihao-option-cancel').click(function(){
					layer.close(zhuihaoLayer);
				});
			}else{
				invalidChip();
			}
		});
		
		// 查看完整走势  layer 弹出
		$('.MarkSix-top-newOpen .newOpen-show-more').click(function(){
			openTep($('.moreList-body-histroy'),50);
			var moreListLayer = layer.open({
				type: 1,
				title:0,
				closeBtn: 0, //不显示关闭按钮
				area: ['606px', '506px'],
				content: $(".chip-moreList")
			});
			$('.chip-moreList .moreList-close').click(function(){

				layer.close(moreListLayer);
			});
		});
		
		//查看投注记录弹出
		$('.record-show-body').on('click','.record-look-exp',function(){
			var singleNodeLayer = layer.open({
				type: 1,
				title:0,
				closeBtn: 0, //不显示关闭按钮
				area: ['606px', '506px'],
				content: $(".chip-singleNode")
			});
			$('.chip-singleNode .singleNode-close').click(function(){
				layer.close(singleNodeLayer);
			});
		})
		
	
		/*************************************************************************************************************/
		// 滚动条高度设置 封装
		function openTep($body,row){
			// td的真实高度 =  td高度 + 1边框
			var chrHeight = parseInt($body.find('tr').css('border-bottom-width')) + $body.find('td').height();
			var opH = $body.height();
			var diff = opH/(row * chrHeight );
			//初始化滚动条高度  ， 如果 当前高度大于了 外层容器高度，显示滚动条 ，
			if(diff < 1){
				$body.find('.page-scallBar').css('height',opH+'px').show();
				$body.find(".page-scallBar-dragBar").css({
					'top':'0',
					'height':diff*$body.height()+'px'
				});
			}
		}
		//无效投注 弹出layer 
		function invalidChip(){
			clearInterval(timer);
			var tiplayer = layer.open({
				type: 1,
				title:0,
				closeBtn: 0, //不显示关闭按钮
				area: ['366px', '156px'],
				content: $(".confirm-tip")
			});
			var timer = setTimeout(function(){
				layer.close(tiplayer);
			},2000);
		}
		
		//chipArr数组去重
		function unique(arr){
			var newArr = [],json = {};
			for(var i=0;i < arr.length;i++)
			{
				var className = arr[i].parent().attr('class');
				if(!json[className]){
					newArr.push(arr[i]);
					json[className] =1;
				}
			}
			return newArr;
		};
	})();

	// 追号的函数
	(function(){
		// 追号倍数增减开关  true 增加  false 减少
		var mark;
		//单行追号倍数 金额 ++ 
		$('.zhuihao-content-body').on('click','.add-btn',function(){
			mark =true;
			addOrminus($(this),mark)
		});
		//单期追号倍数 金额 -- 
		$('.zhuihao-content-body').on('click','.minus-btn',function(){
			mark =false;
			addOrminus($(this),mark);
		});
		// 追号倍数 加减
		function addOrminus(This,mark){
			var addMoney = This.parent().find('.add-money');
			var checkState = This.parent().parent().find('input[type="checkbox"]')[0].checked;
			//追号基础金额
			var baseMoney = parseInt($('.option-money-pour').html());
			// 追号总金额
			var moneySum = parseInt($('.zhuihao-info-money').html());
			//单期金额
			var money = parseInt(addMoney.html());
			if(mark){
				// checkbox == true  单期倍数增加，追号总金额跟着变化
				if(checkState){
					moneySum += baseMoney;
					var moneySum = $('.zhuihao-info-money').html(moneySum);
				}
				// 单期倍数增加
				money += baseMoney;
			}else{
				//不能小于基础金额
				if(money > baseMoney){
					// checkbox == false  单期倍数减少，追号总金额跟着变化
					if(checkState){
						moneySum -= baseMoney;
						var moneySum = $('.zhuihao-info-money').html(moneySum);
					}	
					// 单期倍数减少
					money -= baseMoney;
				}
			}
			addMoney.html(money);
		}
		// 追号 checkbox 选中期数
		$('.zhuihao-content-body').on('change','input[type="checkbox"]',function(){
			var falg = 0;
			var moneySum =0;
			$(".zhuihao-content-body input[type='checkbox']").each(function(i){
				if ($(this)[0].checked) { 
					falg += 1; 
					moneySum += parseInt($('.add-money').eq(i).html());
				} 
			});
			$('.zhuihao-info-periods').html(falg);
			$('.zhuihao-info-money').html(moneySum);
		});
	})();
	//滚动条 事件
	(function (){
		var _y,mark = false;
		//滚动长度
		var scrollLenght = 100;
		//确认投注 滚动条拖拽
		$(".page-body-right .page-scallBar-dragBar").on('mousedown',dragBarMove);
		//追号 滚动条拖拽
		$(".zhuihao-content-body .page-scallBar-dragBar").on('mousedown',dragBarMove);
		//投注记录 滚动条拖拽
		$(".record-show-body .page-scallBar-dragBar").on('mousedown',dragBarMove);
		//查看完整走势 滚动条拖拽
		$(".moreList-body-histroy .page-scallBar-dragBar").on('mousedown',dragBarMove);

		// 滚动条拖拽封装  
		function dragBarMove(ev){
			ev = ev || window.event;
			ev.stopPropagation(); 
			var controlDom = $(this).parent().prev();
			var top = $(this).position().top;
			var opH = $(this).parent().height(),
				oH =$(this).height();
			var maxH = opH - oH;
			var This = $(this);
			_y = ev.pageY;
			mark = true;
			$(document).bind('mousemove',function(ev){
				if(mark){
					var y = ev.pageY - _y + top;
					if(y  < 0){
						y = 0;
					}else if(y > maxH){
						y = maxH;
					}
					var n = opH *(y/ oH);
					This.css('top',y+'px');
					controlDom.css('top',-n+'px');
				}
			});
			
			$(document).mouseup(function(){
				$(this).unbind('mousemove');
				mark = false;
				return false;
			});
		}
		//滑轮滚动封装  
		function scrollFun(ev){
				ev = ev || window.event;
				ev.preventDefault();
				var $dragBar = $(this).find('.page-scallBar-dragBar');
				var oP = $(this).find('table tbody tr');
				var scrollTop = -parseInt($(this).find('table').css('top'));
			
				var oHei =  $(this).height();
				// 滚动部分减外层容器的差值
				var topDiff = oP.length * oP. outerHeight() - oHei - 2;
				//  设定最大滚动次数 = 差值/每次滚动的距离（100）
				var max = Math.ceil(topDiff/scrollLenght);
				// mousewheel兼容  Firefox：event.detail   其他： event.wheelDelta
				var type = ev.type;
				if (type == 'DOMMouseScroll' || type == 'mousewheel') {
					ev.delta = (ev.wheelDelta) ? ev.wheelDelta / 120 : -(ev.detail || 0) / 3;
				}
				// event.delta = 1 向上滚， event.delta = -1 向下滚
				if(ev.delta > 0){
					//向上滚动 最小滚动距离
					
					if(scrollTop < scrollLenght){
						scrollTop = 0;
					}else if(scrollTop > 0){
						scrollTop -=scrollLenght;
					}
					
				}else{
					//向下滚动  设置最大距离
				
					//如果大于 限定的最大滚动距离 = 最大滚动距离（topDiff）
					if((topDiff - scrollTop) < scrollLenght){
						scrollTop = topDiff
					}else if(scrollTop < topDiff ){
						scrollTop +=scrollLenght;
					}
				}
				$(this).find('table').css('top',-scrollTop+'px');
				//计算滚动条的滚动距离
				var n = (scrollTop/oHei)*$dragBar.height();
				$dragBar.css('top',n+'px');
		}
		// 滚动兼容    FireFox : DOMMouseScroll  ,其他：onmousewheel
		 if (document.addEventListener) { 
			$(".page-body-right")[0].addEventListener('DOMMouseScroll',scrollFun, false); 
			$('.zhuihao-content-body')[0].addEventListener('DOMMouseScroll',scrollFun,false);
			$('.moreList-body-histroy')[0].addEventListener('DOMMouseScroll',scrollFun, false);
			$('.record-show-body')[0].addEventListener('DOMMouseScroll',scrollFun, false);
		 }//W3C  FireFox
			$(".page-body-right")[0].onmousewheel = scrollFun;  //IE/Opera/Chrome/Safari  
			$('.zhuihao-content-body')[0].onmousewheel = scrollFun;
			$('.moreList-body-histroy')[0].onmousewheel = scrollFun;
			$('.record-show-body')[0].onmousewheel = scrollFun;
	})();
	// chip 拖拽
	(function (){
		/*
		var x_,y_,This;
		$('.option-weight-hide .chip').mousedown(function(ev){
			var ev = ev || window.event;
			This = $(this);
			$(this).attr('draggable',true);			
			var pos = $(this).position();
			_x=ev.pageX - pos.left; 
			_y=ev.pageY - pos.top; 
			$('body').bind('mousemove',function(ev){
				if(This.attr('draggable')){
				var x = ev.pageX - _x;
				var y = ev.pageY - _y;
				var tVal = This.attr('chip-value');
				var clone = This.clone(true);
				clone.addClass('chip-move');
				clone.css({
					top: pos.top + 'px',
					left:pos.left + 'px'
				});
				$('.option-weight-hide').append(clone);	
				$('.chip-move').css({
					top:y + 'px',
					left:x + 'px',
				});

				$('.hide-main .chip').each(function(i){
					var oLeft = $(this).position().left,
						oTop = $(this).position().top,
						oWidth = $(this).width() +2 ,
						oHeight = $(this).height();
					var val = $(this).attr('chip-value');
					if( val != tVal ){
						//从左往右
						if( (x < oLeft && x > oLeft - oWidth/2 && y < oTop + oHeight/2 && y > oTop - oHeight/2)   ){
							$('.hide-main .chip').eq(i).after(This);
						//从右往左
						}else if((x < oLeft + oWidth/2 && x > oLeft && y < oTop+ oHeight/2 && y > oTop - oHeight/2)){
							$('.hide-main .chip').eq(i).before(This);
						}
					}
				});
				}
			});
		}).mouseup(function(){
			$('body').unbind('mousemove');
			$('.chip-move').remove();
			$(this).addClass('select-active').siblings().removeClass('select-active');
		});
		*/
		var x_,y_,This;
		var oChip = $('.option-weight-hide .chip');
		for (var i= 0;i < oChip.length ;i++ )
		{
			oChip[i].onmousedown = function(){
				$(this).attr('draggable',true);
			}
			oChip[i].ondragstart = function(ev){
				$(this).attr('draggable',true);
				var ev = ev || window.event;
				var pos = $(this).position();
				_x=ev.pageX - pos.left; 
				_y=ev.pageY - pos.top; 
				This = this;
			}
			oChip[i].ondragover = function(ev){
				var ev = ev || window.event;
				ev.preventDefault();
				var x = ev.pageX - _x
				var y = ev.pageY - _y;
				var tVal = $(this).attr('chip-value');
				//基本原理：当前拖拽的chip进入一下筹码一半位置时替换
				//循环chip 计算每一个筹码的触发替换的位置 ，然后进行判断
				$('.hide-main .chip').each(function(i){
					var oLeft = $(this).position().left,
						oTop = $(this).position().top,
						oWidth = $(this).width() +2 ,
						oHeight = $(this).height();
					//从左往右在目标元素的后面添加拖拽元素
					if( x < oLeft && x > oLeft - oWidth/2 && y < oTop + oHeight/2 && y > oTop - oHeight/2){
						$('.hide-main .chip').eq(i).after(This);
						
					//从右往左在目标元素的前面添加拖拽元素
					}else if(x < oLeft + oWidth/2 && x > oLeft && y < oTop+ oHeight/2 && y > oTop - oHeight/2){
						$('.hide-main .chip').eq(i).before(This);
					}
				});
			}	
			oChip[i].ondragend = function(){
				$(this).attr('draggable',false);
			}
			oChip[i].onmouseup  = function(){
				//更多筹码 — chip选择
				$(this).addClass('select-active').siblings().removeClass('select-active');
				$(this).attr('draggable',false);
			}
		}
		
	})();
})();
