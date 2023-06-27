const curve = new elliptic.ec('secp256k1');







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
    
    generatedScalaru1=scalar;
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
    const resultInput = document.getElementById('result1');
    resultInput.value = scalar.toString(16);
  }

let generatedScalarI;

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
    const resultInput = document.getElementById('result2');
    resultInput.value = `(${point.getX().toString()}, ${point.getY().toString()})`;
    resultInput.removeAttribute("readonly");
  
  }

  let generatedPointP;


  

  function generateMultiplyI() {
    const p = generatePointP();
    const u1 = generateRandomScalar();
    
    const result = p.mul(u1);
    generatedI=result;
  

    const resultInput = document.getElementById('result3');
    resultInput.value = `(${result.x.toString()}, ${result.y.toString()})`;
    
  }
  

  let generatedI;



  function obtenerFechaHoraActual() {
    var fechaHora = new Date();
    
    var dia = fechaHora.getDate();
    var mes = fechaHora.getMonth() + 1;
    var anio = fechaHora.getFullYear();
    
    var hora = fechaHora.getHours();
    var minutos = fechaHora.getMinutes();
    var segundos = fechaHora.getSeconds();
    
    dia = dia < 10 ? '0' + dia : dia;
    mes = mes < 10 ? '0' + mes : mes;
    hora = hora < 10 ? '0' + hora : hora;
    minutos = minutos < 10 ? '0' + minutos : minutos;
    segundos = segundos < 10 ? '0' + segundos : segundos;
    
    var fechaActual = dia + '/' + mes + '/' + anio;
    var horaActual = hora + ':' + minutos + ':' + segundos;
    
    var result= 'Fecha: ' + fechaActual + '\nHora: ' + horaActual;
    fechahora=result;
    return result
  }
  
  // Obtener el elemento HTML donde se mostrará la fecha y hora
  
  function generatehora() {
    const result = obtenerFechaHoraActual();
    const resultInput = document.getElementById('result4');
    resultInput.value = result;
  }

  let fechahora;



  function hash(input) {
   
    return sha256(input);
  }


function generateH(){
    const h = hash(gA + gB + generatedI + fechahora);
    h0=h;
    return h;

    }
  
    function generateAndDisplayH(){
      const result= generateH();
      const resultInput=document.getElementById('result5');
      resultInput.value=result.toString(16);
    }

    let h0;

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
        const resultInput = document.getElementById('result6');
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
        const resultInput = document.getElementById('result7');
        resultInput.value = `(${point1.getX().toString()}, ${point1.getY().toString()})`;
      }
    
      let generatedPointP1;
    
      function multiplyIu(generatedPointP1, generatedu1) {
        const result = generatedPointP1.mul(generatedu1);
        generatedIu = result;
        return result;
      }
      
      function generateMultiplyIu() {
        const p1 = generatePointP1();
        const u1 = generateRandomScalaru1();
        
        const result = p1.mul(u1);
        generatedIu=result;
      
    
        const resultInput = document.getElementById('result8');
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
        const resultInput = document.getElementById('result9');
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
        const resultInput = document.getElementById('result10');
        resultInput.value = `(${result.x.toString(16)}, ${result.y.toString(16)})`;
      }
    
      let generatedSumaI;
      
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
        const resultInput = document.getElementById('result11');
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
        const resultInput = document.getElementById('result12');
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
        const resultInput = document.getElementById('result13');
        resultInput.value = scalar.toString(16);
      }
    
      let generatedt2;
    
      
      
      function generatedA() {
        const I = sumaI(generatedIu, generatedPointP2);
        const s= generateRandomScalars();
        
        const result = I.mul(s);
        gA=result;
      
    
        const resultInput = document.getElementById('result14');
        resultInput.value = `(${result.x.toString()}, ${result.y.toString()})`;
        
      }
    
      let gA;
    
      
      
      function generatedtp1() {
        const t1 = generateRandomScalart1();
        const P1= generatePointP1() ;
        
        const result = t1.mul(P1);
        generatedtP1=result;
      
    
        const resultInput = document.getElementById('result15');
        resultInput.value = `(${result.x.toString()}, ${result.y.toString()})`;
        
      }
      let generatedtP1;
    
      function generatetp2(generatedt2, generatedPointP2) {
        const result = generatedt2.mul(generatedPointP2);
        generatedtP2=result;
        return result;
      }
      
      function generatedtp2() {
        const t2 = generateRandomScalart2();
        const P2= generatePointP2() ;
        
        const result = t2.mul(P2);
        generatedtP2=result;
      
    
        const resultInput = document.getElementById('result16');
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
        const resultInput = document.getElementById('result17');
        resultInput.value = `(${result.x.toString(16)}, ${result.y.toString(16)})`;
      }
    
      let gB;


      function generatey1() {
        const u1 = generateRandomScalaru1();
        const s= generateRandomScalars();
        const h0=generateH();
        const t1 = generateRandomScalart1();
        
        const result = u1.mul(s).mul(h0).add(t1);
    
        generatedy1 = result;
        
        
        
    
        const resultInput = document.getElementById('result18');
        resultInput.value = result.toString(16);
      }

      let generatedy1;

      function generatey2() {
        
        const s= generateRandomScalars();
        const h0=generateH();
        const t2 = generateRandomScalart2();
        
        const result = s.mul(h0).add(t2);
    
        generatedy2 = result;
        
        
        
    
        const resultInput = document.getElementById('result19');
        resultInput.value = result.toString(16);
      }

      let generatedy2;

      function comparacion(){
        let result;

        const y1=generatey1();
        const P1= generatePointP1();
        const y2=generatey2();
        const P2=generatePointP2();
        const h0=generateH();
        const A= generatedA();
        const B=generatedB();
        const res1=y1.mul(P1);
        const res=y2.mul(P2);
        const final = res1.add(res);
        const final2=h0.mul(A).add(B);
        if (final == final2){
            result = "pago aceptado";
        }else{
            result= "pago no aceptado";
        }

          return result;
      }

      function generateComparacion() {
        const result = comparacion() ;
         document.getElementById('result20').value = result;
        
      }


    
