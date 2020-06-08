
/**
 * 此处js专门生成jcz共同数据(每次添加一个方法  在此处写好注释信息)
 * 其中方法包含
 * 	1.选号方法chooseNumber();
 * 	2.筛选赛事方法showShuaixuan();
 *  clearDiv()  关闭层的方法
	updateSelectedHTML()  给选中的对阵生成html方法
	updateBs()  修改倍数方法
	updateInfo()修改总购买金额  修改总注数  修改最大奖金
	isDisplayByDate()  根据日期显示对阵
	getMatchName()  把对阵编号转换成为"周一001"
	计算最大奖金代码块
 * 
 * */
var comm = {};
comm.GuoGuanPattern = {
	'单关' : {
		'n' : 1,
		'm' : 1,
		'ename' : 'r1c1'
	},
	'2串1' : {
		'n' : 2,
		'm' : 1,
		'ename' : 'r2c1'
	},
	'3串1' : {
		'n' : 3,
		'm' : 1,
		'ename' : 'r3c1'
	},
	'3串3' : {
		'n' : 3,
		'm' : 3,
		'ename' : 'r3c3'
	},
	'3串4' : {
		'n' : 3,
		'm' : 4,
		'ename' : 'r3c4'
	},
	'4串1' : {
		'n' : 4,
		'm' : 1,
		'ename' : 'r4c1'
	},
	'4串4' : {
		'n' : 4,
		'm' : 4,
		'ename' : 'r4c4'
	},
	'4串5' : {
		'n' : 4,
		'm' : 5,
		'ename' : 'r4c5'
	},
	'4串6' : {
		'n' : 4,
		'm' : 6,
		'ename' : 'r4c6'
	},
	'4串11' : {
		'n' : 4,
		'm' : 11,
		'ename' : 'r4c11'
	},
	'5串1' : {
		'n' : 5,
		'm' : 1,
		'ename' : 'r5c1'
	},
	'5串6' : {
		'n' : 5,
		'm' : 6,
		'ename' : 'r5c6'
	},
	'5串16' : {
		'n' : 5,
		'm' : 16,
		'ename' : 'r5c16'
	},
	'5串20' : {
		'n' : 5,
		'm' : 20,
		'ename' : 'r5c20'
	},
	'5串26' : {
		'n' : 5,
		'm' : 26,
		'ename' : 'r5c26'
	},
	'6串1' : {
		'n' : 6,
		'm' : 1,
		'ename' : 'r6c1'
	},
	'6串6' : {
		'n' : 6,
		'm' : 6,
		'ename' : 'r6c6'
	},
	'6串7' : {
		'n' : 6,
		'm' : 7,
		'ename' : 'r6c7'
	},
	'6串15' : {
		'n' : 6,
		'm' : 15,
		'ename' : 'r6c15'
	},
	'6串20' : {
		'n' : 6,
		'm' : 20,
		'ename' : 'r6c20'
	},
	'6串22' : {
		'n' : 6,
		'm' : 22,
		'ename' : 'r6c22'
	},
	'6串35' : {
		'n' : 6,
		'm' : 35,
		'ename' : 'r6c35'
	},
	'6串42' : {
		'n' : 6,
		'm' : 42,
		'ename' : 'r6c42'
	},
	'6串50' : {
		'n' : 6,
		'm' : 50,
		'ename' : 'r6c50'
	},
	'6串57' : {
		'n' : 6,
		'm' : 57,
		'ename' : 'r6c57'
	},
	'7串1' : {
		'n' : 7,
		'm' : 1,
		'ename' : 'r7c1'
	},
	'7串7' : {
		'n' : 7,
		'm' : 7,
		'ename' : 'r7c7'
	},
	'7串8' : {
		'n' : 7,
		'm' : 8,
		'ename' : 'r7c8'
	},
	'7串21' : {
		'n' : 7,
		'm' : 21,
		'ename' : 'r7c21'
	},
	'7串35' : {
		'n' : 7,
		'm' : 35,
		'ename' : 'r7c35'
	},
	'7串120' : {
		'n' : 7,
		'm' : 120,
		'ename' : 'r7c120'
	},
	'8串1' : {
		'n' : 8,
		'm' : 1,
		'ename' : 'r8c1'
	},
	'8串8' : {
		'n' : 8,
		'm' : 8,
		'ename' : 'r8c8'
	},
	'8串9' : {
		'n' : 8,
		'm' : 9,
		'ename' : 'r8c9'
	},
	'8串28' : {
		'n' : 8,
		'm' : 28,
		'ename' : 'r8c28'
	},
	'8串56' : {
		'n' : 8,
		'm' : 56,
		'ename' : 'r8c56'
	},
	'8串70' : {
		'n' : 8,
		'm' : 70,
		'ename' : 'r8c70'
	},
	'8串247' : {
		'n' : 8,
		'm' : 247,
		'ename' : 'r8c247'
	}
};
comm.type2nm = {
		  '单关': {
		    'n': 1,
		    'm': 1
		  },
		  '2串1': {
		    'n': 2,
		    'm': 1
		  },
		  '3串1': {
		    'n': 3,
		    'm': 1
		  },
		  '4串1': {
		    'n': 4,
		    'm': 1
		  },
		  '5串1': {
		    'n': 5,
		    'm': 1
		  },
		  '6串1': {
		    'n': 6,
		    'm': 1
		  },
		  '7串1': {
		    'n': 7,
		    'm': 1
		  },
		  '8串1': {
		    'n': 8,
		    'm': 1
		  },
		  '3串3': {
		    'n': 3,
		    'm': 3
		  },
		  '3串4': {
		    'n': 3,
		    'm': 4
		  },
		  '4串6': {
		    'n': 4,
		    'm': 6
		  },
		  '4串11': {
		    'n': 4,
		    'm': 11
		  },
		  '5串10': {
		    'n': 5,
		    'm': 10
		  },
		  '5串20': {
		    'n': 5,
		    'm': 20
		  },
		  '5串26': {
		    'n': 5,
		    'm': 26
		  },
		  '6串15': {
		    'n': 6,
		    'm': 15
		  },
		  '6串35': {
		    'n': 6,
		    'm': 35
		  },
		  '6串50': {
		    'n': 6,
		    'm': 50
		  },
		  '6串57': {
		    'n': 6,
		    'm': 57
		  },
		  '4串4': {
		    'n': 4,
		    'm': 4
		  },
		  '4串5': {
		    'n': 4,
		    'm': 5
		  },
		  '5串16': {
		    'n': 5,
		    'm': 16
		  },
		  '6串20': {
		    'n': 6,
		    'm': 20
		  },
		  '6串42': {
		    'n': 6,
		    'm': 42
		  },
		  '5串5': {
		    'n': 5,
		    'm': 5
		  },
		  '5串6': {
		    'n': 5,
		    'm': 6
		  },
		  '6串22': {
		    'n': 6,
		    'm': 22
		  },
		  '6串6': {
		    'n': 6,
		    'm': 6
		  },
		  '6串7': {
		    'n': 6,
		    'm': 7
		  },
		  '7串7': {
		    'n': 7,
		    'm': 7
		  },
		  '7串8': {
		    'n': 7,
		    'm': 8
		  },
		  '7串21': {
		    'n': 7,
		    'm': 21
		  },
		  '7串35': {
		    'n': 7,
		    'm': 35
		  },
		  '7串120': {
		    'n': 7,
		    'm': 120
		  },
		  '8串8': {
		    'n': 8,
		    'm': 8
		  },
		  '8串9': {
		    'n': 8,
		    'm': 9
		  },
		  '8串28': {
		    'n': 8,
		    'm': 28
		  },
		  '8串56': {
		    'n': 8,
		    'm': 56
		  },
		  '8串70': {
		    'n': 8,
		    'm': 70
		  },
		  '8串247': {
		    'n': 8,
		    'm': 247
		  }
		};
