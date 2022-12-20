package com.scan.sesuserservice.user;

import java.util.LinkedHashMap;
import java.util.Map;

public class ResponseBody {
    private Boolean success;
    private String message;

    public ResponseBody(Boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public Map<String, Object> sendResponseJson(){
        Map<String, Object> responseBody = new LinkedHashMap<>();

        responseBody.put("success", this.success);
        responseBody.put("message", this.message);

        return responseBody;
    }
}
