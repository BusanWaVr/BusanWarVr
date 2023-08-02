package com.example.backend.document;


import com.example.backend.dto.chat.SenderDto;
import java.util.Date;
import javax.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collation = "event")
@Data
@NoArgsConstructor
@ToString
public class Message {

    @Id
    private String _id;

    private String roomUid;

    private SenderDto sender;

    private String type;

    private String body;

    private Date date;

    public Message(String roomUid, SenderDto sender, String type, String body) {
        this.roomUid = roomUid;
        this.sender = sender;
        this.type = type;
        this.body = body;
        this.date = new Date();
    }
}
