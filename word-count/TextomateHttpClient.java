import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Scanner;

public class TextomateHttpClient {
    static String LINE_SEPARATOR = "\n";
    static String BODY_SEPARATOR = "boundary";
    static String TEXT_TO_COUNT = "Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod.";

    public static void main(String[] args) throws IOException {

        // Setup http connection
        HttpURLConnection connection = (HttpURLConnection) new URL("http://textomate.com/a/uploadMultiple").openConnection();
        connection.setRequestMethod("POST");
        connection.setRequestProperty("Content-Type", "multipart/form-data; boundary=" + BODY_SEPARATOR);
        connection.setDoOutput(true);
        OutputStream stream = connection.getOutputStream();

        // Prepare http body
        stream.write(("--" + BODY_SEPARATOR + LINE_SEPARATOR).getBytes());
        stream.write(("Content-Disposition: form-data; name=\"file\"; filename=\"test.txt\"" + LINE_SEPARATOR).getBytes());
        stream.write(("Content-Type: text/plain" + LINE_SEPARATOR).getBytes());
        stream.write(LINE_SEPARATOR.getBytes());
        stream.write(TEXT_TO_COUNT.getBytes());
        stream.write(LINE_SEPARATOR.getBytes());
        stream.write(("--" + BODY_SEPARATOR + "--" + LINE_SEPARATOR).getBytes());

        // Read server response
        String response = readInputStream(connection.getInputStream());
        System.out.println("Server response: " + response);

    }

    static String readInputStream(InputStream is) {
        Scanner s = new Scanner(is).useDelimiter("\\A");
        return s.hasNext() ? s.next() : "";
    }
}