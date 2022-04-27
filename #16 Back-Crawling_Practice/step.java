package jobkorea;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
 // 단계별 문제모음
public class step{
	public static void main(String[] args) throws IOException{
		String sql;
		String name = null; // 문제 이름
		int id = 0; // 순서
		String explan = null; // 문제 설명
		Document doc = Jsoup.connect("https://www.acmicpc.net/step").get();
		Elements title = doc.select("div.table-responsive td");
		String[][] str = new String[(title.size()/6)][3];
		try {
			Connection con = null;
			con = DriverManager.getConnection("jdbc:mysql://localhost:3306/?serverTimezone=UTC&useSSL=false &allowPublicKeyRetrieval=true",
					"root", "4612");
			java.sql.Statement st = null;
			ResultSet rs = null;
			st = con.createStatement();
			st.executeUpdate("use sample1;");
			int num = 0;
			for(int i = 0;i<str.length;i++) {
				if(num==title.size()-1) break;
				for(int j = 0;j<str[0].length;j++) {
					if(num==title.size()-1)break;
					else {
						if(j==0) {
							id = Integer.parseInt(title.get(num++).text().toString());
						}else if(j==1) {
							name = title.get(num++).text();
						}else if(j==2) {
							explan = title.get(num++).text();
						}
					}
				}
				sql = "insert into step values(?, ?, ?)";    //insert시 인자값을 넣기 위해 사용
				PreparedStatement pst = con.prepareStatement(sql);
				pst.setInt(1,id);
				pst.setString(2, name);
				pst.setString(3, explan);
				pst.execute();
				pst.close();

				num+=3;
			}
			rs = st.executeQuery("select id, name, explan from step;");
			while(rs.next()) {
				String s = rs.getString("name");
				int idx = rs.getInt("id");
				String exp = rs.getString("explan");
				System.out.println(idx + " " + s +" "+exp);
			}


		}
		catch(Exception e) {
			e.printStackTrace();
		}

	}
}
