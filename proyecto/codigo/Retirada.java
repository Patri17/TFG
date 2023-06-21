package codigo;

import org.bouncycastle.asn1.sec.SECNamedCurves;
import org.bouncycastle.asn1.x9.X9ECParameters;
import org.bouncycastle.crypto.AsymmetricCipherKeyPair;
import org.bouncycastle.crypto.generators.ECKeyPairGenerator;
import org.bouncycastle.crypto.params.ECDomainParameters;
import org.bouncycastle.crypto.params.ECKeyGenerationParameters;
import org.bouncycastle.crypto.params.ECPrivateKeyParameters;
import org.bouncycastle.crypto.params.ECPublicKeyParameters;
import org.bouncycastle.crypto.params.ParametersWithRandom;
import org.bouncycastle.crypto.signers.ECDSASigner;
import org.bouncycastle.math.ec.ECPoint;
import org.bouncycastle.util.encoders.Hex;

import java.math.BigInteger;
import java.security.SecureRandom;

// se realiza un intercambio de claves y un proceso de firma digital 
public class Retirada {

    private static final SecureRandom SECURE_RANDOM = new SecureRandom(); // geera numeros aleatorio de forma segura

    // inicializa los parametros del dominio de la curva eliptica. Se definen los
    // parametro de la curva
    private static final ECDomainParameters DOMAIN_PARAMS = createECDomainParameters();

    private static ECDomainParameters createECDomainParameters() {
        X9ECParameters ecParams = SECNamedCurves.getByName("secp256k1"); // curva
        ECPoint ecPoint = ecParams.getG();// punto generador
        BigInteger n = ecParams.getN();// orden del punto generador
        BigInteger h = ecParams.getH();// factor
        ECDomainParameters ecDomainParams = new ECDomainParameters(ecParams.getCurve(), ecPoint, n, h);
        return ecDomainParams;
    }

    public static void main(String[] args) {
        BigInteger z = new BigInteger("1234567890"); // valor secreto compartido entre el banco y el usuario
        BigInteger s = new BigInteger(DOMAIN_PARAMS.getN().bitLength(), SECURE_RANDOM).mod(DOMAIN_PARAMS.getN()); // exponente
                                                                                                                  // secreto
        ECPoint A = DOMAIN_PARAMS.getG().multiply(s); // A = sÎ
        ECKeyPairGenerator keyGen = new ECKeyPairGenerator(); // genera un nuevo par de claves
        keyGen.init(new ECKeyGenerationParameters(DOMAIN_PARAMS, SECURE_RANDOM));
        AsymmetricCipherKeyPair keyPair = keyGen.generateKeyPair();
        ECPrivateKeyParameters priv = (ECPrivateKeyParameters) keyPair.getPrivate();
        ECPublicKeyParameters pub = (ECPublicKeyParameters) keyPair.getPublic();
        ECPoint P1 = pub.getQ().multiply(s); // P1 = sP
        ECPoint P2 = DOMAIN_PARAMS.getG().multiply(priv.getD()); // P2 = dÎ
        BigInteger t1 = new BigInteger(DOMAIN_PARAMS.getN().bitLength(), SECURE_RANDOM).mod(DOMAIN_PARAMS.getN()); // exponente
                                                                                                                   // secreto
                                                                                                                   // t1
        BigInteger t2 = new BigInteger(DOMAIN_PARAMS.getN().bitLength(), SECURE_RANDOM).mod(DOMAIN_PARAMS.getN()); // exponente
                                                                                                                   // secreto
                                                                                                                   // t2
        ECPoint B = P1.add(DOMAIN_PARAMS.getG().multiply(t1)).add(P2.multiply(t2)); // B = t1P1 + t2P2
        // Calculamos el hash de z y lo convertimos en un BigInteger e
        byte[] zBytes = z.toByteArray();
        byte[] hash = HashUtils.sha256(zBytes);
        BigInteger e = new BigInteger(1, hash);

        // Calculamos la firma digital de e con la clave privada priv
        ECDSASigner signer = new ECDSASigner();
        ParametersWithRandom param = new ParametersWithRandom(priv, SECURE_RANDOM);
        signer.init(true, param);
        byte[] messageBytes = e.toByteArray();
        BigInteger[] signature = signer.generateSignature(messageBytes);

        // Comprobamos que la firma es válida
        signer.init(false, pub);
        if (!signer.verifySignature(messageBytes, signature[0], signature[1])) {
            throw new RuntimeException("Firma inválida");
        }

        // Convertimos los puntos a coordenadas hexadecimales
        String hexA = Hex.toHexString(A.getEncoded(false));
        String hexP1 = Hex.toHexString(P1.getEncoded(false));
        String hexP2 = Hex.toHexString(P2.getEncoded(false));
        String hexB = Hex.toHexString(B.getEncoded(false));

        // Imprimimos los resultados
        System.out.println("A = " + hexA);
        System.out.println("P1 = " + hexP1);
        System.out.println("P2 = " + hexP2);
        System.out.println("B = " + hexB);
        System.out.println("r = " + signature[0].toString(16));
        System.out.println("s = " + signature[1].toString(16));
    }
}

// Clase HashUtils para calcular el hash SHA-256 de un array de bytes
