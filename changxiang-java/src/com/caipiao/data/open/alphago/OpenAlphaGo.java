package com.caipiao.data.open.alphago;

import com.caipiao.data.service.CountMoney;
import com.caipiao.entity.Bc_lottery;
import com.caipiao.entity.Bc_user;
import com.caipiao.intface.Bc_lotteryIntface;
import com.caipiao.intfaceImpl.LotteryIntfaceImpl;
import com.caipiao.service.lottery.BuyLotService;
import com.caipiao.service.systeminit.UserStatic;
import com.caipiao.utils.LotEmun;
import com.caipiao.utils.NowQihao;
import com.caipiao.utils.PlayType;
import com.caipiao.utils.SystemSet;
import com.caipiao.utils.TryStatic;
import com.sysbcjzh.utils.CheckUtil;
import com.sysbcjzh.utils.StringUtils;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Properties;
import java.util.Random;

import javax.servlet.ServletException;

import org.apache.commons.lang.ArrayUtils;

public abstract class OpenAlphaGo
{
  protected static final Properties times = SystemSet.crawler;
  protected static final Bc_lotteryIntface dao = new LotteryIntfaceImpl();
  
  private BuyLotService service = new BuyLotService();
  
  protected String lot;
  
  protected int zs;

  /**
   * @function:从数组中随机抽取若干不重复元素
   * 
   * @param paramArray:被抽取数组
   * @param count:抽取元素的个数
   * @return:由抽取元素组成的新数组
   */
  protected static String[] getRandomArray(String[] paramArray,int count){
      if(paramArray.length<count){
          return paramArray;
      }
      String[] newArray=new String[count];
      Random random= new Random();
      int temp=0;//接收产生的随机数
      List<Integer> list=new ArrayList<Integer>();
      for(int i=1;i<=count;i++){
          temp=random.nextInt(paramArray.length);//将产生的随机数作为被抽数组的索引
          if(!(list.contains(temp))){
              newArray[i-1]=paramArray[temp];
              list.add(temp); 
          }
          else{
              i--;
          }
      }
      Arrays.sort(newArray);
      return newArray;
  }

  protected static int sjNUM(){
	 java.util.Random random=new java.util.Random();// 定义随机类
	 int result=random.nextInt(10);// 返回[0,10)集合中的整数，注意不包括10
	 return result+1;
  }
  
  protected static int randomNum(int num){
	 java.util.Random random=new java.util.Random();// 定义随机类
	 int result=random.nextInt(num);// 返回[0,num)集合中的整数，注意不包括num
	 return result+1;
   }
  
