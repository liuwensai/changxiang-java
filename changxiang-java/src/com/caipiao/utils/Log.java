// Decompiled by Jad v1.5.8e2. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://kpdus.tripod.com/jad.html
// Decompiler options: packimports(3) fieldsfirst ansi space 
// Source File Name:   Log.java

package com.caipiao.utils;

public class Log
{

	public Log()
	{
	}

	public static void ShowInfo(String msg)
	{
		System.out.println(msg);
	}

	public static void ShowErr(String msg)
	{
		System.err.println(msg);
	}
}
