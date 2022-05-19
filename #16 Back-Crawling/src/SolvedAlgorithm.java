

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
		Elements e2 = doc.select("div[class=\"Paginationstyles__PageIndicator-sc-bdna5c-0 fiXRLB\"]");
		String[] str = e2.text().split(" ");
		int i = 1;
		// 페이지 수에 있는 영문 이름 출력
		while(i<=Integer.parseInt(str[str.length-1])) {
		int k = 2;
		int n = 0;
		doc = Jsoup.connect("https://solved.ac/problems/tags?page="+i).get();
		Elements e = doc.select("div.sticky-table-cell");
		Elements idd = doc.select("div.sticky-table-cell a");
		for(int j = 0;j<(e.size()-1)/2;j++) {
			String[] stt = e.get(k).text().split(" ");
			// 알고리즘 한글 이름
			name = stt[0].replaceAll("#| [^가-힣a-zA-Z0-9]", "");
			for(int a = 0;a<stt.length-1;a++) {
				if(a+1==stt.length-1) {
					break;
				}
				name +=" "+stt[a+1];
			}
			if(k>=e.size()-1) {
				break;
			}else {
				// 알고리즘 영어 이름(ID)
				String[] s = idd.get(n).attr("href").split("/");
				id = s[s.length-1];
				k+=2;
				n+=2;
				}
//			update Ranking set pro = 848 where User_ID = 'shg9411';
			sql = "insert into Algorithm(ID, algonamekr) values(?, ?)";
			PreparedStatement pst = con.prepareStatement(sql);
			pst.setString(1,id);
			pst.setString(2, name);
			pst.execute();
			pst.close();
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
