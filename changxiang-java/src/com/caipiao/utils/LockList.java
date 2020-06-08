// Decompiled by Jad v1.5.8e2. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://kpdus.tripod.com/jad.html
// Decompiler options: packimports(3) fieldsfirst ansi space 
// Source File Name:   LockList.java

package com.caipiao.utils;

import java.util.HashSet;
import java.util.Set;

public class LockList
{
	public static Set<String> openlock = new HashSet<String>();
	public static Set<String> numberlock = new HashSet<String>();
	public static Set<String> itemlock = new HashSet<String>();
	public static Set<String> drawlock = new HashSet<String>();
	public static int hemailock = 0;
	public static int gendanlock = 0;
	public static Set<String> alphaGolock = new HashSet<String>();

}
