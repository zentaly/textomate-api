import java.io.*;
import java.net.*;
import java.util.Scanner;

public class TextomateHttpClient {
    static String LINE_SEPARATOR = "\n";
    static String BODY_SEPARATOR = "boundary";
    static String FILE_TO_COUNT = "/Users/Alex/Desktop/sample.pdf";

    public static void main(String[] args) throws IOException {
        // File to get wordcount
        File file = new File(FILE_TO_COUNT);

        // Setup http connection
        HttpURLConnection connection = (HttpURLConnection) new URL("http://textomate.com/a/uploadMultiple").openConnection();
        connection.setRequestMethod("POST");
        connection.setRequestProperty("Content-Type", "multipart/form-data; boundary=" + BODY_SEPARATOR);
        connection.setDoOutput(true);
        OutputStream stream = connection.getOutputStream();

        // Prepare http body
        stream.write(("--" + BODY_SEPARATOR + LINE_SEPARATOR).getBytes());
        stream.write(("Content-Disposition: form-data; name=\"file\"; filename=\"" + file.getName() + "\"" + LINE_SEPARATOR).getBytes());
        stream.write(("Content-Type: text/plain" + LINE_SEPARATOR).getBytes());
        stream.write(LINE_SEPARATOR.getBytes());
        stream.write(readFileStream(file));
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

    static byte[] readFileStream(File file) throws IOException {
        InputStream is = new FileInputStream(file);
        final int bufferSize = 1024;
        try {
            byte buf[] = new byte[bufferSize];
            ByteArrayOutputStream bos = new ByteArrayOutputStream();
            int read;
            do {
                read = is.read(buf, 0, bufferSize);
                if (read > 0) {
                    bos.write(buf, 0, read);
                }
            } while (read > 0);
            return bos.toByteArray();
        } finally {
            try {
                is.close();
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
    }

}
