"use strict";

// use a script tag or an external JS file
document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger, CustomEase);
  // gsap code here!
});

/*import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, CustomEase);*/

const header = document.querySelector(".header");
const heroCentre = document.querySelector(".hero-centre");
const heroLeft = document.querySelector(".hero-left");
const heroRight = document.querySelector(".hero-right");
const transformTitle = document.querySelectorAll(".transform-title span");
const bringTitle = document.querySelector(".bring-title span");
const bringDesc = document.querySelector(".bring-description");
const bringItem = document.querySelectorAll(".bring-item");
const plCount = document.querySelector(".preloader-counter span");
const progressBar = document.querySelector(".preloader-progress");
const plLogo = document.querySelector(".preloader-logo_txt span");
const plEgg = document.querySelector(".preloader-egg span");
const preloader = document.querySelector(".preloader");
const body = document.querySelector("body");

let counter = {
  value: 0,
};
let loaderDuration = 15;

function updateLoaderText() {
  let progress = Math.round(counter.value);
  plCount.textContent = progress;
}
function endLoaderAnimation() {
  body.classList.remove("no-scroll");
  $(".preloader-trigger").click();
}
let tl = gsap.timeline({ onComplete: endLoaderAnimation });
tl.to(counter, {
  onUpdate: updateLoaderText,
  value: 100,
  duration: loaderDuration,
  ease: CustomEase.create(
    "custom",
    "M0,0 C0.126,0.382 0.241,0.552 0.4,0.7 0.591,0.88 0.818,1.001 1,1 "
  ),
});
tl.to(
  progressBar,
  {
    width: "100%",
    duration: loaderDuration,
    ease: CustomEase.create(
      "custom",
      "M0,0 C0.126,0.382 0.241,0.552 0.4,0.7 0.591,0.88 0.818,1.001 1,1 "
    ),
  },
  0
);

const preloaderAnim = gsap.timeline();

const preloaderContentAnim = () => {
  const tl = gsap.timeline({
    defaults: {
      ease: "power3.out",
    },
  });
  tl.to(plEgg, { yPercent: 100, duration: 1, delay: loaderDuration + 0.4 });
  tl.to(plCount, { yPercent: 100, duration: 1 }, "<");
  tl.to(plLogo, { yPercent: 100, duration: 1, delay: 0.4 }, "<");
  tl.to(progressBar, { yPercent: 100, duration: 0.6, delay: 0.4 }, "<");
  tl.to(
    preloader,
    { yPercent: 100, duration: 1, delay: 0.2, display: "none" },
    "<"
  );

  return tl;
};

preloaderAnim.add(preloaderContentAnim());

const master = gsap.timeline();

const heroAnim = () => {
  const tl = gsap.timeline({
    defaults: {
      ease: "power3.out",
    },
  });

  tl.from(header, { yPercent: -100, duration: 1.5 });
  tl.from(heroCentre, { yPercent: 200, duration: 1.5, delay: 0.5 }, "<");
  tl.from(heroRight, { yPercent: 200, duration: 1, delay: 0.5 }, "<");
  tl.from(heroLeft, { yPercent: 200, duration: 1 }, "<");

  return tl;
};

master.add(heroAnim());

gsap.from(transformTitle, {
  scrollTrigger: {
    trigger: ".transform",
    start: "top center",
  },
  yPercent: 100,
  stagger: {
    amount: 0.3,
  },
  duration: 1,
});
