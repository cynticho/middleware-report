package com.dims.agency.service;

import com.dims.agency.ResourceNotFoundException;
import com.dims.agency.client.CityClient;
import com.dims.agency.model.Agency;
import com.dims.agency.model.City;
import com.dims.agency.repository.AgencyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AgencyService {

    @Autowired
    private AgencyRepository agencyRepository;

    @Autowired
    private CityClient client;

    public Agency create(Agency agency) {
        City city=client.get(agency.getCity().getId());
        if(city== null){
            throw new ResourceNotFoundException("the given city doesn't exists !!!");
        }
        agency.setCity(city);
        return agencyRepository.save(agency);
    }

    public Boolean exist(Long id) {
        return agencyRepository.existsById(id);
    }

    public Agency get(Long id) {
        return agencyRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException(" Agency with id " + id + " not found"));
    }

    public List<Agency> getAll() {
        return agencyRepository.findAll();
    }

    public Agency update(Long id, Agency agency) {
        if(!agencyRepository.existsById(id)){
            throw new ResourceNotFoundException(" Agency with id " + id + " not found");
        }
        agency.setId(id);
        return agencyRepository.save(agency);
    }

    public void delete(Long id) {
        if (!agencyRepository.existsById(id)) {
            throw new ResourceNotFoundException(" Agency with id " + id + " not found");
        }
        agencyRepository.deleteById(id);
    }

    public long count(){
        return agencyRepository.count();
    }
}
