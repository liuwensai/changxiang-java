package com.caipiao.data.listion;

import java.io.PrintStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

public class D_TimerListener implements ServletContextListener
{
  public void contextInitialized(ServletContextEvent event) {
    SimpleDateFormat DateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    Date d = new Date();
    String returnstr = DateFormat.format(d);
    TaskCrawler crawler = new TaskCrawler();
    TaskOpen open = new TaskOpen();
    TaskHemai hemai = new TaskHemai();
    TaskOut out = new TaskOut();
    S_DayTask day = new S_DayTask();
    S_MonthTask month = new S_MonthTask();
    TaskGendan gendan=new TaskGendan();
    //  //机器人
    TaskAlphaGo alphaGo= new TaskAlphaGo();
    try
    {
      System.out.println(returnstr + "[系统启动]");
      QuartzManager.addJob("crawler", crawler, crawler.time);
      QuartzManager.addJob("open", open, open.time);
      QuartzManager.addJob("hemai", hemai, hemai.time);
      QuartzManager.addJob("out", out, out.time);
      QuartzManager.addJob("day", day, day.time);
      QuartzManager.addJob("month", month, month.time);
      QuartzManager.addJob("gendan", gendan, gendan.time);
      QuartzManager.addJob("alphaGo", alphaGo, alphaGo.time);
    }
    catch (Exception localException)
    {
    }
  }

  public void contextDestroyed(ServletContextEvent event) {
    QuartzManager.shutdownJobs();
  }
}