comm.SplitMap = {
	'单关' : {
		'单关' : 1
	},
	'2串1' : {
		'2串1' : 1
	},
	'3串1' : {
		'3串1' : 1
	},
	'4串1' : {
		'4串1' : 1
	},
	'5串1' : {
		'5串1' : 1
	},
	'6串1' : {
		'6串1' : 1
	},
	'7串1' : {
		'7串1' : 1
	},
	'8串1' : {
		'8串1' : 1
	},
	'3串3' : {
		'2串1' : 3
	},
	'3串4' : {
		'3串1' : 1,
		'2串1' : 3
	},
	'4串6' : {
		'2串1' : 6
	},
	'4串11' : {
		'4串1' : 1,
		'3串1' : 4,
		'2串1' : 6
	},
	'5串10' : {
		'2串1' : 10
	},
	'5串20' : {
		'2串1' : 10,
		'3串1' : 10
	},
	'5串26' : {
		'5串1' : 1,
		'4串1' : 5,
		'3串1' : 10,
		'2串1' : 10
	},
	'6串15' : {
		'2串1' : 15
	},
	'6串35' : {
		'2串1' : 15,
		'3串1' : 20
	},
	'6串50' : {
		'2串1' : 15,
		'3串1' : 20,
		'4串1' : 15
	},
	'6串57' : {
		'6串1' : 1,
		'5串1' : 6,
		'4串1' : 15,
		'3串1' : 20,
		'2串1' : 15
	},
	'4串4' : {
		'3串1' : 4
	},
	'4串5' : {
		'4串1' : 1,
		'3串1' : 4
	},
	'5串16' : {
		'5串1' : 1,
		'4串1' : 5,
		'3串1' : 10
	},
	'6串20' : {
		'3串1' : 20
	},
	'6串42' : {
		'6串1' : 1,
		'5串1' : 6,
		'4串1' : 15,
		'3串1' : 20
	},
	'5串5' : {
		'4串1' : 5
	},
	'5串6' : {
		'5串1' : 1,
		'4串1' : 5
	},
	'6串22' : {
		'6串1' : 1,
		'5串1' : 6,
		'4串1' : 15
	},
	'6串6' : {
		'5串1' : 6
	},
	'6串7' : {
		'6串1' : 1,
		'5串1' : 6
	},
	'7串7' : {
		'6串1' : 7
	},
	'7串8' : {
		'6串1' : 7,
		'7串1' : 1
	},
	'7串21' : {
		'5串1' : 21
	},
	'7串35' : {
		'4串1' : 35
	},
	'7串120' : {
		'2串1' : 21,
		'3串1' : 35,
		'4串1' : 35,
		'5串1' : 21,
		'6串1' : 7,
		'7串1' : 1
	},
	'8串8' : {
		'7串1' : 8
	},
	'8串9' : {
		'7串1' : 8,
		'8串1' : 1
	},
	'8串28' : {
		'6串1' : 28
	},
	'8串56' : {
		'5串1' : 56
	},
	'8串70' : {
		'4串1' : 70
	},
	'8串247' : {
		'2串1' : 28,
		'3串1' : 56,
		'4串1' : 70,
		'5串1' : 56,
		'6串1' : 28,
		'7串1' : 8,
		'8串1' : 1
	}
};
comm.optionKeys = {
	'9005_3' : '胜',
	'9005_1' : '平',
	'9005_0' : '负',
	'9001_3' : '[-1]胜',
	'9001_1' : '[-1]平',
	'9001_0' : '[-1]负',
	'9002_0' : '0',
	'9002_1' : '1',
	'9002_2' : '2',
	'9002_3' : '3',
	'9002_4' : '4',
	'9002_5' : '5',
	'9002_6' : '6',
	'9002_7' : '7',
	'9005_3' : '胜',
	'9005_1' : '平',
	'9005_0' : '负',
	'9001_3' : '[-1]胜',
	'9001_1' : '[-1]平',
	'9001_0' : '[-1]负',
	"9003_90" : "胜其它",
	"9003_10" : "1:0",
	"9003_20" : "2:0",
	"9003_21" : "2:1",
	"9003_30" : "3:0",
	"9003_31" : "3:1",
	"9003_32" : "3:2",
	"9003_40" : "4:0",
	"9003_41" : "4:1",
	"9003_42" : "4:2",
	"9003_50" : "5:0",
	"9003_51" : "5:1",
	"9003_52" : "5:2",
	"9003_99" : "平其它",
	"9003_00" : "0:0",
	"9003_11" : "1:1",
	"9003_22" : "2:2",
	"9003_33" : "3:3",
	"9003_09" : "负其它",
	"9003_01" : "0:1",
	"9003_02" : "0:2",
	"9003_12" : "1:2",
	"9003_03" : "0:3",
	"9003_13" : "1:3",
	"9003_23" : "2:3",
	"9003_04" : "0:4",
	"9003_14" : "1:4",
	"9003_24" : "2:4",
	"9003_05" : "0:5",
	"9003_15" : "1:5",
	"9003_25" : "2:5",
	"9004_33" : "胜胜",
	"9004_31" : "胜平",
	"9004_30" : "胜负",
	"9004_13" : "平胜",
	"9004_11" : "平平",
	"9004_10" : "平负",
	"9004_03" : "负胜",
	"9004_01" : "负平",
	"9004_00" : "负负"
};
comm.ggm2num = {
		  '单关': [1],
		  '2串1': [2],
		  '2串3': [2, 1],
		  '3串1': [3],
		  '3串3': [2],
		  '3串4': [3, 2],
		  '3串7': [3, 2, 1],
		  '4串1': [4],
		  '4串4': [3],
		  '4串5': [4, 3],
		  '4串6': [2],
		  '4串11': [4, 3, 2],
		  '4串15': [4, 3, 2, 1],
		  '5串1': [5],
		  '5串5': [4],
		  '5串6': [5, 4],
		  '5串10': [2],
		  '5串16': [5, 4, 3],
		  '5串20': [3, 2],
		  '5串26': [5, 4, 3, 2],
		  '5串31': [5, 4, 3, 2, 1],
		  '6串1': [6],
		  '6串6': [5],
		  '6串7': [6, 5],
		  '6串15': [2],
		  '6串20': [3],
		  '6串22': [6, 5, 4],
		  '6串35': [3, 2],
		  '6串42': [6, 5, 4, 3],
		  '6串50': [4, 3, 2],
		  '6串57': [6, 5, 4, 3, 2],
		  '6串63': [6, 5, 4, 3, 2, 1],
		  '7串1': [7],
		  '8串1': [8],
		  '9串1': [9],
		  '10串1': [10],
		  '11串1': [11],
		  '12串1': [12],
		  '13串1': [13],
		  '14串1': [14],
		  '15串1': [15],
		  '7串7': [6],
		  '7串8': [7, 6],
		  '7串21': [5],
		  '7串35': [4],
		  '7串120': [7, 6, 5, 4, 3, 2],
		  '8串8': [7],
		  '8串9': [8, 7],
		  '8串28': [6],
		  '8串56': [5],
		  '8串70': [4],
		  '8串247': [8, 7, 6, 5, 4, 3, 2]
		};
