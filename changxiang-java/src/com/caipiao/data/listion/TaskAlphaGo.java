package com.caipiao.data.listion;

import com.caipiao.data.open.AlphaGoService;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

public class TaskAlphaGo implements Job
{
  private int isopen = 0;
  public String time = "0/15 * 9-23 * * ? ";

  public void execute(JobExecutionContext arg0) throws JobExecutionException
  {
    if (this.isopen == 0) {
      this.isopen = 1;
      try
      {
        new AlphaGoService().Instance();
      } finally {
        this.isopen = 0;
      }
    } else {
      System.out.println("机器人自动发单任务正在运行。");
    }
  }
}