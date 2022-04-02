package jobkorea;

import java.io.IOException;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class test6 {
	public static void main(String[] args) throws IOException{
		Document doc = Jsoup.connect("https://www.acmicpc.net/user/asb0313").get();
//		Document doc = Jsoup.connect("https://www.acmicpc.net/user/q9922000").get();
		// a태그였지만 없앰
		Elements a = doc.select("div.problem-list");

		String[] str = new String[a.size()];
		int i = 0;
		for(Element e : a) {
			str[i] = e.text();
			i++;
		}
		// 만약에 4개 짜리이면 0 - 맞춘 문제 / 1 - 맞았지만 만점을 받지 못한 문제 /2 - 시도했지만 맞추지 못한 문제 / 3 - 번외 문제
		// 0 - 맞춘 문제 / 1 - 시도했지만 맞추지 못한 문제 / 2 - 번외 문제
		for(int j = 0;j<a.size();j++) {
			System.out.println(str[j]);
		}
	}

}
