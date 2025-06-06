package com.dims.employee.client;

import com.dims.employee.model.Agency;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "agency-service", url = "http://server.dicap.lan:8083/agency")
public interface AgencyClient {
    @GetMapping("/{id}")
    Agency get(@PathVariable("id") Long id);
}
