import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

public class Main {

	public static void main(String[] args) throws IOException {
		
		/* 크롤링 테스트 - 단순 연결 및 문서 내부 내용 전체 조회 */
		
		System.out.println("sdfzsd");
		Document doc = Jsoup.connect("https://solved.ac/problems/level/1").get();
		
		/* 조회 성공. 내부 값 정상적으로 표시 */
		
//		System.out.println(doc);
		
		Elements e = doc.select("script#__NEXT_DATA__");
		
		/* 조회 결과 확인. 필요한 내용(현재 테스트 기준_해당 랭크에 속한 문제 리스트) 확인.
		 * 스크립트에 모두 들어가있음 (__NEXT_DATA__).  */
		
//		Pattern p = Pattern.compile("(?s) *adlib_trk_data\\.price = \\\"(\\d*)\\\""); 
//		Matcher m = p.matcher(script.data()); 
//		while(m.find()) 
//		System.out.println(m.group(1));
//		System.out.println(e);
		
		/* 기타 내용 생략. 단순 문제 번호 기준 분할-각 행은 해당 문제에 대한 정보. */
		
		String[]arr=e.toString().split("\"problemId\":");
		
//		System.out.println(Arrays.toString(arr));
		
//		for(String s:arr) {
//			System.out.println(s);
//			List<String>l=new ArrayList();
//			String[]b=s.split(",");
//			System.out.println(Arrays.toString(b));
//			l.add(b[0]);
//		}
		
		/* 각 행(문제 정보) 출력 테스트. */
		
		/* 뒷부분에 해당 문제에 해당되는 태그(tags) 존재. 문제 정보 및 태그 정보까지 모두 파싱 가능.
		 * String 조작 및 Regex 활용해 값 추출 > DB 업로드 예정.*/

		String s=arr[1];
		System.out.println(s);
		List<String>l=new ArrayList();
		String[]b=s.split(","),c,d,f;
		System.out.println(Arrays.toString(b));
		System.out.println(b[0]);
		l.add(b[0]);
		l.add(b[1].split("\"titleKo\":")[1]);
		System.out.println(l);
		b=s.split("\"tags\":");
		System.out.println(b[1]);
		c=b[1].split("\"language\":\"ko\",\"name\":");
		for(String x:c) {
			System.out.println(x);
			System.out.println(x.split(",\"")[0]);
		}
	}

}
