package project;

import java.io.IOException;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

public class BOJ_Ranking {
	public static void main(String[] args) throws IOException{
		int num = 0;
		while(num++<3) {
			Document doc = Jsoup.connect("https://www.acmicpc.net/school/ranklist/309/"+num).get();
			Elements a = doc.select("div.table-responsive td");
			String str[][] = new String[a.size()/6][6];
			System.out.println(a.size());
			int k = 0;
			System.out.println("순위"+" "+"아이디"+" "+"상태메시지"+" "+"맞은문제"+" "+"제출"+" "+"정답비율");
			for(int i = 0;i<str.length;i++) {
				for(int j = 0;j<str[0].length;j++) {
					str[i][j] = a.get(k).text();
					System.out.print(str[i][j]+" ");
					k++;
				}
				System.out.println();
			}
		}
	}

}
