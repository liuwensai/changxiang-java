package com.caipiao.service.lottery;

public class ceshi {
	
	static StringBuffer str = new StringBuffer();  
    /** 
     * //汉诺塔问题 
     * @param n 盘子的个数 
     * @param x 将要移动盘子柱子 
     * @param y 要借用的柱子 
     * @param z 要移动到的柱子 
     * @return 
     */ 
    public static String hanio(int n, Object x, Object y, Object z) {  
        //String str ="";  
        if(1 == n)   
            str.append(move(x, n, z) + "\n");  
        else {  
            hanio(n-1, x, z, y);  
            str.append(move(x, n, z) + "\n") ;  
            hanio(n-1, y, x, z);  
        }  
        return str.toString();
    } 
    
    private static String move(Object x, int n, Object y) {  
        System.out.println("Move  " + n + "  from  " + x + "  to  " + y);  
        return "Move  " + n + "  from  " + x + "  to  " + y;  
    }
    
    public static void main(String[] args) {
    	Object x = 'A';
    	Object y = 'B';
    	Object z = 'C';
    	hanio(4,x,y,z);
	}
}
