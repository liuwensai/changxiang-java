package com.caipiao.data.open;

import com.caipiao.entity.Bc_lottery;
import com.caipiao.intface.Bc_lotteryIntface;
import com.caipiao.intfaceImpl.LotteryIntfaceImpl;
import com.sysbcjzh.utils.StringUtils;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

public class OpenService{
  static final int open = 0;
  Bc_lotteryIntface dao = new LotteryIntfaceImpl();

  public OpenService()
  {
    List list = this.dao.findHaveWithOpen(0);
    if (list != null) {
      Iterator var3 = list.iterator();

      while (var3.hasNext()) {
        Bc_lottery b = (Bc_lottery)var3.next();
        String lot_name = b.getLot_name();
        String lot_qihao = b.getLot_qihao();
        String lot_haoma = b.getLot_haoma();
        UpLotteryStatus(lot_name, lot_qihao);
        if (StringUtils.isNotEmptyAll(new String[] { lot_haoma, lot_name, lot_qihao })) {
          OpenThread openThread = new OpenThread(lot_name, lot_qihao, lot_haoma);
          openThread.start();
        }
      }
    }
  }

  @SuppressWarnings("unchecked")
  private void UpLotteryStatus(String lot, String qihao)
  {
    HashMap map = new HashMap();
    map.put("Lot_isopen", Integer.valueOf(1));
    this.dao.update(lot, qihao, map);
  }
}