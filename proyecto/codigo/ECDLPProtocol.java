package codigo;

import java.io.IOException;
import java.math.BigInteger;
import java.security.SecureRandom;
import org.bouncycastle.asn1.x9.X9ECParameters;
import org.bouncycastle.crypto.AsymmetricCipherKeyPair;
import org.bouncycastle.crypto.generators.ECKeyPairGenerator;
import org.bouncycastle.crypto.params.ECDomainParameters;
import org.bouncycastle.crypto.params.ECKeyGenerationParameters;
import org.bouncycastle.crypto.params.ECPrivateKeyParameters;
import org.bouncycastle.crypto.params.ECPublicKeyParameters;
import org.bouncycastle.util.encoders.Hex;

import org.bouncycastle.crypto.ec.CustomNamedCurves;
import org.bouncycastle.math.ec.ECCurve;
import org.bouncycastle.math.ec.ECPoint;

// El protocolo genera un par de claves(una publica y otra privada)

public class ECDLPProtocol {

    public static void main(String[] args) throws IOException {

        X9ECParameters curveParams = CustomNamedCurves.getByName("secp256r1"); // especifica los parametros de la curva
                                                                               // eliptica secp256r1. Incluye la curva,
                                                                               // el punto base G, el orden de la curva
                                                                               // n y el factor h
        ECCurve curve = curveParams.getCurve();
        ECPoint G = curveParams.getG();
        BigInteger n = curveParams.getN();
        BigInteger h = curveParams.getH();
        ECDomainParameters domainParams = new ECDomainParameters(curve, G, n, h); // parametros de dominio de curva
                                                                                  // eliptica

        SecureRandom random = new SecureRandom(); // proporciona una generacion de numeros aleatorios seguros para la
                                                  // generacion del par de claves

        ECKeyGenerationParameters keyGenParams = new ECKeyGenerationParameters(domainParams, random);
        ECKeyPairGenerator keyPairGenerator = new ECKeyPairGenerator();
        keyPairGenerator.init(keyGenParams);

        AsymmetricCipherKeyPair keyPair = keyPairGenerator.generateKeyPair(); // se genera el par de claves
        ECPrivateKeyParameters privateKeyParams = (ECPrivateKeyParameters) keyPair.getPrivate(); // se extrae la clave
                                                                                                 // privada
        ECPublicKeyParameters publicKeyParams = (ECPublicKeyParameters) keyPair.getPublic(); // se extrae la clave
                                                                                             // publica

        byte[] privateKeyBytes = privateKeyParams.getD().toByteArray(); // convertir valor de la clave privada a matriz
                                                                        // de bytes
        byte[] publicKeyBytes = publicKeyParams.getQ().getEncoded(false); // convertir valor de la clave publica a
                                                                          // matriz de bytes

        String privateKeyHex = new BigInteger(1, privateKeyBytes).toString(16); // convertir el valor de la matriz de
                                                                                // bytes de la clave privada a
                                                                                // hexadecimal
        String publicKeyHex = new BigInteger(1, publicKeyBytes).toString(16); // convetir el valor de la matriz de bytes
                                                                              // de la clave publica a hexadecimal

        System.out.println("Private key: " + privateKeyHex);
        System.out.println("Public key: " + publicKeyHex);

        // para demostrar la carga de claves, se cargan las claves privadas y publicas a
        // partir de sus reperesentaciones hexadecimales.
        // Las claves privadas y publicas cargadas se convierten de vuelta a matrices de
        // bytes utilizando 'Hex'.

        ECPrivateKeyParameters loadedPrivateKeyParams = new ECPrivateKeyParameters(new BigInteger(privateKeyHex, 16),
                domainParams);
        ECPublicKeyParameters loadedPublicKeyParams = new ECPublicKeyParameters(
                G.multiply(new BigInteger(publicKeyHex, 16)), domainParams);

        byte[] loadedPrivateKeyBytes = loadedPrivateKeyParams.getD().toByteArray();
        byte[] loadedPublicKeyBytes = loadedPublicKeyParams.getQ().getEncoded(false);

        String loadedPrivateKeyHex = Hex.toHexString(loadedPrivateKeyBytes);
        String loadedPublicKeyHex = Hex.toHexString(loadedPublicKeyBytes);

        System.out.println("Loaded private key: " + loadedPrivateKeyHex);
        System.out.println("Loaded public key: " + loadedPublicKeyHex);

    }
}
