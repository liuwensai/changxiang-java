package com.caipiao.entity;

public class Bc_comm{
  private int Comm_id;
  private int User_id;
  private String User_name;
  private double Ssq;
  private double Dlt;
  private double Fc3d;
  private double Pl3;
  private double Pl5;
  private double Cqssc;
  private double Jxssc;
  private double Sd11x5;
  private double Jx11x5;
  private double Gd11x5;
  private double Cq11x5;
  private double Sh11x5;
  private double Hnssc;
  private double Jsk3;
  private double Txffc;

  public void setAll(double comm)
  {
    this.Ssq = (this.Dlt = this.Fc3d = this.Pl3 = this.Pl5 = this.Cqssc = this.Jxssc = this.Sd11x5 = this.Jx11x5 = this.Gd11x5 = this.Cq11x5 = this.Sh11x5 = this.Hnssc = this.Jsk3 =this.Txffc= comm);
  }

  public double getAll(String lot) {
    double comm = 0.0D;
    if ("Cqssc".equals(lot))
      comm = this.Cqssc;
    else if ("Jxssc".equals(lot))
      comm = this.Jxssc;
    else if ("Ssq".equals(lot))
      comm = this.Ssq;
    else if ("Fc3d".equals(lot))
      comm = this.Fc3d;
    else if ("Dlt".equals(lot))
      comm = this.Dlt;
    else if ("Pl3".equals(lot))
      comm = this.Pl3;
    else if ("Pl5".equals(lot))
      comm = this.Pl5;
    else if ("Sd11x5".equals(lot))
      comm = this.Sd11x5;
    else if ("Jx11x5".equals(lot))
      comm = this.Jx11x5;
    else if ("Gd11x5".equals(lot))
      comm = this.Gd11x5;
    else if ("Cq11x5".equals(lot))
      comm = this.Cq11x5;
    else if ("Sh11x5".equals(lot))
      comm = this.Sh11x5;
    else if ("Hnssc".equals(lot))
      comm = this.Hnssc;
    else if ("Jsk3".equals(lot)) {
      comm = this.Jsk3;
    }else if("Txffc".equals(lot)){
    	comm=this.Txffc;
    }

    return comm;
  }

  public double getHnssc() {
    return this.Hnssc;
  }

  public void setHnssc(double hnssc) {
    this.Hnssc = hnssc;
  }

  public double getSh11x5() {
    return this.Sh11x5;
  }

  public void setSh11x5(double sh11x5) {
    this.Sh11x5 = sh11x5;
  }

  public double getPl5() {
    return this.Pl5;
  }

  public void setPl5(double pl5) {
    this.Pl5 = pl5;
  }

  public String getUser_name() {
    return this.User_name;
  }

  public void setUser_name(String user_name) {
    this.User_name = user_name;
  }

  public int getComm_id() {
    return this.Comm_id;
  }

  public void setComm_id(int comm_id) {
    this.Comm_id = comm_id;
  }

  public int getUser_id() {
    return this.User_id;
  }

  public void setUser_id(int user_id) {
    this.User_id = user_id;
  }

  public double getSsq() {
    return this.Ssq;
  }

  public void setSsq(double ssq) {
    this.Ssq = ssq;
  }

  public double getDlt() {
    return this.Dlt;
  }

  public void setDlt(double dlt) {
    this.Dlt = dlt;
  }

  public double getFc3d() {
    return this.Fc3d;
  }

  public void setFc3d(double fc3d) {
    this.Fc3d = fc3d;
  }

  public double getPl3() {
    return this.Pl3;
  }

  public void setPl3(double pl3) {
    this.Pl3 = pl3;
  }

  public double getCqssc() {
    return this.Cqssc;
  }

  public void setCqssc(double cqssc) {
    this.Cqssc = cqssc;
  }

  public double getJxssc() {
    return this.Jxssc;
  }

  public void setJxssc(double jxssc) {
    this.Jxssc = jxssc;
  }

  public double getSd11x5() {
    return this.Sd11x5;
  }

  public void setSd11x5(double sd11x5) {
    this.Sd11x5 = sd11x5;
  }

  public double getJx11x5() {
    return this.Jx11x5;
  }

  public void setJx11x5(double jx11x5) {
    this.Jx11x5 = jx11x5;
  }

  public double getGd11x5() {
    return this.Gd11x5;
  }

  public void setGd11x5(double gd11x5) {
    this.Gd11x5 = gd11x5;
  }

  public double getCq11x5() {
    return this.Cq11x5;
  }

  public void setCq11x5(double cq11x5) {
    this.Cq11x5 = cq11x5;
  }

  public double getJsk3() {
    return this.Jsk3;
  }

  public void setJsk3(double jsk3) {
    this.Jsk3 = jsk3;
  }

public double getTxffc() {
	return Txffc;
}

public void setTxffc(double txffc) {
	Txffc = txffc;
}
  
  
}