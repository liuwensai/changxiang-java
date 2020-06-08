var index={};
index.gameList=[];//存放所有的选择对象
index.GuoGuanType=2;//1是单关,2是自由过关,3是多串过关
index.bs=1;//默认的倍数=1
index.isDanYi=false;//默认的去除单一玩法为false
index.ggType=[];//存放选择的过关方式
index.totalMoney=0;//总金额
index.totalZs=0;//总注数
//初始化数据
index.initDate=function(){
	index.playId=10001;
	index.playE= 0;
	index.ggType = 2;
	
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
});

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

//修改金额倍数
index.updateBs=function(){
	index.zs=index.getZhushu();
	index.bs=$("#bei_shu_id").val()*1;
	var eachmaxjj=index.getMaxJJ();
	index.totalMoney=index.bs*index.zs*2;
	$("#zs_and_bs_id").html(index.zs+"注"+index.bs+"倍");
	$("#total_amount_id").html("共"+index.totalMoney+"元");
	$("#cal_money_id").html("预测最大奖金："+Math.round(eachmaxjj*2*index.bs*100)/100+"元");
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

//默认给个关数
index.showDefGGType=function(){
	index.GuoGuanType=2;
	index.ggType=[];
	index.ggType.length=0;
	if(index.gameList.length>=2){
		var lsggtype=index.gameList.length;
		if(index.maxGuoguanType<=index.gameList.length)
			lsggtype=index.maxGuoguanType;
		index.ggType.push(lsggtype+"串1");
	}
};
