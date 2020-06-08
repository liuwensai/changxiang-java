package com.caipiao.servlet.app;

import com.caipiao.entity.Bc_lotsale;
import com.caipiao.entity.Bc_lottery;
import com.caipiao.entity.Bc_user;
import com.caipiao.entity.out.BuyOneOut;
import com.caipiao.service.GroupBuyService;
import com.caipiao.service.lottery.BuyLotService;
import com.caipiao.service.systeminit.UserStatic;
import com.caipiao.utils.AppUtils;
import com.caipiao.utils.LotEmun;
import com.caipiao.utils.LotSale;
import com.caipiao.utils.NowQihao;
import com.caipiao.utils.TryStatic;
import com.caipiao.utils.UserSession;
import com.sysbcjzh.utils.IndexAction;
import com.sysbcjzh.utils.StringUtils;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.sf.json.JSONObject;

public class Lottery extends IndexAction{
	
  private static final long serialVersionUID = -8392279409754849759L;
  private BuyLotService service = new BuyLotService();
  GroupBuyService hmservice = new GroupBuyService();

  @SuppressWarnings("unchecked")
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
  {
    PrintWriter out = response.getWriter();
    HashMap result = new HashMap();
    List finds = LotSale.finds();
    ArrayList demap = new ArrayList();
    Iterator var8 = finds.iterator();

    while (var8.hasNext()) {
      Bc_lotsale b = (Bc_lotsale)var8.next();
      if (b.getLotsale_status() == 0) {
        HashMap temp = new HashMap();
        String lotsale_name = b.getLotsale_name();
        temp.put("lottery", lotsale_name);
        temp.put("lotname", LotEmun.valueOf(lotsale_name).namestr);
        temp.put("image", AppUtils.LotImg(lotsale_name));
        temp.put("info", AppUtils.LotInfo(lotsale_name));
        temp.put("info2", AppUtils.LotInfo2(lotsale_name));
        demap.add(temp);
      }
    }

    result.put("result", "true");
    result.put("data", demap);
    out.print(JSONObject.fromObject(result));
    out.flush();
    out.close();
  }

