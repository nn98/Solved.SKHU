use SWP;
-- 가장 많이 푼 문제 10개
select SOLVED_RANK, ID, namekr, rate, count(PROBLEM_ID) as sum from Solve join Problem on Solve.PROBLEM_ID = Problem.ID group by PROBLEM_ID having count(PROBLEM_ID) order by count(PROBLEM_ID) desc limit 0,10;

-- 가장 적게 푼 문제 10개
select SOLVED_RANK, ID, namekr, rate, count(PROBLEM_ID) as sum from Solve join Problem on Solve.PROBLEM_ID = Problem.ID group by PROBLEM_ID having count(PROBLEM_ID) order by count(PROBLEM_ID) limit 0,10;

-- 성공률 상위 10개 
select ID,namekr, rate, SOLVED_RANK from Problem where ID in (select PROBLEM_ID from Solve) and namekr regexp '^[가-힇 % %]*$' order by cast(rate as signed) desc limit 0,10; 

-- 성공률 하위 10개
select ID,namekr, rate, SOLVED_RANK from Problem where ID in (select PROBLEM_ID from Solve) and namekr regexp '^[가-힇 % %]*$' order by cast(rate as signed) limit 0,10;

select ID, skhurank from User order by skhurank;

-- 유저 기준 위 아래 2명의(총 4명) 푼 문제 리스트

select PROBLEM_ID, namekr, SOLVED_RANK ,count(PROBLEM_ID) as sum from User right join Solve on User.ID = Solve.USER_ID
join Problem on Solve.PROBLEM_ID = Problem.ID
where User.ID in (
select ID from User where skhurank = (select skhurank from User where ID='q9922000')+2
union
select ID from User where skhurank = (select skhurank from User where ID='q9922000')+1
union
select ID from User where skhurank = (select skhurank from User where ID='q9922000')-1
union
select ID from User where skhurank = (select skhurank from User where ID='q9922000')-2)
and PROBLEM_ID not in(select PROBLEM_ID from Solve where USER_ID = 'q9922000')
group by PROBLEM_ID having count(PROBLEM_ID)>=1 order by count(PROBLEM_ID) desc;


select * from Algorithm; -- O
select * from Problem; -- O
select * from PROBLEM_has_Algorithm;
select * from Solve;
select * from Solvedrank; -- O
select * from User; -- O
select * from User order by skhurank;

alter table Ranking modify column skhurank int null;

alter table SWP.Ranking modify column correction varchar(45) null;

UPDATE `SWP`.`Ranking` SET `correction` = '51.440%' WHERE (`User_ID` = 'kpeel5839');

