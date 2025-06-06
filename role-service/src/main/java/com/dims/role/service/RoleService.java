package com.dims.role.service;

import com.dims.role.ResourceNotFoundException;
import com.dims.role.model.Role_Post;
import com.dims.role.repository.RoleRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    public Role_Post create(Role_Post rolePost) {
        return roleRepository.save(rolePost);
    }

    public Boolean exist(Long id) {
        return roleRepository.existsById(id);
    }

    public Role_Post get(Long id) {
        return roleRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException(" Role with id " + id + " not found"));
    }

    public List<Role_Post> getAll() {
        return roleRepository.findAll();
    }

    public Role_Post update(Long id, Role_Post rolePost) {
        if(!roleRepository.existsById(id)){
            throw new ResourceNotFoundException(" Role with id " + id + " not found");
        }
        rolePost.setId(id);
        return roleRepository.save(rolePost);
    }

    public void delete(Long id) {
        if (!roleRepository.existsById(id)) {
            throw new ResourceNotFoundException(" Role with id " + id + " not found");
        }
        roleRepository.deleteById(id);
    }

    public long count(){
        return roleRepository.count();
    }
}
