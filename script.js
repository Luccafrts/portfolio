// ================================== TEXTO ANDANDO ==================================
function createMarqueeInstance(wrap, track) {
  const originals = Array.from(track.children).map(el => el.cloneNode(true));

  let speed = 120;
  let totalWidth = 0;
  let lastTime = null;
  let x = 0;

  function setupTrack() {
    track.innerHTML = '';
    originals.forEach(clone => {
      track.appendChild(clone.cloneNode(true));
    });

    totalWidth = track.scrollWidth;

    while (track.scrollWidth < wrap.clientWidth + totalWidth) {
      originals.forEach(c => track.appendChild(c.cloneNode(true)));
    }

    track.style.transform = `translateX(${-totalWidth}px)`;
  }

  function step(ts) {
    if (lastTime === null) lastTime = ts;
    const dt = (ts - lastTime) / 1000;
    lastTime = ts;

    x += speed * dt;

    if (x >= totalWidth) {
      x -= totalWidth;
    }

    track.style.transform = `translateX(${-totalWidth + x}px)`;
  }

  return {
    wrap,
    track,
    originals,
    speed,
    totalWidth,
    x,
    lastTime,
    setupTrack,
    step
  };
}

const marqueeInstances = [];

function globalStep(ts) {
  marqueeInstances.forEach(instance => {
    instance.step(ts);
  });
  requestAnimationFrame(globalStep);
}

function initMarquees() {
  marqueeInstances.length = 0;

  const wraps = document.querySelectorAll('.marquee-wrap');
  wraps.forEach(wrap => {
    const track = wrap.querySelector('.track');
    if (track && track.children.length > 0) {
      const instance = createMarqueeInstance(wrap, track);
      instance.setupTrack();
      marqueeInstances.push(instance);
    }
  });

  if (marqueeInstances.length > 0) {
    requestAnimationFrame(globalStep);
  }
}

window.addEventListener('resize', () => {
  marqueeInstances.forEach(instance => {
    instance.lastTime = null;
    instance.x = 0;
    instance.setupTrack();
  });
});

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMarquees);
} else {
  initMarquees();
}


// ================================== EFEITO DE DIGITAÇÃO ==================================
document.addEventListener("DOMContentLoaded", () => {
  const textocima = document.getElementById("textocima");
  const textobaixo = document.getElementById("textobaixo");

  if (!textocima || !textobaixo) return;

  const frases = [
    "OLA! EU SOU O",
    "HELLO! I'M ",
    "こんにちは、私です",
    "CIAO! SONO IL",
  ];

  let idxFrase = 0;
  let idxChar = 0;
  let apagando = false;

  const velTyping = 90;
  const velDeleting = 50;
  const pauseAfterTyping = 1800;
  const pauseAfterDeleting = 400;

  function atualizar(texto) {
    const safeText = texto === "" ? "\u00A0" : texto;
    textocima.textContent = safeText;
    textobaixo.textContent = safeText;
  }

  function loopTyping() {
    const fraseAtual = frases[idxFrase];

    if (!apagando) {
      idxChar++;
      atualizar(fraseAtual.slice(0, idxChar));

      if (idxChar === fraseAtual.length) {
        apagando = true;
        setTimeout(loopTyping, pauseAfterTyping);
        return;
      }
      setTimeout(loopTyping, velTyping);
    } else {
      idxChar--;
      atualizar(fraseAtual.slice(0, idxChar));

      if (idxChar === 0) {
        apagando = false;
        idxFrase = (idxFrase + 1) % frases.length;
        setTimeout(loopTyping, pauseAfterDeleting);
        return;
      }
      setTimeout(loopTyping, velDeleting);
    }
  }

  atualizar("\u00A0");
  setTimeout(loopTyping, 500);
});

// ================================== DARK MODE ==================================

const toggle = document.querySelector('.input');
toggle.addEventListener('change', () => {
  document.body.classList.toggle('dark-mode');
});

// ================================== MENU HAMBÚRGUER ==================================
document.addEventListener('DOMContentLoaded', function() {
    // Criar elementos do menu mobile
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<span></span><span></span>';
    
    const sidebar = document.createElement('div');
    sidebar.className = 'sidebar';
    
    const sidebarLinks = document.createElement('div');
    sidebarLinks.className = 'sidebar-links';
    sidebarLinks.innerHTML = `
        <a href="#softskills" class="button">HABILIDADES</a>
        <a href="#track2" class="button">SOBRE MIM</a>
        <a href="#projetos" class="button">PROJETOS</a>
        <a href="#contato" class="button">CONTATO</a>
    `;
    
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    
    // Adicionar elementos ao DOM
    sidebar.appendChild(sidebarLinks);
    document.body.appendChild(sidebar);
    document.body.appendChild(overlay);
    
    const header = document.querySelector('#header');
    header.insertBefore(menuToggle, header.firstChild);
    
    // Toggle do menu
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
    });
    
    // Fechar menu ao clicar no overlay
    overlay.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Fechar menu ao clicar em um link
    const sidebarLinksElements = sidebarLinks.querySelectorAll('.button');
    sidebarLinksElements.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
});



