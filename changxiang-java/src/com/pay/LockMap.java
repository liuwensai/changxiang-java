package com.pay;

import java.io.PrintStream;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class LockMap
{
  private static Map OrderMap = new ConcurrentHashMap();

  public static boolean lockOrder(String orderId)
  {
    Map var1 = OrderMap;
    synchronized (OrderMap) {
      if (OrderMap.containsKey(orderId)) {
        return false;
      }
      OrderMap.put(orderId, orderId);
      return true;
    }
  }

  public static boolean unlockOrder(String orderId)
  {
    Map var1 = OrderMap;
    synchronized (OrderMap) {
      if (OrderMap.containsKey(orderId)) {
        OrderMap.remove(orderId);
      }

      return true;
    }
  }

  public static void main(String[] args) {
    System.out.println(lockOrder("123"));
    System.out.println(lockOrder("123"));
    System.out.println(OrderMap);
    unlockOrder("123");
    System.out.println(lockOrder("123"));
    System.out.println(OrderMap);
  }
}