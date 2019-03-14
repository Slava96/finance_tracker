package com.yaroslav.profit_app.controllers;

import com.yaroslav.profit_app.model.RecordType;
import com.yaroslav.profit_app.repositories.TypeRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
@RequestMapping("/api")
public class TypeController {
    private final TypeRepository repository;

    public TypeController(TypeRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/types")
    Collection<RecordType> types(){
        return repository.findAll();
    }
}
