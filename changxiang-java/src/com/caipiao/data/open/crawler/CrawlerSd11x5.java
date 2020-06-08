package com.caipiao.data.open.crawler;

import com.caipiao.utils.LotEmun;
import com.caipiao.utils.OmmitUtil;
import com.caipiao.utils.TimeUtil;
import java.util.HashMap;

public class CrawlerSd11x5 extends OpenCrawler
{
  public CrawlerSd11x5()
  {
    this.lot = LotEmun.Sd11x5.name;
  }

  public HashMap getHaoma(int i) {
    return GetOpenNumber.GetSd11x5(i);
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
    if (num >= 10) {
      result = day + num;
    } else if ((num > 0) && (num < 10)) {
      result = day + "0" + num;
    } else {
      long stringToLong = TimeUtil.StringToLong(day, "yyyyMMdd") - 86400000L;
      String oldday = TimeUtil.LongToString(stringToLong, "yyyyMMdd");
      result = oldday + "78";
    }

    return result;
  }

  public String getOmmit(String oldommit, String haoma) {
    return OmmitUtil._11x5(oldommit, haoma);
  }
}