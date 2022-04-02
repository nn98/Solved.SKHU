package jobkorea;

import java.io.IOException;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class UserProblem {
	public static void main(String[] args) throws IOException{
//		Document doc = Jsoup.connect("https://www.acmicpc.net/user/koosaga").get();
		Document doc = Jsoup.connect("https://www.acmicpc.net/user/q9922000").get();
//		Document doc = Jsoup.connect("https://www.acmicpc.net/user/asb0313").get();
		// a태그였지만 없앰
		Elements key = doc.select("div.panel-heading");
		Elements value = doc.select("div.problem-list");
		String[][] str = new String[key.size()-1][2];
		String[] val = new String[key.size()-1];
		int i = 0;
		for(Element e : value) {
			val[i] = e.text();
			i++;
		}
		i = 0;
		for(Element e : key) {
			switch(e.text()) {
			case "맞은 문제":
				str[i][0] = e.text();
				str[i][1] = val[i];
				break;
			case "맞았지만 만점을 받지 못한 문제":
				str[i][0] = e.text();
				str[i][1] = val[i];
				break;
			case "시도했지만 맞지 못한 문제":
				str[i][0] = e.text();
				str[i][1] = val[i];
				break;
			case "맞은 번외 문제":
				str[i][0] = e.text();
				str[i][1] = val[i];
				break;
			default : continue;
			}
			i++;
		}
		for(int j = 0;j<str.length;j++) {
			System.out.println(str[j][0]+"\n"+str[j][1]);
		}
	}

}