  public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
  }

  @SuppressWarnings("unchecked")
  public void TimeGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    PrintWriter out = response.getWriter();
    String lot = request.getParameter("lottery");
    HashMap result = new HashMap();
    if (StringUtils.isNotBlank(lot)) {
      String times = NowQihao.getNowTime(lot);
      if (StringUtils.isNotBlank(times)) {
        String[] split = times.split("#");
        result.put("result", "true");
        result.put("qihao", split[0]);
        result.put("endtime", split[3]);
        result.put("agotime", split[1]);
        result.put("issale", "0".equals(split[5]) ? "true" : "false");
      } else {
        result.put("result", "err");
      }
    } else {
      result.put("result", "err");
    }

    out.print(JSONObject.fromObject(result));
    out.flush();
    out.close();
  }

  @SuppressWarnings("unchecked")
  public void BuyGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    PrintWriter out = response.getWriter();
    String user = UserSession.getUser(request);
    HashMap result = new HashMap();
    String temp = "nologin";
    if (user != null) {
      String lot = request.getParameter("lot");
      String moneys = request.getParameter("money");
      String code = request.getParameter("code");
      String ishms = request.getParameter("ishm");
      String qihaolist = request.getParameter("qihao");
      String beishulist = request.getParameter("beishu");
      String isconts = request.getParameter("iscont");
      String isopens = request.getParameter("isopen");
      String buymons = request.getParameter("buymon");
      String baos = request.getParameter("bao");
      String takes = request.getParameter("take");
      if (StringUtils.isNotEmptyAll(new String[] { lot, moneys, code, ishms, qihaolist, beishulist })) {
        String[] qihao = qihaolist.split(",");
        String[] beishustr = beishulist.split(",");
        if (qihao.length != beishustr.length) {
          temp = "err";
        } else {
          int[] beishu = new int[beishustr.length];

          for (int money = 0; money < beishustr.length; money++) {
            beishu[money] = TryStatic.StrToInt(beishustr[money], 1);
          }

          Double var29 = Double.valueOf(TryStatic.StrToDouble(moneys, 0.0D));
          Double buymon = Double.valueOf(TryStatic.StrToDouble(buymons, 0.0D));
          Double bao = Double.valueOf(TryStatic.StrToDouble(baos, 0.0D));
          int ishm = 0;
          if (buymon.doubleValue() > 0.0D) {
            ishm = TryStatic.StrToInt(ishms, 0);
          }

          int take = TryStatic.StrToInt(takes, 0);
          take = take > 10 ? 10 : take;
          int isopen = TryStatic.StrToInt(isopens, 0);
          int iscont = TryStatic.StrToInt(isconts, 0);
          String buy = this.service.Buy(UserStatic.find(user), lot, var29, buymon, bao, code, ishm, take, isopen, qihao, beishu, iscont);
          if ("-1".equals(buy))
            temp = "期号过期";
          else if ("0".equals(buy))
            temp = "代购成功";
          else if ("1".equals(buy))
            temp = "金额错误";
          else if ("2".equals(buy))
            temp = "余额不足";
        }
      }
      else {
        temp = "err";
      }
    }

    result.put("result", temp);
    out.print(JSONObject.fromObject(result));
    out.flush();
    out.close();
  }

  
  @SuppressWarnings("unchecked")
  public void HemaiGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    String lot = request.getParameter("lottery");
    if (("all".equals(lot)) || (StringUtils.isBlank(lot))) {
      lot = null;
    }

    PrintWriter out = response.getWriter();
    JSONObject json = new JSONObject();
    List findsHM = this.hmservice.findsHM(null, lot, -1, -1, -2, 0, 20);
    if (findsHM != null)
      json.put("data", findsHM);
    else {
      json.put("data", "no");
    }

    out.print(json.toString());
    out.flush();
    out.close();
  }

  @SuppressWarnings("unchecked")
  public void OneGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    PrintWriter out = response.getWriter();
    String spm = request.getParameter("item");
    BuyOneOut findBuy = this.service.findBuy(spm);
    JSONObject json = new JSONObject();
    if (findBuy != null) {
      String user = UserSession.getUser(request);
      String item = findBuy.getBuy_item();
      List findsBuyLot = this.service.findsBuyLot(item);
      int buy_ishm = findBuy.getBuy_ishm();
      String admin = UserSession.getAdmin(request);
      if ((1 == buy_ishm) && ((findBuy.getUser_name().equals(user)) || (StringUtils.isNotBlank(admin)))) {
        List findsBuyUser = this.service.findsBuyUser(item);
        json.put("buy", findBuy);
        json.put("qihaolist", findsBuyLot);
        json.put("buyuser", findsBuyUser);
      } else {
        json.put("data", "no");
      }
    } else {
      json.put("data", "no");
    }

    out.print(json.toString());
    out.flush();
    out.close();
  }

  public void HemaibuyGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    PrintWriter out = response.getWriter();
    String user = UserSession.getUser(request);
    JSONObject json = new JSONObject();
    String result = "nologin";
    if (user != null) {
      Bc_user find = UserStatic.find(user);
      if (find != null) {
        String item = request.getParameter("item");
        String lot = request.getParameter("lot");
        String fqh = request.getParameter("fqh");
        String mon = request.getParameter("mon");
        if (StringUtils.isNotEmptyAll(new String[] { item, lot, fqh, mon })) {
          double buymon = TryStatic.StrToDouble(mon, 0.0D);
          String buy = this.service.BuyHM(find, item, lot, fqh, Math.ceil(buymon), "");
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
        else {
          result = "err";
        }
      } else {
        result = "err";
      }
    }

    json.put("result", result);
    out.print(result);
    out.flush();
    out.close();
  }

  @SuppressWarnings("unchecked")
  public void OpenGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    PrintWriter out = response.getWriter();
    List findOpen = NowQihao.findOpen();
    HashMap result = new HashMap();
    if (findOpen != null) {
      ArrayList demap = new ArrayList();
      Iterator var8 = findOpen.iterator();

      while (var8.hasNext()) {
        Bc_lottery l = (Bc_lottery)var8.next();
        HashMap temp = new HashMap();
        temp.put("lot_name", l.getLot_name());
        temp.put("lot_haoma", l.getLot_haoma());
        temp.put("lot_qihao", l.getLot_qihao());
        temp.put("lot_cname", LotEmun.valueOf(l.getLot_name()).namestr);
        temp.put("lot_etime", l.getLot_etime());
        demap.add(temp);
      }

      result.put("data", demap);
    } else {
      result.put("data", "no");
    }

    out.print(JSONObject.fromObject(result));
    out.flush();
    out.close();
  }

  public void OpenLotGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    PrintWriter out = response.getWriter();
    String lot = request.getParameter("lottery");
    JSONObject json = new JSONObject();
    if (StringUtils.isNotBlank(lot)) {
      List findOpenByLot = NowQihao.findOpenByLot(lot);
      if (findOpenByLot != null)
        json.put("data", findOpenByLot);
      else
        json.put("data", "no");
    }
    else {
      json.put("data", "err");
    }

    out.print(json.toString());
    out.flush();
    out.close();
  }

  public void OpenIdGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    PrintWriter out = response.getWriter();
    String ids = request.getParameter("qihaoid");
    JSONObject json = new JSONObject();
    if (StringUtils.isNotBlank(ids)) {
      Bc_lottery findOpenByLot = NowQihao.findQihaoId(Integer.valueOf(TryStatic.StrToInt(ids)));
      if (findOpenByLot != null)
        json.put("data", findOpenByLot);
      else
        json.put("data", "no");
    }
    else {
      json.put("data", "err");
    }

    out.print(json.toString());
    out.flush();
    out.close();
  }
}