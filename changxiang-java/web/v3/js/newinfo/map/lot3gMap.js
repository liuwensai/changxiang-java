var search = {};
search.page = 1 ;       // 当前页码
search.keyword = "" ;   // 检索关键字
search.radius = 5000;   // 周边检索半径（米）
search.point = null;   // 我的位置 
search.points = [];    // 检索出来的坐标数组
search.markerArr = [];
search.city = "天津";

var shopCityArr = [];   // 投注站总信息

// 投注站覆盖物图标
var redIcon = new BMap.Icon(path+'/v3/images/icon/red.png',   //图片地址  
        new BMap.Size(23,34),                // 标注显示大小  
       {  
		   anchor: new BMap.Size(23,34),     // 标注底部小尖尖的偏移量  
           imageOffset: new BMap.Size(0, 0)   // 这里相当于CSS sprites  
       });
var blueIcon = new BMap.Icon(path+'/v3/images/icon/blue.png',   //图片地址  
        new BMap.Size(24,36),                // 标注显示大小  
       {  
		   anchor: new BMap.Size(24,36),     // 标注底部小尖尖的偏移量  
           imageOffset: new BMap.Size(0, 0)   // 这里相当于CSS sprites  
       });
// 我的位置
var myIcon = new BMap.Icon(path+'/v3/images/icon/my_location.png',   //图片地址  
        new BMap.Size(22,22),                // 标注显示大小  
        {  
 		   anchor: new BMap.Size(11,11),     // 标注底部小尖尖的偏移量  
           imageOffset: new BMap.Size(0, 0)   // 这里相当于CSS sprites  
        });

// 富标注  显示投注站总数
var myRichMarker = {
		/**
		 * 创建自定义覆盖物
		 * @param proName   投注站地图名称
		 * @param shopNum   投注站统计数
		 * @param center    覆盖物坐标poing对象
		 * @param bmapSize  偏移量对象new BMap.Size(54,54)
		 * @param shop   多少家投注站
		 */   
		createRichMarker:function (proName,proId,shopNum,center,bmapSize) {
			var addHtml="<div class=\"circle opa_ttz-cir\"><span class=\"hide\" id=\"proId\">"+proId+"</span><div class=\"tzz_firstline\">"+proName;
			addHtml+="</div><div class=\"tzz_secondline\">"+shopNum+"</div></div>";
			return new BMapLib.RichMarker(addHtml,center,{"anchor": bmapSize, "enableDragging": false});
		}
};

// 创建Map实例
var map = new BMap.Map("shopMap");
var geolocationControl;
// 初始化地图
function initMap(point,cityName){
    map.enableScrollWheelZoom(true);             
    map.addControl(new BMap.ScaleControl());
    //map.addControl(new BMap.OverviewMapControl());
    point && map.centerAndZoom(point,11);
    cityName && map.centerAndZoom(cityName,11);
    // 右上角 仅包含缩放按钮
    var top_right_navigation = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_RIGHT,type:BMAP_NAVIGATION_CONTROL_ZOOM}); 
    map.addControl(top_right_navigation);
    
    // 右下角 定位控件
    geolocationControl = new BMap.GeolocationControl();
    map.addControl(geolocationControl);
    geolocationControl.addEventListener("locationSuccess",locationSuccess); // 定位成功
    geolocationControl.addEventListener("locationError",locationError); // 定位失败
};

// 定位成功
function locationSuccess(e){
    var address = '';
    address += e.addressComponent.province;
    address += e.addressComponent.city;
    address += e.addressComponent.district;
    address += e.addressComponent.street;
    address += e.addressComponent.streetNumber;
    search.point = e.point;
    showTipMessage(address);
    // 显示我附近的投注站
    showMyRoundShop(search.point);
}

