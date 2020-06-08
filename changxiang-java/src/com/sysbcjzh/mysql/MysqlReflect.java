package com.sysbcjzh.mysql;

import com.sysbcjzh.utils.BeanUtils;
import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class MysqlReflect
{
  public static Object fromMap(Class c, Map map)
  {
    if (map == null) {
      return null;
    }
    Object obj = null;
    try
    {
      Class[] e = new Class[0];
      Constructor constructor = c.getConstructor(e);
      obj = constructor.newInstance(new Object[0]);
      if (obj == null)
        return null;
    }
    catch (Exception var5) {
      return null;
    }

    return getEntity(obj, map);
  }

  public static List fromList(Class c, List mapList)
  {
    if ((mapList != null) && (mapList.size() != 0)) {
      ArrayList results = new ArrayList();
      Iterator var4 = mapList.iterator();

      while (var4.hasNext()) {
        Map map = (Map)var4.next();
        try
        {
          Object obj = null;
          Class[] paramDef = new Class[0];
          Constructor constructor = c.getConstructor(paramDef);
          obj = constructor.newInstance(new Object[0]);
          if (obj == null) {
            return null;
          }

          obj = getEntity(obj, map);
          results.add(obj);
        }
        catch (Exception localException)
        {
        }
      }
      return results;
    }
    return null;
  }

  private static Object getEntity(Object entity, Map keyValue)
  {
    try {
      Class e = entity.getClass();
      Set keys = keyValue.keySet();
      Iterator localIterator = keys.iterator();

      while (localIterator.hasNext()) {
        Object object = localIterator.next();
        String key = object.toString();
        Object obj = keyValue.get(key);
        if (key.toLowerCase().equals("descript")) {
          key = "desc";
        }
        Field field;
        try
        {
          field = e.getDeclaredField(key);
        }
        catch (Exception var10)
        {
          field = e.getSuperclass().getDeclaredField(key);
        }

        field.setAccessible(true);
        if (obj != null) {
          if ((field.getType().equals(Integer.class)) || (field.getType().equals(Integer.TYPE))) {
            field.set(entity, Integer.valueOf(SafeParserInteger(obj.toString())));
          }

          if (field.getType().equals(String.class))
            field.set(entity, obj.toString());
          else if ((!field.getType().equals(Boolean.TYPE)) && (!field.getType().equals(Boolean.class))) {
            if ((!field.getType().equals(Long.class)) && (!field.getType().equals(Long.TYPE))) {
              if ((!field.getType().equals(Double.TYPE)) && (!field.getType().equals(Double.class))) {
                if (field.getType().equals(List.class))
                  field.set(entity, getStringList(keyValue.get(key).toString()));
              }
              else
                field.set(entity, Double.valueOf(SafeParserDouble(obj.toString())));
            }
            else
              field.set(entity, SafeParserLong(obj.toString()));
          }
          else
            field.set(entity, Boolean.valueOf(SafeParserBoolean(obj.toString())));
        }
      }
    }
    catch (Exception var11) {
      var11.printStackTrace();
    }

    return entity;
  }

  private static Long SafeParserLong(String str) {
    try {
      return Long.valueOf(Long.parseLong(str)); } catch (NumberFormatException var2) {
    }
    return Long.valueOf(0L);
  }

  private static boolean SafeParserBoolean(String str)
  {
    try {
      return Boolean.parseBoolean(str); } catch (Exception var2) {
    }
    return false;
  }

  private static double SafeParserDouble(String str)
  {
    try {
      return Double.parseDouble(str); } catch (NumberFormatException var2) {
    }
    return 0.0D;
  }

  private static int SafeParserInteger(String str)
  {
    try {
      return Integer.parseInt(str); } catch (NumberFormatException var2) {
    }
    return 0;
  }

  public static int executeInsertQuery(JdbcDaoInterface dao, Object entity)
  {
    if (entity == null) {
      return -1;
    }
    String table = entity.getClass().getName();
    int pos = table.lastIndexOf(".");
    if (pos != -1) {
      table = table.substring(pos + 1);
    }

    String sql = "insert ignore into " + table + " (";
    Field[] declaredFields = ReflectUtils.getDeclaredAndInheritedFields(entity.getClass(), false);
    ArrayList list = new ArrayList();
    Field[] var10 = declaredFields;
    int var9 = declaredFields.length;

    for (int var8 = 0; var8 < var9; var8++) {
      Field e = var10[var8];
      try
      {
        Object value = BeanUtils.getPrivateField(entity, e);
        list.add(value);
        String name = e.getName();
        if (name.toLowerCase().equals("desc")) {
          name = "descript";
        }

        sql = sql + name + ",";
      }
      catch (Exception localException1)
      {
      }
    }
    sql = sql.substring(0, sql.length() - 1) + ") ";
    sql = sql + "values(";

    for (Iterator var15 = list.iterator(); var15.hasNext(); sql = sql + "?,") {
      var15.next();
    }

    sql = sql.substring(0, sql.length() - 1) + ") ";
    try
    {
      return dao.execute(sql, list.toArray());
    } catch (Exception var13) {
      var13.printStackTrace();
    }return -1;
  }

  public static List getStringList(String str)
  {
    ArrayList list = new ArrayList();
    String[] strs = str.split("\t");
    String[] var6 = strs;
    int var5 = strs.length;

    for (int var4 = 0; var4 < var5; var4++) {
      String string = var6[var4];
      list.add(string);
    }

    return list;
  }
}