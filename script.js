const tbody = document.getElementById("tbody");

const btnAjouter = document.getElementById("ajouter");
const form = document.getElementById("form");
const message = document.getElementById("message");

const deginMessage = document.querySelector(".msg");
const precedent = document.getElementById("precedent");
const next = document.getElementById("next");

let cuurPage = 1;
const items = 5;

let tableStock = [];



form.addEventListener("submit", (e) => {
  e.preventDefault();


    let Inputs = document.querySelectorAll("input");
    let textEr = document.querySelector("textarea");

    let array = Array.from(Inputs);
    array.push(textEr);

  const nom = document.getElementById("nom").value;
  const prenom = document.getElementById("prn").value;
  const phone = document.getElementById("tl").value;
  const mail = document.getElementById("mail").value;
  const motif = document.getElementById("motif").value;
  const dt = document.getElementById("dt").value;

  if (
    nom == " " ||
    prenom == "" ||
    phone == "" ||
    mail == "" ||
    motif == "" ||
    dt == ""
  ) {
    message.innerHTML =
      '<i id="icons-done" class="ri-emotion-unhappy-line"></i><span>remplir tout les champs !</span>';
    deginMessage.style.backgroundColor = "#ffcccc";

    setTimeout(() => {
      message.innerHTML = "";
      deginMessage.style.backgroundColor = "#286e65";
    }, 1000);


    // hadi validation
    for (let i = 0; i < array.length; i++) {
      if (array[i].value === "") {
        array[i].classList.add("validation");
      } else {
        array[i].classList.remove("validation");
     
      }
    }


    return;
  } else {
    tableStock.push({ nom, prenom, phone, mail, motif, dt });
    console.log(tableStock);
    updateTable();
    message.innerHTML =
      '<i  id="icons-done" class="ri-emotion-line"></i><span>demande ajouter avec succes !</span>';

    deginMessage.style.backgroundColor = "#286e65";
    form.reset();

    //  drtha 7it mni matalan kankhali chi champs khawi mn b3d 3amrt dak champs mni kandir ajouter kayb9a border dyal dak champs border dyalo b red donc khassni mayb9ach b red yrja3 kif kan dak inputs liba9in fihom 
    for (let i = 0; i < array.length; i++) {
    
        array[i].classList.remove("validation");
  
    }
  }


  setTimeout(() => {
    message.innerHTML = "";
  }, 1000);



});
  // hadi pagination btn 
precedent.addEventListener("click", () => {
  if (cuurPage > 1) {
    cuurPage--;
    console.log(cuurPage);
    updateTable();
  }
});
next.addEventListener("click", () => {
  if (cuurPage * items < tableStock.length) {
    cuurPage++;
    updateTable();
    console.log(cuurPage);
  }
});

updateTable();
function updateTable() {
  const strtIndex = (cuurPage - 1) * items;
  const endIndex = strtIndex + items;

  const demandePage = tableStock.slice(strtIndex, endIndex);
  tbody.innerHTML = "";
  demandePage.forEach((ele, i) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
    <td>${ele.nom}</td>
    <td>${ele.prenom}</td>
    <td>${ele.phone}</td>
    <td>${ele.mail}</td>
    <td>${ele.motif}</td>
    <td>${ele.dt}</td>
    <td>
  
    <img onclick="supprimer(${i})" id="delete-img" src="./Images/delete-removebg-preview.png">
    
    </td>

    `;
    tbody.appendChild(tr);
  });
  
}
function supprimer(i) {
  tableStock.splice(i, 1);
  
  updateTable();
}