// 定位失败
function locationError(e){
	// 测试定位成功
	/*var point = new BMap.Point(113.898131,22.573327);
	search.point = point;
    // 显示我附近的投注站
    showMyRoundShop(search.point);*/
    
	// showTipMessage("定位失败");
	// location.href = "map!toNoGps.action";
	
	showCurrentCityMap();
	
}

function doOverlay(e,id){
	
	var position = e.target.getPosition();
	var container = $(e.target._container);
	var proId = $.trim(container.find("span").text());
	
	map.centerAndZoom(position,13);
	
	searchAllShopInfoByCityId(proId);

}

/**
 *  显示我附近的投注站
 *  @param 我的位置坐标
 */ 
function showMyRoundShop(point){
	
	// 清除地图上面的点
	map.clearOverlays();
	search.points.length=0;
	search.markerArr.length=0;
	search.keyword = '';        // 定位成功 不进行投注站名称的检索
	$("#searchText").val('');
	
	// 标注我的位置
	map.centerAndZoom(point,16);
	var marker = new BMap.Marker(point,{icon:myIcon});
	map.addOverlay(marker);
	var label = new BMap.Label("我在这里",{offset:new BMap.Size(22,-10)});
	label.setStyle({ color : "blue", fontSize : "12px" });
	marker.setLabel(label);
	
	// 检索数据
	searchAction(search.keyword,search.page,point);
	
}

/**
 *  定位失败 显示市级覆盖图标
 */
function showCurrentCityMap(){
	
	map.clearOverlays();
	search.points.length=0;
	
	var h = "<li class=\"noneinfo\"><i class=\"icon_none\"></i>定位失败，请尝试输入投注站名称查询!</span></li>";
	$("#mapList").html(h);
	
	if(shopCityArr.length==0){
		searchAllShopInfo();
	}
	var bmapSize = new BMap.Size(-27,-27);
	for(var i=0; i<shopCityArr.length; i++){
		if(!shopCityArr[i].shopPoint){
			continue;
		}
		var point_str = shopCityArr[i].shopPoint.split(",");
		var point = new BMap.Point(point_str[0],point_str[1]);
		var mySquare = myRichMarker.createRichMarker(shopCityArr[i].areaName,shopCityArr[i].areaId,shopCityArr[i].shopNum+"家", point, bmapSize);
		search.points.push(point);
		search.markerArr.push(mySquare);
		map.addOverlay(mySquare);
		mySquare.addEventListener("click",doOverlay);
	}
	map.setViewport(search.points);
};

// 删除覆盖物
function deletePoint(){
	var allOverlay = search.markerArr;
	for (var i = 0; i < allOverlay.length; i++){
		map.removeOverlay(allOverlay[i]);
	}
	search.markerArr.length=0;
}

// 修改覆盖物的颜色
function changeColor(m){
	var allOverlay = search.markerArr;
	for (var i = 0; i < allOverlay.length; i++){
		allOverlay[i].setIcon(redIcon);
	}
}

// 信息提示
function showTipMessage(mes){
	
	$("#message_tip").html(mes);
	$("#message_tip").show();
	
	var hideMessage = function(){
		$("#message_tip").fadeOut(500);
	};
	setTimeout(hideMessage,1000);
}


/**
 * 用于定位成功检索 和 投注站名称检索
 * @param 关键词
 * @param 当前页码
 * @param 用户当前位置( null表示投注站名称检索 )
 */
