var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Gun = (function (_super) {
    __extends(Gun, _super);
    function Gun(parent) {
        var _this = _super.call(this, parent) || this;
        _this.bulletRadius = 5;
        return _this;
    }
    Gun.prototype.fire = function () {
        var distance = this.parent.width / 2 + this.bulletRadius * 1.5;
        var x = distance * cos(this.parent.body.angle);
        var y = distance * sin(this.parent.body.angle);
        var pV = Vector.add(this.parent.body.position, Vector.create(x, y));
        var bullet = new Bullet(pV.x, pV.y, this.bulletRadius);
        bullet.setAngle(this.parent.body.angle);
        this.fired.push(bullet);
    };
    Gun.prototype.update = function () {
    };
    Gun.prototype.show = function () {
        this.update();
        this.fired.forEach(function (shot) {
            shot.show();
        });
    };
    return Gun;
}(Weapon));
//# sourceMappingURL=gun.js.map