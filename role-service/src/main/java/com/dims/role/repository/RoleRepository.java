package com.dims.role.repository;

import com.dims.role.model.Role_Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role_Post, Long> {
}
