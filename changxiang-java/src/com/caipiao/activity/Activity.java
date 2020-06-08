package com.caipiao.activity;

public class Activity
{
  private int Act_id;
  private int Act_status;
  private String Acr_type;
  private String Acr_name;
  private String Acr_url;
  private String Acr_img;

  public String getAcr_img()
  {
    return this.Acr_img;
  }

  public void setAcr_img(String acr_img) {
    this.Acr_img = acr_img;
  }

  public String getAcr_url() {
    return this.Acr_url;
  }

  public void setAcr_url(String acr_url) {
    this.Acr_url = acr_url;
  }

  public String getAcr_name() {
    return this.Acr_name;
  }

  public void setAcr_name(String acr_name) {
    this.Acr_name = acr_name;
  }

  public int getAct_id() {
    return this.Act_id;
  }

  public void setAct_id(int act_id) {
    this.Act_id = act_id;
  }

  public int getAct_status() {
    return this.Act_status;
  }

  public void setAct_status(int act_status) {
    this.Act_status = act_status;
  }

  public String getAcr_type() {
    return this.Acr_type;
  }

  public void setAcr_type(String acr_type) {
    this.Acr_type = acr_type;
  }
}