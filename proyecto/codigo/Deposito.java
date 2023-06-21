package codigo;

import java.math.BigInteger;
import java.nio.ByteBuffer;
import java.security.SecureRandom;
import java.security.Security;
import java.util.Date;

import org.bouncycastle.jce.ECNamedCurveTable;
import org.bouncycastle.crypto.digests.SHA256Digest;
import org.bouncycastle.crypto.params.ECDomainParameters;
import org.bouncycastle.crypto.params.ECPrivateKeyParameters;
import org.bouncycastle.crypto.params.ECPublicKeyParameters;
import org.bouncycastle.crypto.signers.ECDSASigner;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.bouncycastle.jce.spec.ECNamedCurveParameterSpec;
import org.bouncycastle.math.ec.ECPoint;
import org.bouncycastle.math.ec.FixedPointCombMultiplier;
import org.bouncycastle.util.encoders.Hex;

public class Deposito {

        public static void main(String[] args) {
                // Agregamos el proveedor de seguridad Bouncy Castle
                Security.addProvider(new BouncyCastleProvider());

                // Seleccionamos la curva secp256r1
                // ASN1ObjectIdentifier curveOID = new ASN1ObjectIdentifier("secp256r1");
                ECNamedCurveParameterSpec params = ECNamedCurveTable.getParameterSpec("1.2.840.10045.3.1.7");

                final ECDomainParameters ecParams = new ECDomainParameters(params.getCurve(), params.getG(),
                                params.getN(), params.getH());

                // Generamos la clave privada del usuario M
                ECPrivateKeyParameters privateKeyM = new ECPrivateKeyParameters(
                                new BigInteger("5fd69f5df8869a345dcbccfbfcbbf3fc3a3c17157f45b6bb210b3ee3d46949e8", 16),
                                ecParams);

                // Obtenemos la clave pública del usuario M
                ECPublicKeyParameters publicKeyM = new ECPublicKeyParameters(
                                ecParams.getG().multiply(privateKeyM.getD()),
                                ecParams);

                // Generamos el par de claves del banco B
                ECPrivateKeyParameters privateKeyB = new ECPrivateKeyParameters(
                                new BigInteger("b4c8cc49419c5a5b5f5d05e599a193a1450d791f09ef40ecbce187d0d7e87c0e", 16),
                                ecParams);
                ECPublicKeyParameters publicKeyB = new ECPublicKeyParameters(
                                ecParams.getG().multiply(privateKeyB.getD()),
                                ecParams);

                // Generamos los valores A y B
                ECPoint A = publicKeyM.getQ();
                ECPoint B = publicKeyB.getQ();
                BigInteger IM = new BigInteger("123456789");
                BigInteger d = new BigInteger("123456789");

                // Computamos el hash h0
                SHA256Digest digest = new SHA256Digest();
                byte[] h0Input = new byte[A.getEncoded(true).length + B.getEncoded(true).length + 8];
                System.arraycopy(A.getEncoded(true), 0, h0Input, 0, A.getEncoded(true).length);
                System.arraycopy(B.getEncoded(true), 0, h0Input, A.getEncoded(true).length, B.getEncoded(true).length);
                System.arraycopy(IM.toByteArray(), 0, h0Input, A.getEncoded(true).length + B.getEncoded(true).length,
                                4);
                System.arraycopy(d.toByteArray(), 0, h0Input, A.getEncoded(true).length + B.getEncoded(true).length + 4,
                                4);
                digest.update(h0Input, 0, h0Input.length);
                byte[] h0Output = new byte[digest.getDigestSize()];
                digest.doFinal(h0Output, 0);
                BigInteger h0 = new BigInteger(1, h0Output);

                // Verificamos la firma de M
                ECDSASigner verifier = new ECDSASigner();
                verifier.init(false, publicKeyM);
                // Obtenemos la firma de M
                SecureRandom random = new SecureRandom();
                BigInteger k = new BigInteger(ecParams.getN().bitLength(), random);
                ECPoint R = new FixedPointCombMultiplier().multiply(ecParams.getG(), k);
                ECPoint normalized = R.normalize();
                BigInteger r = normalized.getAffineXCoord().toBigInteger().mod(ecParams.getN());
                BigInteger s = k.modInverse(ecParams.getN()).multiply(h0.add(privateKeyM.getD().multiply(r)))
                                .mod(ecParams.getN());
                // Verificamos la firma
                if (verifier.verifySignature(h0Output, r, s)) {
                        System.out.println("La firma es válida.");
                        // Generamos la transacción
                        Date fecha = new Date();
                        BigInteger valor = new BigInteger("5000");
                        byte[] transaccion = new byte[A.getEncoded(true).length + B.getEncoded(true).length + 4 + 4
                                        + 8];
                        System.arraycopy(A.getEncoded(true), 0, transaccion, 0, A.getEncoded(true).length);
                        System.arraycopy(B.getEncoded(true), 0, transaccion, A.getEncoded(true).length,
                                        B.getEncoded(true).length);
                        System.arraycopy(valor.toByteArray(), 0, transaccion,
                                        A.getEncoded(true).length + B.getEncoded(true).length,
                                        2);
                        System.arraycopy(ByteBuffer.allocate(8).putLong(fecha.getTime()).array(), 0, transaccion,
                                        A.getEncoded(true).length + B.getEncoded(true).length + 4, 8);

                        // Firma la transacción con la clave privada de B
                        ECDSASigner signer = new ECDSASigner();
                        signer.init(true, privateKeyB);
                        digest = new SHA256Digest();
                        byte[] hashTransaccion = new byte[32];
                        digest.update(transaccion, 0, transaccion.length);
                        digest.doFinal(hashTransaccion, 0);
                        BigInteger[] firma = signer.generateSignature(hashTransaccion);

                        // Imprimimos la transacción
                        System.out.println("Transacción generada:");
                        System.out.println("  - De: " + Hex.toHexString(A.getEncoded(true)));
                        System.out.println("  - A: " + Hex.toHexString(B.getEncoded(true)));
                        System.out.println("  - Valor: " + valor);
                        System.out.println("  - Fecha: " + fecha);
                        System.out.println("  - Firma: r=" + firma[0] + ", s=" + firma[1]);
                } else {
                        System.out.println("La firma no es válida.");
                }
        }
}
