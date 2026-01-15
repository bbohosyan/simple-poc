package org.uniqa.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Min;

@Entity
public class TableRow extends PanacheEntity {

    @NotNull(message = "Type Number is required")
    @Min(value = 1, message = "Type Number must be at least 1")
    public Integer typeNumber;

    @NotBlank(message = "Type Selector is required")
    public String typeSelector;

    @NotBlank(message = "Type Free Text is required")
    public String typeFreeText;
}