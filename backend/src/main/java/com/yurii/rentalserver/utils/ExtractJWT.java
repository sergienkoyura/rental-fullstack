package com.yurii.rentalserver.utils;

import org.springframework.stereotype.Component;

import java.util.Base64;

@Component
public class ExtractJWT {
    public String payloadJWTExtraction(String token, String extraction) {
        token = token.replace("Bearer ", "");
        String[] chunks = token.split("\\.");
        Base64.Decoder decoder = Base64.getUrlDecoder();

        String payload = new String(decoder.decode(chunks[1]));
        String[] entries = payload.split(",");
        String value = null;

        for (String entry : entries) {
            String[] keyValue = entry.split(":");
            if (keyValue[0].contains(extraction)) {
                int remove = 1;
                if (keyValue[1].endsWith("}"))
                    remove = 2;
                value = keyValue[1].substring(1, keyValue[1].length() - remove);
            }
        }
        return value;
    }
}
