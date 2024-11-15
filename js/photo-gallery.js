const d = document, 
      $gallery = d.getElementById('gallery'),
      $template = d.getElementById('template-card').content,
      $fragment = d.createDocumentFragment()

class Photo {
  // static all = []
  constructor({id,title,img,description,by,category}){
    this.id = id,
    this.title = title,
    this.img = img,
    this.description = description,
    this.category = category
    // Photo.all.push(this)
  }
}

const MY_PHOTOS = [
  {title: 'Inventory / Warehouse Dashboard', img: 'assets/product01.jpg',description: 'Inventory / Warehouse Dashboard', category: ''},
  {title: 'Dispatch / Delivery Dashboard', img: 'assets/product02.jpg', description: 'Orange, green, and black tent', category: ''},
  {title: 'Automated Dispatch Planning', img: 'assets/product03.jpg', description: 'Woman in black shirt taking selfie', category: ''},
  {title: 'Automated Pick List', img: 'assets/product04.jpg', description: 'Automated Pick List', category: ''},
  {title: 'Automated Put-Away List', img: 'assets/product05.jpg', description: 'Automated Put-Away List', category: ''},
  {title: 'Barcode / QR Code Scanner', img: 'assets/product06.jpg', description: 'Barcode / QR Code Scanner', category: ''},
  {title: 'ePOD', img: 'assets/product07.jpg', description: 'ePOD', category: ''},
  {title: 'Reports & Analytics', img: 'assets/product08.jpg', description: 'Reports & Analytics', category: ''},
  {title: 'Route & Vehicle Optimisation', img: 'assets/product09.jpg', description: 'Route & Vehicle Optimisation', category: ''},
]

MY_PHOTOS.map((el,i) => el.id=i)

// Usando all
// New Photo('',''...)

// Photo.all.forEach(el=> 
MY_PHOTOS.forEach(el=> {
    $template.querySelector('figure').dataset.id = el.id
    $template.querySelector('figure').dataset.category = el.category
    $template.querySelector('figure').dataset.description = el.description
    $template.querySelector('.gallery__title').textContent = el.title;

    $template.querySelector('img').src = el.img
  	$template.querySelector('img').title = `${el.title} Photo`



 
    let $clone = d.importNode($template,true)
    $fragment.appendChild($clone)
})   
$gallery.appendChild($fragment)
  
window.addEventListener('load', () => {
$gallery.classList.add('uploaded')
  

const $overlay = d.querySelector('.overlay'),
      images = [], by=[], description=[], title=[],
      $figureImg = d.querySelector('.gallery__open img'),
      $figcaption = d.querySelector('.gallery__open figcaption'),
      $leyend = d.querySelector('.overlay .leyend'),
      $fullscreen = d.querySelector('#gallery__fullscreen i')

for(let index in MY_PHOTOS) {
  images.push(MY_PHOTOS[index].img)
  by.push(MY_PHOTOS[index].by)
  description.push(MY_PHOTOS[index].description)
  title.push(MY_PHOTOS[index].title)
}

/*for(let index in Photo.all) {
  images.push(Photo.all[index].img)
  by.push(Photo.all[index].by)
  description.push(Photo.all[index].description)
  title.push(Photo.all[index].title)
}
*/

const lastImage = images.length -1
  
d.addEventListener('click', e => {
  if(e.target.matches('.gallery__img')){
    const title = e.target.title,
          alt = e.target.alt,
          route = e.target.src,
          description = e.target.parentElement.dataset.description,
          by = e.target.parentElement.dataset.by
    $overlay.classList.remove('hidden')
    d.querySelector('.overlay img').title = title
    d.querySelector('.overlay img').alt = alt
    d.querySelector('.overlay img').src = route
    d.querySelector('.overlay .leyend').innerHTML = description
    currentImage=e.target.parentElement.dataset.id
  }
  if(e.target.matches('#gallery__fullscreen, #gallery__fullscreen *')) {   
    $fullscreen.classList.toggle('fa-expand')
    $fullscreen.classList.toggle('fa-compress')
    d.fullscreenElement ? d.exitFullscreen() : $overlay.requestFullscreen()
  }
  if(e.target.matches('#gallery__close, #gallery__close *, #open')) {
    $overlay.classList.add('hidden')
    $fullscreen.classList.replace('fa-compress','fa-expand')
    d.fullscreenElement ? d.exitFullscreen() : ''
  }
  if(e.target.matches('#prev, #prev *')) {
    currentImage--
    currentImage < 0 ? currentImage = lastImage : ''
    $figureImg.src = images[currentImage]
    $figureImg.title = `${title[currentImage]} Photo`
    $leyend.textContent = description[currentImage]
  }
  if(e.target.matches('#next, #next *')) {
    currentImage++
    currentImage > lastImage ? currentImage = 0 : ''
    $figureImg.src = images[currentImage]
    $figureImg.title = `${title[currentImage]} Photo`
    $leyend.textContent = description[currentImage]
  }
})
})