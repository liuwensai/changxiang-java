package com.caipiao.entity;

import com.caipiao.utils.ShowStatic;

public class Bc_banks
{
  private int Banks_id;
  private int User_id;
  private String Banks_card;
  private String Banks_bank;
  private String Banks_add;
  private String Banks_name;
  private String Banks_phone;
  private int Banks_status;

  public int getBanks_id()
  {
    return this.Banks_id;
  }

  public void setBanks_id(int banks_id) {
    this.Banks_id = banks_id;
  }

  public int getUser_id() {
    return this.User_id;
  }

  public void setUser_id(int user_id) {
    this.User_id = user_id;
  }

  public String getBanks_card() {
    return this.Banks_card;
  }

  public void setBanks_card(String banks_card) {
    this.Banks_card = banks_card;
  }

  public String getBanks_bank() {
    return this.Banks_bank;
  }

  public void setBanks_bank(String banks_bank) {
    this.Banks_bank = banks_bank;
  }

  public String getBanks_class() {
    return ShowStatic.BankLogoClass(this.Banks_bank);
  }

  public String getBanks_add() {
    return this.Banks_add;
  }

  public void setBanks_add(String banks_add) {
    this.Banks_add = banks_add;
  }

  public String getBanks_name() {
    return this.Banks_name;
  }

  public void setBanks_name(String banks_name) {
    this.Banks_name = banks_name;
  }

  public String getBanks_phone() {
    return this.Banks_phone;
  }

  public void setBanks_phone(String banks_phone) {
    this.Banks_phone = banks_phone;
  }

  public int getBanks_status() {
    return this.Banks_status;
  }

  public void setBanks_status(int banks_status) {
    this.Banks_status = banks_status;
  }
}