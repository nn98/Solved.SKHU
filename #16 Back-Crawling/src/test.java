import java.io.IOException;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

public class test {
	public static void main(String[] args) throws IOException{
		Document doc = Jsoup.connect("https://www.acmicpc.net/status?from_mine=1&problem_id=5525&user_id=shg9411").get();
		Elements a = doc.select("td");
		Elements time = doc.select("div[class=\"table-responsive\"] td a");
		// +=9
//		System.out.println(a.get(3).text());
//		System.out.println(a.get(12).text());
//		System.out.println(time.text());
//		System.out.println(time.get(2).attr("title"));
//		System.out.println(time.get(6).attr("title"));
//		System.out.println(time.get(10).attr("title"));
		int j = 3;
//		int k = 3;
		System.out.println(a.get(j).text().equals(a.get(j).text().replaceAll("^[0-9]점", "")));
		for(int i = 0;i<a.size();i++) {
			if(a.get(j).text().equals("맞았습니다!!") || a.get(j).text().equals(a.get(j).text().replaceAll("^[0-9]점", ""))) {
				System.out.println(a.get(j-3).text());
				Elements b = doc.select("tr#solution-"+a.get(j-3).text()+" a");
				System.out.println(b.size());
				System.out.println(b.get(b.size()-1).attr("title"));
				break;
			}else {
				System.out.println(a.get(j).text());
				j+=9;
//				k+=3;
				continue;
			}
		}

	}

}
