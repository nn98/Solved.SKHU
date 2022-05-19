

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

public class SolvedRankCorrection {
	public static void main(String[] args) throws IOException{
		// page 수 계산
		Document doc = Jsoup.connect("https://www.acmicpc.net/school/ranklist/309").get();
		Elements page = doc.select("div.text-center");
		String[] str = page.text().split(" ");
//		System.out.println(str[str.length-2]);
		// 백준 성공회대학교 랭킹의 페이지 수
		int num = 1;
		String sql;
		// 유저의 정답률
		String cor = null;
		// 유저의 id
		String id = null;
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
		while(num<=Integer.parseInt(str[str.length-2])) {
		Document doc2 = Jsoup.connect("https://www.acmicpc.net/school/ranklist/309/"+num++).get();
		Elements correct = doc2.select("div.table-responsive td");
		String[]str2 = new String[correct.size()/6];
		int j = 1; // id
		int k = 5; // correction
		for(int i = 0;i<str2.length;i++) {
			id = correct.get(j).text();
			cor = correct.get(k).text();
			// UPDATE `SWP`.`Ranking` SET `correction` = '51.440%' WHERE (`User_ID` = 'kpeel5839');
			sql = "update Ranking set correction = ? where User_ID = ?";
			PreparedStatement pst = con.prepareStatement(sql);
			pst.setString(1,cor);
			pst.setString(2,id);
			pst.execute();
			pst.close();
			j+=6;
			k+=6;
		}
	}
		rs = st.executeQuery("select * from Ranking;");
		// 현재 데이터베이스에 들어간 값 출력하기
	while(rs.next()) {
		String corr = rs.getString("correction");
		String idx = rs.getString("User_ID");
		System.out.println(corr+" "+idx);
	}
		}catch(Exception e) {
			e.printStackTrace();
		}
	}

}
