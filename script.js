let scores = [{
    scoreName: "scoreMain",
    scoreSave:0,
    scoreMultiplier: 1,
}];

const displays = [{
    displayName: "scoreDisplay",
    displayId: document.getElementById("scoreDisplay"),
},
  {
    displayName: "tenguenarioDisplay",
    displayId: document.getElementById("tenguenarioDisplay")
  }];

const btns = [
  {
      btnName: "principalBtn",
      id: document.getElementById("principalBtn")
  }
];

function searchName(lista, nombre) {
  return lista.find(item => 
    item.scoreName === nombre || 
    item.displayName === nombre || 
    item.btnName === nombre
  );
};

const btnPrincipal = searchName(btns, "principalBtn");

btnPrincipal.id.addEventListener("click", () => {
  let score = searchName(scores, "scoreMain");
  let display = searchName(displays, "scoreDisplay");

  score.scoreSave += score.scoreMultiplier;
  display.displayId.textContent = score.scoreSave;
});
