package com.caipiao.data.listion;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import com.caipiao.data.open.MethodGendan;
import com.caipiao.data.open.MethodHemai;
import com.caipiao.data.open.OpenService;
import com.caipiao.entity.Bc_buy;
import com.caipiao.entity.Bc_buyuser;
import com.caipiao.entity.Bc_user;
import com.caipiao.service.systeminit.UserStatic;
import com.caipiao.utils.NowQihao;
import com.caipiao.utils.TimeUtil;

public class TaskGendan implements Job{
	  private int isopen = 0;
	  public String time = "0/30 * * * * ?";
	public void execute(JobExecutionContext arg0) throws JobExecutionException {
	    if (this.isopen == 0) {
	        this.isopen = 1;
	        try
	        {
	          new MethodGendan().Instance();
	        } finally {
	          this.isopen = 0;
	        }
	      } else {
	        System.out.println("=====自动跟单任务正在运行=====");
	      }
		
	}
}
