package org.uniqa.controller;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import org.uniqa.entity.TableRow;
import org.uniqa.repository.TableRowRepository;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.core.Response;
import java.util.HashMap;
import java.util.Map;

import java.util.List;

@Path("/rows")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class TableRowController {

    @Inject
    TableRowRepository repository;

    @GET
    public Response getAllRows(
            @QueryParam("page") @DefaultValue("0") int page,
            @QueryParam("size") @DefaultValue("10") int size) {

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
    public TableRow createRow(@Valid TableRow row) {
        repository.persist(row);
        return row;
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public void deleteRow(@PathParam("id") Long id) {
        repository.deleteById(id);
    }
}