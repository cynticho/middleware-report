package com.dims.person.service;

import com.dims.person.ResourceNotFoundException;
import com.dims.person.model.Person;
import com.dims.person.repository.PersonRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class PersonService {

    @Autowired
    private PersonRepository personRepository;

    public Person create(Person person) {
        return personRepository.save(person);
    }

    public Boolean exist(Long id) {
        return personRepository.existsById(id);
    }

    public Person get(Long id) {
        return personRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException(" Person with id " + id + " not found"));
    }

    public List<Person> getAll() {
        return personRepository.findAll();
    }

    public Person update(Long id, Person person) {
        if(!personRepository.existsById(id)){
            throw new ResourceNotFoundException(" Person with id " + id + " not found");
        }

        return personRepository.save(person);
    }

    public void delete(Long id) {
        if (!personRepository.existsById(id)) {
            throw new ResourceNotFoundException(" Person with id " + id + " not found");
        }
        personRepository.deleteById(id);
    }

    public long count(){
        return personRepository.count();
    }
}
