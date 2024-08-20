const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const frames = {
    currentIndex: 0,
    MaxIndex: 382
};

let imageLoaded = 0;
const images = [];

function preloadeImages() {
    for (i = 1; i <= frames.MaxIndex; i++) {
        const imageUrl = `./Frames/frame_${i.toString().padStart(4, "0")}.jpeg`
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
            imageLoaded++;
            if (imageLoaded === frames.MaxIndex) {
                loadImage(frames.currentIndex);
                startAnimation();
            }
        }
        images.push(img);
    }
}

function loadImage(index) {
    if (index >=0 && index <= frames.MaxIndex) {
        const img = images[index];
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const scaleX = canvas.width / img.width;
        const scaleY = canvas.height / img.height;
        const scale = Math.max(scaleX, scaleY);

        const newWidth = img.width * scale;
        const newHeight = img.height * scale;

        const offsetX = (canvas.width - newWidth) / 2;
        const offsetY = (canvas.height - newHeight) / 2;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high"
        context.drawImage(img, offsetX, offsetY, newWidth, newHeight);
        frames.currentIndex = index;
    }
}

function startAnimation(){
    var tl = gsap.timeline({
        scrollTrigger: {
            trigger: "#workingarea",
            start:"top top",
            scrub: 2, 
            markers: true,
        }
    })

    tl.to(frames, {
        currentIndex: frames.MaxIndex,
        onUpdate: function(){
            loadImage(Math.floor(frames.currentIndex))
        }
    })
}

preloadeImages();


