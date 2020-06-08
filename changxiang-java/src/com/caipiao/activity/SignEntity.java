package com.caipiao.activity;

public class SignEntity
{
  private int Id;
  private String Time;
  private int User_id;
  private int SignAll;
  private int BigSign;

  public int getBigSign()
  {
    return this.BigSign;
  }

  public void setBigSign(int bigSign) {
    this.BigSign = bigSign;
  }

  public int getId() {
    return this.Id;
  }

  public void setId(int id) {
    this.Id = id;
  }

  public String getTime() {
    return this.Time;
  }

  public void setTime(String time) {
    this.Time = time;
  }

  public int getUser_id() {
    return this.User_id;
  }

  public void setUser_id(int user_id) {
    this.User_id = user_id;
  }

  public int getSignAll() {
    return this.SignAll;
  }

  public void setSignAll(int signAll) {
    this.SignAll = signAll;
  }
}