

import java.io.IOException;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

public class  BOJAlgorithmTest{

	public static void main(String[] args) throws IOException{
		// 1
		// https://www.acmicpc.net/problemset?sort=ac_desc&algo=?
		// 	백준 분류 정리 완료
		Document doc = Jsoup.connect("https://www.acmicpc.net/problem/tags").get();
		Elements e = doc.select("div.table-responsive td");
		String[][] str = new String[e.size()][2];
		System.out.println(e.size()/4); // 187 현재 알고리즘 개수(2022-04-29)
		int k = 0;
		int z = 0;
		for(int i = 0;i<e.size()-1;i++) {
			if(k>=e.size()-1) {
				break;
			}else {
				for(int j = 0;j<2;j++) {
					if(j==0) {
						Elements e2 = doc.select("div.table-responsive td a");
						// 중간에 BOJ Book 값이 있어서 그 값을 그 다음 값을 출력하게 설정
						if(e2.get(z).attr("href").replaceAll("[^0-9]*", "")=="") {
							z++;
							str[i][j] = e2.get(z).attr("href").replaceAll("[^0-9]*", "");
						}else {
							str[i][j] = e2.get(z).attr("href").replaceAll("[^0-9]*", "");
						}
					}else {
						str[i][j] = e.get(k).text();
					}
					System.out.print(str[i][j]+" ");
					}
			}
			System.out.println();
			z+=2;
			k+=4;
		}
	}

}
