package com.yaroslav.profit_app.controllers;

import com.yaroslav.profit_app.model.Record;
import com.yaroslav.profit_app.repositories.RecordRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Collection;

@RestController
@RequestMapping("/api")
public class HistoryController {
    private final RecordRepository repository;

    public HistoryController(RecordRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/records")
    public Collection<Record> records() {
        return repository.findAll();
    }

    @PostMapping(value = "/record", consumes = "application/json;charset=UTF-8")
    public ResponseEntity<Record> addRecord(@RequestBody @Valid Record record) {
        System.out.println("Record to save: " + record);
        @Valid Record newRecord = repository.save(record);
        return new ResponseEntity<>(newRecord, HttpStatus.CREATED);
    }

    @GetMapping("/records/{type}")
    public Collection<Record> getRecordsByType(@PathVariable String type){
        try {
            Long typeId = Long.parseLong(type);
            return repository.findByType_Id(typeId);
        } catch (NumberFormatException e) {
            return new ArrayList<>();
        }
    }
}
