package com.caipiao.intface;

import com.caipiao.entity.out.Achievement;
import java.util.List;

public abstract interface BcCaiwuIntface{
	
	@SuppressWarnings("unchecked")
  public abstract List findsAllAgent();

	@SuppressWarnings("unchecked")
  public abstract List findsAchievementByPage(String paramString1, String paramString2, String paramString3, 
		  String paramString4, int paramInt1, int paramInt2);

  public abstract int findsAchievementByPageCount(String paramString1, String paramString2, String paramString3, String paramString4);

  public abstract Achievement findsAchievementByTotal(String paramString1, String paramString2, String paramString3, String paramString4);

  public abstract int findsDrawTishiCount();

  public abstract void updateDrawTishi();
}