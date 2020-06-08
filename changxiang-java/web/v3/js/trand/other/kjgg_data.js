var kjgg_data = (function(){
	var path = "#?";
	var play_dic={"1":"大乐透","21":"11选5","50":"双色球","51":"福彩3D","2":"排列三","3":"排列5","4":"七星彩","6":"胜负彩/任选9","7":"六场半全场","8":"四场进球"};
	
    return {
        getKJGG_Index: function(k) {
        	var postData = {"key":k};
        	var obj = {};
        	obj.msg = getDataForAPI(postData);
            for(var i =0;i<obj.msg.length;i++){
            	obj.msg[i].url=path+"page=kjgg_list&lot_code="+obj.msg[i].lot_code;
            	var opencode = obj.msg[i].opend_code;
        		var allcode = opencode.split("|") ;        		
        		var red = [] ;
        		var blue = [] ;
        		if(allcode.length > 1){
        			red = allcode[0].split(",") ;
        			blue = allcode[1].split(",") ;
        		} else {
        			red = allcode[0].split(",") ;
        		}
        		obj.msg[i].red=red;
            	obj.msg[i].blue=blue;
            }
            return obj;
        },
        getKJGG_List: function() {//历史开奖list数据
        	//获取参数
        	var hash = window.location.hash.substring(1);        	
        	var par = getQueryString("lot_code",hash);
        	var key_dic={"1":"200201","2":"200202","3":"200203","4":"200204","6":"200206","7":"200207","8":"200208","21":"200221","50":"200250","51":"200251"};
        	var order = key_dic[par];
        	var size = par == 21 ? '100':'30';
        	//获取历史开奖数据
        	var postData = {"key":order,"size":size};
        	var obj = {};
        	obj.msg= getDataForAPI(postData);
        	obj.path = path;
            for(var i =0;i<obj.msg.length;i++){
            	obj.msg[i].url=path+"page=kjgg_detail&lot_code="+obj.msg[i].lot_code+"&issue_id="+obj.msg[i].issue_id;//详情路径.....?期号+彩种  
            	
            	//处理开奖时间
            	var tem = getMydate(""+obj.msg[i].open_time+"");
            	//var temDate = new Date();
            	obj.msg[i].monthly = tem[0];//获取月日
            	obj.msg[i].week = tem[1];//获取 周
            	//处理开奖号码 
            	var opencode = obj.msg[i].opend_code;
        		var allcode = opencode.split("|") ;
        		var red = [] ;
        		var blue = [] ;
        		if(allcode.length > 1){
        			red = allcode[0].split(",") ;
        			blue = allcode[1].split(",") ;
        		} else {
        			red = allcode[0].split(",") ;
        		}
        		obj.msg[i].red=red;
            	obj.msg[i].blue=blue;
            }
            obj.lot_code=par;
            obj.lot_name = play_dic[par];
            document.title = play_dic[par]+"历史开奖";
            
            return obj;
        },
        //获取开奖详情，全彩种
        getKJGG_Detail:function(){
        	//获取参数
        	var hash = window.location.hash.substring(1);
        	var lot_code = getQueryString("lot_code",hash);
        	var issue_id = getQueryString("issue_id",hash);
        	var par = {"key":200300,"lot_code":lot_code,"issue_id":issue_id};
        	var obj = {};
        	obj.msg = getDataForAPI(par);
        	obj.path = path;
        	//处理开奖号码 
        	var opencode = obj.msg.opend_code;
    		var allcode = opencode.split("|") ;

    		var red = [] ;
    		var blue = [] ;
    		if(allcode.length > 1){
    			red = allcode[0].split(",") ;
    			blue = allcode[1].split(",") ;
    		} else {
    			red = allcode[0].split(",") ;
    		}
    		obj.msg.accmulate_prize=formatCurrency(obj.msg.accmulate_prize);
    		obj.msg.total_sales=formatCurrency(obj.msg.total_sales);
    		obj.msg.red=red;
        	obj.msg.blue=blue;
        	var tem = getMydate(""+obj.msg.open_time+"");
        	obj.msg.monthly = tem[0];//获取月日
        	obj.msg.week = tem[1];//获取 周
        	obj.msg.hour = tem[2];//时分
        	
        	obj.lot_name = play_dic[obj.msg.lot_code];
            document.title = play_dic[obj.msg.lot_code]+"开奖详情";
            return obj;
        },
        //开奖公告，对阵详情（胜负彩，六场半全场，四场进球）
        getKJGG_Match:function(){
        	var hash = window.location.hash.substring(1);
        	var lot_code = getQueryString("lot_code",hash);
        	var issue_id = getQueryString("issue_id",hash);
        	var par = {"key":302000,"lot_code":lot_code,"issue_id":issue_id};
        	var obj={};
        	obj.msg = getDataForAPI(par);
        	obj.issue_id=issue_id;
        	obj.lot_code=lot_code;
        	obj.lot_name=play_dic[lot_code];
        	document.title =play_dic[lot_code]+"对阵详情";
        	obj.path = path;
        	//拉取彩果
        	var msg = getDataForAPI({"key":200300,"lot_code":lot_code,"issue_id":issue_id});
        	var caiguo=msg.opend_code.split(",");
        	if(lot_code == "6" || lot_code == "7"){
        		for(var i=0;i<caiguo.length;i++){
        			if(caiguo[i] == "0"){
        				caiguo[i] = "负";
        			} else if(caiguo[i] == "3"){
        				caiguo[i] = "胜";
        			} else if(caiguo[i] == "1"){
        				caiguo[i] = "平";
        			}
        		}
        	}
        	obj.caiguo=caiguo;
        	
        	return obj;
        }
		
        // 略去...
    };
})();