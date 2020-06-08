package com.caipiao.data.open.crawler;

import com.caipiao.utils.LotEmun;
import com.caipiao.utils.OmmitUtil;
import com.caipiao.utils.TryStatic;
import java.util.HashMap;

public class CrawlerFc3d extends OpenCrawler
{
  public CrawlerFc3d()
  {
    this.lot = LotEmun.Fc3d.name;
  }

  public HashMap getHaoma(int i) {
    return GetOpenNumber.GetFc3d(i);
  }

  public String getOldQihao(String qihao) {
    String result = "";
    String year = qihao.substring(0, 4);
    String nums = qihao.substring(4);
    int num = TryStatic.StrToInt(nums, 1);
    num--;
    if (num >= 100)
      result = year + num;
    else if ((num >= 10) && (num < 100))
      result = year + "0" + num;
    else if ((num > 0) && (num < 10)) {
      result = year + "00" + num;
    }

    return result;
  }

  public String getOmmit(String oldommit, String haoma) {
    return OmmitUtil.Fc3d_Pl3(oldommit, haoma);
  }
}