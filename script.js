document.addEventListener("DOMContentLoaded", function () {
  var isMobile = window.innerWidth <= 768;

  function locomotiveAnimation() {
    gsap.registerPlugin(ScrollTrigger);

    const locoScroll = new LocomotiveScroll({
      el: document.querySelector("main"),
      smooth: true,

      // for tablet smooth
      tablet: { smooth: true },

      // for mobile
      smartphone: { smooth: true },
    });

    //click event to each h1 in the left menu
    document
      .querySelectorAll(".left-menu h1 ,.right-menu h1,.logo")
      .forEach(function (heading) {
        heading.addEventListener("click", function () {
          // Get the target section id from data attribute
          const targetId = heading.getAttribute("data-target");
          const targetSection = document.getElementById(targetId);

          if (targetSection) {
            gsap.to(".menu", {
              x: "100%",
              delay: -0.4,
              ease: Power3.easeInOut,
            });
            gsap.to(".blackscreen", {
              x: "100%",
              delay: -0.2,
              ease: Power3.easeInOut,
            });

            locoScroll.scrollTo(targetSection);
          }
        });
      });

    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy("main", {
      scrollTop(value) {
        return arguments.length
          ? locoScroll.scrollTo(value, 0, 0)
          : locoScroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    ScrollTrigger.refresh();
  }

  locomotiveAnimation();

  function displayTime() {
    var currentTime = document.getElementById("currentTime");

    setInterval(() => {
      var d = new Date();
      currentTime.innerHTML = d.toLocaleTimeString();
    }, 1000);
  }

  function mouseFollower() {
    var circle = document.querySelector(".circle");
    var body = document.body;
    body.addEventListener("mousemove", function (dets) {
      gsap.to(circle, {
        left: dets.clientX,
        top: dets.clientY,
        ease: Power1,
        duration: 0.3,
      });
    });

    // for frame
    var frames = document.querySelectorAll(".title1");
    frames.forEach(function (frame) {
      frame.addEventListener("mousemove", function (dets) {
        gsap.to(circle, {
          scale: 8,
          borderRadius: "0px",
          width: "6.5vw",
          duration: 0.3,
          // delay: -1,
          ease: Power3,
          mixBlendMode: "difference",
        });

        gsap.to(frame, {
          cursor: "none",
        });
      });

      frame.addEventListener("mouseleave", function () {
        gsap.to(circle, {
          scale: 1,
          width: "1.4vw",
          borderRadius: "50%",
        });
      });
    });
  }

  function page1Animation() {
    var tl = gsap.timeline();
    tl.from(".loadNo__p h4", {
      opacity: 0,
      stagger: {
        each: 0.12,
        repeat: 1,
        yoyo: true,
      },

      duration: 0.18,
    });

    tl.from(
      "nav",
      {
        // duration:0.2,
        opacity: 0,
        ease: Expo.easeInOut,
      },
      "a"
    );
    tl.to(
      ".boundElem",
      {
        y: 0,
        duration: 1.5,
        delay: -1.8,
        ease: Expo.easeInOut,
        stagger: 0.2,
      },
      "a"
    );
    tl.from(".p1bottom h4, .arrows , .links", {
      y: -20,
      opacity: 0,
      delay: -1,
      ease: Expo,
      stagger: 0.2,
    });

    // &&&&&&&&&&&&&&&&&&&
    var circle = document.querySelector(".circle");
    var frames = document.querySelectorAll(".frame");

    const lerp = (x, y, a) => x * (1 - a) + y * a;

    frames.forEach(function (frame) {
      frame.addEventListener("mousemove", function (dets) {
        var dimes = frame.getBoundingClientRect();
        // console.log(dimes);
        var xStart = dimes.x;
        var xEnd = dimes.x + dimes.width;

        var zeroOne = gsap.utils.mapRange(xStart, xEnd, 0, 1, dets.clientX);

        gsap.to(frame.children, {
          y: "-10vw",
          color: "white",
        });
        gsap.to(frame.children, {
          duration: 0.4,
          x: lerp(-50, 50, zeroOne),
        });
      });
      frame.addEventListener("mouseleave", function () {
        gsap.to(".frame .boundElem", {
          y: "0",
        });
        gsap.to(frame.children, {
          duration: 0.4,
          x: 0,
        });
      });
    });
  }

  function page2Animation() {
    document.querySelectorAll(".element").forEach(function (elem) {
      var rotate = 0;
      var diffrot = 0;

      elem.addEventListener("mouseleave", function (dets) {
        gsap.to(elem.querySelector("img"), {
          opacity: 0,
          ease: Power3,
          duration: 0.5,
        });

        gsap.to(elem.querySelector("h1"), {
          opacity: 1,
          ease: Power3,
          x: 0,
          scale: 1,
        });
        gsap.to(elem.querySelector("span img"), {
          opacity: 1,
          scale: 1,
        });
      });

      elem.addEventListener("mousemove", function (dets) {
        var diff = dets.clientY - elem.getBoundingClientRect().top;
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;

        gsap.to(elem.querySelector("img"), {
          opacity: 1,
          ease: Power3,
          top: diff,
          left: dets.clientX,
          rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
        });
        gsap.to(elem.querySelector("h1"), {
          opacity: 0.3,
          ease: Power3,
          x: 45,
        });
        gsap.to(elem.querySelector("span img"), {
          opacity: 0.3,
          scale: 0.9,
        });
      });
    });
  }

  function menuAnimation() {
    var menuContainer = document.querySelector(".menu");
    menuContainer.addEventListener("click", function (dets) {
      let targetElement = dets.target.textContent;
      console.log(targetElement);
      // for close
      if (targetElement == "close") {
        gsap.to(".menu", {
          x: "100%",
          ease: Power3.easeInOut,
        });
        gsap.to(".blackscreen", {
          x: "100%",
          delay: 0.2,
          ease: Power3.easeInOut,
        });
      }
      // for menues
    });

    var open = document.querySelector(".open");
    open.addEventListener("click", () => {
      var tl = gsap.timeline();

      tl.to(".blackscreen", {
        duration: 0.9,
        ease: Power3.easeInOut,
        x: "-100%",
      });
      tl.to(".menu", {
        delay: -0.8,
        duration: 0.5,
        ease: Power3.easeInOut,
        x: 0,
      });
      tl.from(".left-menu , right-menu", {
        x: "-100%",
        delay: -0.4,
        stagger: {
          amount: 0.2,
        },
      });
      tl.from(".left-menu h1", {
        x: "-100%",
        delay: -0.4,
        stagger: {
          amount: 0.2,
        },
      });
      tl.from(".right-menu h1", {
        y: "100%",
        opacity: 0,
        delay: -0.4,
        stagger: {
          amount: 0.2,
        },
      });
    });
  }

  function page4Animation() {
    var isMobile = window.innerWidth <= 768;

    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".page4",
        scroller: "main",
        // markers: true,
        start: "40% 50%",
        end: "100% 50%",
        scrub: 2,
        pin: true,
      },
    });

    if (isMobile) {
      tl.to(".textContainer", { top: "10%" }, "a");
      tl.to(
        "#page1",
        {
          top: "47%",
          width: "95%",
          height: "70vh",
          borderRadius: "30px",
        },
        "a"
      );
      tl.to(
        "#page2",
        {
          top: "120%",
        },
        "a"
      );

      tl.to(
        "#page1",
        {
          width: "85%",
          height: "70vh",
        },
        "b"
      );
      tl.to(
        "#page2",
        {
          top: "52%",
          borderRadius: "30px",
          width: "95%",
        },
        "b"
      );
      tl.to(
        "#page3",
        {
          top: "140%",
        },
        "b"
      );

      tl.to(
        "#page2",
        {
          width: "90%",
          height: "70vh",
        },
        "c"
      );
      tl.to(
        "#page3",
        {
          top: "60%",
          borderRadius: "30px",
          width: "95%",
        },
        "c"
      );
    } else {
      tl.to(
        ".textContainer",
        {
          top: "5%",
        },
        "a"
      );
      tl.to(
        "#page1",
        {
          top: "40%",
          width: "90%",
          height: "85vh",
          borderRadius: "50px",
        },
        "a"
      );
      tl.to(
        "#page2",
        {
          top: "110%",
        },
        "a"
      );

      tl.to(
        "#page1",
        {
          width: "76%",
          height: "85vh",
        },
        "b"
      );
      tl.to(
        "#page2",
        {
          top: "45%",
          borderRadius: "50px",
          width: "90%",
        },
        "b"
      );
      tl.to(
        "#page3",
        {
          top: "130%",
        },
        "b"
      );

      tl.to(
        "#page2",
        {
          width: "84%",
          height: "86vh",
        },
        "c"
      );
      tl.to(
        "#page3",
        {
          top: "50%",
          borderRadius: "50px",
          width: "90%",
        },
        "c"
      );
    }
  }

  function page3Animation() {
    var allH4 = document.querySelectorAll(".aboutText h4");
    allH4.forEach(function (elem) {
      var h4text = elem.textContent;
      var cluter = "";
      var splitedText = h4text.split("");
      splitedText.forEach(function (e) {
        cluter += `<span>${e}</span>`;
      });
      elem.innerHTML = cluter;
    });

    gsap.to(".aboutText h4 span", {
      opacity: 1,
      color: "white",
      stagger: 0.2,
      scrollTrigger: {
        start: "top 85%",
        end: "top 25%",
        // markers:true,
        scrub: 2,
        scroller: "main",
        trigger: ".aboutText",
      },
    });
  }

  function page5Animation() {
    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".page5",
        scroller: "main",
        start: "50% 50%",
        end: "200% 50%",
        // markers: true,
        scrub: 3,
        pin: true,
      },
    });
    tl.to(".top ,.bottum", {
      backgroundColor: "white",
      duration: 1.5,
      scrub: false,
    });
    tl.to(
      ".top",
      {
        duration: 1.3,
        top: "-50%",
      },
      "a"
    );
    tl.to(
      ".bottum",
      {
        duration: 1.3,
        bottom: "-50%",
      },
      "a"
    );
    tl.to(
      "#top-h1",
      {
        top: "120%",
      },
      "a"
    );
    tl.to(
      "#bottum-h1",
      {
        top: "-20%",
      },
      "a"
    );
    // tl.to(".skill-container", {
    //   marginTop: "0",
    // }, "a");
    tl.to(".bottum", {
      opacity: 0,
      display: "none",
      scrub: false,
    });
    tl.from(".title-p5 h2", {
      opacity: 0,
      y: 300,
      delay: -1.5,
    });
    tl.to(".title-p5 h2", {
      opacity: 0,
    });
  }

  function skillShowcase() {
    var tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".center",
        scroller: "main",
        start: "-20% 50%",
        end: "70% 50%",
        // markers: true,

        stagger: {
          amount: 0.1,
        },

        // pin: true
      },
    });

    tl2.to(
      ".skill-container h2",
      {
        opacity: 1,
        y: -50,
      },
      "a"
    );
    tl2.to(
      ".sk1 ,.sk10",
      {
        opacity: 1,
        filter: "blur(0)",
      },
      "a"
    );
    tl2.to(".sk3 ,.sk4", {
      opacity: 1,
      filter: "blur(0)",
    });
    tl2.to(".sk2 ,.sk12", {
      opacity: 1,
      filter: "blur(0)",
    });
    tl2.to(".sk7 ,.sk9", {
      opacity: 1,
      filter: "blur(0)",
    });
    tl2.to(
      ".sk5 ,.sk11",
      {
        opacity: 1,
        filter: "blur(0)",
      },
      "b"
    );
    tl2.to(
      ".sk6 ,.sk8",
      {
        opacity: 1,
        filter: "blur(0)",
      },
      "b"
    );
  }

  
  function educationAnimation() {
    var isMobile = window.innerWidth <= 768;

    document.querySelectorAll(".edu-box").forEach(function (elem) {
      if (isMobile) {
        elem.addEventListener("touchstart", function () {
          gsap.to(elem, {
            height: "15.5vh",
          });
          gsap.to(
            elem.querySelector(".clg-name"),
            {
              opacity: 1,
            },
            "a"
          );
          gsap.to(
            elem.querySelector("i"),
            {
              opacity: 0,
            },
            "a"
          );
        });

        elem.addEventListener("touchend", function () {
          gsap.to(elem, {
            height: "13.5vh",
          });
          gsap.to(
            elem.querySelector(".clg-name"),
            {
              opacity: 0,
            },
            "a"
          );
          gsap.to(
            elem.querySelector("i"),
            {
              opacity: 1,
            },
            "a"
          );
        });
      } else {
        elem.addEventListener("mouseover", function () {
          gsap.to(elem, {
            height: "22vh",
          });
          gsap.to(
            elem.querySelector(".clg-name"),
            {
              opacity: 1,
            },
            "a"
          );
          gsap.to(
            elem.querySelector("i"),
            {
              opacity: 0,
            },
            "a"
          );
        });

        elem.addEventListener("mouseleave", function () {
          gsap.to(elem, {
            height: "14vh",
          });
          gsap.to(
            elem.querySelector(".clg-name"),
            {
              opacity: 0,
            },
            "a"
          );
          gsap.to(
            elem.querySelector("i"),
            {
              opacity: 1,
            },
            "a"
          );
        });
      }
    });

    var tlp6 = gsap.timeline({
      scrollTrigger: {
        scroller: "main",
        trigger: ".page6",
        start: "top 0%",
        end: "150% 90%",
        // markers:true,
        scrub: 2,
        pin: true,
      },
    });

    tlp6.to(
      ".page6 h1",
      {
        x: isMobile ? "-30%" : "-50%",
      },
      "a"
    );

    var tl2p6 = gsap.timeline({
      scrollTrigger: {
        scroller: "main",
        trigger: ".page6",
        start: "top 0%",
        end: "100% 90%",
        // markers:true,
        scrub: 3,
      },
    });

    tl2p6.from("#hsc", {
      opacity: 0,
    });
    tl2p6.from("#bca", {
      opacity: 0,
    });
    tl2p6.from("#mca", {
      opacity: 0,
    });
  }

 

  function BreakSpan() {
    var textclass = document.querySelectorAll(".felem");
    // console.log(textclass);
    var text = [];

    textclass.forEach(function (elem) {
      text.push(elem.textContent);
    });

    console.log(text);

    var splittedText = [];
    text.forEach(function (elem) {
      splittedText.push(elem.split(""));
    });
    console.log(splittedText);

    var newTextArray = [];
    splittedText.forEach(function (elem) {
      var newText = "";
      elem.forEach(function (e) {
        newText += `<span class="e">${e}</span>`;
      });
      // console.log(newText);
      newTextArray.push(newText);
    });
    console.log(newTextArray);

    for (let i = 0; i < textclass.length; i++) {
      textclass[i].innerHTML = newTextArray[i];
    }
  }

  function textAnimation() {
    var frames = document.querySelectorAll(".frameFor");

    frames.forEach(function (frame) {
      frame.addEventListener("mouseenter", function (dets) {
        gsap.to(frame.querySelectorAll(".e"), {
          y: "-1.2vw",
          stagger: 0.021,
        });
      });
      frame.addEventListener("mouseleave", function () {
        gsap.to(frame.querySelectorAll(".e"), {
          y: "0vw",
          stagger: 0.019,
        });
      });
    });
  }
  mouseFollower();
  displayTime();

  page1Animation();
  menuAnimation();

  page3Animation();
  page5Animation();
  skillShowcase();
  page4Animation();
  page2Animation();
  educationAnimation();

  if (!isMobile) {
   
    BreakSpan();
    textAnimation();
  }
});
