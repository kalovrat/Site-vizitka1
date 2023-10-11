const headings = document.querySelectorAll('.h1_main');
const interval = 120; // Интервал между появлением заголовков в миллисекундах

function animateHeadings() {
    let delay = 0;

    headings.forEach((heading, index) => {
        setTimeout(() => {
            // Устанавливаем исходное положение (нулевое смещение)
            heading.style.transform = 'translateY(0)';
            
            // Применяем анимацию для появления
            heading.style.transition = 'transform 0.5s';

            // Смещаем элемент вниз
            
            
            // Восстанавливаем стандартные стили после завершения анимации
            setTimeout(() => {
                heading.style.transition = '';
                heading.style.transform = '';
            }, 500); // Задержка, равная времени анимации
        }, delay);
        
        delay += interval;
    });
}

function animateHeadings2() {
    let delay = interval; // Начинаем с интервала

    headings.forEach((heading, index) => {
        if (index > 0) { // Пропускаем первый заголовок
            setTimeout(() => {
                // Применяем анимацию для изменения margin-top
                heading.style.transition = 'margin-top 0.5s';
                heading.style.marginTop = '0';
                
                // Восстанавливаем стандартные стили после завершения анимации
                setTimeout(() => {
                    heading.style.transition = '';
                }, 500); // Задержка, равная времени анимации
            }, delay);
        }
        
        delay += interval;
    });
}

animateHeadings();

setTimeout(() => {
    animateHeadings2();
}, 1700);


function animateHeadings() {
    let delay = 0;

    headings.forEach((heading, index) => {
        setTimeout(() => {
            // Устанавливаем исходное положение (нулевое смещение)
            heading.style.transform = 'translateY(0)';
            
            // Применяем анимацию для появления
            heading.style.transition = 'transform 0.5s';

            // Смещаем элемент вниз
            heading.style.transform = 'translateY(20px)';
            
            // Восстанавливаем стандартные стили после завершения анимации
            setTimeout(() => {
                heading.style.transition = '';
                heading.style.transform = '';

                // Добавляем класс с анимацией дрожания после завершения первой анимации
                heading.classList.add('shaking-text');
            }, 500); // Задержка, равная времени анимации
        }, delay);
        
        delay += interval;
    });
}

// Функция для запуска анимации дрожания с задержкой
function animateShakingText() {
    let delay = 0;

    headings.forEach((heading, index) => {
        setTimeout(() => {
            // Добавляем класс с анимацией дрожания с задержкой
            heading.classList.add('shaking-text');
        }, delay);
        
        delay += interval;
    });
}

animateHeadings(); // Запускаем первую анимацию

setTimeout(() => {
    animateShakingText(); // Запускаем анимацию дрожания с задержкой
}, headings.length * interval);




class Carousel {
    constructor(el) {
      this.el = el;
      this.carouselOptions = ['previous',  'next'];
      this.carouselData = [
        {
          'id': '1',
          'src': 'images/phone-type-2.svg',
          'href': '',
          'back': 'url("images/coco-site.png")'
        },
        {
          'id': '2',
          'src': 'images/phone-type-2.svg',
          'href': '',
          'back': 'url("images/caviar-site.png")'
        },
        {
          'id': '3',
          'src': 'images/phone.svg',
          'href': '',
          'back': 'url("images/site-visitka.png")'
        },
        {
          'id': '4',
          'src': 'images/phone-type-2.svg',
          'href': '',
          'back': 'url("images/gym-site.png")'
        },
        {
          'id': '5',
          'src': 'images/phone.svg',
          'href': '',
          'back': 'url("images/well-site.png")'
        }
      ];
      this.carouselInView = [1, 2, 3, 4, 5];
      this.carouselContainer;
      this.carouselPlayState;
    }
  
    mounted() {
      this.setupCarousel();
    }
  
