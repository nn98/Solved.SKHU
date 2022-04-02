package jobkorea;

import java.io.IOException;

import org.json.JSONException;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class test4 {
	public static void main(String[] args) throws IOException{


//		Document doc = Jsoup.connect("https://www.acmicpc.net/problemset?user=asb0313&user_solved=1&page="+i).get();
//		Elements titles = doc.select("div.table-responsive");
//		Elements title = doc.select("div.table-responsive a");
//		Elements title1 = doc.select("div.table-responsive tbody");
		try {
//			String str = "{\"name\":\"John\",\"age\":\"30\"}";
		Document doc = Jsoup.connect("https://www.acmicpc.net/problemset?user=asb0313&user_solved=1&page=1").get();
		Elements titles = doc.select("div.table-responsive td");
		Elements title = doc.select("div.table-responsive a");
		System.out.println("1 페이지");
		for(Element e : titles.select("td")) {
			if(e.className().equals("list_problem_id")){
				System.out.print(e.text()+" : ");
				for(Element s : title) {
					if(s.attr("href").equals("/problem/"+e.text())) {
						System.out.println(s.attr("href"));
				}
			}
		}
	}
			doc = Jsoup.connect("https://www.acmicpc.net/problemset?user=asb0313&user_solved=1&page=2").get();
			titles = doc.select("div.table-responsive");
			title = doc.select("div.table-responsive a");
			System.out.println("2 페이지");
			for(Element e : titles.select("td")) {
				if(e.className().equals("list_problem_id")){
					System.out.print(e.text()+" : ");
					for(Element s : title) {
						if(s.attr("href").equals("/problem/"+e.text())) {
							System.out.println(s.attr("href"));
					}
				}
			}
		}
		}catch(JSONException e){
			System.out.println("err");
		}
	}
}
