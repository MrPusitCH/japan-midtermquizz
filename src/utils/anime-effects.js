// Anime.js animation effects for flashcard game

export const animateCardEnter = (element) => {
  if (typeof anime !== 'undefined' && element) {
    anime({
      targets: element,
      opacity: [0, 1],
      scale: [0.9, 1],
      duration: 500,
      easing: 'easeOutElastic(1, .6)'
    })
  }
}

export const animateButtonHover = (element) => {
  if (typeof anime !== 'undefined' && element) {
    anime({
      targets: element,
      translateY: -4,
      scale: 1.05,
      duration: 200,
      easing: 'easeOutQuad'
    })
  }
}

export const animateButtonLeave = (element) => {
  if (typeof anime !== 'undefined' && element) {
    anime({
      targets: element,
      translateY: 0,
      scale: 1,
      duration: 200,
      easing: 'easeOutQuad'
    })
  }
}

export const animateCorrectAnswer = (element) => {
  if (typeof anime !== 'undefined' && element) {
    element.classList.add('anime-glow-green')
    anime({
      targets: element,
      scale: [1, 1.15, 1],
      duration: 600,
      easing: 'easeOutElastic(1, .8)',
      complete: () => {
        setTimeout(() => element.classList.remove('anime-glow-green'), 300)
      }
    })
  }
}

export const animateWrongAnswer = (element) => {
  if (typeof anime !== 'undefined' && element) {
    element.classList.add('anime-glow-red')
    anime({
      targets: element,
      translateX: [
        { value: -10, duration: 100 },
        { value: 10, duration: 100 },
        { value: -10, duration: 100 },
        { value: 10, duration: 100 },
        { value: 0, duration: 100 }
      ],
      easing: 'easeInOutQuad',
      complete: () => {
        setTimeout(() => element.classList.remove('anime-glow-red'), 300)
      }
    })
  }
}

export const animateTransition = (element) => {
  if (typeof anime !== 'undefined' && element) {
    anime({
      targets: element,
      opacity: [1, 0],
      scale: [1, 0.95],
      duration: 300,
      easing: 'easeInQuad'
    })
  }
}
