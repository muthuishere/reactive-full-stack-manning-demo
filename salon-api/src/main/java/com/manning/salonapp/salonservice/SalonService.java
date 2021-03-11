package com.manning.salonapp.salonservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Optional;

@Service
public class SalonService {


    @Autowired
    SalonServiceDetailRepository salonServiceDetailRepository;


    public void save(SalonServiceDetail serviceDetail){
        salonServiceDetailRepository.save(serviceDetail);
    }



    public Flux<SalonServiceDetail> findAll() {
        return salonServiceDetailRepository.findAll();
    }



    public Mono<SalonServiceDetail> findById(Long id){
        return salonServiceDetailRepository.findById(id);
    }


}
