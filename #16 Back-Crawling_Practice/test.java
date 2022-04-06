import java.io.IOException;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class test {
	public static void main(String[] args) throws IOException {

		// 자료를 가져올 사이트에 연결하기
		Document doc = Jsoup.connect("https://www.acmicpc.net/user/asb0313").get();
		Elements titles = doc.select("div.problem-list a");
		//   /problem/ProblemNumber
		for(Element e : titles) {
			System.out.println(e.getElementsByAttribute("href").attr("href"));
		}
	}
}