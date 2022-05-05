package project;

import java.io.IOException;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

public class SolvedRanking {
	public static void main(String[] args) throws IOException{
		Document doc = Jsoup.connect("https://solved.ac/ranking/o/309").get();
		Elements b = doc.select("div.sticky-table-cell");
		String[][] str = new String[(b.size()/6)-1][6];
		int k = 6;
		// wordRank:" " / skhuRank / rating / class / pro
		System.out.println(b.get(8).text());
		System.out.println("전체순위"+" "+"순위"+" "+"ID"+"레이팅"+" "+"CLASS"+" "+"푼 문제");
		for(int i = 0;i<str.length;i++) {
//			System.out.print("{");
//			for(int j = 0;j<str[0].length;j++) {
//				str[i][j] = b.get(k++).text();
//				switch(j) {
//				case 0 : System.out.print("\"wordRank\" : \""+str[i][j]+"\","); break;
//				case 1 :System.out.print("\"skhuRank\" : "+str[i][j]+","); break;
//				case 2: System.out.print("\"Id\" : \""+str[i][j]+"\","); break;
//				case 3: System.out.print("\"Rating\" : "+str[i][j]+","); break;
//				case 4: System.out.print("\"CLASS\" : \""+str[i][j]+"\","); break;
//				case 5: System.out.print("\"pro\" : "+str[i][j]); break;
//				default: break;
//				}

//				System.out.print(str[i][j]+" ");
			}
//			System.out.println("},");
//			System.out.println();
//		}
	}

}
