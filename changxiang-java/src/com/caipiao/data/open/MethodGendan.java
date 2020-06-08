package com.caipiao.data.open;

import java.util.List;
import java.util.Random;

import com.caipiao.entity.Bc_buy;
import com.caipiao.entity.Bc_buyuser;
import com.caipiao.entity.Bc_user;
import com.caipiao.entity.out.HemaiEntity;
import com.caipiao.intface.Bc_buyIntface;
import com.caipiao.intface.Bc_buyuserIntface;
import com.caipiao.intfaceImpl.BuyIntfaceImpl;
import com.caipiao.intfaceImpl.BuyuserIntfaceImpl;
import com.caipiao.service.lottery.BuyLotService;
import com.caipiao.service.systeminit.UserStatic;
import com.caipiao.utils.LockList;
import com.caipiao.utils.Log;
import com.caipiao.utils.NowQihao;
import com.caipiao.utils.TimeUtil;
import com.caipiao.utils.TryStatic;

public class MethodGendan {
	
	static Bc_buyIntface dao = new BuyIntfaceImpl();
	Bc_buyuserIntface buyuser = new BuyuserIntfaceImpl();
	BuyLotService buyLotService=new BuyLotService();
	Bc_buyIntface buy = new BuyIntfaceImpl();
	
	
	 @SuppressWarnings("unchecked")
	  public void Instance(){
		 if (LockList.gendanlock == 0) {
		      LockList.gendanlock = 1;
	      try {
	    	String result = "";
	    	long now = System.currentTimeMillis();
	    	String nowTime = TimeUtil.LongToString(now, "yyyy-MM-dd HH:mm:ss");
	        List<HemaiEntity> list = dao.findTheGendanHemaiList(-1);
	        if (list != null && list.size() > 0)
	          for (HemaiEntity hm : list) {
	            List<Bc_user> bc_buy = this.buy.findCeshi(13);//13为跟单帐号
	            int number = new Random().nextInt(bc_buy.size());//取随机的一个测试帐号
//		            Log.ShowInfo(nowTime+" ：订单" + hm.getBuy_item() + "==正在自动跟单==");
	            	result = this.BuyHM(bc_buy.get(number), hm.getBuy_item(), hm.getBuy_lot(), hm.getBuy_fqihao(), Math.ceil(hm.getBuy_have()*0.05), "");	            		            	            
	          }
	      } finally {
	        LockList.gendanlock = 0;
	      }
		 }

	  }
	 
	 public String BuyHM(Bc_user useren, String item, String lot, String fqh, double buymon, String aotu_item)
	  {
	    String result = "";
	    if (buymon <= 0.0D) {
	      return result;
	    }
	    boolean checkBuy = NowQihao.CheckBuy(lot, fqh);
	    if (!checkBuy) {
	      return "-1";
	    }
	    //时间随机点（无规律性）
	    long nowlong = System.currentTimeMillis()+new Random().nextInt(10000+1);
        String times = TimeUtil.LongToString(nowlong, "yyyy-MM-dd HH:mm:ss");
	   
	    Bc_buy bc_buy = this.buy.findBuyOne(item);
	    int buy_ishm = bc_buy.getBuy_ishm();
	    int status = bc_buy.getBuy_status();
	    if ((bc_buy != null) && (buy_ishm != 0) && (-1 == status)) {
	      double buy_have = bc_buy.getBuy_have();
	      if (buy_have < buymon) {
	        return "1";
	      }
	      boolean monToDong = UserStatic.MonToDong(useren, buymon, item, 1, "购彩冻结");
	      if (monToDong) {
	    	this.buyLotService.UpdateHave(item, buymon);
	        Bc_buyuser enu = new Bc_buyuser();
	        enu.setBuyuser_time(times);
	        enu.setUser_id(useren.getUser_id());
	        enu.setUser_name(useren.getUser_name());
	        enu.setBuy_item(item);
	        enu.setBuyuser_money(buymon);
	        enu.setAuto_item(aotu_item);
	        this.buyuser.add(enu);
	        if (buy_have == buymon) {
	          new MethodHemai().HeimaiOne(bc_buy.getBuy_id());
	        }
	        result = "0";
	      }
	    } else {
	      result = "3";
	    }
	    return result;
	  }

}
