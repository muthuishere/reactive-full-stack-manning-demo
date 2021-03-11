package com.manning.salonapp.salonservice;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

import java.util.List;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = "http://localhost:3000")
public class SalonServiceController {

    SalonService salonService;

    public  SalonServiceController(SalonService salonService){
        this.salonService=salonService;
    }

    @GetMapping
    public Flux<SalonServiceDetail> retrieveAvailableSalonServicesAPI(){

        return salonService.findAll();
    }
}
