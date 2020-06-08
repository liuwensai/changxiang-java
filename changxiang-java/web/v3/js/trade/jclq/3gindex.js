var index={};
index.gameList=[];//存放所有的选择对象
index.GuoGuanType=2;//1是单关,2是自由过关,3是多串过关
index.bs=1;//默认的倍数=1
index.isDanYi=false;//默认的去除单一玩法为false
index.ggType=[];//存放选择的过关方式
index.totalMoney=0;//总金额
index.totalZs=0;//总注数
//初始化数据
index.initDate=function(playId){
	switch(index.playId*1){
		case 10001:
			index.maxGuoguanType=8;
			break;
		case 10002:
			index.maxGuoguanType=8;
			break;
		case 10003:
			index.maxGuoguanType=4;
			break;
		case 10004:
			index.maxGuoguanType=8;
			break;
		default:
			index.maxGuoguanType=8;
	}
};

$(document).ready(function(){
	index.initDate();	
	if(index.playId/1000<10){
		$("#jclhead").remove();
		$("#lotName").html("竞足");
	}else if(index.playId/1000>10){
		$("#jczhead").remove();
		$("#lotName").html("竞篮");
	}
	$("#"+index.playId+index.playE).addClass("clickTb");
	$("#playNameText").html($("#"+index.playId+index.playE).html());
	//选择玩法
	$("#chooseval").click(function(){
		showDiv("headsele");
	});
	//按照日期显示对阵
	comm.isDisplayByDate();
	
	//给自由过关的a标签加上事件
	index.freeLista=$("#freeList").find(".clickLba");
	index.freeLista.click(function(){
		var nameClass=$(this).attr("class");
		if(nameClass=="clickLba"){
			$(this).addClass("clickLbb");
		}else{
			$(this).removeClass("clickLbb");
		}
	});
	//去除单一玩法
	$("#danyiPlay").click(function(){
		if($(this).hasClass("clickLbb")){
			$(this).removeClass("clickLbb");
			index.isDanYi=false;
		}else{
			$(this).addClass("clickLbb");
			index.isDanYi=true;
		}
	});
	//选择自由过关的事件
	$("#freecheck").click(function(){
		$(this).addClass("cbmenu_fox");
		$("#freeList").css("display","");
		$("#duocuanList").css("display","none");
		index.GuoGuanType=2;
		$("#duocuancheck").removeClass("cbmenu_fox");
		//把所有选了的全部清空
		$("#duocuanList").find("a").removeClass('clickLbb');
		index.isDanYi=false;
		$("#danyiPlay").removeClass("clickLbb");
		index.ggTypeShow();
	});
	
	//给多串过关的a标签加上事件
	index.duocuanLista=$("#duocuanList").find(".clickLba");
	index.duocuanLista.click(function(){
		$("#duocuanList").find(".clickLba").attr("class","clickLba");
		$(this).addClass("clickLbb");
	});
	//选择多串过关的事件
	$("#duocuancheck").click(function(){
		$(this).addClass("cbmenu_fox");
		$("#freeList").css("display","none");
		$("#duocuanList").css("display","");
		$("#freecheck").removeClass("cbmenu_fox");
		index.GuoGuanType=3;
		index.freeLista.removeClass('clickLbb');
		index.isDanYi=false;
		$("#danyiPlay").removeClass("clickLbb");
		index.ggTypeShow();
	});
	
	//确认提交的事件
	$("#confirmSure").click(function(){
		if (typeof index.zs === 'undefined' || index.zs == 0) {
		    showMessage('请选择投注方式');
		    return;
		}
		var cdan=false;
		for(var i=0,j=index.gameList.length;i<j;i++){
			if(index.gameList[i].dan==1){
				cdan=true;
				break;
			}
		}
		if(index.isDY && cdan){
			showMessage('请不要同时选择胆和去除单一玩法');
		    return;
		}
		if(typeof index.bs==='undefined'|| index.bs==0 || index.bs==''){
			showMessage('请选择正确的倍数');
		    return;
		}
		if(index.getZhushu()*2>20000){
			showMessage("您好, 单倍认购金额不能超过20,000元!");
			return;
		}
		if (!checkLoginByAjax()) {
			return;
		}
		index.ready2Buy();
		$("#project_form").attr('action','/trade/confirm.action');
		$("#project_form").submit();
	});
	//选关确定的事件
	$("#confirmggtype").click(function(){
		index.ggType=[];
		index.ggType.length=0;
		if(index.GuoGuanType==2){
			index.freeLista.each(function(){
				var nameClass=$(this).attr("class");
				if(nameClass=="clickLba" || nameClass=="clickLbas"){
					
				}else{
					index.ggType.push($(this).attr("value"));
				}
			});
		}else if(index.GuoGuanType==3){
			index.duocuanLista.each(function(){
				var nameClass=$(this).attr("class");
				if(nameClass=="clickLba"){
					
				}else{
					index.ggType.push($(this).attr("value"));
				}
			});
		}else if(index.GuoGuanType==1){
			index.ggType.push("单关");
		}
		index.updateBs();
		$("#selectSize").html(index.ggType.join(","));
		clearDiv('ggtypechoose');
		index.updateSelectedDIV();
	});
	//修改倍数的事件
	$("#textbs").blur(function(){
		index.updateBs();
	});
	//设置胆事件
	$("#sureDan").click(function(){
		index.setDan();
	});
});
//修改倍数的js
index.updateBs=function(){
	index.zs=index.getZhushu();
	index.bs=$("#textbs").val()*1;
	var eachmaxjj=index.getMaxJJ();
	index.totalMoney=index.bs*index.zs*2;
	$("#textMoney").html(index.totalMoney);
	$("#maxJJText").html(Math.round(eachmaxjj*2*index.bs*100)/100);
	$("#maxJJ").val(Math.round(eachmaxjj*index.bs*100)/100);
};



