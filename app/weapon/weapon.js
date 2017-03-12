var Weapon = (function () {
    function Weapon(parent) {
        this.shotsMax = 1;
        this.fired = [];
        this.isDefault = false;
        this.parent = parent;
    }
    Weapon.prototype.setDefault = function (flag) {
        this.isDefault = flag;
    };
    Weapon.prototype.fire = function () {
    };
    Weapon.prototype.update = function () {
    };
    Weapon.prototype.show = function () {
    };
    return Weapon;
}());
//# sourceMappingURL=weapon.js.map