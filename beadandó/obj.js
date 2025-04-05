function Image(src, x, y, width, height) {
    this.kep = document.createElement("img");
    this.kep.src = src;
    this.kep.style.position = "absolute";
    this.kep.style.left = x+"px";
    this.kep.style.top = y+"px";
    this.kep.width = width;
    this.kep.height = height;
    document.body.appendChild(this.kep);
}
Image.prototype.show = function() {
    this.kep.style.visibility = "visible";
}
Image.prototype.hide = function() {
    this.kep.style.visibility = "hidden";
}
Image.prototype.putAt = function(x,y) {
    this.kep.style.left = x+"px";
    this.kep.style.top = y+"px";
}
Image.prototype.resize = function(width, height) {
    this.kep.width = width;
    this.kep.height = height;
}
