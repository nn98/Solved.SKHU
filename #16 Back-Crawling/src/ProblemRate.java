

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

public class ProblemRate {
	public static void main(String[] args) throws IOException{
		String sql;
		// 문제 번호
		int id = 0;
		// 정답률
		String rate = null;
		// tier별 페이지
		int x = 0;
		// 정답률을 담을 배열
		String[] str;
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
			Elements page = doc.select("div[class=\"Paginationstyles__PaginationWrapper-sc-bdna5c-2 gFzrWw\"]");
			// 각 티어별 페이지 수 계산할 배열
			String[] s = page.text().split(" ");
			System.out.println(s[s.length-1]); // page
			for(int i = 0;i<Integer.parseInt(s[s.length-1]);i++) {
				//			Thread.sleep(1000);
				// tier 페이지에 들어가서 문제 번호 뽑기
				doc = Jsoup.connect("https://solved.ac/problems/level/"+x+"?page="+(i+1)).get();
				page = doc.select("div.sticky-table-cell");
				// 크롤링한 값들이 4번부터의 값이 필요하므로 4번부터 4씩 증가
				int z = 4;
				for(int j = 0;j<(page.size()/4)-1;j++) {
					//				Thread.sleep(1000);
					id = Integer.parseInt(page.get(z).text());
					Document doc2=null;
					try {
						// 정답률
						doc2 = Jsoup.connect("https://www.acmicpc.net/problem/"+id).get();
					}catch(Exception e) {
						continue;
					}
					Elements ra = doc2.select("div.table-responsive");
					str = ra.text().split(" ");
					for(String cRate:str) {
						if(cRate.charAt(cRate.length()-1)=='%') {
							rate = cRate;
						}
					}
					z+=4;
					// 문제 번호가 같으면 그 값에 정답률 추가
					sql = "update Problem set rate = ? where ID = ?";
					PreparedStatement pst = con.prepareStatement(sql);
					pst.setString(1, rate);
					pst.setInt(2, id);
					pst.execute();
					pst.close();
				}
			}
			x++;
			rs = st.executeQuery("select * from Problem;");
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