//提交到confirm页面
index.ready2Buy=function(){
	
	  $("#zhushu").val(index.zs);
	  $("#beishu").val(index.bs);
	  var codes = [];
	  var tpl = "{$cid}|{$cnumber}|{$cname}|{$gname}|{$gtype}|{$gdate}|{$hometeam}|{$guestteam}|{$rq}|{$win}|{$draw}|{$lost}|{$gendtime}|{$dan}|[{$chks}]|{$selectedSP}|{$minSP}|{$maxSP}|{$odds}|{$choose}";
	  var yushefen=[];
	  this.gameList.each(function(o, i) {
			  var temp="";
			  for ( var j= 0,ChooseLen=o.choose.length;j <ChooseLen;j++) {
						 for(var _o in o.choose[j]){
							 if(!o.choose[j][_o]==""){
								 temp += _o+"@"+o.choose[j][_o] +";";						 
							 }
						  }
				}
			var yushetemp=o.cnumber+"="+o.ysf;
			yushefen.push(yushetemp);
			var  _tpl=tpl.replace(/{\$choose}/g,temp.substring(0,temp.length-1));
		    codes.push(_tpl.tpl(o));
	  });
	  var ggList=[];
	  	if(index.GuoGuanType==1){
	  		ggList.push(comm.ggm2num['单关']);
		}else if(index.GuoGuanType==2){
			if(index.ggType.length!=0){
				for(var i=0,j=index.ggType.length;i<j;i++){
					ggList.push(comm.ggm2num[index.ggType[i]]);
				}
			}
		}else if(index.GuoGuanType==3){
			if(index.ggType.length!=0){
				ggList=comm.ggm2num[index.ggType[0]];
			}
		}
	//按照场次划分计算最大奖金
		ggList.sort(function(a,b){
			return b-a;
		});
		index.maxjjList=[];
		for(var tt=index.gameList.length;tt>=ggList[ggList.length-1];tt--){
			var cc=0;
			for(var i=0,j=ggList.length;i<j;i++){
				var lssum=1;
				for(var k=0,l=index.jclSPDan.length;k<l;k++){
					lssum*=index.jclSPDan[k];
				}
				Math.ck(index.jclSPTuo, ggList[i]-index.jclSPDan.length).each(function(sp){
					for(var nn=0,mm=sp.length;nn<mm;nn++){
						lssum*=sp[nn];
					}
					cc+=lssum;
					lssum=1;
				});
			}
			index.jclSPTuo.splice(index.jclSPTuo.length-1, 1);
			index.maxjjList.push(Math.round(cc*index.bs*2*100)/100);
		}
		$("#maxjjStr").val(index.maxjjList.join("/"));//最大奖金场次编号
	  $("#codes").val(codes.join('/'));
	  $("#ggtype").val(index.GuoGuanType);
	  $("#gggroup").val(index.ggType.join(","));
	  $("#changshu").val(index.gameList.length);
	  $("#lotid").val("10");
	  $("#playid").val(index.playId);
	  $("#totalmoney").val(index.totalMoney);
	  $("#yushefen").val(yushefen.join("/"));
	  if(index.isDanYi){
		  $("#isSign").val(100);  
	  }else{
		  $("#isSign").val(0);
	  }
};





