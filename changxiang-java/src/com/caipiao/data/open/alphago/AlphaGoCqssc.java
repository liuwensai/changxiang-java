package com.caipiao.data.open.alphago;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;

import com.caipiao.intface.Bc_buyIntface;
import com.caipiao.intfaceImpl.BuyIntfaceImpl;
import com.caipiao.service.systeminit.UserStatic;
import com.caipiao.utils.LotEmun;
import com.caipiao.utils.LotSale;
public class AlphaGoCqssc extends OpenAlphaGo
{
	Bc_buyIntface buy = new BuyIntfaceImpl();
  public AlphaGoCqssc()
  {
    this.lot = LotEmun.Cqssc.name;
  }

  public void Instance() {
	  	int isopen = LotSale.getLotSale(this.lot);
	  	if (isopen != 1 ) {
		    System.out.println(LotEmun.valueOf(this.lot).namestr + " AlphaGo 自动发单中...");	    
		    try {	    	
		    	List userlist=UserStatic.findByUser_type("14");
		    	int usercount=userlist.size()/3;    	
		    	for (int i = 0; i < usercount; i++) {
		    		String  result= doAlphaGo();
		    		Thread.sleep(2000L);
		    		System.out.println("----AlphaGo-期号 -"+LotEmun.valueOf(this.lot).namestr+" ---发单结果------"+ result);
		    	}
			} catch (ServletException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}catch (InterruptedException localInterruptedException)
		    {
		    } 
		}
   
	  }
}