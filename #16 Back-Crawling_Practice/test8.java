package jobkorea;

import java.io.IOException;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

// 단계부분
public class test8 {
	public static void main(String[] args) throws IOException{
		Document doc = Jsoup.connect("https://www.acmicpc.net/step").get();
		Elements title = doc.select("div.table-responsive td");
		String[][] str = new String[49][3];
//		StringBuilder sb = new StringBuilder();
//		int i = -1;
//		int j = 2;
//		while(i++<title.size()-1) {
//			sb.append(title.get(i).text()).append(" ");
//			if(i==j) {
//				i+=3;
//				j+=6;
//				if(i==title.size()-1) {
//					break;
//				}else {
//				sb.append("\n");
//				}
//			}
//		}
//		System.out.println(sb);
		int k = 2;
		int num = 0;
		for(int i = 0;i<str.length;i++) {
			if(num==title.size()-1) break;
			for(int j = 0;j<str[0].length;j++) {
				if(num==title.size()-1)break;
				else {
					str[i][j] = title.get(num++).text();
					System.out.print(str[i][j]+" ");
				}
			}
			num+=3;
			k+=6;
			System.out.println();
		}
	}

}
