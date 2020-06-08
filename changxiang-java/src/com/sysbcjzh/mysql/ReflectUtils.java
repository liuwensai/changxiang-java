package com.sysbcjzh.mysql;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.lang.reflect.Array;
import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.GenericArrayType;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.lang.reflect.TypeVariable;
import java.net.URL;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.Enumeration;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Set;
import java.util.jar.JarEntry;
import java.util.jar.JarInputStream;
import org.springframework.util.Assert;
import org.springframework.util.ClassUtils;

public class ReflectUtils extends ClassUtils
{
  public static FieldFilter COPYABLE_FIELDS = new FieldFilter() {
    public boolean matches(Field field) {
      return (!Modifier.isStatic(field.getModifiers())) && (!Modifier.isFinal(field.getModifiers()));
    }
  };

  public static MethodFilter NON_BRIDGED_METHODS = new MethodFilter() {
    public boolean matches(Method method) {
      return !method.isBridge();
    }
  };

  public static Object newInstance(Class c)
  {
    try
    {
      return c.newInstance();
    } catch (InstantiationException var2) {
      var2.printStackTrace();
    } catch (IllegalAccessException var3) {
      var3.printStackTrace();
    }

    return null;
  }

  public static boolean hasField(Class clazz, String name) {
    return findField(clazz, name) != null;
  }

  public static Field findField(Class clazz, String name) {
    return findField(clazz, name, null);
  }

  public static Field[] getDeclaredAndInheritedFields(Class type, boolean returnFinalFields) {
    ArrayList allFields = new ArrayList();
    allFields.addAll(getValidFields(type.getDeclaredFields(), returnFinalFields));

    for (Class parent = type.getSuperclass(); (parent != null) && (parent != Object.class); parent = parent.getSuperclass()) {
      allFields.addAll(getValidFields(parent.getDeclaredFields(), returnFinalFields));
    }

    return (Field[])allFields.toArray(new Field[allFields.size()]);
  }

  public static List getValidFields(Field[] fields, boolean returnFinalFields) {
    ArrayList validFields = new ArrayList();
    Field[] arrayOfField = fields;
    int j = fields.length;

    for (int i = 0; i < j; i++) {
      Field field = arrayOfField[i];
      if ((!Modifier.isStatic(field.getModifiers())) && ((returnFinalFields) || (!Modifier.isFinal(field.getModifiers()))) && (!field.isSynthetic())) {
        validFields.add(field);
      }
    }

    return validFields;
  }

  public static Field findField(Class clazz, String name, Class type) {
    Assert.notNull(clazz, "Class must not be null");
    Assert.isTrue((name != null) || (type != null), "Either name or type of the field must be specified");

    for (Class searchType = clazz; (!Object.class.equals(searchType)) && (searchType != null); searchType = searchType.getSuperclass()) {
      Field[] fields = searchType.getDeclaredFields();
      Field[] var8 = fields;
      int var7 = fields.length;

      for (int var6 = 0; var6 < var7; var6++) {
        Field field = var8[var6];
        if (((name == null) || (name.equals(field.getName()))) && ((type == null) || (type.equals(field.getType())))) {
          return field;
        }
      }
    }

    return null;
  }

  public static void setField(Field field, Object target, Object value) {
    try {
      field.set(target, value);
    } catch (IllegalAccessException var4) {
      handleReflectionException(var4);
      throw new IllegalStateException("Unexpected reflection exception - " + var4.getClass().getName() + ": " + var4.getMessage());
    }
  }

  public static Object getField(Field field, Object target) {
    try {
      return field.get(target);
    } catch (IllegalAccessException var3) {
      handleReflectionException(var3);
      throw new IllegalStateException("Unexpected reflection exception - " + var3.getClass().getName() + ": " + var3.getMessage());
    }
  }

  public static Method findMethod(Class clazz, String name) {
    return findMethod(clazz, name, new Class[0]);
  }

  public static Method findMethod(Class clazz, String name, Class[] paramTypes) {
    Assert.notNull(clazz, "Class must not be null");
    Assert.notNull(name, "Method name must not be null");

    for (Class searchType = clazz; searchType != null; searchType = searchType.getSuperclass()) {
      Method[] methods = searchType.isInterface() ? searchType.getMethods() : searchType.getDeclaredMethods();
      Method[] var8 = methods;
      int var7 = methods.length;

      for (int var6 = 0; var6 < var7; var6++) {
        Method method = var8[var6];
        if ((name.equals(method.getName())) && ((paramTypes == null) || (Arrays.equals(paramTypes, method.getParameterTypes())))) {
          return method;
        }
      }
    }

    return null;
  }

  public static Object invokeMethod(Method method, Object target) {
    return invokeMethod(method, target, new Object[0]);
  }

