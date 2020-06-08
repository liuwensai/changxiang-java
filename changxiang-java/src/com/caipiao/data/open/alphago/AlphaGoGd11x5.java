package com.caipiao.data.open.alphago;

import com.caipiao.data.open.crawler.GetOpenNumber;
import com.caipiao.data.service.CountMoney;
import com.caipiao.entity.Bc_user;
import com.caipiao.service.lottery.BuyLotService;
import com.caipiao.service.systeminit.UserStatic;
import com.caipiao.utils.LotEmun;
import com.caipiao.utils.LotSale;
import com.caipiao.utils.NowQihao;
import com.caipiao.utils.OmmitUtil;
import com.caipiao.utils.TimeUtil;
import com.caipiao.utils.TryStatic;
import com.sysbcjzh.utils.StringUtils;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletException;

public class AlphaGoGd11x5 extends OpenAlphaGo
{
	
   private BuyLotService service = new BuyLotService();
	
  public AlphaGoGd11x5()
  {
    this.lot = LotEmun.Gd11x5.name;
  }

  public String doAlphaGoGd11x5() throws ServletException, IOException
  {
    Bc_user bcUser= UserStatic.findRandByUser_type("14");
    String result = "no";
    if (bcUser != null) {    	
      //String lot = "Cqssc";      
      String code = getGd11x5Code(); 
      int bs=randomNum(20);//倍数
      String ishms = "1";        
	  //int zhushu= CountMoney.getAllZhushu(code, lot);
	  int zhushu= zs;
	   zs = 0;
	  int moneyAll=zhushu*2*bs;
	  if(moneyAll<=2500){//总金额不能大于15000 
	
      String moneys = moneyAll+"";
      NowQihao nowQihao= new NowQihao();
      String qihaolist= nowQihao.getNowQihao(lot);  
      String beishulist = bs+"";
      String isconts = "0";
      String isopens = "0";      
      //随机比重 50 - 100
      int randomBZ = (int) ( 50 * Math.random() + 50);
      String buymons = moneyAll*randomBZ/100 +"";      
      String baos = moneyAll - moneyAll*randomBZ/100 +"";
      String takes = "0";
      if (StringUtils.isNotEmptyAll(new String[] { lot, moneys, code, ishms, qihaolist, beishulist })) {
        String[] qihao = qihaolist.split(",");
        String[] beishustr = beishulist.split(",");
        if (qihao.length != beishustr.length) {
          result = "err";
        } else {
          int[] beishu = new int[beishustr.length];

          for (int money = 0; money < beishustr.length; money++) {
            beishu[money] = TryStatic.StrToInt(beishustr[money], 1);
          }

          Double var27 = Double.valueOf(TryStatic.StrToDouble(moneys, 0.0D));
          Double buymon = Double.valueOf(TryStatic.StrToDouble(buymons, 0.0D));
          Double bao = Double.valueOf(TryStatic.StrToDouble(baos, 0.0D));
          int ishm = 1;
          int take = TryStatic.StrToInt(takes, 0);
          take = take > 10 ? 10 : take;
          int isopen = TryStatic.StrToInt(isopens, 0);
          int iscont = TryStatic.StrToInt(isconts, 0);
          if (bao < 0.0D) {
			bao = 0.0;
          	}
          
         String buy = this.service.Buy(bcUser, lot, var27, buymon, bao, code, ishm, take, isopen, qihao, beishu, iscont);
        
          if ("-1".equals(buy))
              result = "期号过期";
            else if ("0".equals(buy))
              result = "合买成功";
            else if ("1".equals(buy))
              result = "订单剩余金额不足";
            else if ("2".equals(buy))
              result = "余额不足";
            else if ("3".equals(buy))
              result = "订单不存在";
        }
      } else {
    	  result = "err";
      }
	  
	  }
    }
	return result;

  }
  
  
  public void Instance() {
	  int isopen = LotSale.getLotSale(this.lot);
	  if (isopen !=1 ) {
		  System.out.println(LotEmun.valueOf(this.lot).namestr + " AlphaGo 自动发单中...");
		    try {
		    	//取值这类用户表中的30%发单
		    	List userlist=UserStatic.findByUser_type("14");
		    	int usercount=userlist.size()/3;    	
		    	for (int i = 0; i < usercount; i++) {
		    		String  result= doAlphaGoGd11x5();
		    		Thread.sleep(2000L);
		    		System.out.println("----AlphaGo-期号 -"+LotEmun.valueOf(this.lot).namestr+" ---发单结果------"+ result);
		    	}
			} catch (ServletException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}catch (InterruptedException localInterruptedException)
		    {
		    }  
	  }   
  }
  
  
}