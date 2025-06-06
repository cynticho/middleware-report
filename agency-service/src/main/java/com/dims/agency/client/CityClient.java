package com.dims.agency.client;

import com.dims.agency.model.City;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@FeignClient(name = "city-service", url = "http://server.dicap.lan:8084/city")
public interface CityClient {

    @GetMapping("/{id}")
    City get(@PathVariable("id") Long id);
}
