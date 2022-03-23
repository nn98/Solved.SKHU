import java.io.IOException;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

// 크롤링 방법 제시 페이지
// https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=sky930425&logNo=221562017606

public class SecondPar {

	public static void main(String[] args) {
		try {
			String URL = "https://www.acmicpc.net/school/ranklist/309";
			Document doc = Jsoup.connect(URL).get();
			Elements elm = doc.select("div[class=\"nav nav-pills\"]");
			for(Element e : elm.select("dt")) {
				if(e.className().equals("photo")) {
					continue;
				}
				System.out.println(e.text());
			}
		}catch(IOException e){
			e.printStackTrace();
		}

	}

}
