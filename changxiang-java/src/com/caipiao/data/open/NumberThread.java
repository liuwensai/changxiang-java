package com.caipiao.data.open;

import com.caipiao.data.open.crawler.CrawlerAhk3;
import com.caipiao.data.open.crawler.CrawlerCq11x5;
import com.caipiao.data.open.crawler.CrawlerCqssc;
import com.caipiao.data.open.crawler.CrawlerDlt;
import com.caipiao.data.open.crawler.CrawlerFc3d;
import com.caipiao.data.open.crawler.CrawlerGd11x5;
import com.caipiao.data.open.crawler.CrawlerGxk3;
import com.caipiao.data.open.crawler.CrawlerHnssc;
import com.caipiao.data.open.crawler.CrawlerJsk3;
import com.caipiao.data.open.crawler.CrawlerJx11x5;
import com.caipiao.data.open.crawler.CrawlerJxssc;
import com.caipiao.data.open.crawler.CrawlerPl3;
import com.caipiao.data.open.crawler.CrawlerPl5;
import com.caipiao.data.open.crawler.CrawlerSd11x5;
import com.caipiao.data.open.crawler.CrawlerSh11x5;
import com.caipiao.data.open.crawler.CrawlerSsq;
import com.caipiao.data.open.crawler.CrawlerTxffc;
import com.caipiao.data.open.crawler.CrawlerYnssc;
import com.caipiao.utils.LockList;

import java.io.PrintStream;
import java.util.Set;

public class NumberThread extends Thread
{
  private String Lot_name;

  public NumberThread(String name)
  {
    this.Lot_name = name;
  }

  public void run() {
    if (!LockList.numberlock.contains(this.Lot_name)) {
      LockList.numberlock.add(this.Lot_name);
      try
      {
        if ("Cqssc".equals(this.Lot_name))
          new CrawlerCqssc().Instance();
        else if ("Jxssc".equals(this.Lot_name))
          new CrawlerJxssc().Instance();
        else if ("Txffc".equals(this.Lot_name))
            new CrawlerTxffc().Instance();
        else if ("Sd11x5".equals(this.Lot_name))
          new CrawlerSd11x5().Instance();
        else if ("Jx11x5".equals(this.Lot_name))
          new CrawlerJx11x5().Instance();
        else if ("Gd11x5".equals(this.Lot_name))
          new CrawlerGd11x5().Instance();
        else if ("Cq11x5".equals(this.Lot_name))
          new CrawlerCq11x5().Instance();
        else if ("Sh11x5".equals(this.Lot_name))
          new CrawlerSh11x5().Instance();
        else if ("Jsk3".equals(this.Lot_name))
          new CrawlerJsk3().Instance();
        else if (!"Jlk3".equals(this.Lot_name)) {
          if ("Gxk3".equals(this.Lot_name))
            new CrawlerGxk3().Instance();
          else if ("Ahk3".equals(this.Lot_name))
            new CrawlerAhk3().Instance();
          else if ((!"Kl8".equals(this.Lot_name)) && (!"Dwzdy".equals(this.Lot_name)) && (!"Xync".equals(this.Lot_name)) && (!"Gdklsf".equals(this.Lot_name)) && (!"Xysc".equals(this.Lot_name)) && (!"Qyh".equals(this.Lot_name)))
            if ("Ssq".equals(this.Lot_name)) {
              new CrawlerSsq().Instance();
            } else if ("Dlt".equals(this.Lot_name)) {
              new CrawlerDlt().Instance();
            } else if ("Fc3d".equals(this.Lot_name)) {
              new CrawlerFc3d().Instance();
            } else if ("Pl5".equals(this.Lot_name)) {
              new CrawlerPl5().Instance();
            } else if ("Pl3".equals(this.Lot_name)) {
              new CrawlerPl3().Instance();
            } else if ((!"Qxc".equals(this.Lot_name)) && (!"Qlc".equals(this.Lot_name)) && (!"Hd15x5".equals(this.Lot_name)) && (!"Hcy".equals(this.Lot_name)) && (!"Hdljy".equals(this.Lot_name))) {
              if ("Hnssc".equals(this.Lot_name)) {
                System.out.println("------Hnssc-------");
                new CrawlerHnssc().Instance();
              }
              if ("Ynssc".equals(this.Lot_name)) {
                System.out.println("------Ynssc-------");
                new CrawlerYnssc().Instance();
              }
            }
        }
      }
      finally
      {
        LockList.numberlock.remove(this.Lot_name);
        System.out.println("爬虫任务锁：" + this.Lot_name + "<--" + LockList.numberlock);
      }
    }
  }
}