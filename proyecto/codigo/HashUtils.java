package codigo;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

// clase para calcular el hash SHA-256 de un arreglo de bytes
public class HashUtils {
    // el metodo sha256 toma un arreglo de bytes como entrada y devulve el hash
    // SHA-256 correspondiente como resultado
    public static byte[] sha256(byte[] data) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256"); // instancia de algoritmo de hash SHA-256
            return digest.digest(data);// se pasa el arreglo de bytes al objeto MessageDigest mediante el metodo digest
                                       // para calcular el hash SHA-256
        } catch (NoSuchAlgorithmException e) { // si el algoritmo no esta disponible, se lanza la excepcion
            throw new RuntimeException("Error al calcular el hash SHA-256", e);
        }
    }
}