function showDiv(id){
	if($("#"+id).css("display")=="none"){
		$("#"+id).css("display","");
	}else{
		$("#"+id).css("display","none");
	}
}

index.updateGGType=function(){
	//如果是自由过关就选择两场比赛
	if(index.GuoGuanType==1){
		$("#selectSize").html("至少选择1场比赛");
		
	}else if(index.GuoGuanType==2){
		$("#selectSize").html("至少选择2场比赛");
	}else if(index.GuoGuanType==3){
		$("#selectSize").html("至少选择3场比赛");
	}
};

//修改投注中心
index.updateSelectedDIV=function(){
	var tpl=["<li><label><input class=\"chbox\" cid=\"{$cnumber}\" {$disval} {$checked} type=\"checkbox\" /> {$cname} | {$seleStr}</label></li>"];
	var HTMLArr=[];
	//给gameList进行排序
	index.gameList.sort(function(a,b){
		  return a.suffix-b.suffix;
	});
	//
	index.gameList.each(function(o,i){
		var lsHTML=tpl[0];
		var str=[];
		for(var k=0,l=o.chks.length;k<l;k++){
			if(o.chks[k].indexOf('10002')!=-1){
				var rqspfstr=comm.optionKeys[o.chks[k]];
				rqspfstr=rqspfstr.replace("[1]","["+o.rq+"]");
				rqspfstr=rqspfstr.replace("[-1]","["+o.rq+"]");
				str.push(rqspfstr+o.selectedSP[k]);
			}else{
				str.push(comm.optionKeys[o.chks[k]]+o.selectedSP[k]);
			}
		}
		if(o.dan==1){
			lsHTML=lsHTML.replace("{$checked}","checked");
		}else{
			lsHTML=lsHTML.replace("{$checked}","");
		}
		lsHTML=lsHTML.replace("{$index}",i);
		lsHTML=lsHTML.replace("{$seleStr}",str.join("&nbsp;&nbsp;"));
		lsHTML=lsHTML.tpl(o);
		HTMLArr.push(lsHTML);
	});
	$("#chooseList").html(HTMLArr.join(""));
	$("#chooseList").find("input").click(function(){
		index.ggType.sort(function(a,b){
			return parseInt(a.slice(0))-parseInt(b.slice(0));
		});
		var allDan = $('#chooseList').find('li').find('input[type="checkbox"]');
		var dan = [], tuo = [];
		allDan.each(function(i, o) {
			if (o.checked)
				dan.push(o);
			else
				tuo.push(o);
		});
		if(index.gameList!=null){
			  for(var i=0,j=index.gameList.length;i<j;i++){
				  if($(this).is(':checked')){
					  if(index.gameList[i].cnumber==$(this).attr("cid")){
						  index.gameList[i].dan=1;
					  }
				  }else{
					  if(index.gameList[i].cnumber==$(this).attr("cid")){
						  index.gameList[i].dan=0;
					  }
				  }
			  }
		  }
		// 单关全部禁用
		if (index.GuoGuanType != 2 || parseInt(index.ggType) == allDan.length) {
			allDan.each(function(i, o) {
				o.disabled = true;
				o.checked = false;
			});
			for ( var m = 0; m < index.gameList.length; m++) {
				index.gameList[m].dan = 0;
			}
		} else {
			if (index.ggType && (parseInt(index.ggType) - 1 == dan.length)) {
				tuo.each(function(o, i) {
					o.checked = false;
					o.disabled = true;
					var curid = $(o).attr('cid');
					for ( var m = 0; m < index.gameList.length; m++) {
						if (index.gameList[m].cnumber == curid) {
							index.gameList[m].dan = 0;
						}
					}
				});
			} else {
				tuo.each(function(o, i) {
					o.disabled = false;
				});
			}
		}
	});
};

