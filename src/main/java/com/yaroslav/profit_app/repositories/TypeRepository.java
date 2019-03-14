package com.yaroslav.profit_app.repositories;

import com.yaroslav.profit_app.model.RecordType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TypeRepository extends JpaRepository<RecordType, Long> {
    Optional<RecordType> findByName(String name);
}
