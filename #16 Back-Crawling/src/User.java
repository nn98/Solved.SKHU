

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

public class User {
	public static void main(String[] args) throws IOException{
		String sql;
		String id = null;
		int pro = 0;
		int rank = 0;
		try {
			java.sql.Statement st = null;
			ResultSet rs = null;
			Connection con = null;
			// mysql 연결
			con = DriverManager.getConnection("jdbc:mysql://52.79.236.129:3306/?serverTimezone=UTC&useSSL=false &allowPublicKeyRetrieval=true",
					"Project", "testing00");
			st = con.createStatement();
			// database 선택
			st.executeUpdate("use SWP;");
			Document doc = Jsoup.connect("https://solved.ac/ranking/o/309").get();
			Elements user = doc.select("div.sticky-table-cell");
			Elements tier = doc.select("img[class=\"TierBadge__TierBadgeStyle-sc-hiokan-0 puOTB\"]");
		int k = 8;
		for(int i = 0;i<user.size()-1/6;i++) {
			if(k>= user.size()) break;
			for(int j = 0;j<2;j++) {
				if(j==0) {
					id = user.get(k).text();
				}else {
					pro = Integer.parseInt(user.get(k).text().replaceAll("[^0-9]*", ""));
				}
				k+=3;
			}
			rank = Integer.parseInt(tier.get(i).attr("src").replaceAll("[^0-9]*", ""));
			sql = "insert into User values (?, ?, ?)";
			PreparedStatement pst = con.prepareStatement(sql);
			pst.setString(1, id);
			pst.setInt(2,pro);
			pst.setInt(3, rank);
			pst.execute();
			pst.close();
		}

		rs = st.executeQuery("select * from User;");
		// 현재 데이터베이스에 들어간 값 출력하기
		while(rs.next()) {
		String idx = rs.getString("ID");
		int pr = rs.getInt("problems");
		int ra = rs.getInt("solvedrank");
		System.out.println(idx+" "+pr+" "+ra);
		}
		}catch(Exception e) {
			e.printStackTrace();
		}
	}

}
