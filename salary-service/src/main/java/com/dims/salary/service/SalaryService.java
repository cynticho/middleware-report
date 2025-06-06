package com.dims.salary.service;

import com.dims.salary.ResourceNotFoundException;
import com.dims.salary.model.Salary;
import com.dims.salary.repository.SalaryRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class SalaryService {

    @Autowired
    private SalaryRepository salaryRepository;

    public Salary create(Salary salary) {
        salary.setTotal(salary.getIndex()* salary.getBase());
        return salaryRepository.save(salary);
    }

    public Boolean exist(Long id) {
        return salaryRepository.existsById(id);
    }

    public Salary get(Long id) {
        return salaryRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException(" Salary with id " + id + " not found"));
    }

    public List<Salary> getAll() {
        return salaryRepository.findAll();
    }

    public Salary update(Long id, Salary salary) {
        if(!salaryRepository.existsById(id)){
            throw new ResourceNotFoundException(" Salary with id " + id + " not found");
        }
        salary.setIndex(id);
        salary.setTotal(salary.getIndex()* salary.getBase());
        return salaryRepository.save(salary);
    }

    public void delete(Long id) {
        if (!salaryRepository.existsById(id)) {
            throw new ResourceNotFoundException(" Salary with id " + id + " not found");
        }
        salaryRepository.deleteById(id);
    }

    public long count(){
        return salaryRepository.count();
    }
}
