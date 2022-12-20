package com.scan.sesuserservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SpringBootApplication
public class SesUserServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(SesUserServiceApplication.class, args);
    }

}
