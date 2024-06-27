function linkSlider(slider, defaultValue, span) {
  slider.value = defaultValue;
  const observable = new Observable.BehaviorSubject(slider.value);
  slider.addEventListener('input', e => {
    observable.next(e.target.value);
    span.innerText = e.target.value;
  });
  return observable;
}

async function main() {
  console.log('ready');
  const aObservable = linkSlider(document.getElementById('a'), 1, document.getElementById('a-value'));
  const bObservable = linkSlider(document.getElementById('b'), 0, document.getElementById('b-value'));
  const cObservable = linkSlider(document.getElementById('c'), 0, document.getElementById('c-value'));
  const dObservable = linkSlider(document.getElementById('d'), 1, document.getElementById('d-value'));
  const eObservable = linkSlider(document.getElementById('e'), 0, document.getElementById('e-value'));
  const fObservable = linkSlider(document.getElementById('f'), 0, document.getElementById('f-value'));

  const img = document.getElementById('src');
  const canvas = document.getElementById('dest');
  canvas.clientWidth = canvas.width = 256;
  canvas.clientHeight = canvas.height = 256;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  Observable.Observable.all([aObservable, bObservable, cObservable, dObservable, eObservable, fObservable]).subscribe(([a, b, c, d, e, f]) => {
    ctx.fillStyle = 0x000000FF;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(a, b, c, d, e, f);
    ctx.drawImage(img, 0, 0);
  });
}

window.onload = main;
