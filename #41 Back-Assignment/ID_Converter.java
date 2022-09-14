import java.io.BufferedReader;
import java.io.BufferedWriter;

public class ID_Converter {
    public static void main(String[]z)throws Exception{
        BufferedReader r=new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter w=new BufferedWriter(new OutputStreamWriter(System.out));
        for(;;){
            String s[]=r.readLine().split("\t");
            if(s.length<3)break;
            w.write(String.format("insert into student values (%s,\"%s\",\"%s\");\n", s[0], s[1], s[2]));
        }
        w.flush();
    }
}