  public static Object invokeMethod(Method method, Object target, Object[] args) {
    try {
      return method.invoke(target, args);
    } catch (Exception var4) {
      handleReflectionException(var4);
    }throw new IllegalStateException("Should never get here");
  }

  public static Object invokeJdbcMethod(Method method, Object target) throws SQLException
  {
    return invokeJdbcMethod(method, target, new Object[0]);
  }

  public static Object invokeJdbcMethod(Method method, Object target, Object[] args) throws SQLException {
    try {
      return method.invoke(target, args);
    } catch (IllegalAccessException var4) {
      handleReflectionException(var4);
    } catch (InvocationTargetException var5) {
      if ((var5.getTargetException() instanceof SQLException)) {
        throw ((SQLException)var5.getTargetException());
      }

      handleInvocationTargetException(var5);
    }

    throw new IllegalStateException("Should never get here");
  }

  public static void handleReflectionException(Exception ex) {
    if ((ex instanceof NoSuchMethodException))
      throw new IllegalStateException("Method not found: " + ex.getMessage());
    if ((ex instanceof IllegalAccessException)) {
      throw new IllegalStateException("Could not access method: " + ex.getMessage());
    }
    if ((ex instanceof InvocationTargetException)) {
      handleInvocationTargetException((InvocationTargetException)ex);
    }

    if ((ex instanceof RuntimeException)) {
      throw ((RuntimeException)ex);
    }
    handleUnexpectedException(ex);
  }

  public static void handleInvocationTargetException(InvocationTargetException ex)
  {
    rethrowRuntimeException(ex.getTargetException());
  }

  public static void rethrowRuntimeException(Throwable ex) {
    if ((ex instanceof RuntimeException))
      throw ((RuntimeException)ex);
    if ((ex instanceof Error)) {
      throw ((Error)ex);
    }
    handleUnexpectedException(ex);
  }

  public static void rethrowException(Throwable ex) throws Exception
  {
    if ((ex instanceof Exception))
      throw ((Exception)ex);
    if ((ex instanceof Error)) {
      throw ((Error)ex);
    }
    handleUnexpectedException(ex);
  }

  private static void handleUnexpectedException(Throwable ex)
  {
    throw new IllegalStateException("Unexpected exception thrown", ex);
  }

  public static boolean declaresException(Method method, Class exceptionType) {
    Assert.notNull(method, "Method must not be null");
    Class[] declaredExceptions = method.getExceptionTypes();
    Class[] var6 = declaredExceptions;
    int var5 = declaredExceptions.length;

    for (int var4 = 0; var4 < var5; var4++) {
      Class declaredException = var6[var4];
      if (declaredException.isAssignableFrom(exceptionType)) {
        return true;
      }
    }

    return false;
  }

  public static boolean isPublicStaticFinal(Field field) {
    int modifiers = field.getModifiers();
    return (Modifier.isPublic(modifiers)) && (Modifier.isStatic(modifiers)) && (Modifier.isFinal(modifiers));
  }

  public static boolean isEqualsMethod(Method method) {
    if ((method != null) && (method.getName().equals("equals"))) {
      Class[] paramTypes = method.getParameterTypes();
      return (paramTypes.length == 1) && (paramTypes[0] == Object.class);
    }
    return false;
  }

  public static boolean isHashCodeMethod(Method method)
  {
    return (method != null) && (method.getName().equals("hashCode")) && (method.getParameterTypes().length == 0);
  }

  public static boolean isToStringMethod(Method method) {
    return (method != null) && (method.getName().equals("toString")) && (method.getParameterTypes().length == 0);
  }

  public static void makeAccessible(Field field) {
    if (((!Modifier.isPublic(field.getModifiers())) || (!Modifier.isPublic(field.getDeclaringClass().getModifiers()))) && (!field.isAccessible()))
      field.setAccessible(true);
  }

  public static void makeAccessible(Method method)
  {
    if (((!Modifier.isPublic(method.getModifiers())) || (!Modifier.isPublic(method.getDeclaringClass().getModifiers()))) && (!method.isAccessible()))
      method.setAccessible(true);
  }

  public static void makeAccessible(Constructor ctor)
  {
    if (((!Modifier.isPublic(ctor.getModifiers())) || (!Modifier.isPublic(ctor.getDeclaringClass().getModifiers()))) && (!ctor.isAccessible()))
      ctor.setAccessible(true);
  }

  public static void doWithMethods(Class clazz, MethodCallback mc)
    throws IllegalArgumentException
  {
    doWithMethods(clazz, mc, null);
  }

