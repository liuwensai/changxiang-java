// Decompiled by Jad v1.5.8e2. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://kpdus.tripod.com/jad.html
// Decompiler options: packimports(3) fieldsfirst ansi space 
// Source File Name:   ActivityService.java

package com.caipiao.activity;

import java.util.List;

// Referenced classes of package com.caipiao.activity:
//			IActivityImpl, IActivity, Activity

public class ActivityService
{

	IActivity dao;

	public ActivityService()
	{
		dao = new IActivityImpl();
	} 

	@SuppressWarnings("unchecked")
	public List<Activity> finds(int status)
	{
		return dao.finds(status);
	}

	public Activity find(String Acr_type)
	{
		return dao.find(Acr_type);
	}
}
