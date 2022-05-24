import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

public class BojAlgorithm {
	public static void main(String[] args) throws IOException{
		String sql;
		int id = 0;
		String name = null;
		try {
			java.sql.Statement st = null;
			ResultSet rs = null;
			Connection con = null;
			// mysql 연결
			con = DriverManager.getConnection("jdbc:mysql://54.180.30.70:3306/?serverTimezone=UTC&useSSL=false &allowPublicKeyRetrieval=true",
					"Project", "testing00");
			st = con.createStatement();
//			// database 선택
			st.executeUpdate("use SWP;");
		Document doc = Jsoup.connect("https://www.acmicpc.net/problem/tags").get();
		Elements e = doc.select("div.table-responsive td");
		String[][] str = new String[e.size()][2];
		int k = 0;
		int z = 0;

		for(int i = 0;i<e.size()-1;i++) {
			if(k>=e.size()-1) {
				break;
			}else {
				for(int j = 0;j<2;j++) {
					if(j==0) {
						Elements e2 = doc.select("div.table-responsive td a");
						// 중간에 BOJ Book 값이 있어서 그 값을 그 다음 값을 출력하게 설정
						if(e2.get(z).attr("href").replaceAll("[^0-9]*", "")=="") {
							z++;
							id = Integer.parseInt(e2.get(z).attr("href").replaceAll("[^0-9]*", ""));
//							str[i][j] = e2.get(z).attr("href").replaceAll("[^0-9]*", "");
						}else {
							id = Integer.parseInt(e2.get(z).attr("href").replaceAll("[^0-9]*", ""));
//							str[i][j] = e2.get(z).attr("href").replaceAll("[^0-9]*", "");
						}
					}else {
						name = e.get(k).text();
						str[i][j] = e.get(k).text();
					}
					System.out.print(str[i][j]+" ");
					}
			}
			sql = "insert into Algorithm(ID, algonamekr) values (?, ?)";
			PreparedStatement pst = con.prepareStatement(sql);
			pst.setInt(1, id);
			pst.setString(2,name);
			pst.execute();
			pst.close();
			z+=2;
			k+=4;
		}
		rs = st.executeQuery("select * from Algorithm;");
//		// 현재 데이터베이스에 들어간 값 출력하기
		while(rs.next()) {
		int idx = rs.getInt("ID");
		String na = rs.getString("algonamekr");
		System.out.println(idx+" "+na);
		}
		}catch(Exception e) {
			e.printStackTrace();
		}
	}

}
