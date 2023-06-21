package codigo;

import java.math.BigInteger;
import java.security.SecureRandom;

import org.bouncycastle.crypto.params.ECDomainParameters;

import org.bouncycastle.jce.ECNamedCurveTable;
import org.bouncycastle.jce.spec.ECNamedCurveParameterSpec;
import org.bouncycastle.math.ec.ECPoint;

// Muestran la generacion de claves y realiza un ejemplo de verificacion de transaccion 
public class SetUp {

    // Parámetros de la curva elíptica secp256r1

    private static final ECNamedCurveParameterSpec params = ECNamedCurveTable.getParameterSpec("secp256r1");
    private static final ECDomainParameters domainParams = new ECDomainParameters(params.getCurve(), params.getG(),
            params.getN(), params.getH());

    public static void main(String[] args) {
        SecureRandom random = new SecureRandom(); // generacion de numeros aleatorios seguros

        // Generación de los elementos P1 y P2 del banco

        ECPoint P1 = generatePoint(random);
        ECPoint P2 = generatePoint(random);

        // Generación del exponente secreto z del banco
        BigInteger z = generateRandomScalar(random, domainParams.getN());

        // Claves públicas y privadas permanentes del banco

        ECPoint Q1 = P1.multiply(z);
        ECPoint Q2 = P2.multiply(z);

        // Generación del exponente secreto u1 del cliente
        BigInteger u1 = generateRandomScalar(random, domainParams.getN());

        // Cálculo del número de cuenta I del cliente
        ECPoint I = P1.multiply(u1);
        ECPoint modifiedI = I.add(P2);

        // Cálculo del elemento C compartido entre el banco y el cliente
        ECPoint C = modifiedI.multiply(z).add(Q2);

        // Cálculo del número de cuenta del cliente a partir de C
        ECPoint computedI = Q1.multiply(u1).subtract(C);

        // Comprobar que computedI es igual a I
        if (computedI.equals(I)) {
            System.out.println("Transacción verificada");
        } else {
            System.out.println("Transacción no verificada");
        }
    }

    // generar puntos aleatorios dentro del rango especificado
    private static ECPoint generatePoint(SecureRandom random) {
        BigInteger x = new BigInteger(params.getCurve().getFieldSize(), random);
        return params.getG().multiply(x);
    }

    // generar escalares aleatorios dentro del rango especificado
    private static BigInteger generateRandomScalar(SecureRandom random, BigInteger max) {
        BigInteger scalar;
        do {
            scalar = new BigInteger(max.bitLength(), random);
        } while (scalar.compareTo(max) >= 0);
        return scalar;
    }
}
