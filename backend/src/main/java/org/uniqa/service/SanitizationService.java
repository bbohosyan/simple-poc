package org.uniqa.service;

import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SanitizationService {

    public String sanitize(String input) {
        if (input == null) {
            return null;
        }

        return input
                .replaceAll("<script[^>]*>.*?</script>", "")
                .replaceAll("<[^>]*>", "")
                .replaceAll("javascript:", "")
                .replaceAll("on\\w+\\s*=", "");
    }
}