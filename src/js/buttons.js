// #region ***  DOM references                           ***********
import * as lottie from 'lottie-web';
import welkom from '../lotties/frame-1.json';
import frame2 from '../lotties/frame-2.json';
import frame3 from '../lotties/frame-3.json';

let lottieAnimation2;
let lottieAnimation3;
let playedScreen1 = false;
let playedScreen2 = false;

// #endregion

// #region ***  Callback-Visualisation - show___         ***********
const updateBallIndicators = () => {
  const gsm = document.querySelector('.c-gsm');
  const currentScreen = Math.round(gsm.scrollLeft / gsm.clientWidth);
  const balls = document.querySelectorAll('.c-scherm-a__ball');

  balls.forEach((ball, index) => {
    ball.classList.toggle('c-scherm-a__ball--active', index === currentScreen - 1);
  });

  // Hide/show navigation on first screen using opacity
  const navigation = document.querySelector('.c-scherm-a__btns');
  if (navigation) {
    if (currentScreen === 0) {
      navigation.style.opacity = '0';
      navigation.style.pointerEvents = 'none';
    } else {
      navigation.style.opacity = '1';
      navigation.style.pointerEvents = 'auto';
    }
  }

  // Play animations when reaching new screens
  if (currentScreen === 1 && !playedScreen1 && lottieAnimation2) {
    playedScreen1 = true;
    lottieAnimation2.play();
  } else if (currentScreen === 2 && !playedScreen2 && lottieAnimation3) {
    playedScreen2 = true;
    lottieAnimation3.play();
  }
};
// #endregion

// #region ***  Callback-No Visualisation - callback___  ***********
// #endregion

// #region ***  Data Access - get___                     ***********
// #endregion

// #region ***  Event Listeners - listenTo___            ***********
const nextButtonsListener = () => {
  const nextButtons = document.querySelectorAll('.js-next');
  for (const next of nextButtons) {
    next.addEventListener('click', (e) => {
      e.preventDefault();
      const gsm = document.querySelector('.c-gsm');
      gsm.scrollBy({
        left: gsm.clientWidth,
        behavior: 'smooth',
      });
      // Update balls after a delay to allow scroll to complete
      setTimeout(updateBallIndicators, 300);
    });
  }
};

const beforeButtonsListener = () => {
  const beforeButtons = document.querySelectorAll('.js-before');
  for (const before of beforeButtons) {
    before.addEventListener('click', (e) => {
      e.preventDefault();
      const gsm = document.querySelector('.c-gsm');
      gsm.scrollBy({
        left: -gsm.clientWidth,
        behavior: 'smooth',
      });
      // Update balls after a delay to allow scroll to complete
      setTimeout(updateBallIndicators, 300);
    });
  }
};
// #endregion

// #region ***  Init / DOMContentLoaded                  ***********
const init = () => {
  console.log('buttons.js loaded');
  nextButtonsListener();
  beforeButtonsListener();

  // Listen for scroll to update balls
  const gsm = document.querySelector('.c-gsm');
  gsm.addEventListener('scroll', updateBallIndicators);
  gsm.addEventListener('scrollend', updateBallIndicators);

  document.querySelector('.js-submit-animation--1').classList.remove('u-hidden');
  const lottieAnimation = lottie.loadAnimation({
    container: document.querySelector('.js-submit-animation--1'),
    animationData: welkom,
    renderer: 'svg',
    loop: true,
    autoplay: true,
  });
  lottieAnimation.play();

  document.querySelector('.js-submit-animation--2').classList.remove('u-hidden');
  lottieAnimation2 = lottie.loadAnimation({
    container: document.querySelector('.js-submit-animation--2'),
    animationData: frame2,
    renderer: 'svg',
    loop: true,
    autoplay: false,
  });

  document.querySelector('.js-submit-animation--3').classList.remove('u-hidden');
  lottieAnimation3 = lottie.loadAnimation({
    container: document.querySelector('.js-submit-animation--3'),
    animationData: frame3,
    renderer: 'svg',
    loop: true,
    autoplay: false,
  });

  // Hide navigation on first screen initially using opacity
  const navigation = document.querySelector('.c-scherm-a__btns');
  if (navigation) {
    navigation.style.opacity = '0';
    navigation.style.pointerEvents = 'none';
  }
};

document.addEventListener('DOMContentLoaded', init);
// #endregion
