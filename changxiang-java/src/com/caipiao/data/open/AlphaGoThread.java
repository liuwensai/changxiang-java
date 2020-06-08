package com.caipiao.data.open;

import com.caipiao.data.open.alphago.AlphaGoCqssc;
import com.caipiao.data.open.alphago.AlphaGoGd11x5;
import com.caipiao.data.open.alphago.AlphaGoHnssc;
import com.caipiao.data.open.alphago.AlphaGoTxffc;
import com.caipiao.data.open.alphago.AlphaGoYnssc;
import com.caipiao.utils.LockList;

public class AlphaGoThread extends Thread
{
  private String Lot_name;

  public AlphaGoThread(String name)
  {
    this.Lot_name = name;
  }

  public void run() {
    if (!LockList.alphaGolock.contains(this.Lot_name)) {
      LockList.alphaGolock.add(this.Lot_name);
      try
      {
    	  if ("Cqssc".equals(this.Lot_name))
              new AlphaGoCqssc().Instance();
    	  if ("Ynssc".equals(this.Lot_name))
              new AlphaGoYnssc().Instance();
    	  if ("Hnssc".equals(this.Lot_name))
              new AlphaGoHnssc().Instance();
    	  if ("Txffc".equals(this.Lot_name))
              new AlphaGoTxffc().Instance();
    	 
    	  System.out.println("----AlphaGo--Lot_name-------"+ Lot_name);
      }
      finally
      {
        LockList.alphaGolock.remove(this.Lot_name);
        System.out.println("AlphaGo自动发单锁：" + this.Lot_name + "<--" + LockList.alphaGolock);
      }
    }
  }
}