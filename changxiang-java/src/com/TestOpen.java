package com;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;

import javax.naming.spi.DirStateFactory.Result;

import com.caipiao.utils.TimeUtil;

//import java.util.Map;
//
//import com.caipiao.data.open.MethodOpenCode;

public class TestOpen {
	static int l_chong = 0;
	

	public static void main(String[] args) {

		//311:0,1,2,3,4,5,6,7,8,9:120===codes==1===bs==1,8,3,5,6===haoma==Hnssc
//		Map<String, Double> money = 
//			MethodOpenCode.GetWinMoney("Hnssc", "310:3,5,6,7,8,9:120", 1, "1,8,3,5,5");
//		System.out.println(money);
//		String d = "2017-09-30";
//		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");/*** 加一天*/
//		try {
//			Date dd = df.parse(d);
//		Calendar calendar = Calendar.getInstance();
//		calendar.setTime(dd);
//		calendar.add(Calendar.DAY_OF_MONTH, 1);//加一天
//		System.out.println("增加一天之后：" + df.format(calendar.getTime()));
//		} catch (ParseException e) {
//		e.printStackTrace();}
//		long time = System.currentTimeMillis();
//		String btime = TimeUtil.LongToString(time - 7200000L, "yyyy-MM-dd HH:mm:ss");
//	    String ntime = TimeUtil.LongToString(time, "yyyy-MM-dd HH:mm:ss");
//		System.out.println(btime+"====================="+ntime);
//		String reg = "/^[0-9]{1}/";
//		
//		String hm = "1";
//		
//		System.out.println(hm.matches(reg));
//		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
//		System.out.println(df.format(new Date()).toString().substring(0, 8)+"01 00:00:00");// new Date()为获取当前系统时间
//		System.out.println(df.format(new Date()).toString());
		
//		List<Integer> list1 = new ArrayList<Integer>();  
//        List<Integer> list2 = new ArrayList<Integer>();  
//        for (int i = 0; i < 100; i++) {  
//            list1.add(+i);  
//            list2.add(i*2);  
//        }  
//        
//        List<Integer> list=  getDiffrent(list1,list2);
////         System.out.println( list); 
//         
//         
//        	    String format = String.format("%03d", new Object[] { Integer.valueOf(l_chong) });
//        	     l_chong = l_chong == 999 ? 0 : l_chong + 1;
//        	    System.out.println("C" + TimeUtil.getToday("MMddHHmmss") + format);
		
		
//		String ids = "222";
//		List<String> list = new ArrayList<>();
//		String str[] = ids.split(",");
//		list = Arrays.asList(str);
//		HashSet<String> hashSet = new HashSet<>(list);  
// 		System.out.println(list);
// 		System.out.println(hashSet);
// 		if (list.size() != hashSet.size()) {
//			System.out.println("追期期号中存在重复的数据");
//		}
// 		
		
		//String	code="356:01,07,08:1:#356:02,06,07:1:#356:03,08,10:1:#356:05,07,10:1:#362:08$07:1:#362:08$09:1:#362:01$09:1:#362:08$10:1:#362:06$11:1:#356:06,08,11:1:#356:01,02,04:1:";
		String code="308:-,-,01234,01234,57:50:3#309:2,5,14,19:147:3#314:0,3,6:6:3#310:1,3,5:6:3#320:5$0,1,6,7,9:10:3#311:2,6,8:1:3#321:4$1,2,5:3:3#312:3,7,15,19,21:43:3#313:1,2,5,7,8:275:3#307:3,4,5:30:#300:小,大:1:";
		//String code= "350:01 05 07:3:#351:03,04 05:2:#353:05,04,06:1:#354:02,03,04:1:#363:11,09$09,11:2:#355:02,04:1:#364:06$02,07:2:#356:02,05,08:1:#365:07$03,09:1:#357:04,05,08,11:1:#366:03,07$04,05:1:#358:02,05,07,08,10:1:#367:06,07$01,02,03:1:#359:02,03,07,08,09,10,11:7:#368:05,06$01,02,03,04:1:#360:01,05,07,08,09,10,11:1:#369:05,06$01,02,03,07,08:1:#361:03,04,06,07,08,09,10,11:1:#370:01,02,03,04$05,06,07,08:1:";
		//String code = "112:1,6,5:1:#114:3,4,6:6:#117:1,3,5:1:#113:3,18,20:101:#116:4$2,5:4:#119:2,3$4,5,7:3:";
		String[] idp=code.split("#");		
		List<String> list1 = new ArrayList<>();
		List<String> list2 = new ArrayList<>();
		if (code.indexOf("$")!=-1) {
			for (int i = 0; i < idp.length; i++) {
				String s=idp[i].substring(0,idp[i].length() - 1);	
				String string=s.substring(s.indexOf(":")+1, s.lastIndexOf(":"));
				if (string.indexOf(":")!=-1) {
					string=string.substring(0,string.indexOf(":"));
				}
				System.out.println(string);
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
							System.out.println("数据异常。。。请刷新页面重新下单购买。。");
							break;
						}
				}
	
				}
		}
		
			
//		String string="05,06,08,10,11,07,05$05,09,10,10,07,03";
//		String  string2=string.substring(0,string.indexOf("$"));
//		String  string3=string.substring(string.indexOf("$")+1);
//		String[] idp2=string2.split(",");
//		String[] idp3=string3.split(",");
//			list1=Arrays.asList(idp2);		
//			list2=Arrays.asList(idp3);		
//			Collection exists=new ArrayList<String>(list2);
//			exists.removeAll(list1);
//			if (list2.size()!=exists.size()) {
//				
//			}
			
		}
		
 		
 		

    /** 
     * 获取两个List的不同元素 
     * @param list1 
     * @param list2 
     * @return 
     */  
    private static List<Integer> getDiffrent(List<Integer> list1, List<Integer> list2) {  
        long st = System.nanoTime();  
         List<Integer> diff = new ArrayList<Integer>();  
         List<Integer> maxList = list1;  
         List<Integer> minList = list2;  
         if(list2.size()>list1.size())  
         {  
             maxList = list2;  
             minList = list1;  
         }  
         Map<Integer,Integer> map = new HashMap<Integer,Integer>(maxList.size());  
         for (Integer string : maxList) {  
             map.put(string, 1);  
         }  
         for (Integer string : minList) {  
             if(map.get(string)!=null)  
             {  
                 map.put(string, 2);  
                 continue;  
             }  
             diff.add(string);  
         }  
         for(Map.Entry<Integer, Integer> entry:map.entrySet())  
         {  
             if(entry.getValue()==1)  
             {  
                 diff.add(entry.getKey());  
             }  
         }  
        System.out.println("getDiffrent5 total times "+(System.nanoTime()-st));  
        return diff;  
          
    } 
	
}