$(document).ready(function() {
	if(index.playId!=9006){
		$("#danyiPlay").remove();
	}
	// 显示隐藏筛选
	$("#saix").click(function() {
		comm.showShuaixuan();
	});
	// 给筛选的的列表里面赋值
	//var a = document.getElementById("lsDiv").innerHTML;
	//document.getElementById("lgList").innerHTML = a;
	
	//id="selectAll"id="unsele"
	//筛选赛事全选
	$("#selectAll").click(function(){
		$("#lgList").find(".clickLba").each(function(){
			if(!$(this).hasClass("clickLbb")){
				$(this).addClass("clickLbb");
			}
		});
		$("p[name='leagueNameP']").parent().parent().css("display","");
	});
	//筛选赛事反选
	$("#unsele").click(function(){
		$("#lgList").find(".clickLba").each(function(){
			if(!$(this).hasClass("clickLbb")){
				$(this).addClass("clickLbb");
				var leagName=$(this).attr("m");
				$("p[name='leagueNameP']").each(function(i,o){
					if($.trim($(o).html())==leagName){
						$(o).parent().parent().css("display","");
					}
				});
			}else{
				$(this).removeClass("clickLbb");
				var leagName=$(this).attr("m");
				$("p[name='leagueNameP']").each(function(i,o){
					if($.trim($(o).html())==leagName){
						$(o).parent().parent().css("display","none");
					}
				});
			}
		});
	});
});

