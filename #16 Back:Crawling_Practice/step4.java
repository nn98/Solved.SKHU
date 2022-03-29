package jobkorea;

import java.io.IOException;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

// 단계 2
/*
 1 - step/1 2 - step/4 3 - step/3 4 - step/6 5 - step/5 6 - step/7 7 - step/8
 8 - step/10 9 - step/19 10 - step/22 11 - step/9 12 - step/49 13 - step/34 14 - step/16
 15 - step/33 16 - step/18 17 - step/11 18 - step/12 19 - step/20 20 - step/29 21 - step/13
 22 - step/17 23 - step/24 24 - step/26 25 - step/59 26 - step/41 27 - step/23 28 - step/14
 29 - step/15 30 - step/21 31 - step/45 32 - step/31 33 - step/27 34 - step/25 35 - step/40
 36 - step/43 37 - step/35 38 - step/39 39 - step/47 40 - step/37 41 - step/38 42 - step/36
 43 - step/42 44 - step/44 45 - step/60 46 - step/28 47 - step/30 48 - step/32 49 - step/46

 */
/*
 1 3 4 5 6 7 8
 10 19 22 12 49 34 16
 33 18 11 12 20 29 13
 17 24 26 59 41 23 14
 15 21 25 31 27 25 40
 43 35 39 47 37 38 36
 42 44 60 28 30 32 46
 */
public class step4 {
	public static void main(String[] args) throws IOException{
		Document doc = Jsoup.connect("https://www.acmicpc.net/step/4").get();
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
