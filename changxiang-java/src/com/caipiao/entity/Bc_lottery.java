package com.caipiao.entity;

public class Bc_lottery
{
  private int Lot_id;
  private String Lot_name;
  private String Lot_qihao;
  private String Lot_haoma;
  private String Lot_ommit;
  private String Lot_btime;
  private String Lot_etime;
  private int Lot_isopen;

  public int getLot_id()
  {
    return this.Lot_id;
  }

  public void setLot_id(int lot_id) {
    this.Lot_id = lot_id;
  }

  public String getLot_name() {
    return this.Lot_name;
  }

  public void setLot_name(String lot_name) {
    this.Lot_name = lot_name;
  }

  public String getLot_qihao() {
    return this.Lot_qihao;
  }

  public void setLot_qihao(String lot_qihao) {
    this.Lot_qihao = lot_qihao;
  }

  public String getLot_haoma() {
    return this.Lot_haoma;
  }

  public void setLot_haoma(String lot_haoma) {
    this.Lot_haoma = lot_haoma;
  }

  public String getLot_ommit() {
    return this.Lot_ommit;
  }

  public void setLot_ommit(String lot_ommit) {
    this.Lot_ommit = lot_ommit;
  }

  public String getLot_btime() {
    return this.Lot_btime;
  }

  public void setLot_btime(String lot_btime) {
    this.Lot_btime = lot_btime;
  }

  public String getLot_etime() {
    return this.Lot_etime;
  }

  public void setLot_etime(String lot_etime) {
    this.Lot_etime = lot_etime;
  }

  public int getLot_isopen() {
    return this.Lot_isopen;
  }

  public void setLot_isopen(int lot_isopen) {
    this.Lot_isopen = lot_isopen;
  }
}