//全选
function selectAll(){
	$("#lgList").find("a[mark='selp']").each(function(){
		if(!$(this).hasClass("clickLbb")){
			$(this).addClass("clickLbb");
		}
	});
	$("p[name='leagueNameP']").parent().parent().css("display","");
}

//返选
function unselect(){
	$("#lgList").find("a[mark='selp']").each(function(){
		if(!$(this).hasClass("clickLbb")){
			$(this).addClass("clickLbb");
			var leagName=$(this).attr("m");
			$("p[name='leagueNameP']").each(function(i,o){
				if($.trim($(o).html())==leagName){
					$(o).parent().parent().css("display","");
				}
			});
		}else{
			$(this).removeClass("clickLbb");
			var leagName=$(this).attr("m");
			$("p[name='leagueNameP']").each(function(i,o){
				if($.trim($(o).html())==leagName){
					$(o).parent().parent().css("display","none");
				}
			});
		}
	});
}
//筛选赛事单点
function shaiXuan(obj){
	if($(obj).hasClass("clickLbb")){
		$(obj).removeClass("clickLbb");
		var leagName=$(obj).attr("m");
		$("p[name='leagueNameP']").each(function(i,o){
			if($.trim($(o).html())==leagName){
				$(o).parent().parent().css("display","none");
			}
		});
	}else{
		$(obj).addClass("clickLbb");
		var leagName=$(obj).attr("m");
		$("p[name='leagueNameP']").each(function(i,o){
			if($.trim($(o).html())==leagName){
				$(o).parent().parent().css("display","");
			}
		});
	}
}
comm.showShuaixuan = function() {
	var disval = $("#ssblist").css("display");
	if (disval == "none") {
		$("#ssblist").css("display", "");
	} else {
		$("#ssblist").css("display", "none");
	}
};


