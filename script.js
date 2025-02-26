var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var centerX = canvas.width / 2;
var centerY = canvas.height / 2;
var maxRadius = Math.min(canvas.width, canvas.height) * 0.3;

var largeRadius = Math.min(canvas.width, canvas.height) * 0.42;
var smallRadius = maxRadius * 1.5;
var numImages = 5;
var angleStep = (2 * Math.PI) / numImages;
var images = [];

var isAnimating = true;
var rotationAngle = 0;
var clickedImageIndex = null;
var rotationSpeed = 0.0009;
var gradientSpeed = 5;

var ariaLiveRegion = document.createElement("div");
ariaLiveRegion.setAttribute("id", "aria-live-region");
ariaLiveRegion.setAttribute("aria-live", "polite");
ariaLiveRegion.setAttribute("aria-atomic", "true");
ariaLiveRegion.style.position = "absolute";
ariaLiveRegion.style.width = "1px";
ariaLiveRegion.style.height = "1px";
ariaLiveRegion.style.margin = "-1px";
ariaLiveRegion.style.padding = "0";
ariaLiveRegion.style.border = "none";
ariaLiveRegion.style.clip = "rect(0,0,0,0)";
ariaLiveRegion.style.clipPath = "inset(100%)";
ariaLiveRegion.style.whiteSpace = "nowrap";
document.body.appendChild(ariaLiveRegion);

var imageSources = ["1.jpg", "11.jpg", "6.jpg", "8.jpg", "10.jpg"];
imageSources.forEach(function (src, index) {
  var img = document.createElement("img");
  img.src = src;
  img.alt = "Image " + (index + 1);
  img.style.display = "none";
  img.style.position = "absolute";
  img.style.width = "50px";
  img.style.height = "50px";
  img.style.borderRadius = "50%";
  img.tabIndex = 0;
  images.push(img);

  document.body.appendChild(img);

  img.onclick = (function (index) {
    return function () {
      clickedImageIndex = index;
      drawCircleAndImages();
      updateAriaForCenterImage();
    };
  })(index);
});

function updateAriaForCenterImage() {
  if (clickedImageIndex !== null) {
    ariaLiveRegion.textContent =
      "You selected " + images[clickedImageIndex].alt;
  }
}

function drawCircleAndImages() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.arc(centerX, centerY, largeRadius, 0, 2 * Math.PI);
  ctx.fillStyle = "rgba(255, 0, 0, 0)";
  ctx.fill();
  ctx.lineWidth = 5;
  ctx.strokeStyle = "rgba(255, 0, 0, 0)";
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(centerX, centerY, smallRadius, 0, 2 * Math.PI);
  ctx.fillStyle = "rgba(255, 0, 0, 0)";
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = "rgba(255, 0, 0, 0)";
  ctx.stroke();

  if (clickedImageIndex !== null) {
    var img = images[clickedImageIndex];
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, smallRadius, 0, 2 * Math.PI);
    ctx.clip();

    var imgAspectRatio = img.width / img.height;
    var targetWidth = smallRadius * 2;
    var targetHeight = smallRadius * 2;

    if (imgAspectRatio > 1) {
      targetHeight = targetWidth / imgAspectRatio;
    } else {
      targetWidth = targetHeight * imgAspectRatio;
    }

    ctx.drawImage(
      img,
      centerX - targetWidth / 2,
      centerY - targetHeight / 2,
      targetWidth,
      targetHeight
    );
    ctx.restore();
  }
  for (var i = 0; i < numImages; i++) {
    var angle = angleStep * i + rotationAngle;
    var imgX = centerX + largeRadius * Math.cos(angle) - 20;
    var imgY = centerY + largeRadius * Math.sin(angle) - 20;
    var img = images[i];
    img.style.position = "absolute";
    img.style.left = imgX + "px";
    img.style.top = imgY + "px";
    img.style.display = "block";
    img.style.width = "50px";
    img.style.height = "50px";
    img.style.borderRadius = "50%";
    img.setAttribute("aria-hidden", "false");
    img.setAttribute("tabindex", "0");
  }
}

function animate() {
  if (isAnimating) {
    rotationAngle += rotationSpeed;
  }

  drawCircleAndImages();

  document.body.style.animationDuration = `${gradientSpeed / 10}s`;

  requestAnimationFrame(animate);
}

function addHoverEvents() {
  images.forEach(function (img) {
    img.addEventListener("mouseenter", function () {
      isAnimating = false;
    });
    img.addEventListener("mouseleave", function () {
      isAnimating = true;
    });
  });
}

animate();
addHoverEvents();

function detectZoom() {
  let initialWidth = window.innerWidth;
  let initialHeight = window.innerHeight;

  window.onresize = function () {
    if (
      window.innerWidth !== initialWidth ||
      window.innerHeight !== initialHeight
    ) {
      location.reload();
    }
  };
}
detectZoom();

var speedSlider = document.getElementById("speedSlider");
speedSlider.addEventListener("input", function () {
  rotationSpeed = speedSlider.value * 0.0009;
});

var gradientSpeedSlider = document.getElementById("gradientSpeedSlider");
gradientSpeedSlider.addEventListener("input", function () {
  gradientSpeed = 10 - ((gradientSpeedSlider.value - 1) * (8 - 0.05)) / (8 - 1);
});

var toggleButton = document.getElementById("toggleButton");
var sliderContainer = document.getElementById("sliderContainer");
var gradientSpeedSliderContainer = document.getElementById(
  "gradientSpeedSliderContainer"
);

toggleButton.addEventListener("click", function () {
  sliderContainer.style.display =
    sliderContainer.style.display === "none" ||
    sliderContainer.style.display === ""
      ? "block"
      : "none";
  gradientSpeedSliderContainer.style.display =
    gradientSpeedSliderContainer.style.display === "none" ||
    gradientSpeedSliderContainer.style.display === ""
      ? "block"
      : "none";

  if (sliderContainer.style.display === "none") {
    toggleButton.textContent = "-";
    toggleButton.classList.add("active");
  } else {
    toggleButton.textContent = "+";
    toggleButton.classList.remove("active");
  }
});
