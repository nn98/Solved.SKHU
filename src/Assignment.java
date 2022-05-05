import java.util.Scanner;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class Assignment {
	final static String URLS[]= {"https://www.acmicpc.net/status?problem_id=","&user_id=","&language_id=-1&result_id=4"};
	static int pId,i,j,k;
	static StringBuffer f=new StringBuffer(URLS[0]),result=new StringBuffer();
	static String URL,ID_List[]={
			"neck392",
			"kshyun419",
			"asas6614",
			"djwls0843",
			"kwj9294",
			"rladnr128",
			"skhu1024",
			"haeunkim0807",
			"jwnamid",
			"hpsd417",
			"parkjh6275",
			"ssb1870",
			"ssj2012sms",
			"lsy1210",
			"skl0519",
			"qmffmzpdl",
			"idotu",
			"yebinac",
			"dlak0011"
	};
	static boolean pSolve[][]=new boolean[2][ID_List.length];
	static void mkUrl() {
		if(i==0) {
			System.out.println("first mkUrl.");
			f.append(pId);
			f.append(URLS[1]);
			f.append(ID_List[i]);
			f.append(URLS[2]);
			URL=f.toString();
		}else {
			System.out.println("mkUrl");
			URL=URL.replaceAll(ID_List[i-1],ID_List[i]);
		}
		i++;
	}
	public static void main(String[]z)throws Exception{
		// default="https://www.acmicpc.net/status?problem_id=1000&user_id=q9922000&language_id=-1&result_id=4";
		
		
		Scanner s=new Scanner(System.in);
		System.out.print("Input Problem_Id: ");
		pId=s.nextInt();
		Document doc=null;
		for(;j<ID_List.length;j++) {
			mkUrl();
			System.out.print("Target URL: "+URL);
			doc = Jsoup.connect(URL).get();
			Elements titles = doc.select("td[class=result]");
			for (Element e : titles) {
                if (e.text().equals("맞았습니다!!")) {                   //정오 판별
                    pSolve[0][j]=true;
                    pSolve[1][j]=true;
                }
            }
			System.out.println(pSolve[0][j]?"\tSolve":"\tNone");
			result.append(ID_List[j]+" "+(pSolve[0][j]?"\tSolve":"\tNone")+"\n");
		}
		System.out.println(result);
	}
}