  public static void doWithMethods(Class clazz, MethodCallback mc, MethodFilter mf) throws IllegalArgumentException {
    Class targetClass = clazz;
    do
    {
      Method[] methods = targetClass.getDeclaredMethods();
      Method[] var8 = methods;
      int var7 = methods.length;

      for (int var6 = 0; var6 < var7; var6++) {
        Method method = var8[var6];
        if ((mf == null) || (mf.matches(method))) {
          try {
            mc.doWith(method);
          } catch (IllegalAccessException var10) {
            throw new IllegalStateException("Shouldn't be illegal to access method '" + method.getName() + "': " + var10);
          }
        }
      }

      targetClass = targetClass.getSuperclass();
    }while (targetClass != null);
  }

  public static void doWithFields(Class clazz, FieldCallback fc) throws IllegalArgumentException
  {
    doWithFields(clazz, fc, null);
  }

  public static void doWithFields(Class clazz, FieldCallback fc, FieldFilter ff) throws IllegalArgumentException {
    Class targetClass = clazz;
    do
    {
      Field[] fields = targetClass.getDeclaredFields();
      Field[] var8 = fields;
      int var7 = fields.length;

      for (int var6 = 0; var6 < var7; var6++) {
        Field field = var8[var6];
        if ((ff == null) || (ff.matches(field))) {
          try {
            fc.doWith(field);
          } catch (IllegalAccessException var10) {
            throw new IllegalStateException("Shouldn't be illegal to access field '" + field.getName() + "': " + var10);
          }
        }
      }

      targetClass = targetClass.getSuperclass();
    }while ((targetClass != null) && (targetClass != Object.class));
  }

  public static void shallowCopyFieldState(Object src, Object dest) throws IllegalArgumentException
  {
    if (src == null)
      throw new IllegalArgumentException("Source for field copy cannot be null");
    if (dest == null)
      throw new IllegalArgumentException("Destination for field copy cannot be null");
    if (!src.getClass().isAssignableFrom(dest.getClass()))
      throw new IllegalArgumentException("Destination class [" + dest.getClass().getName() + "] must be same or subclass as source class [" + src.getClass().getName() + "]");
  }

  public static boolean implementsInterface(Class type, Class interfaceClass)
  {
    if (type.isInterface())
      return type == interfaceClass;
    Class[] var5;
    int var4 = (var5 = type.getInterfaces()).length;

    for (int var3 = 0; var3 < var4; var3++) {
      Class ifc = var5[var3];
      if (ifc == interfaceClass) {
        return true;
      }
    }

    return false;
  }

  public static boolean extendsClass(Class type, Class superClass)
  {
    if (type == superClass) {
      return true;
    }
    for (Class c = type.getSuperclass(); (c != null) && (c != Object.class); c = c.getSuperclass()) {
      if (c == superClass) {
        return true;
      }
    }

    return false;
  }

  public static boolean isPropertyType(Class type)
  {
    return (type == String.class) || (type == Date.class) || (type == Integer.class) || (type == Integer.TYPE) || (type == Long.class) || (type == Long.TYPE) || (type == Double.class) || (type == Double.TYPE) || (type == Boolean.class) || (type == Boolean.TYPE) || (type == Locale.class) || (type == Byte.TYPE) || (type.isEnum()) || (type.isArray());
  }

  public static boolean isValidMapValueType(Class type) {
    return isPropertyType(type);
  }

  private static boolean isArrayOfType(Class c, Class type) {
    return (c.isArray()) && (c.getComponentType() == type);
  }

  public static boolean isDateType(Class type) {
    return (type == Date.class) || (type == Calendar.class) || (type == Timestamp.class);
  }

  public static Class getParameterizedClass(Field field) {
    return getParameterizedClass(field, 0);
  }

  public static Class getParameterizedClass(Field field, int index) {
    if ((field.getGenericType() instanceof ParameterizedType)) {
      ParameterizedType ptype = (ParameterizedType)field.getGenericType();
      if ((ptype.getActualTypeArguments() != null) && (ptype.getActualTypeArguments().length <= index)) {
        return null;
      }
      Type paramType = ptype.getActualTypeArguments()[index];
      if ((paramType instanceof GenericArrayType)) {
        Class paramPType1 = (Class)((GenericArrayType)paramType).getGenericComponentType();
        return Array.newInstance(paramPType1, 0).getClass();
      }if ((paramType instanceof ParameterizedType)) {
        ParameterizedType paramPType = (ParameterizedType)paramType;
        return (Class)paramPType.getRawType();
      }
      return (Class)paramType;
    }

    return null;
  }

  public static Class getTypeArgumentOfParameterizedClass(Field field, int index, int typeIndex)
  {
    if ((field.getGenericType() instanceof ParameterizedType)) {
      ParameterizedType ptype = (ParameterizedType)field.getGenericType();
      Type paramType = ptype.getActualTypeArguments()[index];
      if ((!(paramType instanceof GenericArrayType)) && ((paramType instanceof ParameterizedType))) {
        ParameterizedType paramPType = (ParameterizedType)paramType;
        Type paramParamType = paramPType.getActualTypeArguments()[typeIndex];
        if (!(paramParamType instanceof ParameterizedType)) {
          return (Class)paramParamType;
        }
      }
    }

    return null;
  }

