package com.example.backend.model.chat;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QChatParticipantsInfo is a Querydsl query type for ChatParticipantsInfo
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QChatParticipantsInfo extends EntityPathBase<ChatParticipantsInfo> {

    private static final long serialVersionUID = -990556148L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QChatParticipantsInfo chatParticipantsInfo = new QChatParticipantsInfo("chatParticipantsInfo");

    public final QChatRoom chatRoom;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final com.example.backend.model.user.QUser user;

    public QChatParticipantsInfo(String variable) {
        this(ChatParticipantsInfo.class, forVariable(variable), INITS);
    }

    public QChatParticipantsInfo(Path<? extends ChatParticipantsInfo> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QChatParticipantsInfo(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QChatParticipantsInfo(PathMetadata metadata, PathInits inits) {
        this(ChatParticipantsInfo.class, metadata, inits);
    }

    public QChatParticipantsInfo(Class<? extends ChatParticipantsInfo> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.chatRoom = inits.isInitialized("chatRoom") ? new QChatRoom(forProperty("chatRoom"), inits.get("chatRoom")) : null;
        this.user = inits.isInitialized("user") ? new com.example.backend.model.user.QUser(forProperty("user")) : null;
    }

}

