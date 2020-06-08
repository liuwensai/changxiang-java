package com.caipiao.entity;

public class Bc_detail
{
  private int Detail_id;
  private int User_id;
  private double Detail_balance;
  private double Detail_addsub;
  private int Detail_type;
  private String Detail_time;
  private String Detail_item;
  private String Detail_desc;

  public double getDetail_addsub()
  {
    return this.Detail_addsub;
  }

  public void setDetail_addsub(double detail_addsub) {
    this.Detail_addsub = detail_addsub;
  }

  public int getDetail_id() {
    return this.Detail_id;
  }

  public void setDetail_id(int detail_id) {
    this.Detail_id = detail_id;
  }

  public int getUser_id() {
    return this.User_id;
  }

  public void setUser_id(int user_id) {
    this.User_id = user_id;
  }

  public double getDetail_balance() {
    return this.Detail_balance;
  }

  public void setDetail_balance(double detail_balance) {
    this.Detail_balance = detail_balance;
  }

  public int getDetail_type() {
    return this.Detail_type;
  }

  public void setDetail_type(int detail_type) {
    this.Detail_type = detail_type;
  }

  public String getDetail_time() {
    return this.Detail_time;
  }

  public void setDetail_time(String detail_time) {
    this.Detail_time = detail_time;
  }

  public String getDetail_item() {
    return this.Detail_item;
  }

  public void setDetail_item(String detail_item) {
    this.Detail_item = detail_item;
  }

  public String getDetail_desc() {
    return this.Detail_desc;
  }

  public void setDetail_desc(String detail_desc) {
    this.Detail_desc = detail_desc;
  }
}