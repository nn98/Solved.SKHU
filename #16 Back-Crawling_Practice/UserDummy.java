package project;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

public class UserDummy{

	public static void main(String[] args) throws IOException{

		String sql;
		String id = null; // 아이디
		try {
			java.sql.Statement st = null;
			ResultSet rs = null;
			Connection con = null;
			// mysql 연결
			con = DriverManager.getConnection("jdbc:mysql://13.125.183.103:3306/?serverTimezone=UTC&useSSL=false &allowPublicKeyRetrieval=true",
					"Project", "testing00");
			st = con.createStatement();
			// database 선택
			st.executeUpdate("use SWP;");
			// URL 주소
	 		Document doc = Jsoup.connect("https://solved.ac/ranking/o/309").get();
	 		// F12 누른 후 필요한 부분 삽입
			Elements b = doc.select("div.sticky-table-cell");
			// element 중 필요없는 7개 버림
			int k = 8;
			// 현재는 값을 뽑아오지 못해서 임의의 값 넣음(not null)
			int pro = 100;
			// b.size()/6-1은 현재 필요한 크기는 83줄인데 맨 위값도 포함되어서 84줄로 나옴 그래서 -1을 해
			for(int i = 0;i<(b.size()/6)-1;i++) {
				id = b.get(k).text();
				k+=6;
					sql = "insert into User(ID,problems) values(?, ?)";    //insert시 인자값을 넣기 위해 사용
					PreparedStatement pst = con.prepareStatement(sql);
					pst.setString(1,id);
					pst.setInt(2, pro);
					pst.execute();
					pst.close();
			}

			rs = st.executeQuery("select * from User;");
			// 현재 데이터베이스에 들어간 값 출력하기
			while(rs.next()) {
				String idx = rs.getString("id");
				String pro1  = rs.getString("problem");
				System.out.println(idx+" "+pro1);
			}
		}
		catch(Exception e) {
			e.printStackTrace();
		}

	}
}
