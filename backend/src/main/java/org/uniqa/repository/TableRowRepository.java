package org.uniqa.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import org.uniqa.entity.TableRow;

@ApplicationScoped
public class TableRowRepository implements PanacheRepository<TableRow> {
}