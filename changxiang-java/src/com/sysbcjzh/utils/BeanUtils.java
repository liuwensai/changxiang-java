package com.sysbcjzh.utils;

import com.sysbcjzh.mysql.ReflectUtils;
import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import org.apache.commons.beanutils.PropertyUtils;
import org.apache.log4j.Logger;

public class BeanUtils
{
  private static final Logger logger = Logger.getLogger(BeanUtils.class);

  public static Object getAnnotationField(Object obj, Class annotation) throws IllegalArgumentException, IllegalAccessException
  {
    Class pojo = obj.getClass();
    Field[] declaredFields = pojo.getDeclaredFields();
    Field[] var7 = declaredFields;
    int var6 = declaredFields.length;

    for (int var5 = 0; var5 < var6; var5++) {
      Field field = var7[var5];
      if (field.getAnnotation(annotation) != null) {
        Object object = getPrivateField(obj, field);
        return object;
      }
    }

    return null;
  }

  public static Object getProperty(Object bean, String name) {
    try {
      return PropertyUtils.getProperty(bean, name);
    } catch (Exception var3) {
      logger.error(var3.getMessage());
    }return null;
  }

  public static void setProperty(Object bean, String fieldName, Object value)
  {
    try {
      PropertyUtils.setProperty(bean, fieldName, value);
    } catch (Exception var4) {
      logger.error(var4.getMessage());
    }
  }

  public static Object getPrivateProperty(Object obj, String fieldName) throws SecurityException, NoSuchFieldException, IllegalArgumentException, IllegalAccessException
  {
    Field field = ReflectUtils.findField(obj.getClass(), fieldName);
    if (field != null) {
      setAccessible(field);
      return field.get(obj);
    }
    return null;
  }

  public static Object getPrivateField(Object obj, Field field) throws IllegalArgumentException, IllegalAccessException
  {
    setAccessible(field);
    return field.get(obj);
  }

  public static void setPrivateProperty(Object obj, String fieldName, Object value) throws SecurityException, NoSuchFieldException, IllegalArgumentException, IllegalAccessException {
    Field field = obj.getClass().getDeclaredField(fieldName);
    field.setAccessible(true);
    field.set(obj, value);
  }

  public static void setAccessible(Field field) {
    if ((!Modifier.isPublic(field.getModifiers())) || (!Modifier.isPublic(field.getDeclaringClass().getModifiers())))
      field.setAccessible(true);
  }
}