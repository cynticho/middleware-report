package com.dims.employee.client;

import com.dims.employee.model.Salary;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "salary-service", url = "http://server.dicap.lan:8086/salary")
public interface SalaryClient {
    @GetMapping("/{id}")
    Salary get(@PathVariable("id") Long id);
}
