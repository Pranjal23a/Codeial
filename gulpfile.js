const gulp = require('gulp');
const sass = require('gulp-sass')(require('node-sass'));
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify-es').default;

const revPromise = import('gulp-rev');
const imageminPromise = import('gulp-imagemin');
const delPromise = import('del');

gulp.task('css', async (done) => {
    console.log('Minifying CSS');
    gulp.src('./assets/sass/**/*.scss')
        .pipe(sass())
        .pipe(cssnano())
        .pipe(gulp.dest('./assets.css'));
    console.log('Minified CSS');

    const revModule = await revPromise;
    const rev = revModule.default;

    return gulp.src('./assets/**/*.css')
        .pipe(rev())
        .pipe(gulp.dest('./public/assets'))
        .pipe(rev.manifest({
            cwd: 'public',
            merge: true
        })).pipe(
            gulp.dest('./public/assets')
        );
    done();
});

gulp.task('js', async (done) => {
    console.log('minifying js...');
    const revModule = await revPromise;
    const rev = revModule.default;
    gulp.src('./assets/**/*.js')
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('./public/assets'))
        .pipe(rev.manifest({
            cwd: 'public',
            merge: true,
        }))
        .pipe(gulp.dest('./public/assets'))
    done();
})

gulp.task('images', async (done) => {
    console.log('Compressing Images');
    const imageminModule = await imageminPromise;
    const imagemin = imageminModule.default;
    const revModule = await revPromise;
    const rev = revModule.default;
    gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
        .pipe(imagemin())
        .pipe(rev())
        .pipe(gulp.dest('./public/assets'))
        .pipe(rev.manifest({
            cwd: 'public',
            merge: true,
        }))
        .pipe(gulp.dest('./public/assets'))
    done();
})

// empty the public /assets directory
gulp.task('clean:assets', async (done) => {
    console.log('empty the public /assets directory');
    const delModule = await delPromise;
    const delFn = delModule.default;

    delFn.sync(['./public/assets'], { force: true });
    done();
});
gulp.task('build', gulp.series('css', 'js', 'images'), function (done) {
    console.log('Building assets');
    done();
})