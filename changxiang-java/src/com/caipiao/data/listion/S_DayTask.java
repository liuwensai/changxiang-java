package com.caipiao.data.listion;

import com.caipiao.data.service.DMService;
import java.io.PrintStream;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

public class S_DayTask implements Job {
  public String time = "59 59 23 * * ?";

  public void execute(JobExecutionContext arg0) throws JobExecutionException
  {
    System.out.println("每日更新任务开始");
    DMService.DayInstance();
  }
}