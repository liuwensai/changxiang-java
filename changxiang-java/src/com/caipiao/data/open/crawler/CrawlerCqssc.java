package com.caipiao.data.open.crawler;

import com.caipiao.utils.LotEmun;
import com.caipiao.utils.OmmitUtil;
import com.caipiao.utils.TimeUtil;
import java.util.HashMap;

public class CrawlerCqssc extends OpenCrawler
{
  public CrawlerCqssc()
  {
    this.lot = LotEmun.Cqssc.name;
  }

  public HashMap getHaoma(int i) {
    return GetOpenNumber.GetCqssc(i);
  }

  public String getOldQihao(String qihao) {
    String result = "";
    String day = qihao.substring(0, 8);
    String nums = qihao.substring(8);
    int num = 1;
    try
    {
      num = Integer.valueOf(nums).intValue();
    }
    catch (Exception localException)
    {
    }
    num--;
    if (num >= 100) {
      result = day + num;
    } else if ((num >= 10) && (num < 100)) {
      result = day + "0" + num;
    } else if ((num > 0) && (num < 10)) {
      result = day + "00" + num;
    } else {
      long stringToLong = TimeUtil.StringToLong(day, "yyyyMMdd") - 86400000L;
      String oldday = TimeUtil.LongToString(stringToLong, "yyyyMMdd");
      result = oldday + "120";
    }

    return result;
  }

  public String getOmmit(String oldommit, String haoma) {
    return OmmitUtil.Ssc(oldommit, haoma);
  }
}