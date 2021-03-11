package com.manning.salonapp.slot;

import com.manning.salonapp.salonservice.SalonService;
import com.manning.salonapp.salonservice.SalonServiceDetail;
import io.swagger.annotations.ApiParam;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/slots")
@CrossOrigin(origins = "http://localhost:3000")
public class SlotController {

    SlotService slotService;
    SalonService salonService;

    public SlotController(SlotService slotService,SalonService salonService){

        this.slotService = slotService;
        this.salonService=salonService;
    }

    @GetMapping("/retrieveAvailableSlots/{salonServiceId}/{formattedDate}")
    public Flux<Slot> onDate(@PathVariable Long salonServiceId, @ApiParam(value = "Date in yyyy-MM-dd format", required = true,defaultValue = "2020-12-21")@PathVariable String formattedDate){
        return slotService.getSlotsForServiceOnDate(salonServiceId,formattedDate);
    }

    @GetMapping("/{slotId}")
    public Mono<Slot> findById(@PathVariable Long slotId){
        return slotService.findById(slotId);
    }

    @PostMapping
    public Mono<Slot> book(@RequestBody BookSlotRequest bookSlotRequest){
        try {
            return slotService.bookSlotWithService(bookSlotRequest);
        }catch (IllegalArgumentException e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,e.getMessage());
        }

    }




}
