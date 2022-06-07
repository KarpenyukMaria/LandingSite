const gulp=require('gulp');
const browserSync =require('browser-sync').create();
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const spritesmith = require('gulp.spritesmith');

// server
gulp.task('server',function (){
    browserSync.init({
        server:{
            port:9000,
            baseDir:"build"
        }
    });

gulp.watch('build/**/*').on('change',browserSync.reload);
});

// pug compile

gulp.task('templates:compile', function buildHTML(){
    return gulp.src('source/template/index.pug')
        .pipe(pug({
            pretty:true
        }))
        .pipe(gulp.dest('build'))
})
  //style compile

function buildStyles() {
    return gulp.src('source/style/main.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('.build/css'));
};

exports.buildStyles = buildStyles;
exports.watch = function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
};

//gulp-sprite


gulp.task('sprite', function () {
    var spriteData = gulp.src('source/images/icons/*.png').pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.css'
    }));
    return spriteData.pipe(gulp.dest('build/images/'));

});