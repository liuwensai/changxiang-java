package com.caipiao.entity;

import com.caipiao.utils.UserSession;

public class Bc_news {

	private int News_id;
	private String News_auther;
	private String News_title;
	private String News_time;
	private String News_etime;
	private String News_soures;
	private String News_text;
	private int News_status;
	private int News_sort;
	private String News_image;
	private int News_point;
	private int News_type;

	public int getNews_id() {
		return this.News_id;
	}

	public void setNews_id(int news_id) {
		this.News_id = news_id;
	}

	public String getNews_auther() {
		return this.News_auther;
	}

	public String getNews_autherDis() {
		return UserSession.DisUser(this.News_auther);
	}

	public void setNews_auther(String news_auther) {
		this.News_auther = news_auther;
	}

	public String getNews_title() {
		return this.News_title;
	}

	public void setNews_title(String news_title) {
		this.News_title = news_title;
	}

	public String getNews_time() {
		return this.News_time;
	}

	public void setNews_time(String news_time) {
		this.News_time = news_time;
	}

	public String getNews_etime() {
		return this.News_etime;
	}

	public void setNews_etime(String news_etime) {
		this.News_etime = news_etime;
	}

	public String getNews_soures() {
		return this.News_soures;
	}

	public void setNews_soures(String news_soures) {
		this.News_soures = news_soures;
	}

	public String getNews_text() {
		return this.News_text;
	}

	public void setNews_text(String news_text) {
		this.News_text = news_text;
	}

	public int getNews_status() {
		return this.News_status;
	}

	public void setNews_status(int news_status) {
		this.News_status = news_status;
	}

	public int getNews_sort() {
		return this.News_sort;
	}

	public void setNews_sort(int news_sort) {
		this.News_sort = news_sort;
	}

	public String getNews_image() {
		return this.News_image;
	}

	public void setNews_image(String news_image) {
		this.News_image = news_image;
	}

	public int getNews_point() {
		return this.News_point;
	}

	public void setNews_point(int news_point) {
		this.News_point = news_point;
	}

	public int getNews_type() {
		return this.News_type;
	}

	public void setNews_type(int news_type) {
		this.News_type = news_type;
	}
}