  @SuppressWarnings("unchecked")
  protected String getSscCode() {
	  String code = "";	
	  StringBuffer s1_code = new StringBuffer();
	  String[] paramArray = new String[]{"0","1","2","3","4","5","6","7","8","9"};
       zs=0;
       int[] nums={6,7};
	   int num = (int) (Math.random() * nums.length);
       int count1=nums[num];
	  for (int i = 0; i < 3; i++) {		 
		  //int count1=sjNUM();				 
			String[] z1=getRandomArray(paramArray,count1);
			//第1种：
		    StringBuffer s1 = new StringBuffer();
		    for (String string : z1) {
		        s1.append(string);
		    }
		    if(i!=2){
		    	s1_code.append(s1.toString()+",");
		    }else{
		    	s1_code.append(s1.toString());
		    }		    
	  }
	   
	  String[] split = s1_code.toString().split(",");
	  
	  zs=split[0].length() * split[1].length() * split[2].length();
	  
	  //随机一个前三1、中三2、后三 3
	  String l1=randomNum(3)+"";
	  String lotnum="308";
	  if("Cqssc".equals(lot)){
		  lotnum="308";
	  }else if("Ynssc".equals(lot)){
		  lotnum="308";
	  }else if("Hnssc".equals(lot)){
		  lotnum="308";
	  }else if("Gd11x5".equals(lot)){
		  lotnum="353";
	  }else {
		  lotnum="308";
	  }
	  if("3".equals(l1)){
		  code = ""+lotnum+":-,-,"+s1_code.toString()+":"+zs+":"+l1;
	  }else if("2".equals(l1)){
		  code = ""+lotnum+":-,"+s1_code.toString()+",-:"+zs+":"+l1;
	  }else{
		  code = ""+lotnum+":"+s1_code.toString()+"-,-:"+zs+":"+l1;
	  }
	return code;	  
  }
  
  
  @SuppressWarnings("unchecked")
  protected String getGd11x5Code() {
	  String code = "";	
	  StringBuffer s1_code = new StringBuffer();
	  String[] paramArray = new String[]{"01","02","03","04","05","06","07","08","09","10","11"};
       zs=0;
	  for (int i = 0; i < 3; i++) {
		  int[] nums={3,4,5};
		  int count1 = nums[randomNum(3)] ;
		  //int count1=sjNUM();				
			String[] z1=getRandomArray(paramArray,count1);
			//第1种：
		    StringBuffer s1 = new StringBuffer();
		    for (String string : z1) {
		        s1.append(string);
		    }
		    if(i!=2){
		    	s1_code.append(s1.toString()+",");
		    }else{
		    	s1_code.append(s1.toString());
		    }		    
	  }
	  String lotnum="353";
	  code=""+lotnum+":"+s1_code.toString()+":zs:";
	  zs=this._11x5(code);
	  code=code.replace(":zs:", ":"+zs+":");
	return code;	  
  }
  
