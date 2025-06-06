package com.dims.automobile.service;

import com.dims.automobile.ResourceNotFoundException;
import com.dims.automobile.model.Automobile;
import com.dims.automobile.repository.AutomobileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AutomobileService {

    @Autowired
    private AutomobileRepository automobileRepository;

    public Automobile create(Automobile automobile) {
        return automobileRepository.save(automobile);
    }

    public Boolean exist(Long id) {
        return automobileRepository.existsById(id);
    }

    public Automobile get(Long id) {
        return automobileRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException(" Automobile with id " + id + " not found"));
    }

    public List<Automobile> getAll() {
        return automobileRepository.findAll();
    }

    public Automobile update(Long id, Automobile automobile) {
        if (!automobileRepository.existsById(id)) {
            throw new ResourceNotFoundException(" Automobile with id " + id + " not found");
        }
        automobile.setId(id);
        return automobileRepository.save(automobile);

    }

    public void delete(Long id) {
        if (!automobileRepository.existsById(id)) {
            throw new ResourceNotFoundException(" Automobile with id " + id + " not found");
        }
        automobileRepository.deleteById(id);
    }

    public long count(){
        return automobileRepository.count();
    }
}