comm.getMatchName = function(num) {
	var dic = {
		1 : '周一',
		2 : '周二',
		3 : '周三',
		4 : '周四',
		5 : '周五',
		6 : '周六',
		7 : '周日'
	};
	if (num && num.length == 4) {
		return num.replace(/([1-7])\d{3}/gi, function(match) {
			return dic[match.charAt(0)] + match.substring(1);
		});
	}
	return num;
};

comm.isDisplayByDate = function() {
	$(".titc").click(function() {
		var spanClass = $(this).find(".fr").find("span").attr("class");
		if (spanClass == "Frbox") {
			$(this).parent().find(".infobox").css("display", "");
			$(this).find(".fr").find("span").attr("class", "Frboxup");
		} else if (spanClass == "Frboxup") {
			$(this).parent().find(".infobox").css("display", "none");
			$(this).find(".fr").find("span").attr("class", "Frbox");
		}
	});
};


function clearDiv(id){
	$("#"+id).css("display",'none');
}

/*
 * 计算最大预测奖金
 * @param:maxSp ,array,存放每场投注的最大赔率
 * @param:ggNam,string,"N串M"
 * @param:danSp,array,胆码的最大赔率
 * @param String new_round 是否采用4舍6入5进双规则
 * @return Number 最大奖金
 * */
