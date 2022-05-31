import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

public class Problem {
	public static void main(String[] args) throws IOException{
		String sql;
		// 문제 번호
		int id =0;
		// 문제 이름
		String namekr = null;
		// 문제의 티어
		int solved = 0;
		// tier별 페이지
		int x = 0;
		// tier별 페이지(0 ~ 30)
		while(x<=30) {
		try {
			java.sql.Statement st = null;
			ResultSet rs = null;
			Connection con = null;
			// mysql 연결
			con = DriverManager.getConnection("jdbc:mysql://15.164.220.167:3306/?serverTimezone=UTC&useSSL=false &allowPublicKeyRetrieval=true",
					"Project", "testing00");
			st = con.createStatement();
			// database 선택
			st.executeUpdate("use SWP;");
			// 각 티어별 페이지 수 계산
		Document doc = Jsoup.connect("https://solved.ac/problems/level/"+x).get();
		Elements page = doc.select("div.css-18lc7iz a");
		// 각 티어별 페이지 수 계산할 배열
		String[] s = page.text().split(" ");
		System.out.println(s[s.length-1]);
		// 페이지 수만큼 반복
		for(int i = 1;i<=Integer.parseInt(s[s.length-1]);i++) {
			doc = Jsoup.connect("https://solved.ac/problems/level/"+x+"?page="+i).get();
			Elements d = doc.select("div.css-qijqp5 a");
			for(int k = 0;k<d.size();k+=2) {
				id = Integer.parseInt(d.get(k).text());
				namekr = d.get(k+1).text();
				solved = x;
//				System.out.println(d.get(k).text()+" "+d.get(k+1).text()+" "+x);
					}
				}
				x++;
				sql = "insert into Problem(ID, namekr, SOLVED_RANK) values(?, ?, ?)";
				PreparedStatement pst = con.prepareStatement(sql);
				pst.setInt(1, id);
				pst.setString(2,namekr);
				pst.setInt(3, solved);
				pst.execute();
				pst.close();
		rs = st.executeQuery("select * from Problem;");
		 // 현재 데이터베이스에 들어간 값 출력하기
		 while(rs.next()) {
		int idx = rs.getInt("ID");
		String na = rs.getString("namekr");
		String r = rs.getString("rate");
		int sol = rs.getInt("SOLVED_RANK");
		System.out.println(idx+" "+na+" "+r+" "+sol);
	}
		}catch(Exception e) {
			e.printStackTrace();
			}
		}

	}

}

