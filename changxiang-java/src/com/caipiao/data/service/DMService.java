package com.caipiao.data.service;

import com.caipiao.intface.Bc_phbIntface;
import com.caipiao.intfaceImpl.PhbIntfaceImpl;

public class DMService
{
  static Bc_phbIntface phbdao = new PhbIntfaceImpl();

  public static void DayInstance()
  {
    try {
      Thread.sleep(10000L);
    } catch (InterruptedException var1) {
      var1.printStackTrace();
    }

    phbdao.updateinit(0);
  }

  public static void MonthInstance() {
    try {
      Thread.sleep(20000L);
    } catch (InterruptedException var1) {
      var1.printStackTrace();
    }

    phbdao.updateinit(1);
  }
}