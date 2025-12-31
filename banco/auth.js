async function hashSenha(senha){
  const enc=new TextEncoder().encode(senha);
  const hash=await crypto.subtle.digest("SHA-256",enc);
  return Array.from(new Uint8Array(hash))
    .map(b=>b.toString(16).padStart(2,"0")).join("");
}


async function loginSeguro(e){
  e.preventDefault();

  const u = email.value;
  const p = senha.value;

  const hash = await hashSenha(p);
  const salvo = localStorage.getItem(u);

  if(hash === salvo){
    sessionStorage.setItem("logado","true");
    sessionStorage.setItem("usuario",u);
    location.href="tela_principal.html";
  }else{
    alert("Usuário ou senha inválidos");
  }
}


async function registrar(e){
  e.preventDefault();

  const u = user.value;
  const p = pass.value;

  if(forcaSenha(p) === "fraca"){
    alert("Senha fraca!");
    return;
  }

  const hash = await hashSenha(p);
  localStorage.setItem(u,hash);
  location.href="index.html";
}


function verificarForcaSenha(s){
  const barra=document.getElementById("barra-forca");
  const texto=document.getElementById("texto-forca");
  const f=forcaSenha(s);

  barra.parentElement.className="forca "+f;
  texto.innerText=f.toUpperCase();
}

function forcaSenha(s){
  let f=0;
  if(s.length>=8)f++;
  if(/[A-Z]/.test(s))f++;
  if(/\d/.test(s))f++;
  if(/[^A-Za-z0-9]/.test(s))f++;

  if(f<=1)return"fraca";
  if(f<=3)return"media";
  return"forte";
}


document.getElementById("fotoPerfil").src =
  localStorage.getItem("fotoPerfil") ||
  "https://via.placeholder.com/100";
