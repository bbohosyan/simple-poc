package org.uniqa.controller;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.jboss.logging.Logger;
import org.uniqa.dto.CreateTableRowRequest;
import org.uniqa.entity.TableRow;
import org.uniqa.repository.TableRowRepository;
import org.uniqa.service.SanitizationService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Path("/rows")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class TableRowController {

    private static final Logger LOG = Logger.getLogger(TableRowController.class);

    @Inject
    TableRowRepository repository;

    @Inject
    SanitizationService sanitizationService;

    @GET
    public Response getAllRows(
            @QueryParam("page") @DefaultValue("0") int page,
            @QueryParam("size") @DefaultValue("10") int size) {

        LOG.infof("Getting rows - page: %d, size: %d", page, size);

        if (size > 100) {
            return Response.status(400)
                    .entity(Map.of("error", "Size cannot exceed 100"))
                    .build();
        }
        if (size < 1) {
            return Response.status(400)
                    .entity(Map.of("error", "Size must be at least 1"))
                    .build();
        }

        List<TableRow> rows = repository.findAll()
                .page(page, size)
                .list();

        long totalCount = repository.count();

        Map<String, Object> response = new HashMap<>();
        response.put("data", rows);
        response.put("totalCount", totalCount);
        response.put("page", page);
        response.put("size", size);

        return Response.ok(response).build();
    }

    @POST
    @Transactional
    public TableRow createRow(@Valid CreateTableRowRequest request) {
        LOG.infof("Creating row - typeNumber: %d, typeSelector: %s",
                request.typeNumber, request.typeSelector);

        TableRow row = new TableRow();
        row.typeNumber = request.typeNumber;
        row.typeSelector = request.typeSelector;
        row.typeFreeText = sanitizationService.sanitize(request.typeFreeText);

        repository.persist(row);

        LOG.infof("Row created with ID: %d", row.id);
        return row;
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public void deleteRow(@PathParam("id") Long id) {
        LOG.infof("Deleting row with ID: %d", id);
        repository.deleteById(id);
    }
}