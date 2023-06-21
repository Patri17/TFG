package codigo;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;

import org.bouncycastle.asn1.x9.X9ECParameters;
import org.bouncycastle.crypto.AsymmetricCipherKeyPair;
import org.bouncycastle.crypto.generators.ECKeyPairGenerator;
import org.bouncycastle.crypto.params.ECDomainParameters;
import org.bouncycastle.crypto.params.ECKeyGenerationParameters;
import org.bouncycastle.crypto.params.ECPrivateKeyParameters;
import org.bouncycastle.crypto.params.ECPublicKeyParameters;
import org.bouncycastle.math.ec.ECPoint;
import org.bouncycastle.util.encoders.Hex;

public class FirmaMoneda {

        // Función que aplica el algoritmo SHA-256 a un array de bytes
        public static byte[] sha256(byte[] input) throws NoSuchAlgorithmException {
                MessageDigest digest = MessageDigest.getInstance("SHA-256");
                return digest.digest(input);
        }

        public static void main(String[] args) throws NoSuchAlgorithmException {
                // Inicialización de los parámetros de la curva elíptica
                X9ECParameters holder = org.bouncycastle.crypto.ec.CustomNamedCurves.getByName("secp256k1");
                ECDomainParameters domainParams = new ECDomainParameters(holder.getCurve(), holder.getG(),
                                holder.getN(), holder.getH());

                ECPoint G = domainParams.getG();
                BigInteger n = domainParams.getN();

                // Generación de la clave privada aleatoria
                SecureRandom secureRandom = new SecureRandom();
                ECKeyPairGenerator keyPairGenerator = new ECKeyPairGenerator();
                ECKeyGenerationParameters keyGenParams = new ECKeyGenerationParameters(domainParams, secureRandom);
                keyPairGenerator.init(keyGenParams);
                AsymmetricCipherKeyPair keyPair = keyPairGenerator.generateKeyPair();
                ECPrivateKeyParameters privateKey = (ECPrivateKeyParameters) keyPair.getPrivate();

                // Generación de la clave pública
                ECPublicKeyParameters publicKey = (ECPublicKeyParameters) keyPair.getPublic();

                // Definición de los mensajes A y B como puntos en la curva obtenidos
                // miultiplicando el punto base G por numeros aleatorios generados
                ECPoint A = G.multiply(new BigInteger(256, secureRandom));
                ECPoint B = G.multiply(new BigInteger(256, secureRandom));

                // Cálculo de la firma en el par (A,B)
                // Se concatena la representacion en bytes de A y B
                byte[] hashInput = concatenate(A.getEncoded(false), B.getEncoded(false));
                byte[] hash = sha256(hashInput); // se aplica la funcion de hash SHA-256 al resultado
                BigInteger k = new BigInteger(256, secureRandom).mod(n); // se genera escalar aleatorio
                ECPoint R = G.multiply(k).normalize();
                BigInteger r = R.getAffineXCoord().toBigInteger().mod(n); // se obtiene la coordenada x del punto R y se
                                                                          // reduce modulo n para obtener x
                BigInteger s = k.modInverse(n).multiply(new BigInteger(1, hash)).add(privateKey.getD().multiply(r))
                                .mod(n);

                // Impresión de la firma
                System.out.println("Firma en el par (A,B):");
                System.out.println("C' = " + Hex.toHexString(publicKey.getQ().getEncoded(false))); // clave publica
                System.out.println("R = " + Hex.toHexString(R.getEncoded(false))); // punto R
                System.out.println("S = " + s.toString(16)); // valor s
        }

        // Concatena dos arreglos de bytes
        public static byte[] concatenate(byte[] a, byte[] b) {
                byte[] result = new byte[a.length + b.length];
                System.arraycopy(a, 0, result, 0, a.length);
                System.arraycopy(b, 0, result, a.length, b.length);
                return result;
        }
}