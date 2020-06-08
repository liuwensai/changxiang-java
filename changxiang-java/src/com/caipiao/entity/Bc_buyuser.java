package com.caipiao.entity;

import com.caipiao.utils.UserSession;

public class Bc_buyuser
{
  private int Buyuser_id;
  private String Buyuser_time;
  private int User_id;
  private String User_name;
  private String Buy_item;
  private double Buyuser_money;
  private double Buyuser_win;
  private String Auto_item;

  public double getBuyuser_win()
  {
    return this.Buyuser_win;
  }

  public void setBuyuser_win(double buyuser_win) {
    this.Buyuser_win = buyuser_win;
  }

  public String getUser_name() {
    return this.User_name;
  }

  public String getUser_nameDis() {
    return UserSession.DisUser(this.User_name);
  }

  public void setUser_name(String user_name) {
    this.User_name = user_name;
  }

  public int getBuyuser_id() {
    return this.Buyuser_id;
  }

  public void setBuyuser_id(int buyuser_id) {
    this.Buyuser_id = buyuser_id;
  }

  public String getBuyuser_time() {
    return this.Buyuser_time;
  }

  public void setBuyuser_time(String buyuser_time) {
    this.Buyuser_time = buyuser_time;
  }

  public int getUser_id() {
    return this.User_id;
  }

  public void setUser_id(int user_id) {
    this.User_id = user_id;
  }

  public String getBuy_item() {
    return this.Buy_item;
  }

  public void setBuy_item(String buy_item) {
    this.Buy_item = buy_item;
  }

  public double getBuyuser_money() {
    return this.Buyuser_money;
  }

  public void setBuyuser_money(double buyuser_money) {
    this.Buyuser_money = buyuser_money;
  }

  public String getAuto_item() {
    return this.Auto_item;
  }

  public void setAuto_item(String auto_item) {
    this.Auto_item = auto_item;
  }
}