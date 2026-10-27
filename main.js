// Fraternity Barbers — mobile menu, scroll-spy, lightbox, booking form
(function(){
  var toggle=document.querySelector('[data-menu-toggle]');
  var nav=document.querySelector('[data-mobile-menu]');
  if(toggle&&nav){
    toggle.addEventListener('click',function(){
      var open=nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded',open?'true':'false');
      toggle.setAttribute('aria-label',open?'Close menu':'Open menu');
    });
    nav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click',function(){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');});
    });
  }
  // Scroll-spy
  var links=nav?Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]')):[];
  var map={};
  links.forEach(function(a){map[a.getAttribute('href').slice(1)]=a;});
  var obs=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        links.forEach(function(a){a.classList.remove('active');});
        var l=map[e.target.id]; if(l) l.classList.add('active');
      }
    });
  },{rootMargin:'-40% 0px -55% 0px'});
  ['story','services','prices','gallery','faq','visit','book'].forEach(function(id){
    var el=document.getElementById(id); if(el) obs.observe(el);
  });
  // Lightbox
  var lb=document.getElementById('lightbox'), lbImg=document.getElementById('lb-img');
  document.querySelectorAll('.g-item').forEach(function(btn){
    btn.addEventListener('click',function(){
      lbImg.src=btn.getAttribute('data-full'); lbImg.alt=btn.querySelector('img').alt;
      lb.hidden=false; document.querySelector('.lb-close').focus();
    });
  });
  function closeLb(){lb.hidden=true;lbImg.src='';}
  document.querySelector('.lb-close').addEventListener('click',closeLb);
  lb.addEventListener('click',function(e){if(e.target===lb) closeLb();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'){if(!lb.hidden) closeLb(); if(nav) nav.classList.remove('open');}});
  // Booking form -> Booksy (booking is completed there)
  var form=document.getElementById('contact-form');
  if(form){form.addEventListener('submit',function(e){e.preventDefault();window.open('http://thefraternity.booksy.com/','_blank','noopener');});}
})();
