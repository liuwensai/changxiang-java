package com.caipiao.data.open;

import com.caipiao.entity.out.OpenEntity;
import com.caipiao.intface.Bc_buylotIntface;
import com.caipiao.intfaceImpl.BuylotIntfaceImpl;
import com.caipiao.utils.LockList;
import com.caipiao.utils.Log;
import com.caipiao.utils.LotEmun;
import java.io.PrintStream;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

public class OpenThread extends Thread
{
	
  @SuppressWarnings("unused")
  private static final int open = 1;
  Bc_buylotIntface dao = new BuylotIntfaceImpl();
  private String Lot_qihao;
  private String Lot_name;

  public OpenThread(String lot, String qihao, String haoma)
  {
    this.Lot_qihao = qihao;
    this.Lot_name = lot;
  }

  
  public void run() {
    System.out.println("**************执行了开奖线程类");
    long start = System.currentTimeMillis();
    String o = this.Lot_name + "-" + this.Lot_qihao;
    if (!LockList.openlock.contains(o)) {
      LockList.openlock.add(o);
      try
      {
        List finds = this.dao.findEntityList(this.Lot_name, this.Lot_qihao, 1);
        if (finds != null) {
          Iterator var6 = finds.iterator();
          while (var6.hasNext()) {
            OpenEntity end = (OpenEntity)var6.next();
            new MethodOpen().Open(end);
          }
          long end1 = System.currentTimeMillis();
          Log.ShowInfo(LotEmun.valueOf(this.Lot_name) + " 第" + this.Lot_qihao + " 开奖完成，共" + finds.size() + "注。派奖时间:" + (end1 - start) + "ms");
        }
      } finally {
        LockList.openlock.remove(o);
        System.out.println("开奖任务锁：" + o + "<--" + LockList.openlock);
      }
    }
  }
}