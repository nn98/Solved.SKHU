import java.io.IOException;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class BOJUserStatus {
	public static void main(String[] args) throws IOException{
		Document doc = Jsoup.connect("https://www.acmicpc.net/status?user_id=shg9411").get();
		Elements page = doc.select("div[class=\"text-center\"] a");
		String[] str = null;
		String[] pages = null;

		while(true) {
			pages = page.text().split(" ");
//			System.out.println((pages[pages.length-2]+pages[pages.length-1]).equals("다음페이지"));
			if((pages[pages.length-2]+pages[pages.length-1]).equals("다음페이지")==false) break;
			for(Element e : page) {
				str = e.attr("href").split("&top=");
			}
			doc = Jsoup.connect("https://www.acmicpc.net/status?user_id=shg9411&top="+str[1]).get();
			page = doc.select("div[class=\"text-center\"] a");
			System.out.println(str[1]);
		}

	}

}
