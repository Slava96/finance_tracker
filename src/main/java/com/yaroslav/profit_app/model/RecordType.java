package com.yaroslav.profit_app.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="money_type")
public class RecordType {
    @Id
    @SequenceGenerator(sequenceName = "money_type_id_seq", name="types", allocationSize = 1)
    @GeneratedValue (generator = "types")
    private Long id;
    private String name;
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER ,orphanRemoval = true, mappedBy = "type")
    @JsonIgnore
    private List<Record> recordList;
}
