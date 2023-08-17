-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema busan
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema busan
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `busan` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `busan` ;

-- -----------------------------------------------------
-- Table `busan`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `busan`.`category` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 17
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `busan`.`tour`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `busan`.`tour` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `content` VARCHAR(4000) NULL DEFAULT NULL,
  `current_member` INT NULL DEFAULT NULL,
  `end_date` DATETIME NULL DEFAULT NULL,
  `is_canceled` TINYINT NULL DEFAULT NULL,
  `is_ended` TINYINT NULL DEFAULT NULL,
  `max_member` INT NULL DEFAULT NULL,
  `min_member` INT NULL DEFAULT NULL,
  `region` VARCHAR(255) NULL DEFAULT NULL,
  `start_date` DATETIME NULL DEFAULT NULL,
  `sub_title` VARCHAR(255) NULL DEFAULT NULL,
  `title` VARCHAR(255) NULL DEFAULT NULL,
  `uid` VARCHAR(255) NULL DEFAULT NULL,
  `user_id` BIGINT NULL DEFAULT NULL,
  `link` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 110
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `busan`.`chat_room`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `busan`.`chat_room` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `create_time` DATETIME NULL DEFAULT NULL,
  `host_id` BIGINT NULL DEFAULT NULL,
  `tour_id` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FKsj9560n2bq1y634k0b10b3b3e` (`tour_id` ASC) VISIBLE,
  CONSTRAINT `FKsj9560n2bq1y634k0b10b3b3e`
    FOREIGN KEY (`tour_id`)
    REFERENCES `busan`.`tour` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 30
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `busan`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `busan`.`user` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NULL DEFAULT NULL,
  `follow_id` BIGINT NULL DEFAULT NULL,
  `introduction` VARCHAR(255) NULL DEFAULT NULL,
  `nickname` VARCHAR(255) NULL DEFAULT NULL,
  `password` VARCHAR(255) NULL DEFAULT NULL,
  `profile_img` VARCHAR(255) NULL DEFAULT NULL,
  `refresh_token` VARCHAR(255) NULL DEFAULT NULL,
  `type` VARCHAR(255) NULL DEFAULT NULL,
  `user_id` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 43
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `busan`.`chat_participants_info`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `busan`.`chat_participants_info` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `chat_room_id` BIGINT NULL DEFAULT NULL,
  `user_id` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FKajswcd82m12l3guhgam0smwtk` (`chat_room_id` ASC) VISIBLE,
  INDEX `FKfngxq048d162a5jvtvgor4uap` (`user_id` ASC) VISIBLE,
  CONSTRAINT `FKajswcd82m12l3guhgam0smwtk`
    FOREIGN KEY (`chat_room_id`)
    REFERENCES `busan`.`chat_room` (`id`),
  CONSTRAINT `FKfngxq048d162a5jvtvgor4uap`
    FOREIGN KEY (`user_id`)
    REFERENCES `busan`.`user` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 138
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `busan`.`comment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `busan`.`comment` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `content` VARCHAR(255) NULL DEFAULT NULL,
  `parent_id` BIGINT NULL DEFAULT NULL,
  `tour_id` BIGINT NULL DEFAULT NULL,
  `user_id` BIGINT NULL DEFAULT NULL,
  `write_date` DATETIME NULL DEFAULT NULL,
  `is_deleted` TINYINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 131
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `busan`.`course`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `busan`.`course` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `content` VARCHAR(4000) NULL DEFAULT NULL,
  `lat` DOUBLE NULL DEFAULT NULL,
  `lon` DOUBLE NULL DEFAULT NULL,
  `title` VARCHAR(255) NULL DEFAULT NULL,
  `tour_id` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 299
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `busan`.`image`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `busan`.`image` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `url` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 308
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `busan`.`course_image`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `busan`.`course_image` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `course_id` BIGINT NULL DEFAULT NULL,
  `image_id` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK5uweik1v6wv796ggohfekp7wb` (`course_id` ASC) VISIBLE,
  INDEX `FKdq1yjucebmfvxi7b16gj7aaj3` (`image_id` ASC) VISIBLE,
  CONSTRAINT `FK5uweik1v6wv796ggohfekp7wb`
    FOREIGN KEY (`course_id`)
    REFERENCES `busan`.`course` (`id`),
  CONSTRAINT `FKdq1yjucebmfvxi7b16gj7aaj3`
    FOREIGN KEY (`image_id`)
    REFERENCES `busan`.`image` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 111
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `busan`.`follower`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `busan`.`follower` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `guide_id` BIGINT NULL DEFAULT NULL,
  `user_id` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK8klg1f9e1nlniterayuwfo6d5` (`guide_id` ASC) VISIBLE,
  INDEX `FKr99xseniq62g6519wn3i3duak` (`user_id` ASC) VISIBLE,
  CONSTRAINT `FK8klg1f9e1nlniterayuwfo6d5`
    FOREIGN KEY (`guide_id`)
    REFERENCES `busan`.`user` (`id`),
  CONSTRAINT `FKr99xseniq62g6519wn3i3duak`
    FOREIGN KEY (`user_id`)
    REFERENCES `busan`.`user` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 217
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `busan`.`joiner`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `busan`.`joiner` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `join_date` DATETIME NULL DEFAULT NULL,
  `tour_id` BIGINT NULL DEFAULT NULL,
  `user_id` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FKgpjnaqhle7dex78lm8fj9el0e` (`tour_id` ASC) VISIBLE,
  INDEX `FK22jpipkjk3hou6fnks9chus4x` (`user_id` ASC) VISIBLE,
  CONSTRAINT `FK22jpipkjk3hou6fnks9chus4x`
    FOREIGN KEY (`user_id`)
    REFERENCES `busan`.`user` (`id`),
  CONSTRAINT `FKgpjnaqhle7dex78lm8fj9el0e`
    FOREIGN KEY (`tour_id`)
    REFERENCES `busan`.`tour` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 145
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `busan`.`mate`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `busan`.`mate` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `content` VARCHAR(255) NULL DEFAULT NULL,
  `join_member` INT NULL DEFAULT NULL,
  `max_member` INT NULL DEFAULT NULL,
  `min_member` INT NULL DEFAULT NULL,
  `title` VARCHAR(255) NULL DEFAULT NULL,
  `tour_id` BIGINT NULL DEFAULT NULL,
  `user_id` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 22
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `busan`.`review`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `busan`.`review` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `content` VARCHAR(255) NULL DEFAULT NULL,
  `date` DATETIME NULL DEFAULT NULL,
  `score` DOUBLE NULL DEFAULT NULL,
  `title` VARCHAR(255) NULL DEFAULT NULL,
  `tour_id` BIGINT NULL DEFAULT NULL,
  `user_id` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 64
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `busan`.`tour_category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `busan`.`tour_category` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `date` DATETIME NULL DEFAULT NULL,
  `category_id` BIGINT NULL DEFAULT NULL,
  `tour_id` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FKdy6eldt453mi4tyv4gc1np7ag` (`category_id` ASC) VISIBLE,
  INDEX `FKk99gxgifscof3vuga1hvannk2` (`tour_id` ASC) VISIBLE,
  CONSTRAINT `FKdy6eldt453mi4tyv4gc1np7ag`
    FOREIGN KEY (`category_id`)
    REFERENCES `busan`.`category` (`id`),
  CONSTRAINT `FKk99gxgifscof3vuga1hvannk2`
    FOREIGN KEY (`tour_id`)
    REFERENCES `busan`.`tour` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 773
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `busan`.`tour_image`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `busan`.`tour_image` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `image_id` BIGINT NULL DEFAULT NULL,
  `tour_id` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FKp5j3mbo41nl4jx12w54ja1une` (`image_id` ASC) VISIBLE,
  INDEX `FKe829px6ivuaq4s9chmdn2wree` (`tour_id` ASC) VISIBLE,
  CONSTRAINT `FKe829px6ivuaq4s9chmdn2wree`
    FOREIGN KEY (`tour_id`)
    REFERENCES `busan`.`tour` (`id`),
  CONSTRAINT `FKp5j3mbo41nl4jx12w54ja1une`
    FOREIGN KEY (`image_id`)
    REFERENCES `busan`.`image` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 192
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `busan`.`tour_tour_images`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `busan`.`tour_tour_images` (
  `tour_id` BIGINT NOT NULL,
  `tour_images_id` BIGINT NOT NULL,
  UNIQUE INDEX `UK_fsw5obqd869forpyrjg4f52dp` (`tour_images_id` ASC) VISIBLE,
  INDEX `FKmgx758im2oapvfne6k9fqbhs6` (`tour_id` ASC) VISIBLE,
  CONSTRAINT `FKmgx758im2oapvfne6k9fqbhs6`
    FOREIGN KEY (`tour_id`)
    REFERENCES `busan`.`tour` (`id`),
  CONSTRAINT `FKo1ko6mes6dt2bj788cmhtpiwx`
    FOREIGN KEY (`tour_images_id`)
    REFERENCES `busan`.`tour_image` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `busan`.`user_category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `busan`.`user_category` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `date` DATETIME NULL DEFAULT NULL,
  `category_id` BIGINT NULL DEFAULT NULL,
  `user_id` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FKjchjxphkf5owj1i5bp95g5mfs` (`category_id` ASC) VISIBLE,
  INDEX `FKkukst0qag2d8k8d1jlc809u0u` (`user_id` ASC) VISIBLE,
  CONSTRAINT `FKjchjxphkf5owj1i5bp95g5mfs`
    FOREIGN KEY (`category_id`)
    REFERENCES `busan`.`category` (`id`),
  CONSTRAINT `FKkukst0qag2d8k8d1jlc809u0u`
    FOREIGN KEY (`user_id`)
    REFERENCES `busan`.`user` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 289
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `busan`.`wish`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `busan`.`wish` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT NULL DEFAULT NULL,
  `tour_id` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK2p11qca1l0s1x083ujbppnack` (`tour_id` ASC) VISIBLE,
  CONSTRAINT `FK2p11qca1l0s1x083ujbppnack`
    FOREIGN KEY (`tour_id`)
    REFERENCES `busan`.`tour` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 82
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
