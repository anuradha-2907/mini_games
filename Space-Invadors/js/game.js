

(function () {

    var canvas = new SI.Canvas(),
        running = true,

        /**
         * start frame listeners
         *
         * @method  start
         */
        start = function () {

            running = true;

            _.trigger('frame:change', window.requestAnimationFrame(render));
        },


        /**
         * stop frame refresh
         *
         * @method  stop
         */
        stop = function () {
            running = false;
        },


        /**
         * main render method, passed to requestAnimationFrame();
         *
         * @method  render
         */
        render = function () {

            if (running) {
                _.trigger('frame:change');

                window.requestAnimationFrame(render);
            }
        };

    // pause the game on blur
    window.addEventListener('blur', stop, false);
    // start again on focus
    window.addEventListener('focus', start, false);
    // DOM events
    document.addEventListener('keydown', function (evt) {
        _.trigger('key:down', evt.keyCode);
    });
    // key up
    document.addEventListener('keyup', function () {
        _.trigger('key:up');
    });
    // start game
    start();
    // listen for the end game
    _.listenTo('game:over', stop, false);
} ());
