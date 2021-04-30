CREATE TABLE user (
  id              BIGINT          NOT NULL          AUTO_INCREMENT        COMMENT '회원식별자',
  email           VARCHAR(50)     NOT NULL                                COMMENT '이메일',
  password        VARCHAR(255)    NOT NULL                                COMMENT '비밀번호',
  name            VARCHAR(30)     NOT NULL                                COMMENT '이름',
  reg_date        DATETIME                                                COMMENT '등록일시',
  mod_date        DATETIME                                                COMMENT '수정일시',
  PRIMARY KEY (id)
) ENGINE=INNODB DEFAULT CHARSET=UTF8mb4 COMMENT '회원';

CREATE TABLE post (
  id              BIGINT          NOT NULL          AUTO_INCREMENT        COMMENT '게시글식별자',
  title           VARCHAR(50)     NOT NULL                                COMMENT '제목',
  content         TEXT            NOT NULL                                COMMENT '내용',
  user_id         BIGINT          NOT NULL                                COMMENT '회원식별자',
  reg_date        DATETIME                                                COMMENT '작성일시',
  mod_date        DATETIME                                                COMMENT '수정일시',
  PRIMARY KEY (id),
  CONSTRAINT FK_Post_user_id_User_id FOREIGN KEY (user_id) REFERENCES User (id)
) ENGINE=INNODB DEFAULT CHARSET=UTF8mb4 COMMENT '게시글';