comm.predictMaxPrize=function(data){
	 var gg_name = index.ggType, d = [], max_pl=[];
	 data.each(function (o){
	 if (o.dan&&o.dan==1) {
		 d.push(+o.maxSP);//胆pl
	 }else{
		 max_pl.push(+o.maxSP);
	 }
	 });
	 gg_name = typeof gg_name == 'string' ? gg_name : (gg_name ? gg_name.join(',') : false);
	 if (!max_pl.length || !gg_name) {
	 return 0;
	 } else {
	 var pz =comm._predictMaxPrize(max_pl, gg_name, d);//(msg, t, type, d)
	 return pz;
	 } 
};

/*
* 计算最大预测奖金
* @param:maxSp ,array,存放每场投注的最大赔率
* @param:ggNam,string,"N串M"
* @param:danSp,array,胆码的最大赔率
* @param String new_round 是否采用4舍6入5进双规则
* @return Number 最大奖金
* */
comm._predictMaxPrize=function(maxSp, ggName, danSp, new_round) {
	var maxPprize = 0, hasDan = danSp && danSp.length > 0;
	var sum=0;
	index.maxTuoSPs=[];
	if (ggName == '单关' ) {//浮动单关
			maxPprize = maxSp.reduce( function(a,b){return a+b;} );
	} else if (/串1$/.test(ggName) || (ggName == '单关' )) { //自由
			ggName = ggName.split(',');
			ggName.each( function(_ggName) {
					var _n = parseInt(_ggName)||1;
					var maxSps=maxGroupSP(index.gameList);
					//if(hasDan){
					index.maxDanSPs=[];
					index.maxTuoSPs=[];
						for(var i=0,j=index.gameList.length;i<j;i++){
							if(index.gameList[i].dan==1){
								index.maxDanSPs.push(maxSps[i]);
							}else{
								index.maxTuoSPs.push(maxSps[i]);
							}
						}
						Math.ck(index.maxTuoSPs, _n-index.maxDanSPs.length).each( function(sp){
							var lsSums=[];
								sp=index.maxDanSPs.concat(sp);
								for(var kk=0,jjjj=sp.length;kk<jjjj;kk++){
									var lssum=0;
									for(var iii=0,jjj=sp[kk].length;iii<jjj;iii++){
										lssum+=sp[kk][iii]*1;
									}
									lsSums.push(lssum);
								}
						maxPprize += parseFloat(lsSums.reduce( function(a,b){return (a*10000)*(b*10000)/100000000;}));
						});
//					}else{
//						Math.ck(maxSps, _n).each( function(sp){
//							var lsSums=[];
//							for(var kk=0,jj=sp.length;kk<jj;kk++){
//								var lssum=0;
//								for(var iii=0,jjj=sp[kk].length;iii<jjj;iii++){
//									lssum+=sp[kk][iii]*1;
//								}
//								lsSums.push(lssum);
//							}
//							maxPprize += parseFloat(lsSums.reduce( function(a,b){return (a*10000)*(b*10000)/100000000;}));
//						});
//					}
			});
	} else { //多串(不去重)
			var _n = parseInt(ggName);
			var mz = comm.ggm2num[ggName].map(function(x){
				return parseInt(x);
		});
			mz.each( function(_ggName) {
				var _n = parseInt(_ggName)||1;
				index.maxTuoSPs=maxGroupSP(index.gameList);
					Math.ck(index.maxTuoSPs, _n).each( function(sp){
						var lsSums=[];
						for(var kk=0,jj=sp.length;kk<jj;kk++){
							var lssum=0;
							for(var iii=0,jjj=sp[kk].length;iii<jjj;iii++){
								lssum+=sp[kk][iii]*1;
							}
							lsSums.push(lssum);
						}
						maxPprize += parseFloat(lsSums.reduce( function(a,b){return (a*10000)*(b*10000)/100000000;}));
					});
		});
	}
	maxPprize *= 2;
	return maxPprize;// = new_round ? index.newRound(maxPprize) : +(maxPprize).toFixed(2); 
};

