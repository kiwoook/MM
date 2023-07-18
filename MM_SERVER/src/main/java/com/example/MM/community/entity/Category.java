package com.example.MM.community.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Category {

//    영화 리뷰
//    드라마 리뷰
//    자유
    MOVIE("영화 게시판"),
    DRAMA("드라마 게시판"),
    FREE("자유 게시판");

    private final String name;
    }
