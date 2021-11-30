const firebaseConfig = {
  // apiKey: "",
  // authDomain: "",
  // projectId: "",
  // storageBucket: "",
  // messagingSenderId: "",
  // appId: "",
  // measurementId: ""
};

firebase.initializeApp(firebaseConfig);

const database = firebase.firestore();
const sectionContainerTimesInfo = document.getElementById("sectionContainerTimesInfo");

// database.collection("times").get() Faz a comunicação com o Firestore
// Irá retornar uma promise com todos os dados criados no banco de dados

database.collection("times").get()
  .then(snapshot => {

    // Faz um forEach em snapshot que é a resposta do banco de dados

    snapshot.forEach(doc => {

      // Data() é uma função do Firestore que pega todos os dados vindos de doc
      const data = doc.data();

      // Adiciona um novo usuário na tela
      sectionContainerTimesInfo.innerHTML += 
      `
        <div class="infoTime">
          <div class="square">
            <div class="logo">
              <h1 id="letter">${data.time[0].toUpperCase()}</h1>
            </div>  
          </div>

          <div class="time">
            <h2 class="titleTime"><span class="bg-yellow-wh size-text">Nome do time: </span>${data.time}</h2>
            <p class="emailTime"><span class="bg-yellow-wh">Email de contato: </span>${data.email}</p>
          </div>
      </div>

      `;

  })
});