package com.caipiao.entity;

public class Bc_msg{
  private int Msg_id;
  private int Send_id;
  private int User_id;
  private String Msg_title;
  private String Msg_text;
  private String Msg_time;
  private int Msg_type;
  private int Msg_status;

  public int getSend_id()
  {
    return this.Send_id;
  }

  public void setSend_id(int send_id) {
    this.Send_id = send_id;
  }

  public int getMsg_id() {
    return this.Msg_id;
  }

  public void setMsg_id(int msg_id) {
    this.Msg_id = msg_id;
  }

  public int getUser_id() {
    return this.User_id;
  }

  public void setUser_id(int user_id) {
    this.User_id = user_id;
  }

  public String getMsg_title() {
    return this.Msg_title;
  }

  public void setMsg_title(String msg_title) {
    this.Msg_title = msg_title;
  }

  public String getMsg_text() {
    return this.Msg_text;
  }

  public void setMsg_text(String msg_text) {
    this.Msg_text = msg_text;
  }

  public String getMsg_time() {
    return this.Msg_time;
  }

  public void setMsg_time(String msg_time) {
    this.Msg_time = msg_time;
  }

  public int getMsg_type() {
    return this.Msg_type;
  }

  public void setMsg_type(int msg_type) {
    this.Msg_type = msg_type;
  }

  public int getMsg_status() {
    return this.Msg_status;
  }

  public void setMsg_status(int msg_status) {
    this.Msg_status = msg_status;
  }
}