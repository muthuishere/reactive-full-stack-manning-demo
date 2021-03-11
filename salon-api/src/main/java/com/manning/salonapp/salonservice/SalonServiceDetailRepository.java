package com.manning.salonapp.salonservice;

import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

import java.util.Optional;

@Repository
public interface SalonServiceDetailRepository extends ReactiveCrudRepository<SalonServiceDetail,Long> {
    public Mono<SalonServiceDetail> findById(Long id);
}
