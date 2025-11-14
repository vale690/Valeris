/* script.js
 - Filtrado de tarjetas
 - Animación de gradiente de la ola (cambia colores)
 - Generación de burbujas detrás del contenido
 - Mantener todo funcional sin depender de librerías externas
*/

document.addEventListener('DOMContentLoaded', ()=>{

  /* -------- FILTRADO -------- */
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.video-card');

  buttons.forEach(btn => {
    btn.addEventListener('click', ()=> {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      cards.forEach(card => {
        if (f === 'all') card.style.display = '';
        else card.style.display = (card.dataset.filter === f) ? '' : 'none';
      });
    });
  });

  /* -------- CAMBIO DE PALETA EN LA OLA (gradiente) -------- */
  const root = document.documentElement;
  const palettes = [
    ['#ff6b6b','#6b8cff','#8affc1'],
    ['#ffd86b','#ff8aa1','#6bc1ff'],
    ['#9b6bff','#6bffd0','#ff6bdb']
  ];
  let pi = 0;
  setInterval(()=>{
    pi = (pi + 1) % palettes.length;
    const [a,b,c] = palettes[pi];
    root.style.setProperty('--c1', a);
    root.style.setProperty('--c2', b);
    root.style.setProperty('--c3', c);
  }, 3000);

  /* -------- ANIMACIÓN SUTIL DE LA OLA (modifica 'd' del path) -------- */
  const path = document.getElementById('mel-path');
  let t = 0;
  function animateWave(){
    const amp = 18;
    const off = Math.sin(t * 0.5) * amp;
    const off2 = Math.cos(t * 0.6) * (amp * 0.6);
    const d = M0 100 C150 ${20 + off}, 350 ${180 + off2}, 500 100 C650 ${20 - off2}, 800 ${180 - off}, 1000 100 L1000 200 L0 200 Z;
    if (path) path.setAttribute('d', d);
    t += 0.02;
    requestAnimationFrame(animateWave);
  }
  animateWave();

  /* -------- BURBUJAS (generar dinámicamente) -------- */
  const bubblesContainer = document.getElementById('bubbles');
  function createBubble(i){
    const b = document.createElement('div');
    b.className = 'bubble';
    // tamaño aleatorio
    const size = (Math.random() * 80) + 20; // 20 - 100px
    b.style.width = ${size}px;
    b.style.height = ${size}px;
    // posicion horizontal aleatoria
    const left = Math.random() * 100; // %
    b.style.left = ${left}%;
    // variable para duración aleatoria (usada en CSS via var)
    const r = Math.random().toFixed(2);
    b.style.setProperty('--r', r);
    // retraso para que no salgan todas igual
    b.style.animationDelay = ${-(Math.random()*6)}s;
    // opacidad y escala aleatoria
    b.style.opacity = ${0.06 + Math.random()*0.14};
    bubblesContainer.appendChild(b);

    // remover y regenerar cuando termine (para ciclos largos)
    setTimeout(()=>{
      b.remove();
      createBubble(); // crear nueva
    }, 14000 + Math.random()*8000);
  }

  // crear bunch de burbujas iniciales
  for (let i=0;i<18;i++){ createBubble(i); }

  /* -------- Nota sobre reproducir (Play/Reproducir) --------
     Si quieres añadir botones Play junto a cada tarjeta, podemos agregar botones con
     texto "Play" o "Reproducir" y el icono ▶. Dime si los quieres y los agrego.
  */
});