  public static Class getParameterizedClass(Class c) {
    return getParameterizedClass(c, 0);
  }

  public static Class getParameterizedClass(Class c, int index) {
    TypeVariable[] typeVars = c.getTypeParameters();
    return typeVars.length > 0 ? (Class)typeVars[index].getBounds()[0] : null;
  }

  public static boolean isFieldParameterizedWithClass(Field field, Class c) {
    if ((field.getGenericType() instanceof ParameterizedType)) {
      ParameterizedType ptype = (ParameterizedType)field.getGenericType();
      Type[] var6;
      int var5 = (var6 = ptype.getActualTypeArguments()).length;

      for (int var4 = 0; var4 < var5; var4++) {
        Type type = var6[var4];
        if (type == c) {
          return true;
        }

        if ((c.isInterface()) && (implementsInterface((Class)type, c))) {
          return true;
        }
      }
    }

    return false;
  }

  public static boolean isFieldParameterizedWithPropertyType(Field field) {
    if ((field.getGenericType() instanceof ParameterizedType)) {
      ParameterizedType ptype = (ParameterizedType)field.getGenericType();
      Type[] var5;
      int var4 = (var5 = ptype.getActualTypeArguments()).length;

      for (int var3 = 0; var3 < var4; var3++) {
        Type type = var5[var3];
        if (isPropertyType((Class)type)) {
          return true;
        }
      }
    }

    return false;
  }

  private static String stripFilenameExtension(String filename) {
    return filename.indexOf('.') != -1 ? filename.substring(0, filename.lastIndexOf('.')) : filename;
  }

  public static Set getFromDirectory(File directory, String packageName) throws ClassNotFoundException {
    HashSet classes = new HashSet();
    if (directory.exists())
    {
      String[] var6;
      int var5 = (var6 = directory.list()).length;

      for (int var4 = 0; var4 < var5; var4++) {
        String file = var6[var4];
        if (file.endsWith(".class")) {
          String name = packageName + '.' + stripFilenameExtension(file);
          Class clazz = Class.forName(name);
          classes.add(clazz);
        }
      }
    }

    return classes;
  }

  public static Set getFromJARFile(String jar, String packageName) throws IOException, FileNotFoundException, ClassNotFoundException { HashSet classes = new HashSet();
    JarInputStream jarFile = new JarInputStream(new FileInputStream(jar));
    JarEntry jarEntry;
    do {
      jarEntry = jarFile.getNextJarEntry();
      if (jarEntry != null) {
        String className = jarEntry.getName();
        if (className.endsWith(".class")) {
          className = stripFilenameExtension(className);
          if (className.startsWith(packageName))
            classes.add(Class.forName(className.replace('/', '.')));
        }
      }
    }
    while (jarEntry != null);

    return classes; }

  public static Set getClasses(String packageName) throws IOException, ClassNotFoundException
  {
    ClassLoader loader = Thread.currentThread().getContextClassLoader();
    return getClasses(loader, packageName);
  }

  public static Set getClasses(ClassLoader loader, String packageName) throws IOException, ClassNotFoundException {
    HashSet classes = new HashSet();
    String path = packageName.replace('.', '/');
    Enumeration resources = loader.getResources(path);
    if (resources != null) {
      while (resources.hasMoreElements()) {
        String filePath = ((URL)resources.nextElement()).getFile();
        if (filePath.indexOf("%20") > 0) {
          filePath = filePath.replaceAll("%20", " ");
        }

        if (filePath != null) {
          if (((filePath.indexOf("!") > 0 ? 1 : 0) & (filePath.indexOf(".jar") > 0 ? 1 : 0)) != 0) {
            String jarPath = filePath.substring(0, filePath.indexOf("!")).substring(filePath.indexOf(":") + 1);
            if (jarPath.indexOf(":") >= 0) {
              jarPath = jarPath.substring(1);
            }

            classes.addAll(getFromJARFile(jarPath, path));
          } else {
            classes.addAll(getFromDirectory(new File(filePath), packageName));
          }
        }
      }
    }

    return classes;
  }

  public static abstract interface FieldCallback
  {
    public abstract void doWith(Field paramField)
      throws IllegalArgumentException, IllegalAccessException;
  }

  public static abstract interface FieldFilter
  {
    public abstract boolean matches(Field paramField);
  }

  public static abstract interface MethodCallback
  {
    public abstract void doWith(Method paramMethod)
      throws IllegalArgumentException, IllegalAccessException;
  }

  public static abstract interface MethodFilter
  {
    public abstract boolean matches(Method paramMethod);
  }
}