/*
 * 获取注数
 * */
index.getZhushu = function() {
  var zs = 0;
   if (index.GuoGuanType == 2) { //过关
    zs = index.calcZhushu(index.gameList, 2, index.ggType);
  } else if (index.GuoGuanType == 3) { //组合过关
    zs = index.calcZhushu(index.gameList, 3, index.ggType);
  }
  var dywf=0;
  if(index.isDanYi){
	  dywf=index.calDanyi(index.GuoGuanType, index.ggType);
  }
  return zs-dywf;
};
index.calDanyi=function(ggtype,ggtypelist){
	var a10001=[],a10002=[],a10003=[],a10004=[];
	var s;
	for(var i=0;i<index.gameList.length;i++){
		s=index.gameList[i];
		for(var j=0;j<s.chks.length;j++){
			var _temp=s.chks[j].split('_');
			var _playId=_temp[0];
			var _chk=_temp[1];
			var _s=clone(s);
			_s.chks=[];
			_s.chks.push(s.chks[j]);
			
			switch(parseInt(_playId)){
			case 10001:
				if(a10001.length==0){
					a10001.push(_s); 
				}else{
					var hasPush=false;
					for(var _i=0,_l=a10001.length;_i<_l;_i++){
						if(a10001[_i].cid==_s.cid){
							a10001[_i].chks.push(s.chks[j]);
							hasPush=true;
							break;
						}
					}
					if(!hasPush){
							a10001.push(_s);
						}
					}
				break;
			case 10002:
				if(a10002.length==0){
					a10002.push(_s); 
				}else{
					var hasPush=false;
					for(var _i=0,_l=a10002.length;_i<_l;_i++){
						if(a10002[_i].cid==_s.cid){
							a10002[_i].chks.push(s.chks[j]);
							hasPush=true;
							break;
						}
					}
					if(!hasPush){
							a10002.push(_s);
						}
					}
				break;
			case 10003:
				if(a10003.length==0){
					a10003.push(_s); 
				}else{
					var hasPush=false;
					for(var _i=0,_l=a10003.length;_i<_l;_i++){
						if(a10003[_i].cid==_s.cid){
							a10003[_i].chks.push(s.chks[j]);
							hasPush=true;
							break;
						}
					}
					if(!hasPush){
							a10003.push(_s);
						}
					}
				break;
			case 10004:
				if(a10004.length==0){
					a10004.push(_s); 
				}else{
					var hasPush=false;
					for(var _i=0,_l=a10004.length;_i<_l;_i++){
						if(a10004[_i].cid==_s.cid){
							a10004[_i].chks.push(s.chks[j]);
							hasPush=true;
							break;
						}
					}
					if(!hasPush){
							a10004.push(_s);
						}
					}
				break;
			}
		}
	}
	var a=ggtype>a10001.length?0:index.calcZhushu(a10001, ggtype, ggtypelist);
	var b= ggtype>a10002.length?0:index.calcZhushu(a10002, ggtype, ggtypelist);
	var c= ggtype>a10003.length?0:index.calcZhushu(a10003, ggtype, ggtypelist);
	var d= ggtype>a10004.length?0:index.calcZhushu(a10004, ggtype, ggtypelist);
	return a+b+c+d;
};
/*
 * 计算注数
 *  @param codes:赛果个数
 *  @ggmlist:数组，如['2串1','3串1']
 *  @param isSplit:待定
 */

index.calcZhushu = function(codes, ggtype, ggmlist, isSplit) {
  var t, d, t2 = [],
    d2 = [],
    base_count = 0;
  if (ggmlist) {
    if (ggtype != 2 && !isSplit) { //如果不是自由，而且非拆分后，先去拆分
      return index.splitToNx1(codes, ggmlist);
    }

    var ar = [];
    // 储存'n串m'中的n
    ggmlist.each(function(o, i) {
      ar.push(comm.GuoGuanPattern[o].n);
    });
    // t2存储每场选了胜平负的个数，如选了310,则为3。选了1或者3或者0，则为1
    codes.each(function(o) {
      o.chks.length > 0 && (o.dan && o.dan == "1" ? d2 : t2).push(o.chks.length);
    });
    // t表示在t2中每场比赛投注的个数，格式为：[['3':1],['2':3]] 表示投了3注的有一个，投了2注的有两个
    t = t2.getByFrequency();
    d = d2.getByFrequency();
    base_count = d.length == 0 ? index.esunjsC(t, ar) : index.calCount(t, d, ar);
  }
  return base_count;
};
//计算注数(去重复有胆)
index.calCount = function(t, d, ar) {
  var dn = 0,
    mp = 1;
  for (var i = 0, l = d.length; i < l; i++) {
    dn += d[i][1];
    mp *= Math.pow(d[i][0], d[i][1]);
  }
  var n = 0;
  ar.each(function(m) {
    n += m > dn ? index.esunjsC(t, m - dn) * mp : index.esunjsC(d, m);
  });
  return n;
};

