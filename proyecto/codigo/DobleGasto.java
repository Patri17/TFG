package codigo;

import org.bouncycastle.jcajce.provider.digest.SHA256;
import org.bouncycastle.util.encoders.Base64;

import java.security.MessageDigest;
import java.util.HashMap;
import java.util.Map;

public class DobleGasto {

    public static void main(String[] args) {
        // Datos de entrada
        String A = "A";
        String B = "B";
        String IM = "IM";
        int d = 1;

        // Calcular h0 = H(A, B, IM, d)
        byte[] input = (A + B + IM + d).getBytes();
        byte[] hash = sha256(input);
        String h0 = Base64.toBase64String(hash);

        // Buscar en la base de datos si (A, B) se ha almacenado como parte de un
        // depósito anterior
        boolean existeDepositoAnterior = buscarDepositoAnterior(A, B);

        if (!existeDepositoAnterior) {
            // No existe depósito anterior, se finaliza el depósito
            System.out.println("Depósito finalizado.");
        } else {
            // Existe depósito anterior, verificar si es fraude
            String h0DepositoAnterior = obtenerH0DepositoAnterior(A, B);
            if (h0.equals(h0DepositoAnterior)) {
                // Fraude del comerciante M
                System.out.println("Fraude del comerciante M.");
            } else {
                // Fraude del cliente U
                System.out.println("Fraude del cliente U. El cliente pierde el anonimato.");
            }
        }
    }

    private static byte[] sha256(byte[] input) {
        MessageDigest digest;
        digest = new SHA256.Digest();
        return digest.digest(input);
    }

    private static boolean buscarDepositoAnterior(String A, String B) {
        // Simulación de búsqueda en la base de datos
        Map<String, String> depositos = new HashMap<>();
        depositos.put("A,B", "h0_deposicion_anterior");
        return depositos.containsKey(A + "," + B);
    }

    private static String obtenerH0DepositoAnterior(String A, String B) {
        // Simulación de obtención de h0 de un depósito anterior
        Map<String, String> depositos = new HashMap<>();
        depositos.put("A,B", "h0_deposicion_anterior");
        return depositos.get(A + "," + B);
    }
}
