var Weapon = (function () {
    function Weapon(parent) {
        this.shots = 1;
        this.lifetime = 15;
        this.isDefault = false;
        this.x = parent.body.position.x;
        this.y = parent.width / 2;
        this.options = {
            friction: 1,
            frictionAir: 1
        };
        this.parent = parent;
        // World.add(engine.world, this.body);
    }
    Weapon.prototype.setDefault = function (flag) {
        this.isDefault = flag;
    };
    Weapon.prototype.update = function () {
    };
    Weapon.prototype.show = function () {
    };
    return Weapon;
}());
//# sourceMappingURL=weapon.js.map