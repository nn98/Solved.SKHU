

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
		// 문제 이름을 담을 배열(문제 이름 뒤에 STANDARD를 제거하기 위함)
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
		System.out.println(s[s.length-1]);
		// 페이지 수만큼 반복
		for(int i = 0;i<Integer.parseInt(s[s.length-1]);i++) {
			doc = Jsoup.connect("https://solved.ac/problems/level/"+x+"?page="+(i+1)).get();
			page = doc.select("div.sticky-table-cell");
			int z = 4;
			int y = 5;
			for(int j = 0;j<(page.size()/4)-1;j++) {
				id = Integer.parseInt(page.get(z).text());
				str = page.get(y).text().split(" ");
				if(str[str.length-1].equals("STANDARD")) {
					namekr = page.get(y).text().substring(0, page.get(y).text().length()-9);
				}else {
					namekr = page.get(y).text();
				}

//				System.out.println(page.get(z).text()+" "+page.get(y).text());
				z+=4;
				y+=4;
				solved = x;
				sql = "insert into Problem(ID, namekr, SOLVED_RANK) values(?, ?, ?)";
				PreparedStatement pst = con.prepareStatement(sql);
				pst.setInt(1, id);
				pst.setString(2,namekr);
				pst.setInt(3, solved);
				pst.execute();
				pst.close();
				}
		}
		x++;
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

