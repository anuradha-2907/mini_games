
// class for images
SI.Component = function (image, options) {

    this.image  = image;
    this.options = options;
    this.config = {};

    this.dying  = false;
    this.dead   = false;
    this.fades  = 0;
    this.score  = 0;

    this.draw();
};


_.extend(SI.Component.prototype, {

    // based on type
    matrix: [{
        // alien 1
        width: 26,
        height: 26,
        x: 0,
        y: 0
    }, {
        // alien 2
        width: 37,
        height: 26,
        x: 26,
        y: 0
    }, {
        // alien 3
        width: 39,
        height: 26,
        x: 63,
        y: 0
    }, {
        // space shit
        width: 26,
        height: 20,
        x: 0,
        y: 53
    }, {
        // bullet
        width: 2,
        height: 5,
        x: 12,
        y: 68
    }, {
        // dead
        width: 32,
        height: 20,
        x: 69,
        y: 53
    }],


    /**
     * update
     * updates options and re-draws
     *
     * @param opts {Object}
     */
    update: function (opts) {

        this.options = _.extend(this.options, opts);
        this.draw();
    },


    /**
     * getComponentType
     * returns the index of the matrix to determine the sprite coordinates to
     * use
     *
     * @returns {number}
     */
    getComponentType: function () {

        if (this.dying) {

            if (this.fades >= 5) {
                this.dead = true;
            } else {
                this.fades += 1;
            }

            return 5;
        }

        switch (this.options.alien) {
            case 0:
                this.score = 30;
                return this.options.alien;

            case 1:
            case 2:
                this.score = 20;
                return 1;

            case 3:
            case 4:
                this.score = 10;
                return 2;

            default:
                return (this.options.ship) ? 3 : 4;
        }
    },


    /**
     * draw
     */
    draw: function () {

        var component = this.getComponentType(),
            image = this.matrix[component],
            left,
            top;

        if (this.options.ship || this.options.bullet) {

            this.options.ctx.drawImage(
                this.image,
                image.x,
                image.y,
                image.width,
                image.height,
                this.options.left,
                this.options.top,
                image.width,
                image.height
            );

        } else {

            left = (this.options.index * 50) + this.options.left;
            top = (this.options.alien * 40) + this.options.top;

            this.options.ctx.drawImage(
                this.image,
                image.x,
                (this.options.arms) ? image.y : image.height,
                image.width,
                image.height,
                left,
                top,
                image.width,
                image.height
            );

            // update config on the class
            this.config = _.clone(image);
            this.config.left = left;
            this.config.top = top;
        }
    }
});