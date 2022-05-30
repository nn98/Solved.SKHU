import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

public class SolvedAlgorithm {
	public static void main(String[] args) throws IOException{
		String sql;
		String id = null;
		String name = null;
		// 2
		// sovled tag 페이지 수 계산
		try {
			java.sql.Statement st = null;
			ResultSet rs = null;
			Connection con = null;
			// mysql 연결
			con = DriverManager.getConnection("jdbc:mysql://13.125.213.121:3306/?serverTimezone=UTC&useSSL=false &allowPublicKeyRetrieval=true",
					"Project", "testing00");
			st = con.createStatement();
			// database 선택
			st.executeUpdate("use SWP;");
		// 페이지 수 계산 - 7
		Document doc = Jsoup.connect("https://solved.ac/problems/tags").get();
		Elements e2 = doc.select("div.css-18lc7iz a");
		String[] str = e2.text().split(" ");
		int i = 1;
		// page 수만큼 반복
		while(i<=Integer.parseInt(str[str.length-1])) {
		doc = Jsoup.connect("https://solved.ac/problems/tags?page="+i).get();
		Elements e = doc.select("div.css-qijqp5 td");
		String[] stt = null;
		for(int j = 0;j<=e.size()-2;j+=2) {
			stt = e.get(j).text().split(" ");
			String kr = stt[0].replaceAll("#","");
			for(int k = 1;k<stt.length-1;k++) {
				kr += " "+stt[k];
			}
			// nameen / ID
			id = stt[stt.length-1];
			// namekr
			name = kr;
			sql = "insert into Algorithm(ID, algonamekr) values(?, ?)";
			PreparedStatement pst = con.prepareStatement(sql);
			pst.setString(1,id);
			pst.setString(2, name);
			pst.execute();
			pst.close();
			System.out.println(kr+" "+stt[stt.length-1]);
//			update Ranking set pro = 848 where User_ID = 'shg9411';

			}
		i++;
		}
		rs = st.executeQuery("select * from Algorithm;");
//		 현재 데이터베이스에 들어간 값 출력하기
	while(rs.next()) {
		String idx = rs.getString("ID");
		String na = rs.getString("algonamekr");
		System.out.println(idx+" "+na);
	}
		}catch(Exception e) {
			e.printStackTrace();
		}
	}

}
