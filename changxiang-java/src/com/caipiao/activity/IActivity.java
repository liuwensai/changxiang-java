// Decompiled by Jad v1.5.8e2. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://kpdus.tripod.com/jad.html
// Decompiler options: packimports(3) fieldsfirst ansi space 
// Source File Name:   IActivity.java

package com.caipiao.activity;

import java.util.List;

// Referenced classes of package com.caipiao.activity:
//			Activity

public interface IActivity
{ 

	public abstract List<Activity> finds(int i);

	public abstract Activity find(String s);
}