function searchAction(keyword,page,point){
    
	search.page = page || 0;
    
	if(search.keyword){
		search.keyword = keyword.replace('/ /g',''); 
    }else{
    	search.keyword = '';
    }
	
	var matchUrl = "/newinfo/map/map!getShopMasterForJson.action?t="+new Date().getTime();
	
	if(point){  // 定位成功 我附近的投注站
		
		baseAjax("post",matchUrl,false,{lng:point.lng,lat:point.lat,radius:search.radius,keyword:search.keyword,pageNow:search.page},"json",function(e){
			
			var content = e.contents;
			// 计算距离
			for(var i=0;i<content.length;i++){
				var shop_point = new BMap.Point(content[i].lng,content[i].lat);  
				content[i].juli = map.getDistance(point,shop_point).toFixed(2); // 米
				content[i].myLng = point.lng;
				content[i].myLat = point.lat;
				content[i].city = search.city;
			}
			// 距离排序
			content.sort(function(a,b){
				return a.juli-b.juli;
			});
			// 渲染页面
			renderMap(content,1);
			renderList(content,e.totalPage,search.page,point,1);
			
		},function(){showTipMessage("网络异常！");});
		
	}else{   // 按照投注站名称检索
		
		baseAjax("post",matchUrl,false,{keyword:search.keyword,pageNow:search.page},"json",function(e){
			
			var content = e.contents;
			// 计算距离
			for(var i=0;i<content.length;i++){
				if(search.point){
					var shop_point = new BMap.Point(content[i].lng,content[i].lat);  
					content[i].juli = map.getDistance(search.point,shop_point).toFixed(2); // 米
					content[i].myLng = search.point.lng;
					content[i].myLat = search.point.lat;
					content[i].city = search.city;
				}else{
					content[i].juli = 0; // 米
					content[i].myLng = 0;
					content[i].myLat = 0;
					content[i].city = search.city;
				}
			}
			// 距离排序
			content.sort(function(a,b){
				return a.juli-b.juli;
			});
			// 渲染页面
			renderMap(content,1);
	        renderList(content,e.totalPage,search.page,null,1);
	        
		},function(){showTipMessage("网络异常！");});
		
	}
};

// 查询投注站总信息
function searchAllShopInfo(){
	var matchUrl = "/newinfo/map/map!getShopJsonByArea.action?t="+new Date().getTime();
	baseAjax("post",matchUrl,false,null,"json",function(e){
		if(e.status==200){
			shopCityArr = e.contents;
		}else{
			shopCityArr = [];
		}
	},function(){showTipMessage("网络异常！");});
}


var cityShop = {};
cityShop.pageNow = 1;
cityShop.pageSize = 10;
cityShop.totalPage = 0;
cityShop.data = [];
// 按照 cityId 查询投注站
function searchAllShopInfoByCityId(id){
	var matchUrl = "/newinfo/map/map!getAllShopByCityId.action?t="+new Date().getTime();
	baseAjax("post",matchUrl,false,{cityId:id},"json",function(e){
		cityShop.data = e.contents;
		// 分页数据
		var totalCount = cityShop.data.length;
		if(totalCount%cityShop.pageSize==0){
			cityShop.totalPage=totalCount/cityShop.pageSize;
		}else{
			cityShop.totalPage=Math.ceil(totalCount/cityShop.pageSize);
		}
		if(cityShop.data.length>0){
			// 渲染页面
			renderMap(cityShop.data,2);
	        renderList(cityShop.data,cityShop.totalPage,cityShop.pageNow,null,2);
		}else{
			
		}
	},function(){showTipMessage("网络异常！");});
}

// 查询结果渲染地图  //handle=1 表示我附近的投注站或者按照投注站名称检索 handle=2 表示定位失败 渲染每个市的投注站
function renderMap(res,handle) {
    
	var contents = res;
	
	deletePoint();
	search.points.length = 0;
	
    // 清除数据
	$('#mapList').html('');
    
    if (contents.length == 0) {
        $('#mapList').append('<li class="noneinfo"><i class="icon_none"></i>抱歉，没有找到投注站信息，请重新查询</li>');
        setStatus({juli:0,phone:'',qq:''});
        return;
    }
    
    $.each(contents, function(i, item){
    	
    	var point = new BMap.Point(item.lng, item.lat),
            marker = new BMap.Marker(point,{icon:redIcon});
        search.points.push(point);
        marker.addEventListener('click',function(e){
        	var m = e.target;
        	$('#mapList').html('');
        	var shopHtml = template('mapList_temp',{"shopItem":item});
            $('#mapList').html(shopHtml);
            setStatus(item);
            changeColor(m);
            m.setIcon(blueIcon);
        });
        
        map.addOverlay(marker);
        // 距离最近的投注站
        if(i==0){
        	var shopHtml = template('mapList_temp',{"shopItem":item});
            $('#mapList').html(shopHtml);
            setStatus(item);
            marker.setIcon(blueIcon);
        }
        // 保存覆盖物
        search.markerArr.push(marker);
    });
    if(search.point!=null && search.point){
    	search.points.push(search.point);
    }
    // handle=2没有定位成功不显示最佳视野  设置最佳视野
    handle==2 || map.setViewport(search.points);  
};

