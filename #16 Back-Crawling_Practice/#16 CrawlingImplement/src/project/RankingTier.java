package project;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class RankingTier{

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
			Document doc = Jsoup.connect("https://solved.ac/ranking/o/309").get();
	 		// F12 누른 후 필요한 부분 삽입
			Elements b = doc.select("div.sticky-table-cell");
			String[] str = new String[b.size()/6-1];
			int k = 8;
			for(int i = 0;i<str.length;i++) {
				str[i] = b.get(k).text();
				System.out.println(str[i]);
				k+=6;
			}
			doc = Jsoup.connect("https://solved.ac/ranking/o/309").get();
	        Elements t=doc.select("img[class=\"TierBadge__TierBadgeStyle-sc-hiokan-0 puOTB\"]");
			int i = 0;
			String pro = null;
			for(Element e : t) {
				id = str[i];
				i++;
				pro = e.attr("src");
				String ss = pro.replaceAll("[^0-9]","");
//				System.out.println(e.attr("src"));

//				//UPDATE `SWP`.`Ranking` SET `correction` = '51.440%' WHERE (`User_ID` = 'kpeel5839');
					sql = "update SWP.Ranking set tier = (?) where User_ID = (?)";
					PreparedStatement pst = con.prepareStatement(sql);
					pst.setString(1, ss);
					pst.setString(2,id);
					pst.execute();
					pst.close();
			}
//
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
