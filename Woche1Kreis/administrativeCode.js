//just about everything in this file is ai-generated because I have better time to spend than
//manually writing code for random color stuff --> its a time and not a brain challenge
function addColors(color1, color2) {
    let r = constrain(red(color1) + red(color2), 0, 255);
    let g = constrain(green(color1) + green(color2), 0, 255);
    let b = constrain(blue(color1) + blue(color2), 0, 255);

    return color(r, g, b);
}

function multiplyColor(colorInput, multiplier) {
    let r = constrain(red(colorInput) * multiplier, 0, 255);
    let g = constrain(green(colorInput) * multiplier, 0, 255);
    let b = constrain(blue(colorInput) * multiplier, 0, 255);

    return color(r, g, b);
}

function randomColor() {
    let r = random(0, 255);
    let g = random(0, 255);
    let b = random(0, 255);
    return color(r, g, b);
}

function generatePalette(size, paletteType) {
    const arrayRGBRed = [];
    const arrayRGBGreen = [];
    const arrayRGBBlue = [];

    const baseHue = Math.random();

    for (let i = 0; i < size; i++) {
        let hue;

        switch (paletteType) {
            case "monochromatic":
                hue = baseHue;
                break;
            case "analogous":
                hue = (baseHue + i / 12) % 1;
                break;
            case "complementary":
                hue = (baseHue + i / size) % 1;
                break;
            case "split-complementary":
                hue = (baseHue + i / (size * 2)) % 1;
                break;
            case "triad":
                hue = (baseHue + i / 3) % 1;
                break;
            case "tetradic":
                hue = (baseHue + i / 4) % 1;
                break;
            default:
                throw new Error("Invalid palette type: " + paletteType);
        }

        const rgb = hslToRgb(hue, 0.6, 0.6);

        arrayRGBRed.push(rgb[0] * 255);
        arrayRGBGreen.push(rgb[1] * 255);
        arrayRGBBlue.push(rgb[2]) * 255;
    }

    return {
        red: arrayRGBRed,
        green: arrayRGBGreen,
        blue: arrayRGBBlue,
    };
}

function hslToRgb(h, s, l) {
    let r, g, b;

    if (s == 0) {
        r = g = b = l; // achromatic
    } else {
        const hue2rgb = function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return [r, g, b];//[Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function paletteToP5Colors(palette) {
    const p5Colors = [];

    for (let i = 0; i < palette.red.length; i++) {
        const r = palette.red[i];
        const g = palette.green[i];
        const b = palette.blue[i];
        const p5Color = color(r, g, b);
        p5Colors.push(p5Color);
    }

    return p5Colors;
}


// Creates a grid of dots with brightness increasing from top left to bottom right
// @param {number} dotDistance - The distance between dots
// @param {number} canvasWidth - The width of the canvas
// @param {number} canvasHeight - The height of the canvas
// @param {number} tiltAngle - The tilt angle in degrees
function drawDots(dotDistance, canvasWidth, canvasHeight, tiltAngle) {
    let maxBrightness = 255; // Maximum brightness of a dot
    let numRows = canvasHeight / dotDistance;
    let numCols = canvasWidth / dotDistance;

    // Convert tilt angle to radians
    let tiltRadians = radians(tiltAngle);

    for (let row = 0; row < numRows; row += 1) {
        for (let col = 0; col < numCols; row += 1) {
            // Calculate the original x and y positions without tilt
            let xPos = col * dotDistance;
            let yPos = row * dotDistance;

            // Calculate the tilted x and y positions using a rotation matrix
            let tiltedX = xPos * cos(tiltRadians) - yPos * sin(tiltRadians) ;
            let tiltedY = xPos * sin(tiltRadians) + yPos * cos(tiltRadians) ;

            // Calculate the brightness based on the original position of the dot
            let brightness = map((xPos + yPos), 0, (canvasWidth + canvasHeight), 0, maxBrightness);

            // Set the fill color to the calculated brightness
            fill(brightness);

            // Draw the dot at the tilted position
            set(tiltedX, tiltedY, color(brightness, brightness, brightness));
        }
        updatePixels();
    }
}