// 渲染投注站列表
function renderList(res,pageCount,page,poi,handle) {
    
	var contents = res;  
    
	$('#listBody').html('');

    if (contents.length == 0) {
        $('#listBody').html('<li class="noneinfo"><i class="icon_none"></i>抱歉，没有找到投注站信息，请重新查询</li>');
        $("#pager").html('');
        return;
    }else{
    	
    	if(handle==2){
    		
    		var doRender = function(pn){
    			var start = (pn-1)*cityShop.pageSize;
        		var end = start+cityShop.pageSize;
        		// 获取下一页数据
        		var data = contents.slice(start,end);
        		// 渲染投注站列表
                var shopHtml = template('listBody_temp',{"contents":data});
                $('#listBody').html(shopHtml);
    		};
            
            // 渲染分页条
            function PageClick2 (pageclickednumber) {
                pageclickednumber = parseInt(pageclickednumber);
                doRender(pageclickednumber);
                $("#pager").pager({ pagenumber: pageclickednumber, pagecount: pageCount, showcount:3, buttonClickCallback: PageClick2 });
            }
            $("#pager").pager({ pagenumber: page, pagecount: pageCount, showcount:3, buttonClickCallback: PageClick2 });
            
            // 显示第一页
            doRender(cityShop.pageNow);
            
    	}else{
    		// 渲染投注站列表
            var shopHtml = template('listBody_temp',{"contents":contents});
            $('#listBody').html(shopHtml);
            // 渲染分页条
            function PageClick (pageclickednumber) {
                pageclickednumber = parseInt(pageclickednumber);
                $("#pager").pager({ pagenumber: pageclickednumber, pagecount: pageCount, showcount:3, buttonClickCallback: PageClick });
                if(poi){
                	searchAction('',pageclickednumber,poi); // 我附近的投注站 关键字为空字符
                }else{
                	searchAction(search.keyword,pageclickednumber,null);
                }
            }
            $("#pager").pager({ pagenumber: page, pagecount: pageCount, showcount:3, buttonClickCallback: PageClick });
    	}
    }
}

