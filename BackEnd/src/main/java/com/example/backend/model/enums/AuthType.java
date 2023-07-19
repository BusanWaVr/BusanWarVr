package com.example.backend.model.enums;

public enum AuthType{
    ADMIN, USER, GUIDE;

    public String toString(){
        return name();
    }
}