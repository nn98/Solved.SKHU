import java.io.IOException;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

public class BOjtest {
	public static void main(String[] args) throws IOException{
		Document doc = Jsoup.connect("https://www.acmicpc.net/status?user_id=asb0313").get();
		// 문제번호 / 문제 결과
		Elements data = doc.select("div[class=\"table-responsive\"] td");
		// 문제 제출한 시간
		Elements time = doc.select("div[class=\"table-responsive\"] td a");
		System.out.println(data.size());
		// +9
		int j = 3;
		int k = 8;
//		while() {
		System.out.println(data.get(j).text()+" "+time.get(k).attr("title"));
//		}
	}

}
