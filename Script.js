(function(){

  // ================================
  // CONFIG
  // ================================
  const BIRTHDAY = new Date(2025, 11, 19, 0, 0, 0);

  const cakeArea = document.getElementById('cakeArea');
  const birthdayAudio = document.getElementById('birthdayAudio');
  const cakeText = document.getElementById('cakeText');
  const countdownWrap = document.getElementById('countdownWrap');
  const hint = document.getElementById('hint');

  const messages = [
    "Selamat ulang tahun, sayangggg 💖.",
    "hmmmmmmm anjayyyy kesa ultah",
    "heheheheeee. maaf ya yang kemaren kemaren sering ge kamu nangis dan betmut",
    "aku seneng kamu gelem crito, gelm jujur.",
    "aku bahagia ketemu kesa seng centill eram",
    "kamu sayang aku gak?",
    "sayangkan?? kudu sayangg💕",
    "ahhhh",
    "oiyaaa hari ini tenggal berapa?",
    "19 november 2025 kan",
    "Harini hari special bangetttttttttt",
    "hari yang dimana kesa di lahirkan di tahun 2005",
    "19 november 2025 umur keisya 20",
    "hari ini hari yang sakral..",
    "Semoga keinginan mu semua ke keturutan..",
    "... di jauhkan dari orang orang jahat",
    "... jadilah wanita kuat, kuat mental kuat fisik",
    "... bisa nyenengin orangtua",
    "jadikan contoh yang baik untuk adik adikmu keponakanmu",
    "Maaf yaa belum bisa seng mok karepne tapi aku usahakan selalu ada di sampingmu, karana ingin nenujukan kalok aku sayang kesa",
    "Selebihnya..  aku berterimaksih uwes enek ng hidupku\nAku bersukur iso bertemu kamu kamu cantik, kamu manis, kamu crewet, kamu lucu selebih lebihnyaaaa\nwchahchhchchchhcc",
    "Lingguh sek ojo kesusu di pencet next....",
    "Wis lingguh?..",
    "...",
    "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ",
    "اَللّٰهُمَّ أَطِلْ عُمُرَهَا فِي طَاعَتِكَ...",
    "Ya Allah, panjangkanlah umur Keisya...",
    "Al-Fātiḥah.."
  ];

  const dialogWrap = document.getElementById('dialogWrap');
  const dialogBody = document.getElementById('dialogBody');
  const backBtn = document.getElementById('backBtn');
  const nextBtn = document.getElementById('nextBtn');
  let dialogIndex = 0;

  function $id(n){ return document.getElementById(n); }
  const daysEl = $id('days');
  const hoursEl = $id('hours');
  const minutesEl = $id('minutes');
  const secondsEl = $id('seconds');

  // ================================
  // CANDLES
  // ================================
  const candleIds = ['c1','c2','c3'];
  const candles = candleIds.map(id => {
    const g = document.getElementById(id);
    return {
      group: g,
      wick: g?.querySelector('.wick'),
      flame: g?.querySelector('.flame'),
      lit: false
    };
  });

  // ================================
  // REVEAL BIRTHDAY UI
  // ================================
  function revealBirthdayUI(){
    countdownWrap.innerHTML = `
      <div class="birthday-msg"><strong>Selamat Ulang Tahun yaa Sayang 💖</strong></div>
    `;
    hint.textContent = "Klik lilinnya untuk menyalakan.";

    cakeArea.classList.remove('hidden');
    cakeArea.classList.add('show');

    setTimeout(()=>{
      const card = cakeArea.querySelector('.cake-card');
      card && card.classList.add('pop');
    }, 30);
  }

  // ================================
  // TIMER FIXED
  // ================================
  function updateCountdown(){
    const now = new Date();
    const diff = BIRTHDAY - now;

    if(diff <= 0){
      revealBirthdayUI();
      clearInterval(countTimer);
      return;
    }

    if(daysEl){ daysEl.textContent = Math.floor(diff / (1000*60*60*24)); }
    if(hoursEl){ hoursEl.textContent = String(Math.floor((diff / (1000*60*60)) % 24)).padStart(2,'0'); }
    if(minutesEl){ minutesEl.textContent = String(Math.floor((diff / (1000*60)) % 60)).padStart(2,'0'); }
    if(secondsEl){ secondsEl.textContent = String(Math.floor((diff / 1000) % 60)).padStart(2,'0'); }
  }

  const countTimer = setInterval(updateCountdown, 1000);
  updateCountdown();

  // ================================
  // CONFETTI
  // ================================
  function confetti(n=18){
    const colors = ['#ffb3c6','#ffd6e8','#ff9fcf','#ffc0cb','#fff1f7'];
    for(let i=0;i<n;i++){
      const el = document.createElement('div');
      el.className = 'particle';
      el.style.width = (6 + Math.random()*10) + 'px';
      el.style.height = el.style.width;
      el.style.left = (10 + Math.random()*80) + '%';
      el.style.bottom = (10 + Math.random()*10) + '%';
      el.style.background = colors[Math.floor(Math.random()*colors.length)];
      document.body.appendChild(el);
      el.animate([
        {transform:'translateY(0) rotate(0)', opacity:1},
        {transform:'translateY(-90vh) rotate(540deg)', opacity:0}
      ], {duration:1500 + Math.random()*1200, easing:'ease-out', fill:'forwards'});
      setTimeout(()=>el.remove(),3000);
    }
  }

  // ================================
  // NEW: CLICK TO LIGHT CANDLES
  // ================================
  candles.forEach(c => {
    c.group?.addEventListener('click', () => {
      if(c.lit) return;
      c.lit = true;
      c.flame?.classList.remove('hidden');
      confetti(8);

      if(candles.every(x => x.lit)){
        onAllLit();
      }
    });
  });

  function onAllLit(){
    setTimeout(()=>{
      try {
        birthdayAudio.currentTime = 0;
        birthdayAudio.play().catch(()=>{});
      } catch(e){}

      cakeText.classList.remove('hidden');

      setTimeout(()=> openDialog(), 5000);
    }, 800);
  }

  // ================================
  // DIALOG LOGIC
  // ================================
  function openDialog(){
    dialogIndex = 0;
    dialogWrap.classList.remove('hidden');
    setTimeout(()=> dialogWrap.classList.add('show'), 10);
    renderDialog();
  }
  function closeDialog(){
    dialogWrap.classList.remove('show');
    setTimeout(()=> dialogWrap.classList.add('hidden'), 360);
    document.body.classList.add('final-only');
    confetti(40);
  }

  function renderDialog(){
    dialogBody.textContent = messages[dialogIndex] || '';
    backBtn.disabled = dialogIndex === 0;
    nextBtn.textContent = (dialogIndex === messages.length - 1) ? 'Selesai' : 'Next';
  }

  backBtn?.addEventListener('click', ()=>{
    if(dialogIndex > 0){
      dialogIndex--;
      renderDialog();
    }
  });

  nextBtn?.addEventListener('click', ()=>{
    if(dialogIndex < messages.length - 1){
      dialogIndex++;
      renderDialog();
    } else {
      closeDialog();
    }
  });

  // ================================
  // IF PAGE LOADED AFTER BIRTHDAY
  // ================================
  (function immediate(){
    if(new Date() >= BIRTHDAY){
      revealBirthdayUI();
    }
  })();

})();
