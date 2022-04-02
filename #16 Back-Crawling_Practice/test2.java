import java.io.IOException;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class CCrwl {
	public static void main(String[] args) throws IOException {

		// 자료를 가져올 사이트에 연결하기
		Document doc = Jsoup.connect("http://www.cgv.co.kr/movies/").get();
	//	System.out.println(doc.data()); // html 코드를 가져온다.


		/* 크롤링 예시
		 <div class="box-contents">
                        <a href="/movies/detail-view/?midx=82986">
                            <strong class="title">블랙 위도우</strong>
                        </a>

         <div class="score">
                            <strong class="percent">예매율<span>23.2%</span></strong>
                            <!-- 2020.05.07 개봉전 프리에그 노출, 개봉후 골든에그지수 노출변경 (적용 범위1~ 3위)-->
                            <div class='egg-gage small'>
		 */

		Elements titles = doc.select("div.box-contents strong.title");
		// 묶기전 큰 묶음부터 묶어주는게 좋다.
		Elements percents = doc.select("div.box-contents div.score strong.percent span");
		for (int i = 0; i < 15; i++) {
			Element title = titles.get(i);
			Element percent = percents.get(i);
			System.out.println(title.text() + " : "+ percent.text()); // 보고있는 사이트의 영화 제목을 다 가져온다.
		}
	}
}