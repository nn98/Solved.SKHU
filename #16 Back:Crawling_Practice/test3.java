package jobkorea;

import java.io.IOException;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class test3 {
	public static void main(String[] args) throws IOException{
		Document doc = Jsoup.connect("https://www.acmicpc.net/problemset?user=asb0313&user_solved=0").get();
		Elements titles = doc.select("div.table-responsive");
		Elements title = doc.select("div.table-responsive a");
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
	}

}
