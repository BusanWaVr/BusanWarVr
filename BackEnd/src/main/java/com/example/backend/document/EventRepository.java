package com.example.backend.document;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

public interface EventRepository extends MongoRepository<EventDoc, String> {

}
