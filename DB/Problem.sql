use SWP;
-- 성공률 상위 10개 
select ID,namekr, rate, SOLVED_RANK from Problem where ID in (select PROBLEM_ID from Solve) and namekr regexp '^[가-힇 % %]*$' order by cast(rate as signed) desc limit 0,10; 

-- 성공률 하위 10개
select ID,namekr, rate, SOLVED_RANK from Problem where ID in (select PROBLEM_ID from Solve) and namekr regexp '^[가-힇 % %]*$' order by cast(rate as signed) limit 0,10;

-- 가장 많이 푼 문제 10개
select SOLVED_RANK, ID, namekr, rate, count(PROBLEM_ID) as fuckyou from Solve join Problem on Solve.PROBLEM_ID = Problem.ID group by PROBLEM_ID having count(PROBLEM_ID) order by count(PROBLEM_ID) desc limit 0,10;

-- 가장 적게 푼 문제 10개
select SOLVED_RANK, ID, namekr, rate, count(PROBLEM_ID) as fuckyou from Solve join Problem on Solve.PROBLEM_ID = Problem.ID group by PROBLEM_ID having count(PROBLEM_ID) order by count(PROBLEM_ID) limit 0,10;

select * from Problem;
select * from Solve order by PROBLEM_ID desc;
select * from Solve;
select * from Qna;
select count(ID) from Problem where rate is null;
select count(USER_ID) from Solve;
select count(date) from Solve;
select * from Solvedrank;
select * from Ranking order by skhurank;
alter table Ranking modify column skhurank int null;
select * from User;
select count(ID) from Algorithm;
select * from SWP.Algorithm order by ID;
desc SWP.Problem;
select count(PRO_ID) from PROBLEM_has_Algorithm;
select * from SWP.PROBLEM_has_Algorithm order by PRO_ID desc;
select * from SWP.User order by solvedrank;
select * from User;
select * from Problem;
select count(ID) from Problem;
select count(ID) from User;
desc User;
select * from SWP.Solve;
select * from SWP.Ranking order by skhurank; 
select count(USER_ID) from Solve;
select * from Solve where PROBLEM_ID = 11967;
select * from Problem where ID = 12096;
select count(PROBLEM_ID) from Solve;
select * from Solve;
select distinct USER_ID from Solve;
select * from User order by solvedrank;
select count(distinct USER_ID) from Solve;
select count(ID) from User;
update Ranking set pro = 848 where User_ID = 'shg9411';
desc Ranking;
select * from SWP.Ranking order by skhurank;
UPDATE Ranking SET `tier` = 'skhu' WHERE (`User_ID` = 'shg9411');
insert into PROBLEM values(1, "안녕", "hello");
delete from SWP.SOLVED_RANK where id = 200;
select correction from SWP.Ranking where User_ID='eoehd1ek';
desc SWP.Ranking;
desc SWP.User;
alter table SWP.Ranking modify column correction varchar(45) null;
UPDATE `SWP`.`Ranking` SET `correction` = '51.440%' WHERE (`User_ID` = 'kpeel5839');

