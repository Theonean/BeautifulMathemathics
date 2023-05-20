function drawWordsSinus(words) {
    textSize(40);
    textAlign(CENTER, CENTER);
    const frequency = TWO_PI / words.length;

    let xOffset = 0; // Offset for the X coordinate to add proper spacing

    for (let index = 0; index < words.length; index++) {
        let x = map(index, 0, words.length, -width / 2, width / 2) + xOffset;
        let y = sin(frequency * index) * height / 4;
        let z = -100;
        let angle = atan(cos(frequency * index));
        let wordWidth = textWidth(words[index]); // Calculate width of the current word

        push();
        translate(x, y, z);
        rotate(angle);
        text(words[index], 0, 0);
        fill(0, 102, 153);
        pop();

        xOffset += wordWidth; // Add the width of the current word to the offset
    }
}

function drawDonutText(words, outRadius, innerRadius, segments = 8.8, steps = 2.5) {
    let detail = TWO_PI / segments;
    let wordIndex = 0;

    for (let outerI = 0; outerI <= TWO_PI + 0.1; outerI += detail) {
        for (let innerI = 0; innerI <= TWO_PI; innerI += detail) {
            for (let index = 0; index < steps; index++) {
                let xc = outRadius * cos(outerI + (detail) * index);
                let yc = outRadius * sin(outerI + (detail) * index);

                let xr = xc * cos(innerI);
                let zr = xc * sin(innerI);

                let xmid = innerRadius * cos(innerI);
                let zmid = innerRadius * sin(innerI);

                if (wordIndex < words.length - 1) {
                    text(words[wordIndex], xr + xmid, yc, zr + zmid);
                    wordIndex++;
                }
                else {
                    wordIndex = 0;
                }
            }
        }
    }
}

function drawCylinder(words, radius, height, numSegments, offset) {
    let wordIndex = 0;

    for (let i = 0; i <= numSegments; i++) {
        let angle = i * TWO_PI / numSegments;

        let x = radius * cos(angle);
        let y = radius * sin(angle);

        if (wordIndex < words.length - 1) {
            text(words[wordIndex], height / 2, x + offset[0], y + offset[1]);     // Bottom circle vertex
            fill(0, 102, 153);
            wordIndex++;
        }
        else {
            wordIndex = 0;
        }
        vertex(0, x + offset[0], y + offset[1]);     // Bottom circle vertex
        vertex(height, x + offset[0], y + offset[1]); // Top circle vertex
    }

    endShape(CLOSE);
}

function drawWordOnCircle(words, angle = 0, angleDecrement = 0.001) {
    textSize(20);
    textAlign(CENTER, CENTER);
    fill(0, 102, 153);

    let angleIncrement = 0.8 - angleDecrement;  // You can adjust this to control the spacing between the words
    let radiusIncrement = 1.008;  // You can adjust this to control how quickly the spiral expands
    let radius = 1;

    // Center of the spiral
    let cx = 0;
    let cy = 0;
    let z = 20;

    for (let word of words) {
        textSize(z);
        let x = cx + radius * cos(angle);
        let y = cy + radius * sin(angle);
        // Save the current transformation matrix
        push();
        // Translate and rotate
        translate(x, y);
        rotate(angle + HALF_PI);  // Rotate 90 degrees so the words stand upright
        // Draw the word
        text(word, 0, 0);
        // Restore the transformation matrix
        pop();
        angle += angleIncrement;
        radius = radius * radiusIncrement;  // Increment the radius for each word
        z += 0.01;
    }
}

