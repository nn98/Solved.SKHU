package project;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
// id / step / num / title
public class StepOrder {
	public static void main(String[] args) throws IOException{
		String sql;
		int id = 0; // 순서
		int step = 0; // 단계
		int num = 0; // 문제 번호
		String title = null; // 제목
		int count = 0; // 1~49
		int[] nums = {1,4,3,6,5,7,8,10,19,22,9,49,34,16,33,18,11,12,20,29,13,
				17,24,26,59,41,23,14,15,21,25,31,27,45,40,
				43,35,39,47,37,38,36,42,44,60,28,30,32,46};
		try {
			Connection con = null;
			con = DriverManager.getConnection("jdbc:mysql://localhost:3306/?serverTimezone=UTC&useSSL=false &allowPublicKeyRetrieval=true",
					"root", "4612");
			java.sql.Statement st = null;
			ResultSet rs = null;
			st = con.createStatement();
			st.executeUpdate("use sample1;");
			while(count++<49) {
				int n = 0;
				int a = 2;
				Document doc = Jsoup.connect("https://www.acmicpc.net/step/"+nums[count-1]).get();
				Elements number = doc.select("div.table-responsive td");
				String[][] str = new String[(number.size()/8)][3];
				id = count;
			for(int i = 0;i<str.length;i++) {
				if(n==number.size()-1) break;
				for(int j = 0;j<str[0].length;j++) {
					if(j==0) {
						step = Integer.parseInt(number.get(n++).text());
					}else if(j==1) {
						num = Integer.parseInt(number.get(n++).text().toString());
					}else if(j==2) {
						title = number.get(n++).text();
					}
						if(n==number.size()-1) break;
						if(j==a) {
							num+=5;
						}
					}
				sql = "insert into test2 values(?, ?, ?, ?)";    //insert시 인자값을 넣기 위해 사용
				PreparedStatement pst = con.prepareStatement(sql);
				pst.setInt(1,id);
				pst.setInt(2, step);
				pst.setInt(3, num);
				pst.setString(4, title);
				pst.execute();
				pst.close();
				}
			}

			rs = st.executeQuery("select id, step, num, title from test2;");
			while(rs.next()) {
				int idx = rs.getInt("id");
				int s = rs.getInt("step");
				int numm = rs.getInt("num");
				String t = rs.getString("title");
				System.out.println(idx + " " + s +" "+numm+" "+t);
			}
		}
		catch(Exception e) {
			e.printStackTrace();
		}
	}
}
