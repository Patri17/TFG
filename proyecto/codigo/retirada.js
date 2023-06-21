const curve = new elliptic.ec('secp256k1');

function hash(input) {
   
  return sha256(input);
}

function generateRandomScalarw() {
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
    
    generatedw=scalar;
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
  
  function generateAndDisplayw() {
    const scalar = generateRandomScalarw();
    const resultInput = document.getElementById('result');
    resultInput.value = scalar.toString(16);
  }

  let generatedw;

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
    const resultInput = document.getElementById('result1');
    resultInput.value = `(${point.getX().toString()}, ${point.getY().toString()})`;
    
  
  }

  let generatedPointP;

  function generatedR() {
    const p = generatePointP();
    const w = generateRandomScalarw();
    
    const result = p.mul(w);
    gR=result;
  

    const resultInput = document.getElementById('result2');
    resultInput.value = `(${result.x.toString()}, ${result.y.toString()})`;
    
  }

  let gR;


  function generateRandomScalaru1() {
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
    
    generatedu1=scalar;
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
  
  function generateAndDisplayScalaru1() {
    const scalar = generateRandomScalaru1();
    const resultInput = document.getElementById('result3');
    resultInput.value = scalar.toString(16);
  }

  let generatedu1;

  function generatePointP1() {
    const max = curve.n.subn(2);
    const randBytes = new Uint8Array(32);
    window.crypto.getRandomValues(randBytes);
    const randHex = Array.from(randBytes).map(byte => byte.toString(16).padStart(2, '0')).join('');
    const rand = new BN(randHex, 'hex');
    const x = rand.mod(max).addn(1);
    const point1 = curve.g.mul(x);
  
    generatedPointP1=point1;
    return point1;
  }
  
  function generateAndDisplayPointP1() {
    const point1 = generatePointP1();
    const resultInput = document.getElementById('result4');
    resultInput.value = `(${point1.getX().toString()}, ${point1.getY().toString()})`;
  }

  let generatedPointP1;

  function generateMultiplyIu() {
    const p1 = generatePointP1();
    const u1 = generateRandomScalaru1();
    
    const result = p1.mul(u1);
    generatedIu=result;
  

    const resultInput = document.getElementById('result5');
    resultInput.value = `(${result.x.toString()}, ${result.y.toString()})`;
    
  }

  let generatedIu;

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
    const resultInput = document.getElementById('result6');
    resultInput.value = `(${point2.getX().toString()}, ${point2.getY().toString()})`;
  }

  let generatedPointP2;

  function sumaI(generatedIu, generatedPointP2) {
  
    const result = generatedIu.add(generatedPointP2);
    
    generatedSumaI=result;
    return result;
  }
  
  function generateSumaI() {
    const result = sumaI(generatedIu, generatedPointP2);
    const resultInput = document.getElementById('result7');
    resultInput.value = `(${result.x.toString(16)}, ${result.y.toString(16)})`;
  }

  let generatedSumaI;


 


  function generatedS() {
    const I = sumaI(generatedIu, generatedPointP2);
    const w = generateRandomScalarw();
    
    const result = I.mul(w);
    gS=result;
  

    const resultInput = document.getElementById('result8');
    resultInput.value = `(${result.x.toString()}, ${result.y.toString()})`;
    
  }
  
  let gS;

  function generateRandomScalars() {
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
    
    generateds=scalar;
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
  
  function generateAndDisplays() {
    const scalar = generateRandomScalars();
    const resultInput = document.getElementById('result9');
    resultInput.value = scalar.toString(16);
  }

  let generateds;

  function generateRandomScalart1() {
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
    
    generatedt1=scalar;
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
  
  function generateAndDisplayt1() {
    const scalar = generateRandomScalart1();
    const resultInput = document.getElementById('result10');
    resultInput.value = scalar.toString(16);
  }

  let generatedt1;

  function generateRandomScalart2() {
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
    
    generatedt2=scalar;
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
  
  function generateAndDisplayt2() {
    const scalar = generateRandomScalart2();
    const resultInput = document.getElementById('result11');
    resultInput.value = scalar.toString(16);
  }

  let generatedt2;



  function generatedA() {
    const s = generateRandomScalars();
    const I = sumaI(generatedIu, generatedPointP2);
    
    const result = I.mul(s);
    gA=result;
  

    const resultInput = document.getElementById('result12');
    resultInput.value = `(${result.x.toString()}, ${result.y.toString()})`;
    
  }

  let gA;

 
  


  function generatedtp1() {
    const t1 = generateRandomScalart1();
    const P1 = generatePointP1();
    
    const result = t1.mul(P1);
    generatedtP1=result;
  

    const resultInput = document.getElementById('result12');
    resultInput.value = `(${result.x.toString()}, ${result.y.toString()})`;
    
  }


  let generatedtP1;

  
  
  function generatedtp2() {
    const t2 = generateRandomScalart2();
    const P2 = generatePointP2();
    
    const result = t2.mul(P2);
    generatedtP2=result;
  

    const resultInput = document.getElementById('result12');
    resultInput.value = `(${result.x.toString()}, ${result.y.toString()})`;
    
  }

  let generatedtP2;

  function generateB(generatedtP1, generatedtP2) {
  
    const result = generatedtP1.add(generatedtP2);
    
    gB=result;
    return result;
  }
  
  function generatedB() {
    const result = generateB(generatedtP1, generatedtP2);
    const resultInput = document.getElementById('result15');
    resultInput.value = `(${result.x.toString(16)}, ${result.y.toString(16)})`;
  }

  let gB;

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
    
    gC=scalar;
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
    const resultInput = document.getElementById('result16');
    resultInput.value = scalar.toString(16);
  }

  let gC;

  function generateH(){
    const h = hash(gA + gB + gC + gR+ gS);
    return h;
    }
  
    function generateAndDisplayH(){
      const result= generateH();
      const resultInput=document.getElementById('result17');
      resultInput.value=result.toString(16);
    }


    function generateRandomScalarz() {
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
      
      generatedz=scalar;
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
    
    function generateAndDisplayz() {
      const scalar = generateRandomScalarz();
      const resultInput = document.getElementById('result18');
      resultInput.value = scalar.toString(16);
    }
  
    let generatedz;

    function generatehz() {
      const h = generateH();
      const z = generateRandomScalarz();
      const w= generateRandomScalarw();
      
      const result = z.mul(h).add(w);
      
      generatedhzw=result;
    
  
      const resultInput = document.getElementById('result19');
      resultInput.value = result.toString(16);
    }

    
  
  let generatedhzw;
  

    function generateRandomScalaru() {
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
      
      generatedu=scalar;
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
    
    function generateAndDisplayu() {
      const scalar = generateRandomScalaru();
      const resultInput = document.getElementById('result21');
      resultInput.value = scalar.toString(16);
    }
  
    let generatedu;

    function generateRandomScalarv() {
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
      
      generatedv=scalar;
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
    
    function generateAndDisplayv() {
      const scalar = generateRandomScalarv();
      const resultInput = document.getElementById('result22');
      resultInput.value = scalar.toString(16);
    }
  
    let generatedv;

    function generateC2() {
      const s = generateRandomScalars();
      const C = generateC();
      
      const result = s.mul(C);
  
      C2=result;
  
      const resultInput = document.getElementById('result23');
      resultInput.value = result.toString(16);
    }

    let C2;

    function generateR2() {
      const u = generateRandomScalaru();
      const R = generatedR();
      const v = generateRandomScalarv();
      const P = generatePointP();

      
      const result = u.mul(R);
      const result2= v.mul(P);
      const final= result.add(result2);
      
      R2=final;
    
  
      const resultInput = document.getElementById('result24');
      resultInput.value = `(${final.x.toString()}, ${final.y.toString()})`;
    }

    let R2;

    function generateS2() {
      const s = generateRandomScalars();
      const S = generatedS();
      const u = generateRandomScalaru();
      const v = generateRandomScalarv();
      const A = generatedA();

      
      const result = s.mul(u).mul(S);
      const result2= v.mul(A);
      const final= result.add(result2);
      
      S2=final;
    
  
      const resultInput = document.getElementById('result25');
      resultInput.value = `(${final.x.toString()}, ${final.y.toString()})`;
    }

    let S2;

    function generater() {
      const h = generateH();
      const u = generateAndDisplayu();
      
      

      
      const result = 1/u;
      const final= result.mul(h);
      
      
      //r=final;
    
  
      const resultInput = document.getElementById('result26');
      resultInput.value = `(${final.x.toString(16)}, ${final.y.toString(16)})`;
    }

    let r;

    function generatey() {
      const r = generater();
      const z = generateRandomScalarz();
      const w = generateRandomScalarw()
      
      const resul = r.mul(z);
      const final = resul.add(w);
  
      y=final;
  
      const resultInput = document.getElementById('result27');
      resultInput.value = final.toString(16);
    }

    let y;
    function generateyP() {
      const y = generatey();
      const P= generatePointP();
      
      const result = y.mul(P);
      
      yP=result;
  
    
  
      const resultInput = document.getElementById('result28');
      resultInput.value = result.toString(16);
    }

    let yP;

    function generateQ(generatedPointP, generatedz) {
      const result = generatedPointP.mul(generatedz);
      Q=result;
      return result;
    }
    
    function generatedQ() {
      const result = generateQ(generatedPointP, generatedz);
      const resultInput = document.getElementById('result29');
      resultInput.value = `(${result.x.toString(16)}, ${result.y.toString(16)})`;
    }

    function generaterQR() {
      const r = generater();
      const Q= generateQ();
      const R= generateR(generatedPointP, generatedw);
      
      const result = r.mul(Q);
      const final = result.add(R);
      
      rQR=final;
  
    
  
      const resultInput = document.getElementById('result30');
      resultInput.value = final.toString(16);
    }

    let rQR;

    function generateyI() {
      const y = generatey();
      const I= sumaI(generatedIu, generatedPointP2);
      
      const result = y.mul(I);
      
      yI=result;
  
    
  
      const resultInput = document.getElementById('result31');
      resultInput.value = result.toString(16);
    }

    let yI;

    function generaterCS() {
      const r = generater();
      const C= generateC();
      const S= generateS(generatedSumaI, generatedw);
      
      const result = r.mul(C);
      const final = result.add(S);
      
      rCS=final;
  
    
  
      const resultInput = document.getElementById('result32');
      resultInput.value = final.toString(16);
    }

    let rCS;

    function comparacion( yP, rQR, yI, rCS) {
      let result;
    
      if (yP==rQR && yI == rCS){
        result= "Se ha firmado correctamente";
      } else {
        result = "No se ha firmado, hay que calcular y' para tener una moneda en el par(A, B)";
      }
    
      return result;
    }
  
    
    
    function generateComparacion() {
      const result = comparacion(yP, rQR, yI, rCS) ;
       document.getElementById('result33').value = result;
      
    }

    function generatey2() {
      const u = generateRandomScalaru();
      const y= generatey();
      const v= generateRandomScalarv();
      
      const result = u.mul(y);
      const final = result.add(v);
      
      y2=final;
  
    
  
      const resultInput = document.getElementById('result34');
      resultInput.value = final.toString(16);
    }


  
  
  

