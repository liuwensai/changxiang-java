package com.caipiao.entity;

public class Bc_auto
{
  private int Auto_id;
  private int User_id;
  private String User_name;
  private int Auto_userid;
  private String Auto_name;
  private String Auto_item;
  private String Auto_time;
  private String Auto_lot;
  private double Auto_money;
  private int Auto_count;
  private int Auto_status;

  public String getUser_name()
  {
    return this.User_name;
  }

  public void setUser_name(String user_name) {
    this.User_name = user_name;
  }

  public int getAuto_userid() {
    return this.Auto_userid;
  }

  public void setAuto_userid(int auto_userid) {
    this.Auto_userid = auto_userid;
  }

  public String getAuto_name() {
    return this.Auto_name;
  }

  public void setAuto_name(String auto_name) {
    this.Auto_name = auto_name;
  }

  public String getAuto_item() {
    return this.Auto_item;
  }

  public void setAuto_item(String auto_item) {
    this.Auto_item = auto_item;
  }

  public int getAuto_id() {
    return this.Auto_id;
  }

  public void setAuto_id(int auto_id) {
    this.Auto_id = auto_id;
  }

  public int getUser_id() {
    return this.User_id;
  }

  public void setUser_id(int user_id) {
    this.User_id = user_id;
  }

  public String getAuto_time() {
    return this.Auto_time;
  }

  public void setAuto_time(String auto_time) {
    this.Auto_time = auto_time;
  }

  public String getAuto_lot() {
    return this.Auto_lot;
  }

  public void setAuto_lot(String auto_lot) {
    this.Auto_lot = auto_lot;
  }

  public double getAuto_money() {
    return (0.0D + (int)(this.Auto_money * 100.0D)) / 100.0D;
  }

  public void setAuto_money(double auto_money) {
    this.Auto_money = auto_money;
  }

  public int getAuto_count() {
    return this.Auto_count;
  }

  public void setAuto_count(int auto_count) {
    this.Auto_count = auto_count;
  }

  public int getAuto_status() {
    return this.Auto_status;
  }

  public void setAuto_status(int auto_status) {
    this.Auto_status = auto_status;
  }
}