package jobkorea;

import java.io.IOException;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

// 단계 1
public class test9 {
	public static void main(String[] args) throws IOException{
		Document doc = Jsoup.connect("https://www.acmicpc.net/step/1").get();
		Elements title = doc.select("div.table-responsive td");
		String[][] str = new String[(title.size()/8)][3];
		int num = 0;
		int a = 1;
		for(int i = 0;i<str.length;i++) {
			if(num==title.size()-1) break;
			for(int j = 0;j<str[0].length;j++) {
					str[i][j] = title.get(num++).text();
					if(num==title.size()-1) break;
					if(j==a) {
						num+=5;
					}
					System.out.print(str[i][j]+" ");
				}
			System.out.println();
			}
		}
	}
