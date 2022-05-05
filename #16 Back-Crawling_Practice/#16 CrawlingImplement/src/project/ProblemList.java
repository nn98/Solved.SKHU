package project;

import java.io.IOException;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

// 1000 ~
public class ProblemList {
	public static void main(String[] args) throws IOException{
		int num = 1;
		while(num++<240) {
		int j = 0;
		Document doc = Jsoup.connect("https://www.acmicpc.net/problemset/"+num).get();
		Elements pro = doc.select("div.table-responsive td");
		int[] number = new int[pro.size()/6];
	for(int k = 0;k<number.length;k++) {
		number[k] = Integer.parseInt(pro.get(j).text());
		j+=6;
			System.out.print(number[k]+" ");
			}
	System.out.println();
		}
	}
}
