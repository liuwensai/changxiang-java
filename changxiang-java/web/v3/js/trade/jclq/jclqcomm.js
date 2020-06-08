var index={};
index.gameList=[];//存放所有的选择对象
index.GuoGuanType=2;//1是单关,2是自由过关,3是多串过关
index.bs=1;//默认的倍数=1
index.isDanYi=false;//默认的去除单一玩法为false
index.ggType=[];//存放选择的过关方式
index.totalMoney=0;//总金额
index.totalZs=0;//总注数
index.maxjj=0;//最大奖金
index.sslist=[]; // 联赛 
var comm = {};
//初始化数据
index.initDate=function(playId){
	switch(playId*1){
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

//修改倍数的js
index.updateBs=function(){
	index.zs=index.getZhushu();
	index.maxjj=index.getMaxJJ();
	index.totalMoney=index.bs*index.zs*2; 
};

//提交到confirm页面
index.ready2Buy=function(){
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
					ggList.push(comm.ggm2num[index.ggType[i].key]);
				}
			}
		}else if(index.GuoGuanType==3){
			if(index.ggType.length!=0){
				ggList=comm.ggm2num[index.ggType[0].key];
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
		var data={
			maxjjcc:index.maxjjList.join("/"),
			codes:codes.join("/"),
			ggtype:index.GuoGuanType,
			gggroup:index.ggType.join(","),
			changshu:index.gameList.length ,
			lotcode:10,
			playid:index.playId,
			totalmoney:index.totalMoney,
			yushefen:yushefen.join("/"),
			isdanyi:index.isDanYi
		};
		return data ;
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
  if(index.GuoGuanType == 1){
	  return dywf ;
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
//			var _chk=_temp[1];
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
      ar.push(comm.GuoGuanPattern[o.key].n);
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
    mp *= Math.pow(d[i][0]*1, d[i][1]*1);
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
  }).reverse() : comm.ggm2num[gggroup[0].key];
//  var ad = function(t) {
//    return d.concat(t);
//  };

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
				ggList.push(comm.ggm2num[index.ggType[i].key]);
			}
		}
	}else if(index.GuoGuanType==3){
		if(index.ggType.length!=0){
			ggList=comm.ggm2num[index.ggType[0].key];
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
}



/**
 * 此处js专门生成jcz共同数据(每次添加一个方法  在此处写好注释信息)
 * 其中方法包含
 * 	1.选号方法chooseNumber();
 * 	2.筛选赛事方法showShuaixuan();
 *  clearDiv()  关闭层的方法
	calCount()  计算注数的方法
	updateSelectedHTML()  给选中的对阵生成html方法
	confirm()  提交方法
	updateBs()  修改倍数方法
	updateInfo()修改总购买金额  修改总注数  修改最大奖金
	isDisplayByDate()  根据日期显示对阵
	getMatchName()  把对阵编号转换成为"周一001"
 * 
 * */
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
comm.optionKeys={"10001_2":"主负","10001_1":"主胜","10002_2":"[让]主负","10002_1":"[让]主胜","10004_1":"大分","10004_2":"小分",'10003_11':'客胜1-5', '10003_12':'客胜6-10','10003_13':'客胜11-15','10003_14':'客胜16-20','10003_15':'客胜21-25','10003_16':'客胜26+','10003_01':'主胜1-5','10003_02':'主胜6-10','10003_03':'主胜11-15','10003_04':'主胜16-20','10003_05':'主胜21-25','10003_06':'主胜26+'};
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




comm.getMaxSP=function(){
	index.jclsp=[];
	for(var i=0,j=index.gameList.length;i<j;i++){
		var spobj={10001:[],
				10002:[],
				10003:[],
				10004:[]};
		for(var k=0,l=index.gameList[i].chks.length;k<l;k++){
			var eachchk=index.gameList[i].chks[k];
			var eachPlayId_val=eachchk.split("_");
			switch(eachPlayId_val[0]*1){
			case 10001:
				spobj[eachPlayId_val[0]*1].push(eachPlayId_val[1]+"="+index.gameList[i].selectedSP[k]);
				break;
			case 10002:
				spobj[eachPlayId_val[0]*1].push(eachPlayId_val[1]+"="+index.gameList[i].selectedSP[k]);
				break;
			case 10003:
				spobj[eachPlayId_val[0]*1].push(eachPlayId_val[1]+"="+index.gameList[i].selectedSP[k]);
				break;
			case 10004:
				spobj[eachPlayId_val[0]*1].push(index.gameList[i].selectedSP[k]);
				break;
			}
		}
		var sfsp={sheng:[],fu:[],dan:0};
		for(var n=0,m=spobj[10001].length;n<m;n++){
			var val_sp=spobj[10001][n].split("=");
			if(val_sp[0]*1==2){
				sfsp.sheng.push(val_sp[1]);
			}else{
				sfsp.fu.push(val_sp[1]);
			}
		}
		for(var n=0,m=spobj[10002].length;n<m;n++){
			var val_sp=spobj[10002][n].split("=");
			if(val_sp[0]*1==2){
				sfsp.sheng.push(val_sp[1]);
			}else{
				sfsp.fu.push(val_sp[1]);
			}
		}
		var maxsheng=0;
		var maxfu=0;
		for(var n=0,m=spobj[10003].length;n<m;n++){
			var val_sp=spobj[10003][n].split("=");
			if(val_sp[0]*1==2){
				if(maxsheng<val_sp[1]*1)
					maxsheng=val_sp[1];
			}else{
				if(maxfu<val_sp[1]*1)
					maxfu=val_sp[1];
			}
		}
		if(maxsheng!=0)
		sfsp.sheng.push(maxsheng);
		if(maxfu!=0)
		sfsp.sheng.push(maxfu);
		if(spobj[10004].length>0){
			sfsp.sheng.push(Math.max.apply(Math,spobj[10004]));
			sfsp.fu.push(Math.max.apply(Math,spobj[10004]));
		}
		sfsp.dan=index.gameList[i].dan;
		index.jclsp.push(sfsp);
	}
};

//保存赛事筛选信息
index.ssData=new Array();
//赛事筛选
function openFilterDiv(){
	if(index.ssData.length==0){
		index.ssData=index.sslist;
	}
	var ss = $("#sslist");
	for(var i=0; i<index.ssData.length;i++){
		// 选中筛选项
		ss.find("label[legname='"+index.ssData[i]+"']").find("input").attr("checked",true);
		// 显示投注项
		$("div[name='"+index.ssData[i]+"']").css("display","");
	}
	$(".g-dialog_boxnew").show();
}

// 取消赛事赛选
function closeFilterDiv(){
	$(".g-dialog_boxnew").hide();
}

//全选
function selectAll(){
	$("#sslist").find("input").each(function(){
		$(this).attr("checked",true);
	});
}

//返选
function unselect(){
	$("#sslist").find("input").each(function(){
		if($(this).is(":checked")){
			$(this).attr("checked",false);
		}else{
			$(this).attr("checked",true);
		}
	});
}

//赛事赛选 确认
function doSelect(){
	var clen = $("#sslist").find("input:checked").length;
	if(clen<=0){
		alert("请至少保留一个筛选项");
		return;
	}
	index.ssData=new Array();
	$("#sslist").find("input").each(function(){
		var legName = $.trim($(this).next().html());
		if($(this).is(":checked")){
			// 显示对阵信息
			$("div[name='"+legName+"']").each(function(i,o){
				$(o).parent().parent().parent().css("display","");
			});
			// 保存筛选信息
			index.ssData.push(legName);
		}else{
			// 隐藏对阵信息
			$("div[name='"+legName+"']").each(function(i,o){
				$(o).parent().parent().parent().css("display","none");
			});
			var tempList = [];
			var deleteList =[];
			// 隐藏对阵中 选中的投注对阵信息
			index.gameList.each(function(o,i){
				if(o.gname==legName){
					deleteList.push(o);
				}else{
					tempList.push(o);
				}
			});
			// 删除选中样式
			deleteList.each(function(o,i){
				if(jclq.playId==10003 || jclq.playId==10005){
					$("div[cnumber='"+o.cnumber+"']").find("i").removeClass("winselect").html("点击展开投注选项");
				}else{
					$("div[cnumber='"+o.cnumber+"']").find("i").removeClass("winselect");
				}
			});
			// 删除对阵信息
			index.gameList=tempList;
			
			if(index.gameList.length>0){
				$("#selcs").html("已选择"+index.gameList.length+"场比赛");
				$(".m-submit_box").removeClass("disabled");
			}else{
				$("#selcs").html("请至少选择2场比赛");
				$(".m-submit_box").addClass("disabled");
			}
		}
	});
	$(".g-dialog_boxnew").hide();
}

// 绑定赛事赛选按钮
function bangding_ss(){
	var ss = document.body.querySelectorAll('.jczqbox input');
	for (var i = ss.length - 1; i >= 0; i--) {
		ss[i].addEventListener("change",function(){
			if($(this).is(":checked")){
				/*$("div[name='"+$.trim($(this).next().html())+"']").each(function(i,o){
					$(o).parent().parent().parent().css("display","");
				});*/
			}else{
				/*$("div[name='"+$.trim($(this).next().html())+"']").each(function(i,o){
					$(o).parent().parent().parent().css("display","none");
				});*/
			}
		},false);
	};
}

//过关方式按钮绑定事件
function bindGgButton(){
	// 绑定自由过关按钮 点击事件
	$("i[name=\"gg_type\"]").click(function(){
		// 选中 or 取消
		if($(this).attr("class")=="i-chkbox"){
			$(this).attr("class","i-chkbox winselect");
		}else{
			$(this).attr("class","i-chkbox");
		}
	});
	
	// 绑定自由过关按钮 点击事件
	$("i[name=\"dc_gg_type\"]").click(function(){
		$("i[name=\"dc_gg_type\"]").removeClass("winselect");
		if($(this).attr("class")=="i-chkbox"){
			$(this).attr("class","i-chkbox winselect");
		}else{
			$(this).attr("class","i-chkbox");
		}
	});
	
	// 过关方式
	$('#guogfs').on('click', function(e){ 
		
		$("i[name='gg_type']").attr("class","i-chkbox");
		$("i[name='dc_gg_type']").attr("class","i-chkbox");
		
		if(index.ggType.length==0){
			index.GuoGuanType=2;
		}
		
		if(index.GuoGuanType==2){  // 自由过关
			showZyGG();
			for(var i=0;i<index.ggType.length;i++){
				$("i[name='gg_type'][val='"+index.ggType[i].val+"']").addClass("winselect");
			}
		}else if(index.GuoGuanType==3){  // 多串过关
			showDcGG();
			for(var i=0;i<index.ggType.length;i++){
				for(var i=0;i<index.ggType.length;i++){
					$("i[name='dc_gg_type'][val='"+index.ggType[i].val+"']").addClass("winselect");
				}
			}
		}
		// 显示弹窗
		$("#guogfs_article").show();
	});
	
	$("#zy_gg").on("click",function(){
		var __this = $(this);
		if(!__this.hasClass("tab_methodhover")){
			clearDcGgType();
			showZyGG();
			//jczq.GuoGuanType=3;
		}
	});
	
	$("#dc_gg").on("click",function(){
		var __this = $(this);
		if(!__this.hasClass("tab_methodhover")){
			clearZyGgType();
			showDcGG();
			//jczq.GuoGuanType=3;
		}
	});
	
}

function showZyGG(){
	$("#zy_gg").addClass("tab_methodhover");
	$("#dc_gg").removeClass("tab_methodhover");
	$("#zy_gg_tab").show();
	$("#dc_gg_tab").hide();
}

function showDcGG(){
	$("#dc_gg").addClass("tab_methodhover");
	$("#zy_gg").removeClass("tab_methodhover");
	$("#dc_gg_tab").show();
	$("#zy_gg_tab").hide();
}

// 过关方式取消
function hideGuogfsArticle(){
	$("#guogfs_article").hide();
}

// 过关方式确认
function queRenGuofs(){
	if($("#zy_gg_tab").is(':visible')){
		index.GuoGuanType=2;
	}else{
		index.GuoGuanType=3;
	}
	clearDan();
	getGgTypeByCss();
	// 计算注数、奖金、购买金额
	updateBuyInfo();
	$("#default_ggtype").html(getGgTypeStr());
	$("#guogfs_article").hide();
}

// 取得最大 过关类型
function getMaxGGType(){
	index.maxGGType = 99;
	for(var i=0;i<index.gameList.length;i++){
		var choose = index.gameList[i].choose;
		var sf_cho = choose[0]["10001"];  // 8
		var rfsf_cho = choose[1]["10002"];  // 8
		var sfc_cho = choose[2]["10003"];  // 4
		var dxf_cho = choose[3]["10004"];  // 8
		var maxGGtype = (sfc_cho&&4) || (sf_cho&&8)|| (rfsf_cho&&8) || (dxf_cho&&8);
		if(maxGGtype<index.maxGGType){
			index.maxGGType=maxGGtype;
			if(maxGGtype==4)break;
		}
	}
}

// 过关方式字符串显示
function getGgTypeStr(){
	var ggList = index.ggType;
	var ggstr="";
	for(var i=0;i<ggList.length;i++){
		if(ggList.length-1==i){
			ggstr+=ggList[i].key;
		}else{
			ggstr+=ggList[i].key+",";
		}
	}
	return ggstr===""?"请选择过关方式":ggstr;
}

function clearZyGgType(){
	$("i[name='gg_type']").each(function(){
		$(this).attr("class","i-chkbox"); 
	});
}

function clearDcGgType(){
	$("i[name='dc_gg_type']").each(function(){
		$(this).attr("class","i-chkbox"); 
	});
}

// 默认过关方式
function initGgType(){
	index.GuoGuanType==2;
	index.ggType=[];
	showCanSelectGgType();
	var v = (index.gameList.length<index.maxGGType?index.gameList.length:index.maxGGType);
	var type={};
	type.key = (v==1&&"单关") || (v+"串1");
	type.val = v+"_1";
	index.ggType.push(type);
	$("#default_ggtype").html(type.key);
}

// 显示可选过关方式
function showCanSelectGgType(){
	
	getMaxGGType();
	var ggtype_max = (index.gameList.length<index.maxGGType?index.gameList.length:index.maxGGType);
	// 自由过关 取消标红并且显示可选过关方式
	$("i[name='gg_type']").each(function(){
		if(parseInt($(this).attr("val"))<=ggtype_max){
			$(this).attr("class","i-chkbox"); 
			$(this).parent().show(); 
		}else{
			$(this).attr("class","i-chkbox");
			$(this).parent().hide();
		}
	});
	// 多串过关 取消标红并且显示可选过关方式
	for(var i=3;i<=8;i++){
		if(i<=ggtype_max){
			$("#dc_"+i).show();
			$("#dc_"+i).find("i").removeClass("winselect");
		}else{
			$("#dc_"+i).hide();
			$("#dc_"+i).find("i").removeClass("winselect");
		}
	}
}

// 修改过关方式
function changeGgType(){
	
	showCanSelectGgType();
	var ggtype_max = (index.gameList.length<index.maxGGType?index.gameList.length:index.maxGGType);
	// 删除已选过关方式中的数据
	for(var i=0;i<index.ggType.length;i++){
		var gg_val = parseInt(index.ggType[i].val,10);
		if(gg_val>ggtype_max){
			index.ggType.splice(i,1);
			break;
		}
	}
	if(index.ggType.length==0){
		index.GuoGuanType=2;
	}
}


// 根据选项获取过关方式
function getGgTypeByCss(){
	
	index.ggType.length=0;
	
	if(index.GuoGuanType==2){
		$("i[name='gg_type']").each(function(){
			if($(this).hasClass("winselect")){
				var type={};
				type.key=$.trim($(this).text());
				type.val=$(this).attr("val");
				index.ggType.push(type);
			}
		});
	}else if(index.GuoGuanType==3){
		// 显示可选过关方式
		for(var i=3;i<=8;i++){
			if(i<=index.maxGGType){
				$("#dc_"+i).find("i").each(function(){
					if($(this).hasClass("winselect")){
						var type={};
						type.key=$.trim($(this).text());
						type.val=$(this).attr("val");
						index.ggType.push(type);
						return false; // 跳出循环
					}
				});
			}
		}
	}
}