//设置 三个图标状态
function setStatus(t){
	
	if(t.juli==0){
		var span = $('#map_list_path').find('span');
		span.eq(0).attr("class","roadicon");
		span.eq(1).removeClass("on_foucsw");
		$('#map_list_path').attr("href","javascript:void(0);");
		$('#map_list_path').attr("onclick","showQQ('定位失败，无法查询路线')");
    }else{
    	var span = $('#map_list_path').find('span');
		span.eq(0).attr("class","roadicon-2");
		span.eq(1).addClass("on_foucsw");
		// url api 公交、驾车、步行导航
		var webappUrl = "http://api.map.baidu.com/direction?origin=latlng:"+search.point.lat+","+search.point.lng+"|name:我的位置&destination=latlng:"+t.lat+","+t.lng+"|name:"+t.shopName+"&mode=driving&region="+search.city+"&output=html&src=lot3g";
		$('#map_list_path').attr("href",webappUrl);
		$('#map_list_path').attr("onclick","");
    }
    
	if(t.phone==''){
		var span = $('#map_list_tel').find('span');
		span.eq(0).attr("class","telicon");
		span.eq(1).removeClass("on_foucsw");
		$('#map_list_tel').attr("href","javascript:void(0);");
		$('#map_list_tel').attr("onclick","showQQ('投注站未提供电话号码')");
	}else{
		var span = $('#map_list_tel').find('span');
		span.eq(0).attr("class","telicon-2");
		span.eq(1).addClass("on_foucsw");
		$('#map_list_tel').attr("href","tel:"+t.phone);
		$('#map_list_tel').attr("onclick","");
	}
	
	if(t.qq==''){
		var span = $('#map_list_qq').find('span');
		span.eq(0).attr("class","qqicon");
		span.eq(1).removeClass("on_foucsw");
		$('#map_list_qq').attr("href","javascript:void(0);");
		$('#map_list_qq').attr("onclick","showQQ('投注站未提供QQ')");
	}else{
		var span = $('#map_list_qq').find('span');
		span.eq(0).attr("class","qqicon-2");
		span.eq(1).addClass("on_foucsw");
		$('#map_list_qq').attr("href","javascript:void(0);");
		$('#map_list_qq').attr("onclick","showQQText("+t.qq+")");
	}
}

// 提示信息
function showQQ(val){
	if(!val){
		return;
	}
	$("#qq_num").html(val);
	$("#qqArt").show();
}

function showQQText(val){
	if(!val){
		return;
	}
	var html="<span>"+val+"</span><span>←长按可复制</span>";
	$("#qq_num").html(html);
	$("#qqArt").show();
}

var Utils = {
	/**
	 *  设置MAP高度
	 */
	setMapHeight: function() {
		
		var topdiv = $("#topdiv").outerHeight();
		var topsearch = $("#topsearch").outerHeight();
		var bottomli = $("#bottomli").outerHeight();
		var bottomdiv = $("#bottomdiv").outerHeight();
		var mapBoxHeight = $(document).height() - topdiv - topsearch - bottomli - bottomdiv;
	        $('#shopMap').css({height:mapBoxHeight + 'px'});
	    }
		
};

// 文档加载完成
$(document).ready(function(){
	
	/*
	// IP城市定位
	var cityCenterPoint,cityName,cityLevel; 
	var myFun = function(result){
		cityName = result.name;
		cityCenterPoint = result.center;
		cityLevel = result.level;
		initMap(cityCenterPoint);
		map.centerAndZoom(cityName,cityLevel);
	};
	var myCity = new BMap.LocalCity();
	myCity.get(myFun);*/
	
	// 初始化地图
	var proId = $("#proId").val();
	var point = null;
	if(proId=='4'){          // 天津
		search.city="天津";
	}else if(proId=='6'){   // 河北
		search.city="河北";
	}
	initMap(point,search.city);
	
	Utils.setMapHeight();
	
	searchAllShopInfo();
	
    // 开始进行定位
    geolocationControl.location();
	
	// 地图 列表切换
    $('#chgMode').bind('click', function(){
    	$('#listBox').toggle('normal',function(){
    		var div = $('#chgMode').find("div");
    		if ($('#listBox').is(":visible")){
    			div.eq(0).removeClass("map_icon1").addClass("map_icon2");
    			div.eq(1).text("地图");
            }else{
            	div.eq(0).removeClass("map_icon2").addClass("map_icon1");
    			div.eq(1).text("列表");
            }
    	});
    	$('#mapBox').toggle('normal', function(){
            if ($('#mapBox').is(":visible")) { //单显示地图时候，设置最佳视野
                map.setViewport(search.points);
            };
        });
    });
    
    // 检索投注站
    $("#searchText").keypress(function(event){
    	search.keyword = $("#searchText").val();
    	if(event.keyCode==13){
    		searchAction(search.keyword,search.page,null);
    	};
    });
    // 取消
    $("#c_qq_art").on('click',function(){
    	$("#qqArt").hide();
    });
    
});
