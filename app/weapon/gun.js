var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Gun = (function (_super) {
    __extends(Gun, _super);
    function Gun(parent) {
        var _this = _super.call(this, parent) || this;
        _this.length = 20;
        _this.thikness = 6;
        _this.x = -_this.thikness / 4 + 0.5;
        _this.body = Bodies.rectangle(_this.x, _this.y, _this.thikness, _this.length, _this.options);
        _this.body.angle = -PI / 2;
        return _this;
    }
    Gun.prototype.show = function () {
        rotate(this.body.angle);
        rect(this.body.position.x, this.body.position.y, this.thikness, this.length);
    };
    return Gun;
}(Weapon));
//# sourceMappingURL=gun.js.map