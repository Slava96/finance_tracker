package com.yaroslav.profit_app.repositories;

import com.yaroslav.profit_app.model.Record;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;

public interface RecordRepository extends JpaRepository<Record, Long> {
    Collection<Record> findByType_Id(Long id);
}
