package jobkorea;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

public class category{

	public static void main(String[] args) throws IOException{
		String sql;
		String name = null; // 한글 이름
		String e_name = null; // 영어 이름
		Document doc = Jsoup.connect("https://www.acmicpc.net/problem/tags").get();
		Elements title = doc.select("div.table-responsive td");
		String[][] str = new String[(title.size()/4)][2];
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
					if(num==title.size()-1) break;
					else {
						if(j==0) {
							name = title.get(num++).text();
						}else if(j==1) {
							e_name = title.get(num++).text();
						}
					}
				}
				sql = "insert into category(name,e_name) values(?, ?)";    //insert시 인자값을 넣기 위해 사용
				PreparedStatement pst = con.prepareStatement(sql);
				pst.setString(1,name);
				pst.setString(2, e_name);
				pst.execute();
				pst.close();
				num+=2;
			}

			rs = st.executeQuery("select name, e_name from category;");
			while(rs.next()) {
				String n = rs.getString("name");
				String cat = rs.getString("e_name");
				System.out.println(n + " " + cat);
			}


		}
		catch(Exception e) {
			e.printStackTrace();
		}

	}
}
