

import java.io.IOException;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

public class Pro_algoT {
	public static void main(String[] args) throws IOException{
		Document doc = Jsoup.connect("https://solved.ac/problems/level/2").get();
		Elements a = doc.select("div[class=\"StickyTable__Cell-sc-45ty5n-1 bqklaG sticky-table-cell\"]");
		Elements b = doc.select("div[class=\"Paginationstyles__PaginationWrapper-sc-bdna5c-2 gFzrWw\"]");
//		Elements a = doc.select("div[class=\"Paginationstyles__PageIndicator-sc-bdna5c-0 Paginationstyles__PageIndicatorCurrent-sc-bdna5c-1 fiXRLB eGsWbp\"]");
//		String[] s = a.text().split(" ");
		System.out.println(b.text());
//		System.out.println(doc.html());
//		System.out.println(s[s.length-1]);
	}

}
