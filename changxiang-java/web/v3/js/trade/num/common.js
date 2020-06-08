$(document).ready(function(){
	//滚动实现代码
	var mainDivHeight=getMainDivHeight(145);
	$("#mainDiv").css("height",mainDivHeight+"px");
});
function getMainDivHeight(footHeight){
	 var liulanqi=document.documentElement.clientHeight;
	 return liulanqi-footHeight;
}
//计算组合数公式 C5/6
function Cmn( m,  n)
{
    var n1 = 1, n2 = 1;
    for (var i = m, j = 1; j <= n; n1 *= i--, n2 *= j++) ;
    return n1 / n2;
}

//机选号码
var a =new Array('01','02','03','04','05','06','07','08','09','10',
		 '11','12','13','14','15','16','17',"18","19","20",
		 '21','22','23','24','25','26','27',"28","29","30",
		 '31','32','33','34','35');

// m 球的总个数，n  选球的个数， 返回字符型数据：“01”,“02”,“03”
function jixuanA(m, n){
	var result = new Array();
	while(result.length<n) {
		var aValue = a[random(m-1,0)];
		if (!result.contains(aValue)) {
			result[result.length] = aValue;	
		}
	}
	return result;
}
function random(x, y) {
    var rand = parseInt(Math.random() * (x - y + 1) + y);
    return rand;
}

var randomWithRepeat=function(m,n){
	if(n>m) n=m;
	var candidate=[];
	for(var i=m;i>=0;i--){
		candidate.push(i);
	}
	var ret=[];
	for(var i=0;i<n;i++){
		ret.push(candidate.random()[0]);
	}
	return ret;
};

/**
 * 通过ajax同步方式取得后台json格式的数据， async : 是否同步 requestData ： 请求数据
 */
function getJsonDataAndSetToVar(url, async, requestData) {
	var returnData;
	$.ajax({
		type : "get",
		url : url,
		async : async,
		data : requestData,
		dataType : "json",
		success : function(data) {
			returnData = data;
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
		}
	});
	return returnData;
}
