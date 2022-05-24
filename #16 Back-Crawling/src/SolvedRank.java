

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

public class SolvedRank {
	public static void main(String[] args) throws IOException{
		// id / worldrank / skhurank / tier / rating / class / pro / correction
		String sql;
		// user id
		String id = null;
		// user 전체랭킹
		String worldrank = null;
		// user 성공회대학교랭킹
		int skhurank = 0;
		// user tier
		String ti = null;
		// user 점수
		int rating = 0;
		// user class
		String cl = null;
		// user 푼 문제 수
		String pro = null;
		try {
			java.sql.Statement st = null;
			ResultSet rs = null;
			Connection con = null;
			// mysql 연결
			con = DriverManager.getConnection("jdbc:mysql://52.79.236.129:3306/?serverTimezone=UTC&useSSL=false &allowPublicKeyRetrieval=true",
					"Project", "testing00");
			st = con.createStatement();
			// database 선택
			st.executeUpdate("use SWP;");
		Document doc = Jsoup.connect("https://solved.ac/ranking/o/309").get();
		Elements rank = doc.select("div[class=\"StickyTable__Cell-sc-45ty5n-1 bqklaG sticky-table-cell\"]");
		Elements tier = doc.select("img[class=\"TierBadge__TierBadgeStyle-sc-hiokan-0 puOTB\"]");
		String[][] str = new String[rank.size()/6][7];
		int k = 6;
		// str.length / str[0].length 대신에 rank.size()/6 / 7로 해도 무관
		for(int i = 0;i<str.length;i++) {
			if(k>= rank.size()) break;
			for(int j = 0;j<str[0].length-1;j++) {
				switch(j) {
				case 0: worldrank = rank.get(k++).text(); break; // 6
				case 1: skhurank = Integer.parseInt(rank.get(k++).text()); break; // 7
				case 2: id = rank.get(k++).text(); break; // 8
				case 3: rating = Integer.parseInt(rank.get(k++).text()); break; // 9
				case 4: cl = rank.get(k++).text(); break;
				case 5: pro = rank.get(k++).text(); break;
				}
			}
			// 티어 삽입(svg 파일로 되어 있어서 혼자 다른 값을 참조하여 가져옴)
			ti = tier.get(i).attr("src").replaceAll("[^0-9]*", "");
			sql = "insert into Ranking(User_ID,worldrank,skhurank, tier, rating, class, pro ) values (?, ?, ?, ?, ?, ?, ?)";
			PreparedStatement pst = con.prepareStatement(sql);
			// id / worldrank / skhurank / tier / rating / class / pro / correction
			pst.setString(1, id);
			pst.setString(2, worldrank);
			pst.setInt(3, skhurank);
			pst.setString(4, ti);
			pst.setInt(5, rating);
			pst.setString(6, cl);
			pst.setString(7, pro);
			pst.execute();
			pst.close();
		}

		rs = st.executeQuery("select * from Ranking;");
		// 현재 데이터베이스에 들어간 값 출력하기
		// id / worldrank / skhurank / tier / rating / class / pro / correction
		while(rs.next()) {
		String idx = rs.getString("User_ID");
		String wr = rs.getString("worldrank");
		int sr = rs.getInt("skhurank");
		String t = rs.getString("tier");
		int ra = rs.getInt("rating");
		String c = rs.getString("class");
		String pr = rs.getString("pro");
		System.out.println(idx+" "+wr+" "+sr+" "+t+" "+ra+" "+c+" "+pr);
		}
		}catch(Exception e) {
			e.printStackTrace();
		}
		}

	}
