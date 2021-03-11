package com.manning.salonapp.slot;

import com.manning.salonapp.salonservice.SalonServiceDetail;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;


public interface SlotRepository extends ReactiveCrudRepository<Slot,Long> {

//    List<Slot> findAllBySlotForGreaterThanEqualAndSlotForLessThanEqualAndAvailableServicesContaining(LocalDateTime startTime, LocalDateTime endTime, SalonServiceDetail serviceDetail);

    @Query("select * from slot where id in (select slot_id from slot_available_services where available_services_id=:salonServiceDetailId)")
    Flux<Slot> findAvailableSlotsForService(Long salonServiceDetailId);

    Mono<Slot> findById(Long id);
    Mono<Slot> findByIdAndStatus(Long id,int slotStatus);

}
