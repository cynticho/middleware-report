package com.dims.employee.client;

import com.dims.employee.model.Role_Post;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "role-service", url = "http://server.dicap.lan:8087/role")
public interface RoleClient {
    @GetMapping("/{id}")
    Role_Post get(@PathVariable("id") Long id);
}
