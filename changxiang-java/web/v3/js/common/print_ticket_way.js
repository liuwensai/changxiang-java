/**
 * 脚本文件尽可能放在其他自定义脚本文件的前面，但要放在jQuery后面
 */

//全局变量
var print_ticket_way = 0;//出票方式
function printTicketWay(){
	var url = "/trade/index!printTicketWay.action?t="+new Date().getTime() ;
	baseAjax("get",url,false,null,"text",function(data){
  		var lot_state = eval("("+data+")");
		if(!(typeof lot_state=="undefined") && lot_state != null){			 
			 print_ticket_way=lot_state.msg;
		} 
  	});
}