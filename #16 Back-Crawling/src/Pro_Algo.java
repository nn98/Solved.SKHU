

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

public class Pro_Algo {
	public static void main(String[] args) throws IOException{
		String sql;
		// 문제 번호
		int proN = 0;
		// 문제 알고리즘
		String algo = null;
		// 티어별 숫자
		int lvP = 1;
		int count = 0;
		try {
			java.sql.Statement st = null;
			ResultSet rs = null;
			Connection con = null;
//			// mysql 연결
			con = DriverManager.getConnection("jdbc:mysql://13.125.213.121:3306/?serverTimezone=UTC&useSSL=false &allowPublicKeyRetrieval=true",
					"Project", "testing00");
			st = con.createStatement();
//			// database 선택
			st.executeUpdate("use SWP;");
		while(lvP <= 30) {
		Document doc = Jsoup.connect("https://solved.ac/problems/level/"+lvP).get();
		// 각 티어별 페이지 수 계산
		Elements page = doc.select("div[class=\"Paginationstyles__PaginationWrapper-sc-bdna5c-2 gFzrWw\"]");
		String[] Spage = page.text().split(" ");
		// 각 티어별 페이지 수
		int p = 1;
		// 각 문제 난이도별 페이지 수만큼 반복
		System.out.println(lvP+" "+Spage[Spage.length-1]);
		while(p <= Integer.parseInt(Spage[Spage.length-1])) {
		doc = Jsoup.connect("https://solved.ac/problems/level/"+lvP+"?page="+p).get();
		Elements data = doc.select("script#__NEXT_DATA__");
		String[] a = data.toString().split("\"problemId\":");
		int j = 0;
		while(j++<a.length-1) {
		String s=a[j];
		List<String>l=new ArrayList();
		List<String>l2 = new ArrayList();
		String[]b=s.split(","),c;
		l.add(b[0]); // 문제 번호
		l.add(b[1].split("\"titleKo\":")[1]); // 문제 이름
		b=s.split("\"tags\":");
		c=b[1].split("\"key\":\"");

		for(String x : c) { // 알고리즘 리스트에 추가
			l.add(x.split(",\"")[0]);
		}
		// 필요없는 부분 삭제
		l.remove(2);
		l.remove(1);
		for(int k = 0;k<l.size();k++) {
			l2.add(l.get(k).replaceAll("\"", ""));
		}
		try {
		for(int n = 0; n<l2.size()-1;n++) {
			proN = Integer.parseInt(l2.get(0));
			algo = l2.get(n+1);
			System.out.println(proN+" "+algo);
			count++;
			sql = "insert into PROBLEM_has_Algorithm(PRO_ID, ALG_ID) values(?, ?)";
			PreparedStatement pst = con.prepareStatement(sql);
			pst.setInt(1, proN);
			pst.setString(2, algo);
			pst.execute();
			pst.close();
		}
		}catch(Exception e) {
			continue;
		}
				}
		p++;
			}
		lvP++;
		}
		}catch(Exception e) {
			e.printStackTrace();
		}
		System.out.println(count);
	}

}
