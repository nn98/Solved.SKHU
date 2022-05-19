

import java.io.IOException;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class BojProblems {
	public static void main(String[] args) throws IOException{
		Document doc = Jsoup.connect("https://www.acmicpc.net/problemset").get();
		Elements page = doc.select("div.text-center");
		Elements value = doc.select("div.table-responsive td");
		Elements tier = doc.select("div.table-responsive");
		Elements a = doc.select("img");
//		System.out.println(page.size());
		// 백준 전체 문제 페이지 수
		String[] s = page.text().split(" ");
		System.out.println(s[s.length-1]);
		System.out.println(value.text());
		System.out.println(value.get(0).text());
		System.out.println(value.get(1).text());
		System.out.println(value.get(5).text());
		System.out.println(value.get(6).text());
		System.out.println();
		for(Element e : a) {
			System.out.println(e.attr("src"));
		}
		String[] st = "https://d2gd6pc034wcta.cloudfront.net/tier/19.svg".split("/");
		System.out.println(st[st.length-1].replaceAll("[^0-9]*", ""));
//		System.out.println(doc);

		// 1 ~ 242
//		for(int i = 0;i<Integer.parseInt(s[s.length-1]);i++) {
//			Document doc1 = Jsoup.connect("https://www.acmicpc.net/problemset?page="+i).get();
//			Elements value = doc1.select("div.table-responsive td");
//		}
		}

}