    // Build carousel html
    setupCarousel() {
      const container = document.createElement('div');
      const controls = document.createElement('div');
  
      // Add container for carousel items and controls
      this.el.append(container, controls);
      container.className = 'carousel-container';
      controls.className = 'carousel-controls';
  
      // Take dataset array and append items to container
    // ...
this.carouselData.forEach((item, index) => {
    const carouselItem = document.createElement('div');
    const image = document.createElement('img');
  
    container.append(carouselItem);
    carouselItem.append(image);
  
    // Add item attributes
    carouselItem.className = `carousel-item carousel-item-${index + 1}`;
    image.src = item.src; // Устанавливаем src для <img>
    image.setAttribute('loading', 'lazy');
    carouselItem.style.backgroundImage = item.back; // Устанавливаем background-image для .carousel-item
  
    // Добавляем отступ сверху только для первого элемента
    if (index === 0 || index == 1 || index == 4) {
      carouselItem.style.backgroundPosition = 'center 15px';
    }
  
    image.style.backgroundSize = 'cover';
    
  
    // Used to keep track of carousel items, infinite items possible in carousel however min 5 items required
    carouselItem.setAttribute('data-index', `${index + 1}`);
  });
  // ...
  
  
    // Modify the control buttons to use only "<" and ">"
  this.carouselOptions.forEach((option) => {
    const btn = document.createElement('button');

    // Use only "<" and ">" for previous and next buttons
    if (option === 'previous') {
        btn.style.transform = 'scaleX(-1.5) scaleY(-1.5)';
        btn.style.marginTop = '-193px';
        btn.style.marginLeft = '-221px';
        btn.style.position = 'absolute';
        btn.style.zIndex = '200';
        btn.style.fontSize = '50px';
      btn.innerText = '<';
    } else if (option === 'next') {
      btn.innerText = '>';
      btn.style.marginTop = '-250px';
      btn.style.position = 'absolute';
      btn.style.zIndex = '200';
      btn.style.fontSize = '50px';
      btn.style.marginLeft = '261px';

    }

    btn.className = `carousel-control `;
    btn.setAttribute('data-name', option);

    controls.append(btn);
  });
  
      // After rendering carousel to our DOM, setup carousel controls' event listeners
      this.setControls([...controls.children]);
  
      // Set container property
      this.carouselContainer = container;
    }
  
    setControls(controls) {
      controls.forEach((control) => {
        control.onclick = (event) => {
          event.preventDefault();
  
          // Manage control actions, update our carousel data first then with a callback update our DOM
          this.controlManager(control.dataset.name);
        };
      });
    }
  
    controlManager(control) {
      if (control === 'previous') return this.previous();
      if (control === 'next') return this.next();
    
    
  
      return;
    }
  
    previous() {
      // Update order of items in data array to be shown in carousel
      this.carouselData.unshift(this.carouselData.pop());
  
      // Push the first item to the end of the array so that the previous item is front and center
      this.carouselInView.push(this.carouselInView.shift());
  
      // Update the css class for each carousel item in view
      this.carouselInView.forEach((item, index) => {
        this.carouselContainer.children[index].className = `carousel-item carousel-item-${item}`;
      });
  
      // Using the first 5 items in data array update content of carousel items in view
      this.carouselData.slice(0, 5).forEach((data, index) => {
       
      });
    }
  
    next() {
      // Update order of items in data array to be shown in carousel
      this.carouselData.push(this.carouselData.shift());
  
      // Take the last item and add it to the beginning of the array so that the next item is front and center
      this.carouselInView.unshift(this.carouselInView.pop());
  
      // Update the css class for each carousel item in view
      this.carouselInView.forEach((item, index) => {
        this.carouselContainer.children[index].className = `carousel-item carousel-item-${item}`;
      });
  
      // Using the first 5 items in data array update content of carousel items in view
      this.carouselData.slice(0, 5).forEach((data, index) => {
       
      });
    }
  
    
  
   
  }
  
  // Refers to the carousel root element you want to target, use specific class selectors if using multiple carousels
  const el = document.querySelector('.carousel');
  // Create a new carousel object
  const exampleCarousel = new Carousel(el);
  // Setup carousel and methods
  exampleCarousel.mounted();
  