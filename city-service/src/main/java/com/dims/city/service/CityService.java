package com.dims.city.service;

import com.dims.city.ResourceNotFoundException;
import com.dims.city.model.City;
import com.dims.city.repository.CityRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class CityService {

    @Autowired
    private CityRepository cityRepository;

    public City create(City city) {
        return cityRepository.save(city);
    }

    public Boolean exist(Long id) {
        return cityRepository.existsById(id);
    }

    public City get(Long id) {
        return cityRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException(" city with id " + id + " not found"));
    }

    public List<City> getAll() {
        return cityRepository.findAll();
    }

    public City update(Long id, City city) {
        if(!cityRepository.existsById(id)){
            throw new ResourceNotFoundException(" city with id " + id + " not found");
        }
        city.setId(id);
        return cityRepository.save(city);
    }

    public void delete(Long id) {
        if (!cityRepository.existsById(id)) {
            throw new ResourceNotFoundException(" city with id " + id + " not found");
        }
        cityRepository.deleteById(id);
    }

    public long count(){
        return cityRepository.count();
    }
}
