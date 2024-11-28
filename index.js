  const mainCont = document.querySelector("#mainCont");
  const svgPaths = mainCont.querySelectorAll(".path1");
  const animatedBoxes = mainCont.querySelectorAll(".box");
  const middleMainBox = mainCont.querySelector(".innerMainBox");

  const animationFunction = (svgIndexes) => {
    svgIndexes.forEach((indexes) => {
      const pathLength = svgPaths[indexes].getTotalLength();

      svgPaths[indexes].style.strokeDasharray = pathLength;
      svgPaths[indexes].style.strokeDashoffset = pathLength;


      svgPaths[indexes].animate(
        [
          { strokeDashoffset: pathLength, offset: 0 },
          { strokeDashoffset: 0, offset: 0.2 },
          { strokeDashoffset: 0, offset: 0.8 },
          { strokeDashoffset: -pathLength, offset: 1 },
        ],
        {
          duration: 2500,
          easing: "linear",
          iterations: Infinity,
        }
      );
    });
  };
  const svgsIndexes = [
    [10, 13, 14, 15],
    [8, 12],
    [6, 7, 11],
    [4],
    [0, 1],
    [5],
    [16, 2, 3],
    [9],
  ];

  function animationDelay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  (async () => {
    for (let i = 0; i < svgsIndexes.length; i++) {
      if (i !== 3 && i !== 5) {
        animationFunction(svgsIndexes[i])
        console.log('okk', i);

      }
      middleMainBox.classList.add("box-active");

      for (let j = 0; j < svgsIndexes[i].length; j++) {
        svgPaths[svgsIndexes[i][j]].style.display = "block";
        svgPaths[svgsIndexes[i][j]].style.animationPlayState = "running";
      }

      await animationDelay(500);

      for (let j = 0; j < svgsIndexes[i].length; j++) {
        animatedBoxes[
          svgsIndexes[i][j] === 16 ? 1 : svgsIndexes[i][j]
        ].classList.add("box-active");
      }

      await animationDelay(1400);
      if (i === 4) {
        animatedBoxes[4].classList.remove("box-active");
      } else if (i === 6) {
        animatedBoxes[5].classList.remove("box-active");
      }
      if (i === 3 || i === 5) {
        continue;
      }
      await animationDelay(600);

      for (let j = 0; j < svgsIndexes[i].length; j++) {
        animatedBoxes[
          svgsIndexes[i][j] === 16 ? 1 : svgsIndexes[i][j]
        ].classList.remove("box-active");
        if (i !== 3 && i !== 5) {
          svgPaths[svgsIndexes[i][j]].style.display = "none";
          svgPaths[svgsIndexes[i][j]].style.animationPlayState = "paused";
        }
      }
      await animationDelay(500);
      if (i === 4 || i === 6) {
        svgPaths[svgsIndexes[i - 1][0]].style.display = "none";
        svgPaths[svgsIndexes[i - 1][0]].style.animationPlayState = "paused";
      }
      if (i === svgsIndexes.length - 1) {
        i = -1;
      }
    }
  })();