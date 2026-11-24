let puntaje = {
    puntajeMain: 0,
    multiplier: 1,
    display: document.getElementById("scoreDisplay"),
    add(quantity) {
        this.puntajeMain += quantity;
        this.display.textContent = this.puntajeMain;
      }
  };

const btns = [
  {
      btnName: "principalBtn",
      id: document.getElementById("principalBtn")
  }
]

btns.forEach(boton => {
    if (boton.id){
        boton.id.addEventListener("click", ()=> {
            puntaje.add(puntaje.multiplier)
          })
      }
  });

