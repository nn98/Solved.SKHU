import java.io.IOException;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
public class MainApp {
	public static void main(String[] args) {
		try{
			String URL = "https://www.acmicpc.net/school/ranklist/309";
			Document doc = Jsoup.connect(URL).get();

			doc.text(); // html에서 텍스트만 불러옴
			doc.html(); // html 자체를 가져옴
			Elements elm = doc.select("div[class=\"container content\"]");
//			Elements elm = doc.select("div[class=\"wrapper\"]");
			System.out.println(elm);
		}catch(IOException e) {
			e.printStackTrace();
		}
	}

}
