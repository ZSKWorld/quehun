Object.defineProperties(Array.prototype, {
    "upset": {
        value: function () {
            const length = this.length;
            for (let i = length - 1; i >= 0; i--) {
                const index1 = Math.floor(Math.random() * length);
                const index2 = Math.floor(Math.random() * length);
                const temp = this[index1];
                this[index1] = this[index2];
                this[index2] = temp;
            }
            return this;
        },
        enumerable: false,
        configurable: false,
    }
});

Object.defineProperties(Object.prototype, {
    "$name": {
        get() { return this.constructor.name; },
        enumerable: false,
        configurable: false,
    }
});

const replaceTemplate = ["{0}", "{1}", "{2}", "{3}", "{4}", "{5}", "{6}", "{7}", "{8}", "{9}",];
Object.defineProperties(String, {
    "format": {
        value: function (template, ...args) {
            const len = args.length;
            for (let i = 0; i < len; i++) {
                template = template.replaceAll(replaceTemplate[i] || `{${i}}`, args[i]);
            }
            return template;
        },
        enumerable: false,
        configurable: false,
    }
});
