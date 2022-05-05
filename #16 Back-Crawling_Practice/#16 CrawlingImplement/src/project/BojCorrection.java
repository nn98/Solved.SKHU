package project;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

public class BojCorrection{

	public static void main(String[] args) throws IOException{

		String sql;
		String id = null; // 아이디
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
			int num = 0;
			while(num++<3) {
			Document doc = Jsoup.connect("https://www.acmicpc.net/school/ranklist/309/"+num).get();
			Elements b = doc.select("div.table-responsive td");
			// element 중 필요없는 7개 버림
			int k = 5;
			// 현재는 값을 뽑아오지 못해서 임의의 값 넣음(not null)
			String pro = null;
			// b.size()/6-1은 현재 필요한 크기는 83줄인데 맨 위값도 포함되어서 84줄로 나옴 그래서 -1을 해
			for(int i = 0;i<(b.size()/6)-1;i++) {
				id = b.get(k-4).text();
				pro = b.get(k).text();
				k+=6;
				//UPDATE `SWP`.`Ranking` SET `correction` = '51.440%' WHERE (`User_ID` = 'kpeel5839');
					sql = "update SWP.Ranking set correction = (?) where User_ID = (?)";
					PreparedStatement pst = con.prepareStatement(sql);
					pst.setString(1, pro);
					pst.setString(2,id);
					pst.execute();
					pst.close();
			}
		}

			rs = st.executeQuery("select * from Ranking;");
			// 현재 데이터베이스에 들어간 값 출력하기
			while(rs.next()) {
				String idx = rs.getString("User_ID");
				String pro1  = rs.getString("correction");
				System.out.println(idx+" "+pro1);
			}
		}
		catch(Exception e) {
			e.printStackTrace();
		}

	}
}
