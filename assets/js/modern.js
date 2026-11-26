(function(){
  var d=document,root=d.documentElement,reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
  root.classList.add('js');

  // app bar elevation on scroll
  var bar=d.querySelector('.bar');
  if(bar)addEventListener('scroll',function(){bar.classList.toggle('raised',scrollY>8)},{passive:true});

  // button ripple
  d.addEventListener('pointerdown',function(e){
    var b=e.target.closest('.btn');if(!b)return;
    var r=b.getBoundingClientRect(),s=Math.max(r.width,r.height)*2,i=d.createElement('span');
    i.className='ripple';i.style.cssText='width:'+s+'px;height:'+s+'px;left:'+(e.clientX-r.left-s/2)+'px;top:'+(e.clientY-r.top-s/2)+'px';
    b.appendChild(i);setTimeout(function(){i.remove()},650);
  });

  // backdrop parallax
  var au=d.querySelector('.aurora');
  if(au&&!reduce)addEventListener('pointermove',function(e){
    au.style.setProperty('--px',((e.clientX/innerWidth-.5)*-40)+'px');
    au.style.setProperty('--py',((e.clientY/innerHeight-.5)*-40)+'px');
  },{passive:true});

  // current path on the 404 page
  var p=d.getElementById('path');if(p)p.textContent=location.pathname+location.search;

  var cards=[].slice.call(d.querySelectorAll('.card'));
  if(!cards.length)return;

  // staggered reveal as cards enter the viewport
  var n=0,io=new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(!e.isIntersecting)return;
      e.target.style.setProperty('--d',(n++%4)*70+'ms');
      e.target.classList.add('in');io.unobserve(e.target);
    });n=0;
  },{threshold:.12});
  cards.forEach(function(c){io.observe(c)});

  // pointer tilt (mouse only)
  if(!reduce&&matchMedia('(hover:hover)').matches)cards.forEach(function(c){
    c.addEventListener('pointermove',function(e){
      var r=c.getBoundingClientRect();
      c.style.setProperty('--ry',((e.clientX-r.left)/r.width-.5)*6+'deg');
      c.style.setProperty('--rx',((e.clientY-r.top)/r.height-.5)*-6+'deg');
    });
    c.addEventListener('pointerleave',function(){c.style.setProperty('--rx','0deg');c.style.setProperty('--ry','0deg')});
  });

  // lightbox
  var dlg=d.getElementById('lb');if(!dlg||!dlg.showModal)return;
  var img=dlg.querySelector('img'),cap=dlg.querySelector('.cap'),idx=0;
  function show(i){
    idx=(i+cards.length)%cards.length;var c=cards[idx];
    img.src=c.querySelector('a.image').getAttribute('href');
    cap.textContent=c.querySelector('p').textContent+' '+c.querySelector('h2').textContent;
    if(!dlg.open)dlg.showModal();
  }
  cards.forEach(function(c,i){c.querySelector('a.image').addEventListener('click',function(e){e.preventDefault();show(i)})});
  dlg.querySelector('[data-prev]').onclick=function(){show(idx-1)};
  dlg.querySelector('[data-next]').onclick=function(){show(idx+1)};
  dlg.querySelector('[data-close]').onclick=function(){dlg.close()};
  dlg.addEventListener('click',function(e){if(e.target===dlg||e.target.classList.contains('lb'))dlg.close()});
  dlg.addEventListener('keydown',function(e){if(e.key==='ArrowLeft')show(idx-1);if(e.key==='ArrowRight')show(idx+1)});
})();
