const curve = new elliptic.ec('secp256k1');

function hash(input) {
   
    return sha256(input);
  }
  

function generateA() {
    const max = curve.n.subn(2);
    const randBytes = new Uint8Array(32);
    window.crypto.getRandomValues(randBytes);
    const randHex = Array.from(randBytes).map(byte => byte.toString(16).padStart(2, '0')).join('');
    const rand = new BN(randHex, 'hex');
    const x = rand.mod(max).addn(1);
    const point = curve.g.mul(x);
  
    generatedA=point;
    return point;
  }
  
  function generateAndDisplayA() {
    const point = generateA();
    const resultInput = document.getElementById('result');
    resultInput.value = `(${point.getX().toString()}, ${point.getY().toString()})`;
    
  
  }
  let generatedA;
  

  function generateB() {
    const max = curve.n.subn(2);
    const randBytes = new Uint8Array(32);
    window.crypto.getRandomValues(randBytes);
    const randHex = Array.from(randBytes).map(byte => byte.toString(16).padStart(2, '0')).join('');
    const rand = new BN(randHex, 'hex');
    const x = rand.mod(max).addn(1);
    const point = curve.g.mul(x);
  
    generatedB=point;
    return point;
  }
  
  function generateAndDisplayB() {
    const point = generateB();
    const resultInput = document.getElementById('result1');
    resultInput.value = `(${point.getX().toString()}, ${point.getY().toString()})`;
    
  
  }

  let generatedB;


  function generateC() {
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
    
    generatedC=scalar;
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
  
  function generateAndDisplayC() {
    const scalar = generateC();
    const resultInput = document.getElementById('result2');
    resultInput.value = scalar.toString(16);
  }

  let generatedC;


  function generateR() {
    const max = curve.n.subn(2);
    const randBytes = new Uint8Array(32);
    window.crypto.getRandomValues(randBytes);
    const randHex = Array.from(randBytes).map(byte => byte.toString(16).padStart(2, '0')).join('');
    const rand = new BN(randHex, 'hex');
    const x = rand.mod(max).addn(1);
    const point = curve.g.mul(x);
  
    generatedR=point;
    return point;
  }
  
  function generateAndDisplayR() {
    const point = generateR();
    const resultInput = document.getElementById('result3');
    resultInput.value = `(${point.getX().toString()}, ${point.getY().toString()})`;
    
  
  }
  let generatedR;

  function generateS() {
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
    
    generatedS=scalar;
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
  
  function generateAndDisplayS() {
    const scalar = generateS();
    const resultInput = document.getElementById('result4');
    resultInput.value = scalar.toString(16);
  }

  let generatedS;


  function generatey() {
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
    
    generatedy=scalar;
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
  
  function generateAndDisplayy() {
    const scalar = generatey();
    const resultInput = document.getElementById('result5');
    resultInput.value = scalar.toString(16);
  }



  function generateH(){
  const h = hash(generatedA.toString() + generatedB.toString() + generatedC + generatedR + generatedS);
  return h;
  }

  function generateAndDisplayH(){
    const result= generateH();
    const resultInput=document.getElementById('result6');
    resultInput.value=result.toString(16);
  }

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
    const resultInput = document.getElementById('result7');
    resultInput.value = `(${point.getX().toString()}, ${point.getY().toString()})`;
    
  
  }

  


  function generateQ(generatedPointP, generatedScalar) {
    const result = generatedPointP.mul(generatedScalar);
    generatedPointQ=result;
    return result;
  }
  
  function generateMultiply() {
    const result = generateQ(generatedPointP, generatedScalar);
    const resultInput = document.getElementById('result8');
    resultInput.value = `(${result.x.toString(16)}, ${result.y.toString(16)})`;
  }
 let generatedPointQ;

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
    const resultInput = document.getElementById('result9');
    resultInput.value = scalar.toString(16);
  }

  let generatedScalar;

  let generatedy;
  let generatedPointP;

  function generateyP() {
    const pointP = generatePointP();
    const scalar = generatey();
    const result = pointP.mul(scalar);

    generatedyP = result;
    

    const resultInput = document.getElementById('result10');
    resultInput.value = `(${result.x.toString()}, ${result.y.toString()})`;
  }

  let generatedyP;


  

  function generatehq() {
    const hh = generateH();
    const pointQ = generateQ(generatedPointP, generatedScalar);
    const r= generateR();
    const result = pointQ.mul(hh).add(r);

  

    const resultInput = document.getElementById('result11');
    resultInput.value = `(${result.x.toString()}, ${result.y.toString()})`;
  }
let hh;
 


  function generateyA() {
    const A = generateA();
    const scalar = generatey();
    const result = A.mul(scalar);

    generatedyA = result;
    

    const resultInput = document.getElementById('result13');
    resultInput.value = `(${result.x.toString()}, ${result.y.toString()})`;
  }

  let generatedyA;

  function generatehc() {
    const hh = generateH();
    const C = generateC();
    const s= generateS();
    
    const result = C.mul(hh).add(s);

  

    const resultInput = document.getElementById('result14');
    resultInput.value = result.toString();

    
  }



  function comparacion(generatedyP, generatehc, generatedyA, generatehq) {
    let result;
  
    if (generatedyP==generatehq && generatedyA == generatehc){
      result= "Se ha firmado correctamente";
    } else {
      result = "No se ha firmado";
    }
  
    return result;
  }

  
  
  function generateComparacion() {
    const result = comparacion(generatedyP, generatehc, generatedyA, generatehq) ;
     document.getElementById('result16').value = result;
    
  }