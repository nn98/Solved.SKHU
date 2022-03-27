package jobkorea;

import java.io.IOException;
import java.text.ParseException;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

public class test5 {
	public static void main(String[] args) throws ParseException {

        String URL = "https://finance.naver.com/item/main.nhn?code=005930";
		Document doc;

		try {
			doc = Jsoup.connect(URL).get();
			Elements elem = doc.select(".date");
			String[] str = elem.text().split(" ");

			Elements todaylist =doc.select(".new_totalinfo dl>dd");

			String juga = todaylist.get(3).text().split(" ")[1];
			String DungRakrate = todaylist.get(3).text().split(" ")[6];
			String siga =  todaylist.get(5).text().split(" ")[1];
			String goga = todaylist.get(6).text().split(" ")[1];
			String zeoga = todaylist.get(8).text().split(" ")[1];
			String georaeryang = todaylist.get(10).text().split(" ")[1];

			String stype = todaylist.get(3).text().split(" ")[3]; //상한가,상승,보합,하한가,하락 구분

			String vsyesterday = todaylist.get(3).text().split(" ")[4];

			System.out.println("삼성전자 주가------------------");
			System.out.println("주가:"+juga);
			System.out.println("등락률:"+DungRakrate);
			System.out.println("시가:"+siga);
			System.out.println("고가:"+goga);
			System.out.println("저가:"+zeoga);
			System.out.println("거래량:"+georaeryang);
			System.out.println("타입:"+stype);
			System.out.println("전일대비:"+vsyesterday);
			System.out.println("가져오는 시간:"+str[0]+str[1]);
        	} catch (IOException e) {
			e.printStackTrace();
		}

	}
}