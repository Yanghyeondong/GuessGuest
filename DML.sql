use guess_guest;

INSERT INTO User (`user_id`,`age`,`description`,`food`,`gender`,`hate`,`is_solo`,`mbti`,`nickname`,`phone_number`,`visit_place`) VALUES (1,20,'hello','Korean',True,0,True,'E','james','010-1234-1234','양양');
INSERT INTO User (`user_id`,`age`,`description`,`food`,`gender`,`hate`,`is_solo`,`mbti`,`nickname`,`phone_number`,`visit_place`) VALUES (2,26,'hi','Chinese',False,0,False,'E','Jessica','1111','해운대');
INSERT INTO User (`user_id`,`age`,`description`,`food`,`gender`,`hate`,`is_solo`,`mbti`,`nickname`,`phone_number`,`visit_place`) VALUES (3,33,'안녕','Japanese',False,0,True,'I','Lisa','1234','양양');
INSERT INTO User (`user_id`,`age`,`description`,`food`,`gender`,`hate`,`is_solo`,`mbti`,`nickname`,`phone_number`,`visit_place`) VALUES (4,41,'하이','Korean',True,0,True,'E','Tom','2222','애월');
INSERT INTO User (`user_id`,`age`,`description`,`food`,`gender`,`hate`,`is_solo`,`mbti`,`nickname`,`phone_number`,`visit_place`) VALUES (5,35,'오','Chinese',False,0,False,'I','Jenny','1111','경포대');
INSERT INTO User (`user_id`,`age`,`description`,`food`,`gender`,`hate`,`is_solo`,`mbti`,`nickname`,`phone_number`,`visit_place`) VALUES (6,27,'안뇽','Japanese',True,0,False,'I','Mike','1111','해운대');

INSERT INTO House (`house_id`,`address`,`age_20`,`age_30`,`age_40`,`chinese`,`description`,`female`,`japanese`,`korean`,`male`,`mbti_e`,`mbti_i`,`name`,`not_solo`,`place`,`reserve_url`,`solo`,`total_user`) VALUES (1,'강원도 강릉',0,0,0,0,'0',0,0,0,0,0,0,'강릉 게하',0,'경포대','https://place-site.yanolja.com/places/10062035?srpKeyword=%EA%B0%95%EB%A6%89',0,0);
INSERT INTO House (`house_id`,`address`,`age_20`,`age_30`,`age_40`,`chinese`,`description`,`female`,`japanese`,`korean`,`male`,`mbti_e`,`mbti_i`,`name`,`not_solo`,`place`,`reserve_url`,`solo`,`total_user`) VALUES (2,'제주도 애월',0,0,0,0,'0',0,0,0,0,0,0,'애월 펜션',0,'애월','https://place-site.yanolja.com/places/10062035?srpKeyword=%EA%B0%95%EB%A6%89&checkInDate=2025-03-05&checkOutDate=2025-03-06&adultPax=2',0,0);

INSERT INTO Reservation (`reservation_id`,`end_date`,`start_date`,`house_Id`,`user_Id`) VALUES (1,'2025-01-04 00:00:00.000000','2025-01-01 00:00:00.000000',1,1);
INSERT INTO Reservation (`reservation_id`,`end_date`,`start_date`,`house_Id`,`user_Id`) VALUES (2,'2025-01-03 00:00:00.000000','2025-01-02 00:00:00.000000',1,2);
INSERT INTO Reservation (`reservation_id`,`end_date`,`start_date`,`house_Id`,`user_Id`) VALUES (3,'2025-01-09 00:00:00.000000','2025-01-05 00:00:00.000000',2,3);
INSERT INTO Reservation (`reservation_id`,`end_date`,`start_date`,`house_Id`,`user_Id`) VALUES (4,'2025-01-10 00:00:00.000000','2025-01-07 00:00:00.000000',2,4);
