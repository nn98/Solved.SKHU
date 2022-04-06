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
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(300) NOT NULL,
  `e_name` varchar(300) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=188 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'수학','Mathematics'),(2,'구현','Implementation'),(3,'다이나믹 프로그래밍','Dynamic Programming'),(4,'그래프 이론','Graph Theory'),(5,'자료 구조','Data Structures'),(6,'문자열','String'),(7,'그리디 알고리즘','Greedy'),(8,'브루트포스 알고리즘','Bruteforcing'),(9,'그래프 탐색','Graph Traversal'),(10,'정렬','Sorting'),(11,'기하학','Geometry'),(12,'정수론','Number Theory'),(13,'트리','Tree'),(14,'세그먼트 트리','Segment Tree'),(15,'이분 탐색','Binary Search'),(16,'너비 우선 탐색','Breadth-first Search'),(17,'사칙연산','Arithmetic'),(18,'시뮬레이션','Simulation'),(19,'깊이 우선 탐색','Depth-first Search'),(20,'애드 혹','Ad-hoc'),(21,'조합론','Combinatorics'),(22,'누적 합','Prefix Sum'),(23,'구성적','Constructive'),(24,'많은 조건 분기','Case Work'),(25,'비트마스킹','Bitmask'),(26,'다익스트라','Dijkstra\'s'),(27,'파싱','Parsing'),(28,'백트래킹','Backtracking'),(29,'분리 집합','Disjoint Set'),(30,'분할 정복','Divide And Conquer'),(31,'스위핑','Sweeping'),(32,'해시를 사용한 집합과 맵','Set / Map By Hashing'),(33,'트리를 사용한 집합과 맵','Set / Map By Trees'),(34,'우선순위 큐','Priority Queue'),(35,'스택','Stack'),(36,'트리에서의 다이나믹 프로그래밍','Dynamic Programming On Trees'),(37,'두 포인터','Two-pointer'),(38,'소수 판정','Primality Test'),(39,'최대 유량','Maximum Flow'),(40,'느리게 갱신되는 세그먼트 트리','Segment Tree With Lazy Propagation'),(41,'비트필드를 이용한 다이나믹 프로그래밍','Dynamic Programming Using Bitfield'),(42,'게임 이론','Game Theory'),(43,'임의 정밀도 / 큰 수 연산','Arbitrary Precision / Big Integers'),(44,'분할 정복을 이용한 거듭제곱','Exponentiation By Squaring'),(45,'오프라인 쿼리','Offline Queries'),(46,'재귀','Recursion'),(47,'확률론','Probability Theory'),(48,'매개 변수 탐색','Parametric Search'),(49,'에라토스테네스의 체','Sieve Of Eratosthenes'),(50,'이분 매칭','Bipartite Matching'),(51,'배낭 문제','Knapsack'),(52,'최소 스패닝 트리','Minimum Spanning Tree'),(53,'런타임 전의 전처리','Precomputation'),(54,'최소 공통 조상','Lowest Common Ancestor'),(55,'값 / 좌표 압축','Value / Coordinate Compression'),(56,'유클리드 호제법','Euclidean Algorithm'),(57,'해싱','Hashing'),(58,'위상 정렬','Topological Sorting'),(59,'플로이드–와샬','Floyd–warshall'),(60,'강한 연결 요소','Strongly Connected Component'),(61,'선형대수학','Linear Algebra'),(62,'볼록 껍질','Convex Hull'),(63,'포함 배제의 원리','Inclusion And Exclusion'),(64,'희소 배열','Sparse Table'),(65,'트라이','Trie'),(66,'고속 푸리에 변환','Fast Fourier Transform'),(67,'접미사 배열과 lcp 배열','Suffix Array And Lcp Array'),(68,'작은 집합에서 큰 집합으로 합치는 테크닉','Smaller To Larger Technique'),(69,'kmp','Knuth–morris–pratt'),(70,'중간에서 만나기','Meet In The Middle'),(71,'볼록 껍질을 이용한 최적화','Convex Hull Trick'),(72,'슬라이딩 윈도우','Sliding Window'),(73,'덱','Deque'),(74,'최소 비용 최대 유량','Minimum Cost Maximum Flow'),(75,'미적분학','Calculus'),(76,'무작위화','Randomization'),(77,'제곱근 분할법','Square Root Decomposition'),(78,'3차원 기하학','Geometry; 3d'),(79,'스프라그–그런디 정리','Sprague–grundy Theorem'),(80,'선분 교차 판정','Line Segment Intersection Check'),(81,'오일러 경로 테크닉','Euler Tour Technique'),(82,'heavy-light 분할','Heavy-light Decomposition'),(83,'가장 긴 증가하는 부분 수열: o(n log n)','Longest Increasing Sequence In O(n Log N)'),(84,'가우스 소거법','Gaussian Elimination'),(85,'센트로이드 분할','Centroid Decomposition'),(86,'최대 유량 최소 컷 정리','Max-flow Min-cut Theorem'),(87,'단절점과 단절선','Articulation Points And Bridges'),(88,'피타고라스 정리','Pythagoras Theorem'),(89,'2-sat','2-sat'),(90,'순열 사이클 분할','Permutation Cycle Decomposition'),(91,'큐','Queue'),(92,'오일러 경로','Eulerian Path / Circuit'),(93,'비트 집합','Bit Set'),(94,'삼분 탐색','Ternary Search'),(95,'퍼시스턴트 세그먼트 트리','Persistent Segment Tree'),(96,'센트로이드','Centroid'),(97,'휴리스틱','Heuristics'),(98,'선인장','Cactus'),(99,'물리학','Physics'),(100,'중국인의 나머지 정리','Chinese Remainder Theorem'),(101,'mo\'s','Mo\'s'),(102,'모듈로 곱셈 역원','Modular Multiplicative Inverse'),(103,'이중 연결 요소','Biconnected Component'),(104,'스플레이 트리','Splay Tree'),(105,'벨만–포드','Bellman–ford'),(106,'페르마의 소정리','Fermat\'s Little Theorem'),(107,'분할 정복을 사용한 최적화','Divide And Conquer Optimization'),(108,'확장 유클리드 호제법','Extended Euclidean Algorithm'),(109,'평면 그래프','Planar Graph'),(110,'아호-코라식','Aho-corasick'),(111,'오일러 피 함수','Euler Totient Function'),(112,'0-1 너비 우선 탐색','0-1 Bfs'),(113,'기댓값의 선형성','Linearity Of Expectation'),(114,'병렬 이분 탐색','Parallel Binary Search'),(115,'볼록 다각형 내부의 점 판정','Point In Convex Polygon Check'),(116,'벌래캠프–매시','Berlekamp–massey'),(117,'머지 소트 트리','Merge Sort Tree'),(118,'다각형의 넓이','Area Of A Polygon'),(119,'정규 표현식','Regular Expression'),(120,'오일러 지표 (χ=v-e+f)','Euler Characteristic (χ=v-e+f)'),(121,'다차원 세그먼트 트리','Multidimensional Segment Tree'),(122,'링크/컷 트리','Link/cut Tree'),(123,'연결 리스트','Linked List'),(124,'라빈–카프','Rabin–karp'),(125,'회전하는 캘리퍼스','Rotating Calipers'),(126,'커넥션 프로파일을 이용한 다이나믹 프로그래밍','Dynamic Programming Using Connection Profile'),(127,'외판원 순회 문제','Travelling Salesman Problem'),(128,'매내처','Manacher\'s'),(129,'뫼비우스 반전 공식','Möbius Inversion'),(130,'덱을 이용한 다이나믹 프로그래밍','Dynamic Programming Using A Deque'),(131,'트리 동형 사상','Tree Isomorphism'),(132,'함수 개형을 이용한 최적화','Slope Trick'),(133,'밀러–라빈 소수 판별법','Miller–rabin'),(134,'오프라인 동적 연결성 판정','Offline Dynamic Connectivity'),(135,'폴라드 로','Pollard Rho'),(136,'수치해석','Numerical Analysis'),(137,'aliens 트릭','Aliens Trick'),(138,'이분 그래프','Bipartite Graph'),(139,'홀의 결혼 정리','Hall\'s Theorem'),(140,'인터프리터','Interpreter'),(141,'선형 계획법','Linear Programming'),(142,'쌍대 그래프','Dual Graph'),(143,'비둘기집 원리','Pigeonhole Principle'),(144,'오목 다각형 내부의 점 판정','Point In Non-convex Polygon Check'),(145,'매트로이드','Matroid'),(146,'번사이드 보조정리','Burnside\'s Lemma'),(147,'보로노이 다이어그램','Voronoi Diagram'),(148,'뤼카 정리','Lucas Theorem'),(149,'쌍대성','Duality'),(150,'헝가리안','Hungarian'),(151,'z','Z'),(152,'키타마사','Kitamasa'),(153,'이산 로그','Discrete Logarithm'),(154,'최소 외접원','Minimum Enclosing Circle'),(155,'통계학','Statistics'),(156,'일반적인 매칭','General Matching'),(157,'크누스 최적화','Knuth Optimization'),(158,'도미네이터 트리','Dominator Tree'),(159,'단조 큐를 이용한 최적화','Monotone Queue Optimization'),(160,'회문 트리','Palindrome Tree'),(161,'스토어–바그너','Stoer–wagner'),(162,'양방향 탐색','Bidirectional Search'),(163,'로프','Rope'),(164,'담금질 기법','Simulated Annealing'),(165,'반평면 교집합','Half Plane Intersection'),(166,'안정 결혼 문제','Stable Marriage Problem'),(167,'계산 이론','Computation Theory'),(168,'베이즈 정리','Bayes Theorem'),(169,'4차원 이상의 기하학','Geometry; Hyperdimensional'),(170,'이산 제곱근','Discrete Square Root'),(171,'히르쉬버그','Hirschberg\'s'),(172,'접미사 트리','Suffix Tree'),(173,'유향 최소 신장 트리','Directed Minimum Spanning Tree'),(174,'춤추는 링크','Dancing Links'),(175,'크누스 x','Knuth\'s X'),(176,'서큘레이션','Circulation'),(177,'트리 압축','Tree Compression'),(178,'탑 트리','Top Tree'),(179,'보이어–무어 다수결 투표','Boyer–moore Majority Vote'),(180,'그린 정리','Green\'s Theorem'),(181,'픽의 정리','Pick\'s Theorem'),(182,'생성 함수','Generating Function'),(183,'utf-8 입력 처리','Utf-8 Inputs'),(184,'델로네 삼각분할','Delaunay Triangulation'),(185,'레드-블랙 트리','Red-black Tree'),(186,'a*','A*'),(187,'상수 최적화','Constant Optimization');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-06 20:26:31
