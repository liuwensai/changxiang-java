package com.caipiao.data.open;

import com.caipiao.entity.Bc_lottery;
import com.caipiao.intface.Bc_lotteryIntface;
import com.caipiao.intfaceImpl.LotteryIntfaceImpl;
import com.caipiao.utils.Log;
import com.caipiao.utils.SystemSet;
import com.caipiao.utils.TimeUtil;
import com.caipiao.utils.TryStatic;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Properties;
import java.util.Set;

public class NumberService
{
  long yctime = 40L;
  static Bc_lotteryIntface dao = new LotteryIntfaceImpl();
  Set set = new HashSet();

  public NumberService() {
    long time = System.currentTimeMillis();
    String btime = TimeUtil.LongToString(time - 7200000L, "yyyy-MM-dd HH:mm:ss");
    String ntime = TimeUtil.LongToString(time, "yyyy-MM-dd HH:mm:ss");
    List findNotOpenByTime = dao.findNotOpenByTime(btime, ntime);
    if (findNotOpenByTime != null) {
      long nowtime = System.currentTimeMillis();
      Iterator var9 = findNotOpenByTime.iterator();

      while (var9.hasNext()) {
        Bc_lottery b = (Bc_lottery)var9.next();
        String lot_name = b.getLot_name();
        this.yctime = TryStatic.StrToInt(SystemSet.crawler.getProperty(lot_name));
        long etime = TimeUtil.StringToLong(b.getLot_etime(), "yyyy-MM-dd HH:mm:ss");
        if (nowtime >= etime + this.yctime * 1000L) {
          Log.ShowInfo(ntime + ":发现" + lot_name + "有开奖号码需要抓取！");
          this.set.add(lot_name);
        }
      }
    }
  }

  public void Instance()
  {
    if (this.set.size() > 0) {
      Iterator var2 = this.set.iterator();

      while (var2.hasNext()) {
        String s = (String)var2.next();
        NumberThread getOpenThread = new NumberThread(s);
        getOpenThread.start();
      }
    }
  }
}