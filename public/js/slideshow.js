const prev_btn = document.querySelector(".prev");
const next_btn = document.querySelector(".next");
(function slideshow() {
  const slides_container = document.querySelector(".slides-container-inner");
  const slides = document.querySelectorAll(".slides-item");
  const rightMargin = parseFloat(getElementStyle(slides[0], "margin-right"));

  let current = 0;
  let parentOffset = 0;

  prev_btn.addEventListener("click", handlePrev);
  next_btn.addEventListener("click", handleNext);

  // return element style based on value passed in.
  function getElementStyle(node, style) {
    return getComputedStyle(node).getPropertyValue(style);
  }

  function handleNext(event) {
    if (current === slides.length - 1) {
      slides_container.style.transform = `translateX(0px)`;
      slides.forEach((slide) => (slide.style.opacity = 1));
      parentOffset = 0;
      current = 0;
    } else {
      const currentSlide = slides[current];
      const itemWidth = parseFloat(getElementStyle(currentSlide, "width"));
      let offset = itemWidth + rightMargin;

      currentSlide.style.opacity = 0;
      slides_container.style.transform = `translateX(-${
        parentOffset + offset
      }px)`;
      parentOffset += offset;
      current++;
    }
  }

  function handlePrev(event) {
    if (current !== 0) {
      const lastSlide = slides[current - 1];
      const lastWidth = parseFloat(getElementStyle(lastSlide, "width"));

      lastSlide.style.opacity = 1;
      let offset = lastWidth + rightMargin;
      slides_container.style.transform = `translateX(-${
        parentOffset - offset
      }px)`;

      parentOffset -= offset;
      current--;
    }
  }
})();

(function watchMouse() {
  document.addEventListener("mousemove", debounce(handleMousemove, 100));

  function debounce(fn, gap) {
    let timer;

    return function (e) {
      if (timer) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          fn.call(this, e);
        }, gap);
      } else {
        timer = setTimeout(() => {
          fn.call(this, e);
        }, gap);
      }
    };
  }

  function handleMousemove(e) {
    const midPoint = screen.width / 2;
    if (e.screenX > midPoint) {
      next_btn.style.opacity = 1;
      prev_btn.style.opacity = 0.3;
    } else {
      prev_btn.style.opacity = 1;
      next_btn.style.opacity = 0.3;
    }
  }
})();
