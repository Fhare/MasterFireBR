// Configurações para se conectar com o firebase

const firebaseConfig = {
  // apiKey: "",
  // authDomain: "",
  // projectId: "",
  // storageBucket: "",
  // messagingSenderId: "",
  // appId: "",
  // measurementId: ""
};

//Inicialização do Firebase

firebase.initializeApp(firebaseConfig);

// Banco de dados do firestore

const database = firebase.firestore();
const button = document.getElementById("button");

// Função que adiciona a classe mostrar
// Para mostrar as mensagens de warning do formulário
// Depois de 3s remove a classe

function addAndRemoveClass(element) {

  element.classList.add("mostrar");

  window.setTimeout(() => {
    element.classList.remove("mostrar");
  }, 3000);

}

button.addEventListener("click", async () => {

  const time = document.getElementById("time").value;
  const email = document.getElementById("email").value;
  const emailValidation = document.getElementById("email");
  const modal = document.getElementById("modalRegister");
  const errorInput = document.getElementById("camposError");
  const errorEmail = document.getElementById("camposErrorEmail");

  // Cheque se o usuário não digitou nada
  // Ou se o usuário digitou o email de forma invalida 

  if(time === "" || email === "") { 
    
    addAndRemoveClass(errorInput);

  } else if (!emailValidation.checkValidity()) {

    addAndRemoveClass(errorEmail);

  } else {
    
    // Async e await para fazer o servidor aguardar a criação do usuário
    // database.collection("times").add({ time, email }) Adiciona um usuário no Firestore
    // O código acima retorna um promise que pode ser resgatada a partir do .then();

    await database.collection("times").add({ time, email })
      .then(() => {
  
        // Faz mostrar o popup com "Cadastro realizado com sucesso"
        modal.classList.add("mostrar");
  
        window.setTimeout(() => { 

          // Faz o usuário ser mandado para a página de times participantes após a realização do cadastro
          window.location.href = "../pages/cadastro.html";
        }, 2000);
  
      })
      .catch(err => {
  
        console.log(err);
  
      });      
   } 
});