/*
 * 计算注数，基于自由过关的，也就是n串1的注数
 * @param:a 格式：[['3':1],['2':1],['1':1]]
 * @param:num
 * 储存'n串m'中的n,格式：[2,3]
 */
index.esunjsC = function(a, num) {
  if (typeof(a[0]) == "number") a = a.getByFrequency();
  if (typeof(num) == "number") num = [num];
  var r = 0;
  var n = a.length;
  // ff方法的作用：
  var ff = function(n, i) {
    return Math.pow(a[i][0], n) * Math.c(a[i][1], n);
  };
  (function f(t, i) {
    if (i == n) { // 如果
      if (core.arrayGetIdx(num, core.arrayAdd(t)) > -1) r += core.arrayMultiple(core.arrayEach(t, ff, []));
      return;
    }
    for (var j = 0; j <= a[i][1]; j++) {
      f(t.concat(j), i + 1);
    }
  })([], 0);
  return r;
};
/*
 * 计算N串1的注数
 * 仅支持自由过关与组合过关
 * @param {[object]} codes 保存投注号码的对象数组
 * @param {string} gggroup 表明是几串几，如'2串1‘，’4串11‘
 * @return {int} 返回计算的结果
 * */
index.splitToNx1 = function(codes, gggroup) {
  if (gggroup.length == 0) return 0;
  var sum = 0;
  //d,t分别保存胆码投注和拖码投注的个数，如一场拖码投注为[3,1]，那d[i]=2
  var d = [],
    t = [];
  codes.each(function(item) {
    var v = item.chks.length;
    if (item.chks.length > 0) {
      if (item.dan == "1") {
        d.push(v);
      } else {
        t.push(v);
      }
    }
  });
  /*
   * 根据gggroup获取要NxM拆成什么样的Nx1的组合，以数组返回.
   * 如是组合过关，例如gggroup='4串11',在拆分成自由过关时为1个4串、4个3串1、6个2串1，那么ggmlist则是保存的[4,3,2]
   * 如是自由过关，例如gggroup='2串1，3串1‘，则返回[3，2]
   */
  var ggmlist = index.GuoGuanType == "2" ? core.arrayEach(gggroup.split(","), function(s) {
    return comm.type2nm[s].n;
  }).reverse() : comm.ggm2num[gggroup];
  var ad = function(t) {
    return d.concat(t);
  };

  var r = index.splitCodes(d, t, ggmlist);
  r.each(function(o, i) {
    sum += core.arrayMultiple(o);
  });
  return sum;
};

index.splitCodes = function(d, t, ggmlist) {
	  var a = [];
	  var _d = [];
	  ggmlist.each(function(n) {
	    a = a.concat(n > d.length ? core.arrayEach(core.mathCR(t, n - d.length), function(o, i) {
	      return _d.concat(o);
	    }) : core.mathCR(d.length, n));
	  });
	  return a;
};
function clone(myObj){ 
	if(typeof(myObj) != 'object') return myObj; 
	if(myObj == null) return myObj; 
	var myNewObj = new Object(); 
	for(var i in myObj) 
		myNewObj[i] = clone(myObj[i]); 
	return myNewObj; 
}

