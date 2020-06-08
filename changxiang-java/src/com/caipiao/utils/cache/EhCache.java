package com.caipiao.utils.cache;

import java.util.List;
import net.sf.ehcache.Cache;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Element;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class EhCache
{
  private static final Logger LOGGER = LoggerFactory.getLogger(EhCache.class);
  private static CacheManager manager;
  private static final String cache_name = "sampleCache1";

  static
  {
    if (manager == null)
      manager = new CacheManager();
  }

  public static void put(String key, Object value)
  {
    try
    {
      manager.getCache("sampleCache1").put(new Element(key, value));
    } catch (Exception var3) {
      LOGGER.error("缓存系统：cache不存在！");
      var3.printStackTrace();
    }
  }

  public static Object get(String key)
  {
    Element e = manager.getCache("sampleCache1").get(key);
    return e != null ? e.getObjectValue() : null;
  }

  public static String[] getCacheNames() {
    return manager.getCacheNames();
  }

  public static List getKeys() {
    return manager.getCache("sampleCache1").getKeys();
  }

  public static void clearAll() {
    manager.clearAll();
  }

  public static void clear(String cacheName) {
    manager.getCache(cacheName).removeAll();
  }

  public static boolean remove(String key) {
    return manager.getCache("sampleCache1").remove(key);
  }

  public static int getSize(String cacheName) {
    return manager.getCache(cacheName).getSize();
  }
}