//混合投注计算理论最大奖金代码开始
var allBf=[
{name:"00",sum:0,diff:0,spf:1},
{name:"01",sum:1,diff:1,spf:0},
{name:"02",sum:2,diff:2,spf:0},
{name:"03",sum:3,diff:3,spf:0},
{name:"04",sum:4,diff:4,spf:0},
{name:"05",sum:5,diff:5,spf:0},
{name:"10",sum:1,diff:1,spf:3},
{name:"11",sum:2,diff:0,spf:1},
{name:"12",sum:3,diff:1,spf:0},
{name:"13",sum:4,diff:2,spf:0},
{name:"14",sum:5,diff:3,spf:0},
{name:"15",sum:6,diff:4,spf:0},
{name:"20",sum:2,diff:2,spf:3},
{name:"21",sum:3,diff:1,spf:3},
{name:"22",sum:4,diff:0,spf:1},
{name:"23",sum:5,diff:1,spf:0},
{name:"24",sum:6,diff:2,spf:0},
{name:"25",sum:7,diff:3,spf:0},
{name:"30",sum:3,diff:3,spf:3},
{name:"31",sum:4,diff:2,spf:3},
{name:"32",sum:5,diff:1,spf:3},
{name:"33",sum:6,diff:0,spf:1},
{name:"40",sum:4,diff:4,spf:3},
{name:"41",sum:5,diff:3,spf:3},
{name:"42",sum:6,diff:2,spf:3},
{name:"50",sum:5,diff:5,spf:3},
{name:"51",sum:6,diff:4,spf:3},
{name:"52",sum:7,diff:3,spf:3},
{name:"09",sum:7,spf:0},
{name:"90",sum:7,spf:3},
{name:"99",sum:7,spf:1}
];
var bfCheckMap={};
for (i = allBf.length; i--;) {
		var conf = allBf[i], item = {}, jqs = conf.sum;
		var spf = conf.spf;
		item['9003_'+conf.name] = 1;
		item['9002_'+jqs]=1;
		item['nspf-'+spf]=1;
		var bfNames=conf.name.split("");
		if (spf === 3) {
			if (jqs>2 && bfNames[1]*1!=0) {item['9004_03']=1;}
			item['9004_13']=1;
			item['9004_33']=1;
		}else if(spf===1){
			if (jqs>1) {
				item['9004_01']=1;
				item['9004_31']=1;
			}
			item['9004_11']=1;			
		}else if(spf===0){
			item['9004_00']=1;
			item['9004_10']=1;
			if (jqs>2 && bfNames[0]*1!=0) {item['9004_30']=1;}		
		}
		bfCheckMap[conf.name] = item;
	}



function getSgBound(str,rq){
	var single = str.split('|'),  maxSum=-1, maxOpts, maxBf;
		forEach(allBf,function (bf){
			var optsAl = Math.al(filterInvalidOpts(single, bf,rq)), hits, sum = 0;
			for (var i = 0, j = optsAl.length; i < j; i++) {
				hits = optsAl[i];
				for (var k =  hits.length; k--;) {
					hits[k] = parseFloat(hits[k].split('#')[1]);
					sum += hits[k];
				}
				if (sum > maxSum) {
					maxSum = sum;
					maxOpts=hits;maxBf = bf.name;
				}
			}
		});
	maxOpts.sum = maxSum;
	maxOpts.bf = maxBf;
	return maxOpts;
}
function forEach(o,f,z){
	if(o){
	for(var i=0,j=o.length;i<j;i++){
	if(false===f.call(z||o[i],o[i],i,o,j)){
	break;}}}
	return z||o}