//混合投注加胆设置代码开始
index.setDan = function() {
	var allDan = $('#chooseList').find('li').find('input[type="checkbox"]');
	var dan = [], tuo = [];
	allDan.each(function(i, o) {
		if (o.checked)
			dan.push(o);
		else
			tuo.push(o);
	});
	dan.length = tuo.length = 0;
	allDan.each(function(i, o) {
		if (o.checked)
			dan.push(o);
		else
			tuo.push(o);
	});

	// 禁用过关方式
	$('#freeList').find('a').each(function() {
		if (dan.length > parseInt($(this).attr('cvalue'))) {
			$(this).css("display","none");
		} else {
		}
	});
	if(index.GuoGuanType==2){
		index.ggType.sort(function(a,b){
			return parseInt(a.slice(0))-parseInt(b.slice(0));
		});
	}
	$('#duocuanList').find('div[name="many"]').css("display","none");
	
	
	if(dan.length>0){
		$("#dansize").html(dan.length);
		$("#danyiPlay").css("display","none");
		index.isDanYi=false;
	}else{
		$("#dansize").html(dan.length);
		$("#danyiPlay").css("display","");
	}
	index.updateBs();
	$("#listInfo").css("display","none");
};

//竞彩篮计算最大奖金
index.getMaxJJ=function(){
	var ggList=[];
	var sum=0;
	comm.getMaxSP();
	index.getMaxSPArr();
	if(index.GuoGuanType==1){
		
	}else if(index.GuoGuanType==2){
		if(index.ggType.length!=0){
			for(var i=0,j=index.ggType.length;i<j;i++){
				ggList.push(comm.ggm2num[index.ggType[i]]);
			}
		}
	}else if(index.GuoGuanType==3){
		if(index.ggType.length!=0){
			ggList=comm.ggm2num[index.ggType[0]];
		}
	}
	//ggList把多串和自由过关都拆成了自由过关的数字,在计算最大奖金
	for(var i=0,j=ggList.length;i<j;i++){
		var lssum=1;
		for(var k=0,l=index.jclSPDan.length;k<l;k++){
			lssum*=index.jclSPDan[k];
		}
		Math.ck(index.jclSPTuo, ggList[i]-index.jclSPDan.length).each(function(sp){
			for(var nn=0,mm=sp.length;nn<mm;nn++){
				lssum*=sp[nn];
			}
			sum+=lssum;
			lssum=1;
		});
	}
	return sum;
};
index.getMaxSPArr=function(){
	index.jclSPTuo=[];
	index.jclSPDan=[];
	for(var i=0,j=index.jclsp.length;i<j;i++){
			var asum=0;
			var bsum=0;
			for(var k=0,t=index.jclsp[i].sheng.length;k<t;k++){
				asum+=index.jclsp[i].sheng[k]*1;
			}
			for(var k=0,t=index.jclsp[i].fu.length;k<t;k++){
				bsum+=index.jclsp[i].fu[k]*1;
			}
			if(index.jclsp[i].dan*1==0){
				index.jclSPTuo.push(asum>bsum?asum:bsum);
			}else
				index.jclSPDan.push(asum>bsum?asum:bsum);
	}
	index.jclSPTuo.sort(function(a,b){
		return b-a;
	});
};

function confirmtobuy(){
	if (typeof index.zs === 'undefined' || index.zs == 0) {
	    showMessage('请选择投注方式');
	    return;
	}
	var cdan=false;
	for(var i=0,j=index.gameList.length;i<j;i++){
		if(index.gameList[i].dan==1){
			cdan=true;
			break;
		}
	}
	if(index.isDY && cdan){
		showMessage('请不要同时选择胆和去除单一玩法');
	    return;
	}
	if(typeof index.bs==='undefined'|| index.bs==0 || index.bs==''){
		showMessage('请选择正确的倍数');
	    return;
	}
	if(index.getZhushu()*2>20000){
		showMessage("您好, 单倍认购金额不能超过20,000元!");
		return;
	}
	if (!checkLoginByAjax()) {
		return;
	}
	index.ready2Buy();
	$("#project_form").attr('action','/trade/confirm.action');
	$("#project_form").submit();
}

//清除
function clearAll(){
	index.gameList=[];//存放所有的选择对象
	index.GuoGuanType=2;//1是单关,2是自由过关,3是多串过关
	index.bs=1;//默认的倍数=1
	index.isDanYi=false;//默认的去除单一玩法为false
	index.ggType=[];//存放选择的过关方式
	index.totalMoney=0;//总金额
	index.totalZs=0;//总注数
	index.initDate();	
	$(".fullanon").addClass("fullan");
	$(".fullanon").removeClass("fullanon") ;
}
