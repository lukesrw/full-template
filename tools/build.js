const { exec } = require("child_process");
const { stat } = require("fs/promises");
const { join } = require("path");

/**
 * @param {string} title heading
 * @returns {void}
 */
function output(title) {
    console.log(`Watching ${title}`);

    return (error, stdout, stderr) => {
        error = error || stderr;

        if (error.length) {
            console.log(`${title}:`);
            console.error(error);
        } else if (stdout.length) {
            console.log(`${title}:`);
            console.log(stdout);
        }
    };
}

module.exports = async () => {
    let exists = {
        public: true,
        scss: true,
        ts: true,
        vue: true
    };

    for (let directory in exists) {
        if (Object.prototype.hasOwnProperty.call(exists, directory)) {
            try {
                await stat(join(__dirname, "..", directory));
            } catch (_1) {
                exists[directory] = false;
            }
        }
    }

    if (exists.ts) {
        exec("tsc --project ts --watch", output("./ts for ./js"));
    }

    if (exists.vue) {
        exec(
            "vue-cli-service build --watch ./vue/main.js",
            output("./vue for ./dist")
        );
    }

    if (exists.scss) {
        if (exists.vue) {
            exec(
                "sass --watch ./scss:./dist/css/scss",
                output("./scss for ./dist/css/scss")
            );
        }
        if (exists.public || !exists.vue) {
            exec(
                "sass --watch ./scss:./public/css/scss",
                output("./scss for ./public/css/scss")
            );
        }
    }
};

if (!module.parent) module.exports();
