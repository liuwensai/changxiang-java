package com.caipiao.servlet.lottery;

import com.caipiao.entity.Bc_user;
import com.caipiao.entity.out.BuyOneOut;
import com.caipiao.service.lottery.BuyLotService;
import com.caipiao.service.systeminit.UserStatic;
import com.caipiao.utils.TryStatic;
import com.caipiao.utils.UserSession;
import com.sysbcjzh.utils.IndexAction;
import com.sysbcjzh.utils.StringUtils;
import com.sysbcjzh.utils.VelocityHelper;

import java.io.IOException;
import java.io.PrintStream;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class BuyLot extends IndexAction
{
  private static final long serialVersionUID = 1L;
  private BuyLotService service = new BuyLotService();

  @SuppressWarnings("unchecked")
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
  {
    PrintWriter out = response.getWriter();
    String spm = request.getParameter("spm");
    BuyOneOut findBuy = this.service.findBuy(spm);
    if (findBuy != null) {
      VelocityHelper velo = new VelocityHelper();
      String user = UserSession.getUser(request);
      if (user != null) {
        Bc_user item = UserStatic.find(user);
        velo.Put("user", item);
      }

      String item1 = findBuy.getBuy_item();
      List findsBuyLot = this.service.findsBuyLot(item1);
      int buy_ishm = findBuy.getBuy_ishm();
      velo.Put("buy", findBuy);
      velo.Put("lot", findsBuyLot);
      if (1 == buy_ishm) {
        List admin = this.service.findsBuyUser(item1);
        velo.Put("buyuser", admin);
        velo.init("my/itemhm.vm", out);
      } else {
        String admin1 = UserSession.getAdmin(request);
        if ((!findBuy.getUser_name().equals(user)) && (!StringUtils.isNotBlank(admin1)))
          out.print("<script>alert('该订单您无权查看。');location.href='/index.html';</script>");
        else
          velo.init("my/itemzg.vm", out);
      }
    }
    else {
      System.out.println("订单不存在！");
    }

    out.flush();
    out.close();
  }

//  public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
//  {
//    PrintWriter out = response.getWriter();
//    String user = UserSession.getUser(request);
//    String result = "no";
//    if (user != null) {
//      String lot = request.getParameter("lot");
//      String moneys = request.getParameter("money");
//      String code = request.getParameter("code").trim();
//      String ishms = request.getParameter("ishm");
//      String qihaolist = request.getParameter("qihao").trim();
//      String beishulist = request.getParameter("beishu");
//      String isconts = request.getParameter("iscont");
//      String isopens = request.getParameter("isopen");
//      String buymons = request.getParameter("buymon");
//      String baos = request.getParameter("bao");
//      String takes = request.getParameter("take");
//    //首先重号判断	
//	List<String> list = new ArrayList<>();
//	String str[] = qihaolist.split(",");
//	list = Arrays.asList(str);
//	HashSet<String> hashSet = new HashSet<>(list);
//	code="308:-,-,01234,01234,01234:125:3   "+"\n".trim();
//
////		//存在重复期号不能购买追期,下注号码为空的不能下注
////	if (list.size() != hashSet.size() || (code == null || "".equals(code.trim()) ) ) {
////			result = "err";
////	}else {
//		 if (StringUtils.isNotEmptyAll(new String[] { lot, moneys, code, ishms, qihaolist, beishulist })) {
//		        String[] qihao = qihaolist.split(",");
//		        String[] beishustr = beishulist.split(",");
//		        if (qihao.length != beishustr.length) {
//		          result = "err";
//		        } else {
//		          int[] beishu = new int[beishustr.length];
//
//		          for (int money = 0; money < beishustr.length; money++) {
//		            beishu[money] = TryStatic.StrToInt(beishustr[money], 1);
//		          }
//
//		          Double var27 = Double.valueOf(TryStatic.StrToDouble(moneys, 0.0D));
//		          Double buymon = Double.valueOf(TryStatic.StrToDouble(buymons, 0.0D));
//		          Double bao = Double.valueOf(TryStatic.StrToDouble(baos, 0.0D));
//		          int ishm = 0;
//		          if (buymon.doubleValue() > 0.0D) {
//		            ishm = TryStatic.StrToInt(ishms, 0);
//		          }
//
//		          int take = TryStatic.StrToInt(takes, 0);
//		          take = take > 10 ? 10 : take;
//		          int isopen = TryStatic.StrToInt(isopens, 0);
//		          int iscont = TryStatic.StrToInt(isconts, 0);
//		          if (bao < 0.0D) {
//					bao = 0.0;
//		          	}
//		          result = this.service.Buy(UserStatic.find(user), lot, var27, buymon, bao, code, ishm, take, isopen, qihao, beishu, iscont);
//		        }
//		      } else {
//		        result = "err";
//		      }
//	}
//      
//     
//   
//
//    out.print(result);
//    out.flush();
//    out.close();
//  }

  public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
  {
    PrintWriter out = response.getWriter();
    String user = UserSession.getUser(request);
    String result = "no";
    if (user != null) {
      String lot = request.getParameter("lot");
      String moneys = request.getParameter("money");
//      String code = request.getParameter("code").trim().replaceAll("\\s*", "");
      String code = request.getParameter("code").trim();
      String ishms = request.getParameter("ishm");
      String qihaolist = request.getParameter("qihao").trim();
      String beishulist = request.getParameter("beishu");
      String isconts = request.getParameter("iscont");
      String isopens = request.getParameter("isopen");
      String buymons = request.getParameter("buymon");
      String baos = request.getParameter("bao");
      String takes = request.getParameter("take");
    //首先期号重号判断	
	List<String> list = new ArrayList<>();
	String str[] = qihaolist.split(",");
	list = Arrays.asList(str);
	HashSet<String> hashSet = new HashSet<>(list);
		//存在重复期号不能购买追期,下注号码为空的不能下注,拖胆号码存在重复不可购买（数据异常）
	if (list.size() != hashSet.size() || (code == null || "".equals(code.trim()) || this.tlikeString(code)==2   ) ) {
			result = "err";
	}else {
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
		          int ishm = 0;
		          if (buymon.doubleValue() > 0.0D) {
		            ishm = TryStatic.StrToInt(ishms, 0);
		          }

		          int take = TryStatic.StrToInt(takes, 0);
		          take = take > 10 ? 10 : take;
		          int isopen = TryStatic.StrToInt(isopens, 0);
		          int iscont = TryStatic.StrToInt(isconts, 0);
		          if (bao < 0.0D) {
					bao = 0.0;
		          	}
		          result = this.service.Buy(UserStatic.find(user), lot, var27, buymon, bao, code, ishm, take, isopen, qihao, beishu, iscont);
		        }
		      } else {
		        result = "err";
		      }
	}
      
     
    }

    out.print(result);
    out.flush();
    out.close();
  }
  public static  Integer  tlikeString(String str){
	  Integer result = 1;
	  String[] idp=str.split("#");		
		List<String> list1 = new ArrayList<>();
		List<String> list2 = new ArrayList<>();
		if (str.indexOf("$")!=-1) {
			for (int i = 0; i < idp.length; i++) {
				String s=idp[i].substring(0,idp[i].length() - 1);//去掉最后一位数据
				String string=s.substring(s.indexOf(":")+1, s.lastIndexOf(":"));
				if (string.indexOf(":")!=-1) {
					string=string.substring(0,string.indexOf(":"));
				}
				
				//System.out.println(string);
				
				//判断是否是胆拖，只有胆拖做验证
				if (string.indexOf("$")!=-1) {
					String  string2=string.substring(0,string.indexOf("$"));
					String  string3=string.substring(string.indexOf("$")+1);
					String[] idp2=string2.split(",");
					String[] idp3=string3.split(",");
						list1=Arrays.asList(idp2);		
						list2=Arrays.asList(idp3);		
						Collection exists=new ArrayList<String>(list2);
						exists.removeAll(list1);					
						if (list2.size()!=exists.size()) {
							 result=2;
							 break;
						}
				}
					
				}
		}
		return result;
  }
  
  public void AddHMPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    PrintWriter out = response.getWriter();
    String user = UserSession.getUser(request);
    String result = "no";
    if (user != null) {
      Bc_user find = UserStatic.find(user);
      if (find != null) {
        String item = request.getParameter("item");
        String lot = request.getParameter("lot");
        String fqh = request.getParameter("fqh");
        String mon = request.getParameter("mon");
        if (StringUtils.isNotEmptyAll(new String[] { item, lot, fqh, mon })) {
          double buymon = TryStatic.StrToDouble(mon, 0.0D);
          result = this.service.BuyHM(find, item, lot, fqh, Math.ceil(buymon), "");
        } else {
          result = "err";
        }
      } else {
        result = "err";
      }
    }

    out.print(result);
    out.flush();
    out.close();
  }

  public void CheDanPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    PrintWriter out = response.getWriter();
    String user = UserSession.getUser(request);
    String result = "nologin";
    if (user != null) {
      Bc_user find = UserStatic.find(user);
      if (find != null) {
        String idsstr = request.getParameter("ids");
        int ids = TryStatic.StrToInt(idsstr);
        if (ids > 0)
          result = this.service.CheDan(find, ids);
        else
          result = "1";
      }
      else {
        result = "err";
      }
    }

    out.print(result);
    out.flush();
    out.close();
  }
}