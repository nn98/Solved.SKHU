use SWP;
set SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
insert into solvedrank value (0,'Unknown');
insert into Solvedrank (tier)
values ('Bronze5'),('Bronze4'),('Bronze3'),('Bronze2'),
('Bronze1'),('Silver5'),('Silver4'),('Silver3'),('Silver2'),
('Silver1'),('Gold5'),('Gold4'),('Gold3'),('Gold2'),('Gold1'),
('Platinum5'),('Platinum4'),('Platinum3'),('Platinum2'),
('Platinum1'),('Diamond5'),('Diamond4'),('Diamond3'),
('Diamond2'),('Diamond1'),('Ruby5'),('Ruby4'),('Ruby3'),
('Ruby2'),('Ruby1'),('Master');
select * from solvedrank;