package jobkorea;

import java.io.IOException;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

// 분류부분
public class test7 {
	public static void main(String[] args) throws IOException{
		Document doc = Jsoup.connect("https://www.acmicpc.net/problem/tags").get();
		Elements title = doc.select("div.table-responsive td");
		String[][] str = new String[186][3];

		int k = 1;
		int num = 0;
		for(int i = 0;i<str.length;i++) {
			if(num==title.size()-1) break;
			for(int j = 0;j<str[0].length;j++) {
				if(j==str[0].length-1) break;
				if(num==title.size()-1) break;
				else {
					str[i][j] = title.get(num++).text();
					System.out.print(str[i][j]+" ");
				}
			}
			num+=2;
			k+=4;
			System.out.println();
		}
//		int i = -1;
//		int j = 1;
//		StringBuilder sb = new StringBuilder();
//		while(i++<title.size()-1) {
//			sb.append(title.get(i).text()).append(" ");
//			if(i==j) {
//				if(title.get(i+1).text().equals("BOJ Book")) {
//					sb.append(title.get(i+1).text()).append("\n");
//				}else {
//					sb.append("\n");
//				}
//				i+=2;
//				j+=4;
//			}
//		}
//		System.out.println(sb);
	}

}
