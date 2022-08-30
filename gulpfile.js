import  gulp from "gulp";

import { path } from "./gulp/config/path.js";

import { plugins } from "./gulp/config/plugins.js";

import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { img } from "./gulp/tasks/img.js";
import { otfToTtf,  ttfToWoff} from "./gulp/tasks/fonts.js";
import { sprite } from "./gulp/tasks/svgSprite.js";

global.app = {
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
    path: path,
    gulp: gulp,
    plugins: plugins
}

function watcher () {
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.files, reset)
    gulp.watch(path.watch.html, html)
    gulp.watch(path.watch.scss, scss)
    gulp.watch(path.watch.js, js)
    gulp.watch(path.watch.img, img)
}
export { sprite }
const fonts = gulp.series(otfToTtf, ttfToWoff);
const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, img));
const serverTasks = gulp.parallel(watcher, server);

const dev =  gulp.series(reset, mainTasks, serverTasks);
const build =  gulp.series(reset, mainTasks);

export { dev }
export { build }

gulp.task('default', dev);