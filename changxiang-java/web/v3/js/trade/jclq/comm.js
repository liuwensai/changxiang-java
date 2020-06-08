var comm = {};
//合约验证
function contractCheck(){
	
	if($("#contract_check_id").attr("class") == "i-checked"){
		return true;
	}else if($("#contract_check_id").attr("class") == "i-check"){
		return false;
	}
	
}

//合约点击效果
function contrackButt(){
	
	if($("#contract_check_id").attr("class") == "i-checked"){
		$("#contract_check_id").attr("class","i-check");
	}else if($("#contract_check_id").attr("class") == "i-check"){
		$("#contract_check_id").attr("class","i-checked");
	}
}

$(document).ready(function(){
	 $("#recharge_close_id").click(function() {
		 
		 $("#chargeAlertlightbox").hide();
		 
	 });
});

function doTempBuy(playId,lotCode){
			 var singlePlay = 0 ;
			  if(index.isDanYi){
				  singlePlay = 100 ;
			  }else{
				  singlePlay = 0 ;
			  }

	 var ggName = index.ggType.join(",") ;
    var userBalacne = parseInt($("#balance_id").html());
    var inflowamt = index.totalMoney - userBalacne;
    var postData = {
   		 	playId:playId,
				ggType:index.GuoGuanType,
				noteCount:index.zs,
				multiple:index.bs,
				numberObject:getBuyCode(),
				totalAmt:index.totalMoney,
				firstChangci:index.gameList[0].cnumber,
				lastChangci:index.gameList[index.gameList.length-1].cnumber,
				firstDate:index.gameList[0].gdate.replace(/^(\d{4}-\d{2}-\d{1,2})\s+(\d{2}:\d{2}:\d{2})$/gi,"$1").replace(/-/gi,''),
				lastDate:index.gameList[index.gameList.length-1].gdate.replace(/^(\d{4}-\d{2}-\d{1,2})\s+(\d{2}:\d{2}:\d{2})$/gi,"$1").replace(/-/gi,''),
				lotTypeCode:lotCode,
				lotCode:lotCode,
				ggName: ggName,
				singlePlay:singlePlay,
				userBalance:userBalacne,
				inflowAmt:inflowamt,
				buySource:10,  //购买来源:0网站购买,10:3g网页购买,20:手机应用程序购买
				time:new Date().getTime()};
    
     var url='/ipub/trade/temp!tempProject.action';
    $.post(url,postData,function post_Sucess(data){
   	 var returnObject = eval("("+data+")");
   	 if(returnObject.flag==1)
   		 window.location.href ="/pay/alipay/ali-pay!charge.action?callbackType=1&callbackId="+returnObject.msg;
   	 else
   		 open_message(returnObject.msg);
    },'text');	
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