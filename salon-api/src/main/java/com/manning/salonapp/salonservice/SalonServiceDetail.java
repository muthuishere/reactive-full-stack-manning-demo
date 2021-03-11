package com.manning.salonapp.salonservice;

import lombok.*;
import org.springframework.data.annotation.Id;


@Data
@NoArgsConstructor
@ToString
public class SalonServiceDetail {

    @Id
    Long id;


    String name;
    String description;
    Long price;
    Integer timeInMinutes;
}
