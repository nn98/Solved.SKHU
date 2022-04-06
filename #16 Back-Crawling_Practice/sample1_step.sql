-- MySQL dump 10.13  Distrib 8.0.28, for macos11 (x86_64)
--
-- Host: localhost    Database: sample1
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `step`
--

DROP TABLE IF EXISTS `step`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `step` (
  `id` int NOT NULL,
  `name` varchar(300) NOT NULL,
  `explan` varchar(300) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `step`
--

LOCK TABLES `step` WRITE;
/*!40000 ALTER TABLE `step` DISABLE KEYS */;
INSERT INTO `step` VALUES (1,'입출력과 사칙연산','입력, 출력과 사칙연산을 연습해 봅시다. Hello World!'),(2,'조건문','if 등의 조건문을 사용해 봅시다.'),(3,'반복문','for, while 등의 반복문을 사용해 봅시다.'),(4,'1차원 배열','배열을 사용해 봅시다.'),(5,'함수','함수를 정의하면 코드가 깔끔해지고 관리하기 쉬워집니다.'),(6,'문자열','문자열을 다루는 문제들을 해결해 봅시다.'),(7,'기본 수학 1','수학 문제로 수학적 사고력을 길러 봅시다.'),(8,'기본 수학 2','소수와 기하를 다뤄 봅시다.'),(9,'재귀','재귀함수를 다뤄 봅시다.'),(10,'브루트 포스','가장 간단한 알고리즘인, 모든 경우의 수를 검사하는 브루트 포스 알고리즘을 배워 봅시다.'),(11,'정렬','배열의 원소를 순서대로 나열하는 알고리즘을 배워 봅시다.'),(12,'집합과 맵','수정 예정'),(13,'백트래킹','모든 경우를 탐색하는 백트래킹 알고리즘을 배워 봅시다.'),(14,'동적 계획법 1','기초적인 동적 계획법 문제들을 풀어봅시다.'),(15,'그리디 알고리즘','특정 상황에서 성립하는 그리디 알고리즘을 배워 봅시다.'),(16,'정수론 및 조합론','정수론과 조합론을 배워 봅시다.'),(17,'스택','스택을 구현하고 사용해 봅시다.'),(18,'큐, 덱','큐와 덱을 구현하고 사용해 봅시다.'),(19,'분할 정복','재귀를 응용하는 알고리즘, 분할 정복을 익혀 봅시다.'),(20,'이분 탐색','이분 탐색 알고리즘을 배워 봅시다.'),(21,'우선순위 큐','가장 작은/큰 원소를 뽑는 자료구조를 배워 봅시다.'),(22,'동적 계획법 2','조금 더 어려운 동적 계획법 문제를 풀어 봅시다.'),(23,'DFS와 BFS','그래프를 순회하는 알고리즘을 배워 봅시다.'),(24,'최단 경로','그래프의 간선에 가중치가 없으면 BFS로 최단거리를 찾을 수 있습니다. 가중치가 있다면 어떨까요?'),(25,'투 포인터','투 포인터 알고리즘과 meet in the middle 알고리즘을 배워 봅시다.'),(26,'동적 계획법과 최단거리 역추적','지금까지는 최솟값, 최댓값, 최단거리만 찾았습니다. 이번에는 실제 최적해와 최단경로를 찾아 봅시다.'),(27,'트리','대표적인 그래프 종류 중 하나인 트리를 다뤄 봅시다.'),(28,'유니온 파인드','유니온 파인드(또는 disjoint set, 상호 배타적 집합, ...) 자료구조를 배워 봅시다.'),(29,'최소 신장 트리','최소 비용으로 그래프의 모든 정점을 연결해 봅시다.'),(30,'트리에서의 동적 계획법','트리에 동적 계획법을 적용해 봅시다.'),(31,'기하','조금 더 어려운 기하 문제를 풀어 봅시다.'),(32,'동적 계획법 3','비트마스크를 배우고, 동적 계획법에 적용해 봅시다. 그 후에는 선형이 아니라 원형으로 구성된 문제를 다룹니다.'),(33,'문자열 알고리즘 1','KMP 알고리즘과 트라이 자료구조를 다뤄 봅시다.'),(34,'위상 정렬','간선에 방향이 있는 그래프의 정점을 나열해 역방향이 없게 만드는 알고리즘을 다뤄 봅시다.'),(35,'최소 공통 조상','트리에서 두 정점의 최소 공통 조상을 구하는 자료구조를 배워 봅시다.'),(36,'강한 연결 요소','Strongly connected component를 다뤄 봅시다.'),(37,'세그먼트 트리','구간 쿼리를 효율적으로 수행하는 자료구조를 배워 봅시다.'),(38,'스위핑','스위핑 알고리즘을 배워 봅시다.'),(39,'동적 계획법 4','동적 계획법의 세계는 끝이 없습니다.'),(40,'컨벡스 헐','모든 점을 포함하는 가장 작은 볼록 다각형을 만들어 봅시다.'),(41,'이분 매칭','이분 매칭 알고리즘에 대해 배워 봅시다.'),(42,'네트워크 플로우','네트워크 플로우 알고리즘에 대해 알아봅시다.'),(43,'MCMF','최소 비용으로 최대 유량을 흘려 봅시다.'),(44,'더 어려운 수학','포함-배제 정리, 빠른 소수 판정, 중국인의 나머지 정리 등을 다룹니다.'),(45,'고속 푸리에 변환','두 다항식을 O(NlogN) 만에 곱할 수 있다고 하면 믿으시겠습니까? 놀랍게도 가능합니다!'),(46,'문자열 알고리즘 2','매니커, Z, 접미사 배열, 아호 코라식을 배워 봅시다'),(47,'어려운 구간 쿼리','세그먼트 트리 with lazy propagation, Mo\'s algorithm, 그리고 persistent segment tree (추가 예정)를 배워 봅시다.'),(48,'동적 계획법 최적화','다양한 동적 계획법 최적화 테크닉을 배워 봅시다.'),(49,'매우 어려운 자료구조와 알고리즘 (수정 예정)','일반적인 대회에서 통용되는 알고리즘의 최전선까지 가 봅시다.');
/*!40000 ALTER TABLE `step` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-06 20:26:32
