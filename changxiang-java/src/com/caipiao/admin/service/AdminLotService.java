package com.caipiao.admin.service;

import com.caipiao.data.service.AddCaiqiService;
import com.caipiao.entity.Bc_buy;
import com.caipiao.entity.Bc_lottery;
import com.caipiao.intface.Bc_buyIntface;
import com.caipiao.intface.Bc_buylotIntface;
import com.caipiao.intface.Bc_buyuserIntface;
import com.caipiao.intface.Bc_lotteryIntface;
import com.caipiao.intfaceImpl.BuyIntfaceImpl;
import com.caipiao.intfaceImpl.BuylotIntfaceImpl;
import com.caipiao.intfaceImpl.BuyuserIntfaceImpl;
import com.caipiao.intfaceImpl.LotteryIntfaceImpl;
import com.caipiao.utils.TimeUtil;
import java.util.HashMap;
import java.util.List;

public class AdminLotService
{
  Bc_lotteryIntface lotdao = new LotteryIntfaceImpl();
  Bc_buyIntface buydao = new BuyIntfaceImpl();
  Bc_buylotIntface buylotdao = new BuylotIntfaceImpl();
  Bc_buyuserIntface buyuser = new BuyuserIntfaceImpl();

  public List findsLot(String lot, int start, int limit)
  {
    return this.lotdao.findNowAfter(TimeUtil.getToday("yyyy-MM-dd HH:mm:ss"), lot, start, limit);
  }

  public int findsLotCount(String lot) {
    return this.lotdao.findNowAfterCount(TimeUtil.getToday("yyyy-MM-dd HH:mm:ss"), lot);
  }

  public List findsLot(String lot, String qihao, int havehm, int isopen, String nowtime, int start, int limit) {
    return this.lotdao.finds(lot, qihao, havehm, isopen, null, nowtime, start, limit);
  }

  public int findsLotCount(String lot, String qihao, int havehm, int isopen, String nowtime) {
    return this.lotdao.findsCount(lot, qihao, havehm, isopen, null, nowtime);
  }

  public void AddQihao(String lot, int days, String riqi, String qihao) {
    new AddCaiqiService().AddQiHao(lot, days, riqi, qihao);
  }

  public Bc_lottery findLot(int ids) {
    return this.lotdao.find(ids);
  }

  public boolean UpLot(int ids, String btime, String etime) {
    HashMap map = new HashMap();
    map.put("Lot_btime", btime);
    map.put("Lot_etime", etime);
    return this.lotdao.update(ids, map);
  }

  public boolean UpHmLot(int ids, String haoma) {
    Bc_lottery find = this.lotdao.find(ids);
    if (find != null) {
      String lot_name = find.getLot_name();
      String lot_qihao = find.getLot_qihao();
      HashMap map = new HashMap();
      map.put("Lot_haoma", haoma);
      return this.lotdao.update(lot_name, lot_qihao, map);
    }
    return false;
  }

  public List findsBuy(String name, String item, String lot, int status, int ishm, String fqihao, String btime, String etime, int start, int limit)
  {
    return this.buydao.findsBuy(name, item, lot, status, ishm, fqihao, btime, etime, start, limit);
  }

  public int findsBuyCount(String name, String item, String lot, int status, int ishm, String fqihao, String btime, String etime) {
    return this.buydao.findsBuyCount(name, item, lot, status, ishm, fqihao, btime, etime);
  }

  public List findsBuyLot(String item, String lot, String qihao, int status, int start, int limit) {
    return this.buylotdao.finds(item, lot, qihao, status, start, limit);
  }

  public int findsBuyLotCount(String item, String lot, String qihao, int status) {
    return this.buylotdao.findsCount(item, lot, qihao, status);
  }

  public List findBuy(int userid, String btime, String etime, String lottery, int status, int ishm, int start, int limit) {
    return this.buydao.findBuy(userid, btime, etime, lottery, status, ishm, start, limit);
  }

  public int findBuyCount(int userid, String btime, String etime, String lottery, int status, int ishm) {
    return this.buydao.findBuyCount(userid, btime, etime, lottery, status, ishm);
  }

  public Bc_buy find(int buy_id) {
    return this.buydao.find(buy_id);
  }

  public Bc_buy find(String item) {
    return this.buydao.findBuyOne(item);
  }

  public List findItemLot(String item) {
    return this.buylotdao.findByItem(item);
  }

  public List findItemUser(String item) {
    return this.buyuser.findByItem(item);
  }
  
  public void updateItem(String item,String buyCode){
	  buydao.updateItem(item, buyCode);
  }
  
}