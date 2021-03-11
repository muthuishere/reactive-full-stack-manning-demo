package com.manning.salonapp.slot;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;


import com.manning.salonapp.salonservice.SalonServiceDetail;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.relational.core.mapping.Column;

import java.time.LocalDateTime;
import java.util.Set;




@Getter
@Setter
public class Slot {


    @Id
    private Long id;



    private int status;




    public  Slot(){

    }

    @JsonIgnore
    @Transient
    Set<SalonServiceDetail> availableServices;



    @Column(value = "selected_service_id")
    private Long selectedServiceId;

    String stylistName;


    LocalDateTime slotFor;



     LocalDateTime lockedAt;
     LocalDateTime confirmedAt;


    public SlotStatus getStatus() {
        return SlotStatus.values()[status];
    }

    public void setStatus(SlotStatus status) {
        this.status = status.ordinal();
    }


    @Override
    public String toString() {
        return "Slot{" +
                "id=" + id +
                ", availableServices=" + availableServices +
                ", stylistName='" + stylistName + '\'' +
                ", slotFor=" + slotFor +
                ", status=" + status +
                '}';
    }


}