function filterInvalidOpts(single, bf,rq){
	var ret  = [], len = 0, filter=bfCheckMap[bf.name];
	function test(str){
		if (str.indexOf('9001') === 0) {return testRqSpfByBf(str, bf,rq);}
		return str.split('#')[0] in filter;
	}
	for (var i = 0, j = single.length; i < j; i++) {
		var types = single[i].split(',').filter(test);
		
		var tylen=types.length;
		if(tylen>1){
			types.sort(function(a,b){
				  return parseInt(a.split("#")[1])-parseInt(b.split("#")[1]);
			});
			types=[types[tylen-1]];
		}
		if (tylen) {ret[len++] = types;}
	}
	return ret;
}
function testRqSpfByBf(str, bf,rq){
	var rq1=parseInt(rq, 10);
	if (rq1 > 0) {
		if(bf.name == '09'){
			if (rq1 === 1) {
				return str.indexOf('9001_0') === 0 || str.indexOf('9001_1') === 0;
			}
			return str.indexOf('9001_') === 0;
		}
		if (bf.spf < 1) {
			if (rq1 < bf.diff) {
				return str.indexOf('9001_0') === 0;
			}else if(rq1 === bf.diff){
				return str.indexOf('9001_1') === 0;
			}
		}
		return str.indexOf('9001_3') === 0;
	}else{
		rq1 = Math.abs(rq1);
		if(bf.name == '90'){
			if (rq1 === 1) {
				return str.indexOf('9001_3') === 0 || str.indexOf('9001_1') === 0;
			}
			return str.indexOf('9001_') === 0;
		}
		if (bf.spf>0) {
			if (bf.diff > rq1) {
				return str.indexOf('9001_3') === 0;
			}else if(bf.diff === rq1){
				return str.indexOf('9001_1') === 0;
			}
		}
		return str.indexOf('9001_0') === 0;
	}
}

function maxGroupSP(gameList){
	var maxSPs=[];
	for(var i=0,j=gameList.length;i<j;i++){
		var realstr=[];
		var spfstr=[];
		var rqspfstr=[];
		var bqcstr=[];
		var jqsstr=[];
		var bfstr=[];
		for(var k=0,l=gameList[i].chks.length;k<l;k++){
			var lschks=gameList[i].chks[k];
			if(lschks.indexOf("9001")!=-1){
			spfstr.push(gameList[i].chks[k]+"#"+gameList[i].selectedSP[k]);
			}else if(lschks.indexOf("9005")!=-1){
			rqspfstr.push("nspf-"+lschks.substring(lschks.length-1,lschks.length)+"#"+gameList[i].selectedSP[k]);
			}else if(lschks.indexOf("9004")!=-1){
			bqcstr.push(gameList[i].chks[k]+"#"+gameList[i].selectedSP[k]);
			}else if(lschks.indexOf("9003")!=-1){
			bfstr.push(gameList[i].chks[k]+"#"+gameList[i].selectedSP[k]);
			}else if(lschks.indexOf("9002")!=-1){
			jqsstr.push(gameList[i].chks[k]+"#"+gameList[i].selectedSP[k]);
			}
		}
		
		if(spfstr.length>0){realstr.push(spfstr);}
		if(rqspfstr.length>0){realstr.push(rqspfstr);}
		if(bqcstr.length>0){realstr.push(bqcstr);}
		if(bfstr.length>0){realstr.push(bfstr);}
		if(jqsstr.length>0){realstr.push(jqsstr);}
		var lsrealstr=realstr.join("|");
		var realSP = getSgBound(lsrealstr,gameList[i].rq);
		realstr.length=0;
		maxSPs.push(realSP);
	}
	return maxSPs;
}
//混合投注计算理论最大奖金代码结束
