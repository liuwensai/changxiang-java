// JavaScript Document

	 $(function(){
		 //历史记录
		$(".pailie3records").hide();
        $(".clickpailie3").toggle(function(){
            $(".clickpailie3").html("点击收起↑");
            $(".pailie3records").show();
        },function(){
            $(".clickpailie3").html("点击展开历史开奖↓");
            $(".pailie3records").hide();
        });
		//login 
		 $(".flex").focus(function(){
                ClearText(1,1);
            });
            $(".flex").blur(function(){
                ClearText(0,1);
            });
            $(".close").click(function(){
                ClearText(3,1);
            });
            
            $(".flex2").focus(function(){
                ClearText(1,2);
            });
            $(".flex2").blur(function(){
                ClearText(0,2);
            });
            $(".close2").click(function(){
                ClearText(3,2);
            });			
			
    })
	
	
 //flag为1表示清空输入框；flag为0表示还原输入框的初始状态（前提为输入框内容为空或默认文字）； flag为其他表示强制还原输入框的初始状态
        function ClearText(flag,inputName){
            var defaultText = "好彩头账号/手机号/邮箱"; //输入框默认文字
            var txtName;
            var closeName;
            
            if(inputName == 1)
            {
                txtName = $(".flex");
                closeName = $(".close");
            }
            else
            {
                txtName = $(".flex2");
                closeName = $(".close2");
            }
            
            if(flag == 1)
            {
                if(txtName.val() == defaultText)
                {
                    txtName.val("");
                    txtName.css("color","#000000");
                    closeName.text("X");
                } 
            }
            else if(flag == 0)
            {
                if(txtName.val() == defaultText || txtName.val() == "")
                {
                    txtName.val(defaultText);
                    txtName.css("color","#ccc");
                    closeName.text("");
                }
            }
            else
            {
                txtName.val(defaultText);
                txtName.css("color","#ccc");
                closeName.text("");
            }
        }