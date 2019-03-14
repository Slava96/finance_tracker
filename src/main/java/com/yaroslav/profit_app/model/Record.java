package com.yaroslav.profit_app.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "money_history")
public class Record {
    @Id
    @SequenceGenerator(sequenceName = "history_id_seq", name="records", allocationSize = 1)
    @GeneratedValue(generator = "records")
    private Long id;
    @NonNull
    private float summ;
    @NonNull
    @JsonProperty
    @Column(name="isincome")
    private boolean isIncome;
    @NonNull
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.yyyy")
    private LocalDate date;
    private String comment;
    @ManyToOne
    private User user;
    @ManyToOne
    private RecordType type;
}
