package project;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

public class RankingCrawling{

	public static void main(String[] args) throws IOException{
		//wordrank / rank / id / rating / class / problem

		String sql;
		try {
			java.sql.Statement st = null;
			ResultSet rs = null;
			Connection con = null;
			// mysql 연결
			con = DriverManager.getConnection("jdbc:mysql://3.35.95.30:3306/?serverTimezone=UTC&useSSL=false &allowPublicKeyRetrieval=true",
					"Project", "testing00");
			st = con.createStatement();
			// database 선택
			st.executeUpdate("use SWP;");
			// URL 주소
	 		Document doc = Jsoup.connect("https://solved.ac/ranking/o/309").get();
	 		// F12 누른 후 필요한 부분 삽입
			Elements b = doc.select("div.sticky-table-cell");
			// element 중 필요없는 6개 버림(최상단의 메뉴바 버림)
			int k = 8;
			String[] str = new String[b.size()/6];
			// b.size()/6-1은 현재 필요한 크기는 83줄인데 맨 위값도 포함되어서 84줄로 나옴 그래서 -1을 해
			for(int i = 0;i<(b.size()/6)-1;i++) {
				str[i] = b.get(k).text();
					System.out.println(str[i]);
					k+=6;
				}
//					sql = "insert into Ranking(User_ID, worldrank, skhurank,rating,class,pro) values(?, ?, ?, ?, ?, ?)";    //insert시 인자값을 넣기 위해 사용
//					PreparedStatement pst = con.prepareStatement(sql);
//					pst.setString(1,id);
//					pst.setString(2,wrank);
//					pst.setInt(3, rk);
//					pst.setInt(4, rating);
//					pst.setString(5, CLASS);
//					pst.setString(6,problem);
//					pst.execute();
//					pst.close();
//			}
		}

//			rs = st.executeQuery("select * from Ranking order by skhurank;");
			// 현재 데이터베이스에 들어간 값 출력하기
//			while(rs.next()) {
//				String wr  = rs.getString("worldrank");
//				int r = rs.getInt("skhurank");
//				String idx = rs.getString("User_id");
//				int rat = rs.getInt("rating");
//				String cl = rs.getString("class");
//				String pro  = rs.getString("pro");
//				System.out.println(wr+" "+r+" "+" "+idx+" "+" "+rat+" "+cl+" "+pro);
//			}
//		}
		catch(Exception e) {
			e.printStackTrace();
		}

	}
}
