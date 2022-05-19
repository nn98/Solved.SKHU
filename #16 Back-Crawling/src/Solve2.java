import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

public class Solve2 {
	public static void main(String[] args) throws IOException{
		String sql;
		// 유저 ID
		String id = null;
		// 문제 번호
		int num = 0;
		// 성공회대학교 학생목록
		String solvedate = null;
		Document doc = Jsoup.connect("https://solved.ac/ranking/o/309").get();
		Elements name = doc.select("div[class=\"StickyTable__Cell-sc-45ty5n-1 bqklaG sticky-table-cell\"]");
		// 21*6을 더해주면서 4개를 동시에 크롤링
		int n = 8;
		// 학생의 인원 수
		int nick = 1;
		// 21번씩 4번 반복하여 크롤링 시작
		while(nick++ <= 1) {
			System.out.println(nick-1);
			try {
				java.sql.Statement st = null;
				ResultSet rs = null;
				Connection con = null;
				// mysql 연결
				con = DriverManager.getConnection("jdbc:mysql://13.124.13.173:3306/?serverTimezone=UTC&useSSL=false &allowPublicKeyRetrieval=true",
						"Project", "testing00");
				st = con.createStatement();
				// database 선택
				st.executeUpdate("use SWP;");
				// 각 유저마다 푼 문제 페이지 수
				int k = 1;
				// 유저마다 페이지 수 계산
				Document doc2 = Jsoup.connect("https://solved.ac/profile/"+name.get(n).text()+"/solved").get();
				Elements page = doc2.select("div[class=\"Paginationstyles__PaginationWrapper-sc-bdna5c-2 gFzrWw\"]");
				String[] str = page.text().split(" ");
				// 유저당 페이지수만큼 반복
				for(int i = 1;i<=Integer.parseInt(str[str.length-1]);i++) {
//					System.out.println(i);
					// 각 페이지의 Problem
				Document doc3 = Jsoup.connect("https://solved.ac/profile/"+name.get(n).text()+"/solved?page="+k).get();
				Elements problem = doc3.select("div[class=\"StickyTable__Cell-sc-45ty5n-1 bqklaG sticky-table-cell\"]");
				// 문제 번호 뽑아낼 변수
				int p = 4;
				// 문제 뽑아내기
				for(int j = 0;j<(problem.size()/4)-1;j++) {
					id = name.get(n).text();
					num = Integer.parseInt(problem.get(p).text());
					Document doc4 = Jsoup.connect("https://www.acmicpc.net/status?from_mine=1&problem_id="+num+"&user_id="+id).get();
//					Elements a = doc4.select("td.result");
					Elements time = doc4.select("div[class=\"table-responsive\"] td a");
//					String[] times = a.text().split(" ");
					solvedate = time.get(2).attr("title");
					try {
					sql = "update Solve set solvedate = ? where USER_ID = ? and PROBLEM_ID = ?";
					PreparedStatement pst = con.prepareStatement(sql);
					pst.setString(1, solvedate);
					pst.setString(2, id);
					pst.setInt(3, num);
					pst.execute();
					pst.close();
					}catch(Exception e) {
						continue;
					}
					p+=4;
						}
					k++;
					}
				n+=6;
				// 전체 데이터베이스 조회
//				rs = st.executeQuery("select * from Solve;");
//				while(rs.next()) {
//					String idx = rs.getString("USER_ID");
//					String pro = rs.getString("PROBLEM_ID");
//					System.out.println(idx+" "+pro);
//				}
				}catch(Exception e) {
					e.printStackTrace();
				}
			}
	}
}