  public String doAlphaGo() throws ServletException, IOException
  {
    Bc_user bcUser= UserStatic.findRandByUser_type("14");
    String result = "no";
    if (bcUser != null) {       
      String code = getSscCode(); 
      int bs=randomNum(8);//倍数
      String ishms = "1";        
	  int zhushu= zs;
	   zs = 0;
	  int moneyAll=zhushu*2*bs;
	  if(108<=moneyAll && moneyAll<=3800){//总金额不能大于1300 
		  String moneys = moneyAll+"";
	      NowQihao nowQihao= new NowQihao();
	      String qihaolist= nowQihao.getNowQihao(lot);  
	      String beishulist = bs+"";
	      String isconts = "0";
	      String isopens = "0";      
	      //随机比重 50 - 100
	      int randomBZ = (int) ( 50 * Math.random() + 50);
//	      String buymons = moneyAll*randomBZ/100 +"";      
	      String buymons = moneyAll- (int) ( 50 * Math.random() + 50) +""; //只留几十元就满员的单子
//	      String baos = moneyAll - moneyAll*randomBZ/100 +""; 保底暂时去掉
	      String baos = "0";
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
	  }
      
      } else {
    	  result = "err";
      }
    }
	return result;

  }
  
  private static int _11x5(String code)
  {
	    int zs = 0;
	    String[] co = code.split(":");
	    String type = co[0];
	    String[] split = co[1].split(",");
	    if (ArrayUtils.contains(PlayType._11x5_ZuXuan, type)) {
	      if (CheckUtil.Regex("[0-1][0-9](,[0-1][0-9]){1,10}", co[1])) {
	        int var12 = split.length;
	        byte var14 = 0;
	        byte var16 = 1;
	        if ((!type.equals(PlayType.T355)) && (!type.equals(PlayType.T352))) {
	          if ((!type.equals(PlayType.T356)) && (!type.equals(PlayType.T354))) {
	            if (type.equals(PlayType.T357))
	              var14 = 4;
	            else if (type.equals(PlayType.T358))
	              var14 = 5;
	            else if (type.equals(PlayType.T359))
	              var14 = 6;
	            else if (type.equals(PlayType.T360))
	              var14 = 7;
	            else if (type.equals(PlayType.T361))
	              var14 = 8;
	          }
	          else
	            var14 = 3;
	        }
	        else {
	          var14 = 2;
	        }

	        zs = Combination(var12, var14) * var16;
	      }

	      return zs;
	    }

	    if (ArrayUtils.contains(PlayType._11x5_DanTuo, type)) {
	      if (CheckUtil.Regex("[0-1][0-9](,[0-1][0-9]){0,6}[$][0-1][0-9](,[0-1][0-9]){0,10}", co[1])) {
	        String[] tt1 = co[1].split("\\$");
	        int var13 = tt1[0].split(",").length;
	        int var15 = 0;
	        try
	        {
	          var15 = tt1[1].split(",").length;
	        }
	        catch (Exception localException)
	        {
	        }
	        byte var17 = 0;
	        if ((!type.equals(PlayType.T364)) && (!type.equals(PlayType.T362))) {
	          if ((!type.equals(PlayType.T365)) && (!type.equals(PlayType.T363))) {
	            if (type.equals(PlayType.T366))
	              var17 = 4;
	            else if (type.equals(PlayType.T367))
	              var17 = 5;
	            else if (type.equals(PlayType.T368))
	              var17 = 6;
	            else if (type.equals(PlayType.T369))
	              var17 = 7;
	            else if (type.equals(PlayType.T370))
	              var17 = 8;
	          }
	          else
	            var17 = 3;
	        }
	        else {
	          var17 = 2;
	        }

	        if ((var13 < var17) && (var13 > 0) && (var13 + var15 <= 11)) {
	          zs = Combination(var15, var17 - var13);
	        }
	      }

	      return zs;
	    }if (type.equals(PlayType.T350)) {
	      if (CheckUtil.Regex("[0-1][0-9](\\s[0-1][0-9]){0,10}", co[1])) {
	        String[] tt1 = co[1].split(" ");
	        zs = tt1.length;
	      }

	      return zs;
	    }

	    if (type.equals(PlayType.T351)) {
	      zs = 0;
	      if ((CheckUtil.Regex("([0-1][0-9](\\s[0-1][0-9]){0,10}),([0-1][0-9](\\s[0-1][0-9]){0,10})", co[1])) && (split.length == 2)) {
	        String[] tt1 = split[0].split(" ");
	        String[] tt2 = split[1].split(" ");

	        for (int var15 = 0; var15 < tt1.length; var15++) {
	          if (tt1[var15] != " ") {
	            for (int i = 0; i < tt2.length; i++) {
	              if ((tt2[i] != " ") && (!tt1[var15].equals(tt2[i]))) {
	                zs++;
	              }
	            }
	          }
	        }
	      }

	      return zs;
	    }if (!type.equals(PlayType.T353)) {
	      return 0;
	    }
	    zs = 0;
	    if ((CheckUtil.Regex("([0-1][0-9](\\s[0-1][0-9]){0,10}),([0-1][0-9](\\s[0-1][0-9]){0,10}),([0-1][0-9](\\s[0-1][0-9]){0,10})", co[1])) && (split.length == 3)) {
	      String[] tt1 = split[0].split(" ");
	      String[] tt2 = split[1].split(" ");
	      String[] tt3 = split[2].split(" ");

	      for (int i = 0; i < tt1.length; i++) {
	        if (tt1[i] != " ") {
	          for (int k = 0; k < tt2.length; k++) {
	            if (tt2[k] != " ") {
	              for (int n = 0; n < tt3.length; n++) {
	                if ((tt3[n] != " ") && (!tt1[i].equals(tt3[n])) && (!tt2[k].equals(tt3[n])) && (!tt1[i].equals(tt2[k]))) {
	                  zs++;
	                }
	              }
	            }
	          }
	        }
	      }
	    }

	    return zs;
	  }
  
  private static int Combination(int n, int m)
  {
    int n1 = 1;
    int n2 = 1;
    int i = n;

    for (int j = 1; j <= m; n2 *= j++) {
      n1 *= i--;
    }

    return n1 / n2;
  }
  
}