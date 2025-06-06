package com.dims.employee.client;

import com.dims.employee.model.Person;
import jakarta.validation.Valid;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "person-service", url = "http://server.dicap.lan:8082/person")
public interface PersonClient {
    @GetMapping("/{id}")
    Person get(@PathVariable("id") Long id);

    @PutMapping("/{id}")
    Person update(@PathVariable Long id, @Valid @RequestBody Person person);
}
