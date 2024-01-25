package com.yurii.rentalserver.config;

import com.yurii.rentalserver.entity.Item;
import com.yurii.rentalserver.entity.Message;
import com.yurii.rentalserver.entity.Review;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class DataRestConfig  implements RepositoryRestConfigurer {
    private final String allowedOrigin = "https://localhost:3000";
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        HttpMethod[] unsupportedActions = {HttpMethod.DELETE, HttpMethod.PATCH, HttpMethod.PUT, HttpMethod.POST};

        //display id for the request
        config.exposeIdsFor(Item.class);
        config.exposeIdsFor(Review.class);
        config.exposeIdsFor(Message.class);

        disableHttpMethods(Item.class, config, unsupportedActions);
        disableHttpMethods(Review.class, config, unsupportedActions);
        disableHttpMethods(Message.class, config, unsupportedActions);
        cors.addMapping(config.getBasePath() + "/**")
                .allowedOrigins(allowedOrigin);
    }

    private void disableHttpMethods(Class<?> nameClass, RepositoryRestConfiguration config, HttpMethod[] unsupportedActions) {
        config.getExposureConfiguration()
                .forDomainType(nameClass)
                .withItemExposure(((metdata, httpMethods) ->
                        httpMethods.disable(unsupportedActions)))
                .withCollectionExposure((metdata, httpMethods) ->
                        httpMethods.disable(unsupportedActions));
    }
}
