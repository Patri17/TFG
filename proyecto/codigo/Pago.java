package codigo;

import java.math.BigInteger;
import org.bouncycastle.crypto.digests.SHA256Digest;
import org.bouncycastle.crypto.params.ECPrivateKeyParameters;
import org.bouncycastle.crypto.params.ECPublicKeyParameters;
import org.bouncycastle.crypto.signers.ECDSASigner;
import org.bouncycastle.math.ec.ECPoint;

public class Pago {

    // Genera un par de claves pública-privada para el usuario U
    public static ECPrivateKeyParameters generatePrivateKey() {
        ECPrivateKeyParameters privateKey = new ECPrivateKeyParameters(new BigInteger("1234567890abcdef", 16),
                Constants.DOMAIN_PARAMS);
        return privateKey;
    }

    // Calcula la firma (C', R', S') para el par (A, B)
    public static BigInteger[] signMessage(ECPrivateKeyParameters privateKey, ECPoint a, ECPoint b) {
        ECDSASigner signer = new ECDSASigner();
        signer.init(true, privateKey);
        SHA256Digest digest = new SHA256Digest();
        byte[] messageHash = new byte[digest.getDigestSize()];
        byte[] aBytes = a.getEncoded(false);
        byte[] bBytes = b.getEncoded(false);
        byte[] message = new byte[aBytes.length + bBytes.length];
        System.arraycopy(aBytes, 0, message, 0, aBytes.length);
        System.arraycopy(bBytes, 0, message, aBytes.length, bBytes.length);
        digest.update(message, 0, message.length);
        digest.doFinal(messageHash, 0);
        BigInteger[] signature = signer.generateSignature(messageHash);
        return signature;
    }

    // Verifica la firma (C', R', S') para el par (A, B)
    public static boolean verifySignature(ECPublicKeyParameters publicKey, BigInteger cPrime, BigInteger rPrime,
            BigInteger sPrime, ECPoint a, ECPoint b) {
        ECDSASigner signer = new ECDSASigner();
        signer.init(false, publicKey);
        SHA256Digest digest = new SHA256Digest();
        byte[] messageHash = new byte[digest.getDigestSize()];
        byte[] aBytes = a.getEncoded(false);
        byte[] bBytes = b.getEncoded(false);
        byte[] message = new byte[aBytes.length + bBytes.length];
        System.arraycopy(aBytes, 0, message, 0, aBytes.length);
        System.arraycopy(bBytes, 0, message, aBytes.length, bBytes.length);
        digest.update(message, 0, message.length);
        digest.doFinal(messageHash, 0);
        return signer.verifySignature(messageHash, rPrime, sPrime);
    }

    // Realiza el esquema de pago. Se generan valores intermedios y se realizan
    // operaciones con puntos de la curva para verificar la validez del pago
    public static boolean makePayment(ECPoint a, ECPoint b, ECPoint p1, ECPoint p2, BigInteger cPrime,
            BigInteger rPrime, BigInteger sPrime) {
        SHA256Digest digest = new SHA256Digest();
        byte[] iMBytes = "1234567890".getBytes();
        byte[] dBytes = "20230426".getBytes();
        byte[] aBytes = a.getEncoded(false);
        byte[] bBytes = b.getEncoded(false);
        byte[] h0Bytes = new byte[digest.getDigestSize()];
        byte[] message = new byte[iMBytes.length + dBytes.length + aBytes.length + bBytes.length];
        System.arraycopy(aBytes, 0, message, aBytes.length, 0);
        System.arraycopy(bBytes, 0, message, aBytes.length, bBytes.length);
        System.arraycopy(iMBytes, 0, message, aBytes.length + bBytes.length, iMBytes.length);
        System.arraycopy(dBytes, 0, message, aBytes.length + bBytes.length + iMBytes.length, dBytes.length);
        digest.update(message, 0, message.length);
        digest.doFinal(h0Bytes, 0);

        ECPoint y1 = Constants.G.multiply(Constants.U1.multiply(Constants.S).mod(Constants.Q))
                .add(Constants.T1.multiply(Constants.Gx));
        ECPoint y2 = Constants.G.multiply(Constants.S).add(Constants.T2.multiply(Constants.Gx));

        ECPoint h0p1 = p1.multiply(new BigInteger(h0Bytes));
        ECPoint y1p1 = y1.multiply(cPrime).add(p1.multiply(rPrime));
        ECPoint y2p2 = y2.multiply(cPrime).add(p2.multiply(rPrime));
        BigInteger bigInt = new BigInteger(h0Bytes);
        ECPoint h0AplusB = Constants.A.add(Constants.B.multiply(bigInt));

        return (h0p1.add(y1p1).add(y2p2)).equals(h0AplusB);
    }
}
