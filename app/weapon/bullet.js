var Bullet = (function () {
    function Bullet(x, y, r) {
        this.radius = 5;
        this.lifetime = 15;
        this.velocity = 0.001;
        this.radius = r || this.radius;
        var options = {
            friction: 1,
            frictionAir: 1,
            restitution: 1,
            label: 'bullet'
        };
        this.body = Bodies.circle(x, y, this.radius, options);
        World.add(engine.world, this.body);
    }
    Bullet.prototype.setAngle = function (angle) {
        this.body.angle = angle;
    };
    Bullet.prototype.update = function () {
        var x = this.velocity * cos(this.body.angle);
        var y = this.velocity * sin(this.body.angle);
        var nextMove = Vector.create(x, y);
        Matter.Body.applyForce(this.body, this.body.position, nextMove);
    };
    Bullet.prototype.show = function () {
        this.update();
        push();
        translate(this.body.position.x, this.body.position.y);
        rotate(this.body.angle);
        strokeWeight(1);
        fill(0);
        ellipse(0, 0, this.radius * 2, this.radius * 2);
        pop();
    };
    return Bullet;
}());
//# sourceMappingURL=bullet.js.map