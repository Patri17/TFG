


// Crear una instancia de la curva elíptica secp256k1

const curve = new elliptic.ec('secp256k1');



function generatePointP() {
  const max = curve.n.subn(2);
  const randBytes = new Uint8Array(32);
  window.crypto.getRandomValues(randBytes);
  const randHex = Array.from(randBytes).map(byte => byte.toString(16).padStart(2, '0')).join('');
  const rand = new BN(randHex, 'hex');
  const x = rand.mod(max).addn(1);
  const point = curve.g.mul(x);

  generatedPointP=point;
  return point;
}

function generateAndDisplayPointP() {
  const point = generatePointP();
  const resultInput = document.getElementById('result');
  resultInput.value = `(${point.getX().toString()}, ${point.getY().toString()})`;
  resultInput.removeAttribute("readonly");

}


function borrarNumero() {
  var inputElement = document.getElementById("result");
  inputElement.value="";
  inputElement.setAttribute("readonly", "true");
}

function generatePointP1() {
  const max = curve.n.subn(2);
  const randBytes = new Uint8Array(32);
  window.crypto.getRandomValues(randBytes);
  const randHex = Array.from(randBytes).map(byte => byte.toString(16).padStart(2, '0')).join('');
  const rand = new BN(randHex, 'hex');
  const x = rand.mod(max).addn(1);
  const point1 = curve.g.mul(x);

  
  generatedPointP1= point1;

  return point1;
}

function generateAndDisplayPointP1() {
  const point1 = generatePointP1();
  const resultInput = document.getElementById('result1');
  resultInput.value = `(${point1.getX().toString()}, ${point1.getY().toString()})`;
}

function generatePointP2() {
  const max = curve.n.subn(2);
  const randBytes = new Uint8Array(32);
  window.crypto.getRandomValues(randBytes);
  const randHex = Array.from(randBytes).map(byte => byte.toString(16).padStart(2, '0')).join('');
  const rand = new BN(randHex, 'hex');
  const x = rand.mod(max).addn(1);
  const point2 = curve.g.mul(x);

  generatedPointP2=point2;
  return point2;
}

function generateAndDisplayPointP2() {
  const point2 = generatePointP2();
  const resultInput = document.getElementById('result2');
  resultInput.value = `(${point2.getX().toString()}, ${point2.getY().toString()})`;
}


function generateRandomScalar() {
  const max = new BN('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141', 16);
  const scalar = getRandomScalar(max);
  return scalar;
}

function getRandomScalar(max) {
  let scalar;
  do {
    scalar = new BN(getRandomBytes(Math.ceil(max.byteLength())));
    //scalar = new BN(getRandomBytes(Math.ceil(max.bitLength() / 8)));
  } while (scalar.cmp(max) >= 0);
  
  generatedScalar=scalar;
  return scalar;
}

function getRandomBytes(length) {
  const bytes = new Uint8Array(length);
  if (window.crypto && window.crypto.getRandomValues) {
    window.crypto.getRandomValues(bytes);
  } else if (window.msCrypto && window.msCrypto.getRandomValues) {
    window.msCrypto.getRandomValues(bytes);
  } else {
    throw new Error('No secure random number generator available.');
  }
  return bytes;
}

function generateAndDisplayScalar() {
  const scalar = generateRandomScalar();
  const resultInput = document.getElementById('result3');
  resultInput.value = scalar.toString(16);
}

let generatedPointP;
let generatedPointP1;
let generatedPointP2;
let generatedScalar;


function multiplyPoint(generatedPointP, generatedScalar) {
  const result = generatedPointP.mul(generatedScalar);
  generatedPointQ=result;
  return result;
}

function generateMultiply() {
  const result = multiplyPoint(generatedPointP, generatedScalar);
  const resultInput = document.getElementById('result4');
  resultInput.value = `(${result.x.toString(16)}, ${result.y.toString(16)})`;
}

function multiplyPoint1(generatedPointP1, generatedScalar) {
  const result = generatedPointP1.mul(generatedScalar);
  generatedPointQ1=result;
  return result;
}

function generateMultiply1() {
  const result = multiplyPoint1(generatedPointP1, generatedScalar);
  const resultInput = document.getElementById('result5');
  resultInput.value = `(${result.x.toString(16)}, ${result.y.toString(16)})`;
}

function multiplyPoint2(generatedPointP2, generatedScalar) {
  
  const result = generatedPointP2.mul(generatedScalar);
  generatedPointQ2=result;
  return result;
}

function generateMultiply2() {
  const result = multiplyPoint2(generatedPointP2, generatedScalar);
  const resultInput = document.getElementById('result6');
  resultInput.value = `(${result.x.toString(16)}, ${result.y.toString(16)})`;
}


function generateRandomScalar2() {
  const max = new BN('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141', 16);
  const scalar2 = getRandomScalar2(max);

  return scalar2;
}

function getRandomScalar2(max) {
  let scalar2;
  do {
    scalar2 = new BN(getRandomBytes(Math.ceil(max.byteLength())));
    //scalar2 = new BN(getRandomBytes(Math.ceil(max.bitLength() / 8)));
  } while (scalar2.cmp(max) >= 0);

  generatedScalar2=scalar2;
  return scalar2;
}

function generateAndDisplayScalar2() {
  const scalar2 = generateRandomScalar2();
  const resultInput = document.getElementById('result7');
  resultInput.value = scalar2.toString(16);
}

let generatedScalar2;
let generatedPointQ;
let generatedPointQ1;
let generatedPointQ2;


function multiplyIu(generatedPointP1, generatedScalar2) {
  const result = generatedPointP1.mul(generatedScalar2);
  generatedIu = result;
  return result;
}

function generateMultiplyIu() {
  const result = multiplyIu(generatedPointP1, generatedScalar2);
  const resultInput = document.getElementById('result8');
  resultInput.value = `(${result.x.toString(16)}, ${result.y.toString(16)})`;
}

let generatedIu;

function sumaI(generatedIu, generatedPointP2) {
  
  const result = generatedIu.add(generatedPointP2);
  
  generatedSumaI=result;
  return result;
}

function generateSumaI() {
  const result = sumaI(generatedIu, generatedPointP2);
  const resultInput = document.getElementById('result9');
  resultInput.value = `(${result.x.toString(16)}, ${result.y.toString(16)})`;
}


let generatedSumaI;

function multiplyIz(generatedScalar, generatedSumaI) {
  
  
  const result = generatedScalar.mul(generatedSumaI);
  
  generatedIz = result;
  return result;
}

function generateMultiplyIz() {
  const result = multiplyIz(generatedScalar, generatedSumaI);
  const resultInput = document.getElementById('result10');
  resultInput.value = `(${result.x.toString(16)}, ${result.y.toString(16)})`;
}

let generatedIz;


function sumauQ(generatedScalar2, generatedPointQ1, generatedPointQ2) {
  const mult = generatedScalar2.mul(generatedPointQ1);
  const result1 = mult.add(generatedPointQ2);
  
  generateduQ = result1;
  return result1;
}

function generateSumauQ() {
  const result = sumauQ(generatedScalar2, generatedPointQ1, generatedPointQ2);
  const resultInput = document.getElementById('result11');
  resultInput.value = `(${result.x.toString(16)}, ${result.y.toString(16)})`;
}

let generateduQ;


function comparacion(generatedIz, generateduQ) {
  let result;

  if (generatedIz==generateduQ){
    result= "Transaccion verificada";
  } else {
    result = "Transaccion no verificada";
  }

  return result;
}

function generateComparacion() {
  const result = comparacion(generatedIz, generateduQ);
   document.getElementById('result12').value = result;
  
}





