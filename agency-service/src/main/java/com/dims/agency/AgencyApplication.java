
package com.dims.agency;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.cloud.openfeign.EnableFeignClients;

@RefreshScope
@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients
public class AgencyApplication {

	public static void main(String[] args) {
		SpringApplication.run(AgencyApplication.class, args);
	}

}
