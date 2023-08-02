package com.example.backend.dto.tour;

import com.example.backend.model.tour.Tour;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TourReservationCancelDto {

    private int currentMember;

    public TourReservationCancelDto(Tour tour){
        this.currentMember = tour.getCurrentMember();
    }
    public Tour downCurrentMember(Tour tour) {
        tour.setCurrentMember(this.currentMember - 1);
        return tour;
    }
}
