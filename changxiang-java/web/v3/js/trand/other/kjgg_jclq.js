var kjgg_jclq = {};
kjgg_jclq.init = function(template,context){
	var $context = $(context);
	kjgg_jclq.initDate($context);
	kjgg_jclq.initHTML(template,$context);
	kjgg_jclq.bindEvent(template,$context);
};
kjgg_jclq.initDate = function($context){
	var currDate=new Date();
	currDate=new Date(currDate.getTime()-1*24*60*60*1000);
	var month=currDate.getMonth()+1;
	month=(month>9?month:'0'+month);
	var date = currDate.getDate();
	date=(date>9?date:'0'+date);
	var currDateStr=currDate.getFullYear()+'-'+month+'-'+date;
	$('#date_picker',$context).val(currDateStr);
};


kjgg_jclq.initHTML = function(template,$context){
	var date=$('#date_picker',$context).val();
	var temp = new Date(date) ;
	var m=temp.getMonth()+1;
	m=(m>9?m:'0'+m);
	var d = temp.getDate();
	d=(d>9?d:'0'+d);
	var currDateStr=temp.getFullYear()+''+m+''+d;
	var jclq_info=getDataForAPI({'key':'306100','prize_time':currDateStr});
	if(jclq_info.data.length>0){
		var html=template("jclq_info",jclq_info);
		$('#jclq_table',$context).html(html);	
	}else{
		$('#jclq_table',$context).html('<td style=>今日对阵尚无开奖信息</td>');	
	}

};

kjgg_jclq.bindEvent = function(template,$context){
	$('#choose_play',$context).click(function(){
		$('#arrow',$context).toggleClass('fold');
		$('#play_dropdown',$context).toggle();
	});
	$('#play_dropdown li',$context).click(function(){
		var $this=$(this);
		$('#play_text',$context).text($this.text());
		$('#arrow',$context).toggleClass('fold');
		$('#play_dropdown',$context).hide();
		
		$('[class*="data-play"]',$context).hide();
		$('.data-play-'+$this.attr('data-play'),$context).show();
	});	
	$('#date_picker',$context).change(function(){
		$('#play_text',$context).text('胜负');
		kjgg_jclq.initHTML(template,$context);
	});
};


