"use strict";
class Sprite {
    constructor(imageUrl, x, y, width, height) {
        this.image = new Image();
        this.image.src = imageUrl;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    update() {
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.height;
    }
}
