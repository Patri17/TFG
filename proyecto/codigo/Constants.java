package codigo;

import java.math.BigInteger;

import org.bouncycastle.crypto.params.ECDomainParameters;
import org.bouncycastle.crypto.params.ECPrivateKeyParameters;
import org.bouncycastle.crypto.params.ECPublicKeyParameters;
import org.bouncycastle.math.ec.ECCurve;
import org.bouncycastle.math.ec.ECPoint;
import org.bouncycastle.math.ec.ECCurve.Fp;

//se definen varios parametros y constantes utilizados en el esquema de pago. Estas constantes incluyen los parametros de la curva eliptica, los puntos base (G), las claves publica y privada, y otros valores necesarios para el calculo de la firma y verificacion
public class Constants {

        // Parámetros de la curva elíptica
        public static final ECCurve.Fp curve = new Fp(new BigInteger("p"), new BigInteger("a"), new BigInteger("b"));
        public static final BigInteger P = new BigInteger(
                        "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F", 16); // define el orden del
                                                                                                 // cuerpo finito sobre
                                                                                                 // el cual se define la
                                                                                                 // curva
        // coeficientes de la ecuacion de la curva que definen la forma de la misma
        public static final ECPoint A = curve.createPoint(new BigInteger("Ax"), new BigInteger("Ay"));
        public static final ECPoint B = curve.createPoint(new BigInteger("Bx"), new BigInteger("By"));
        // se define el orden del grupo ciclico generado por el punto base G
        public static final BigInteger N = new BigInteger(
                        "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141", 16);
        public static final BigInteger H = BigInteger.valueOf(1); // factor de la curva eliptica
        public static final BigInteger Q = new BigInteger(
                        "400000000000000000000000000000000FD8CDDFC87B6635C115AF556C360C67", 16); // orden del subgrupo
                                                                                                 // generado por el
                                                                                                 // punto base G

        // las coordenadas x e y de G de la curva eliptica
        public static final BigInteger Gx = new BigInteger(
                        "55066263022277343669578718895168534326250603453777594175500187360389116729240", 10);
        public static final BigInteger Gy = new BigInteger(
                        "32670510020758816978083085130507043184471273380659243275938904335757337482424", 10);
        // Crear el objeto ECCurve usando los parámetros de la curva elíptica

        // Crear el objeto ECPoint con las coordenadas x e y del punto G
        static ECPoint G = curve.validatePoint(Gx, Gy);

        // Parámetros del esquema de pago
        public static final ECDomainParameters DOMAIN_PARAMS = new ECDomainParameters(Constants.curve, Constants.G,
                        Constants.N, Constants.H);
        public static final BigInteger U1 = new BigInteger("1234567890abcdef", 16);
        public static final BigInteger S = new BigInteger("9876543210abcdef", 16);
        public static final ECPrivateKeyParameters PRIVATE_KEY = Pago.generatePrivateKey();
        public static final ECPublicKeyParameters PUBLIC_KEY = new ECPublicKeyParameters(G.multiply(PRIVATE_KEY.getD()),
                        DOMAIN_PARAMS);
        public static final ECPoint T1 = G.multiply(U1.mod(Q));
        public static final ECPoint T2 = G.multiply(S.mod(Q));
}
