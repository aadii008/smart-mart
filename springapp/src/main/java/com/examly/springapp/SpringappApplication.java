package com.examly.springapp;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.client.RestTemplate;

import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepo;

@SpringBootApplication
public class SpringappApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringappApplication.class, args);
	}

	@Bean
    CommandLineRunner init(UserRepo userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (userRepository.findByPhoneOrUsername("8148789309","superadmin").isEmpty()) {
                User superAdmin = new User();
                superAdmin.setEmail("superadmin@gmail.com");
                superAdmin.setPassword(passwordEncoder.encode("SuperAdmin@123"));
                superAdmin.setUsername("superadmin");
                superAdmin.setMobileNumber("8148789309");
                superAdmin.setUserRole("SUPER_ADMIN");
                userRepository.save(superAdmin);
            }
        };
 
}

    @Bean
    public RestTemplate restTemplate(){
        return new RestTemplate();
    }
 

}
