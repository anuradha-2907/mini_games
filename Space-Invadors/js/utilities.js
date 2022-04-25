

var SI = {},

    _ = {

        /**
         * extend
         * extends one object into another (hard over-write)
         *
         * @param object {Object}
         * @param extend {Object}
         * @returns {Object}
         */
        extend: function (object, extend) {

            for (var prop in extend) {
                if (extend.hasOwnProperty(prop)) {
                    object[prop] = extend[prop];
                }
            }

            return object;
        },


        /**
         * clone
         * shallow clone of an object
         *
         * @param extend {Object}
         * @returns {Object}
         */
        clone: function (extend) {

            var object = {};

            for (var prop in extend) {
                if (extend.hasOwnProperty(prop)) {
                    object[prop] = extend[prop];
                }
            }

            return object;
        },


        /**
         * events object
         */
        events: {},


        /**
         * listenTo
         * @param id
         * @param callback
         * @param scope
         */
        listenTo: function (id, callback, scope) {

            var prop;

            if (typeof id === 'object') {

                for (prop in id) {
                    if (id.hasOwnProperty(prop)) {
                        _.events[prop] = _.events[prop] || [];
                        id[prop].scope = callback || null;

                        _.events[prop].push(id[prop]);
                    }
                }
            } else {

                _.events[id] = _.events[id] || [];

                if (scope) {
                    callback.scope = scope;
                }

                _.events[id].push(callback);
            }
        },


        /**
         * trigger
         * triggers registered callback in scope if supplied
         */
        trigger: function () {

            var args = Array.prototype.slice.call(arguments),
                id = args.shift();

            if (_.events[id] && _.events[id].length) {

                _.events[id].forEach(function (callback) {
                    callback.apply(callback.scope || this, args);
                }, this);
            }
        },


        /**
         * isEven
         *
         * @param n {Number}
         * @returns {boolean}
         */
        isEven: function (n) {
            return (n % 2 === 0);
        },


        /**
         * isOdd
         *
         * @param n {Number}
         * @returns {boolean}
         */
        isOdd: function (n) {
            return (n % 2 !== 0);
        },


        /**
         * isBetween
         *
         * @param lower
         * @param upper
         * @param number
         * @returns {boolean}
         */
        isBetween: function (lower, upper, number) {
            return (number >= lower && number <= upper);
        },


        /**
         * values
         *
         * @param object {Object}
         * @returns {Array}
         */
        values: function (object) {

            var values = [],
                prop;

            for (prop in object) {
                if (object.hasOwnProperty(prop)) {
                    values.push(object[prop]);
                }
            }

            return values;
        }
    };