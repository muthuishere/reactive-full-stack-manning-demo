package com.manning.salonapp.slot;

import com.manning.salonapp.salonservice.SalonService;
import com.manning.salonapp.salonservice.SalonServiceDetail;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class SlotService {


    @Autowired
    SlotRepository slotRepository;



    @Autowired
    SalonService salonService;


    public void save(Slot slot) {
        slotRepository.save(slot);
    }


    public Flux<Slot> getSlotsForServiceOnDate(Long slotServiceId, String formattedDate) {

      //  SalonServiceDetail salonServiceDetail =  salonService.findById(slotServiceId).orElseThrow(()->new RuntimeException("Invalid Service"));

        LocalDate localDate = getAsDate(formattedDate);

        LocalDateTime startDate = localDate.atTime(0,1);
        LocalDateTime endDate = localDate.atTime(23,59);

        return slotRepository.findAvailableSlotsForService( slotServiceId)
                                        .filter(slot -> slot.slotFor.isAfter(startDate) && slot.slotFor.isBefore(endDate));
    }

    public LocalDate getAsDate(String formattedDate){

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        return LocalDate.parse(formattedDate, formatter);

    }

    public Mono<Slot> findById(Long id){
        return slotRepository.findById(id);
    }

    public Mono<Slot> bookSlotWithService(BookSlotRequest bookSlotRequest) {



       return slotRepository.findByIdAndStatus(bookSlotRequest.getSlotId(),SlotStatus.AVAILABLE.ordinal())
               .flatMap(slot -> {
                   slot.setStatus(SlotStatus.CONFIRMED);
                   slot.setSelectedServiceId(bookSlotRequest.getSalonServiceId());
                   slot.setConfirmedAt(LocalDateTime.now());
                   return slotRepository.save(slot);
               });



    }



}
