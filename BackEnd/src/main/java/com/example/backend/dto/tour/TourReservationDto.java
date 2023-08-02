package com.example.backend.dto.tour;

import com.example.backend.model.tour.Tour;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TourReservationDto {

    private int currentMember;

    public TourReservationDto(Tour tour){
        this.currentMember = tour.getCurrentMember();
    }
    public Tour upCurrentMember(Tour tour) {
        tour.setCurrentMember(this.currentMember + 1);
        return tour;
    }
}
