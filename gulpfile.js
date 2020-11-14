const gulp = require('gulp')
const rename = require('gulp-rename')
const sass = require('gulp-sass')
sass.compiler = require('node-sass');
const cleanCSS = require('gulp-clean-css')
const connect = require('gulp-connect')
const uglify = require('gulp-uglify')
gulp.task('copy',function(){
    gulp.src('html/*.html')
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload())
})
gulp.task('image',function(){
    gulp.src('images/**/*')
    .pipe(gulp.dest('dist/images'))
    .pipe(connect.reload())
})
gulp.task('scss',function(){
    gulp.src('css/*{sass,scss}')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename('index.min.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload())
})
gulp.task('script',function(){
    gulp.src('js/*.js')
    .pipe(gulp.dest('dist/js'))
    .pipe(uglify())
    .pipe(rename(function(path){
        path.basename = path.basename + '.min'
    }))
    .pipe(glup.dest('dist/js'))
    .pipe(connect.reload())

})
gulp.task('icon',function(){
    gulp.src('iconfont/**/*')
    .pipe(gulp.dest('dist/iconfont'))
    .pipe(connect.reload)
})
gulp.task('build',['image','scss','copy','icon'],function(){})
gulp.task('watch',function(){
    gulp.watch('index.html',['copy'])
    gulp.watch('images/**/*',['image'])
    gulp.watch('css/index.scss',['scss'])
    gulp.watch('iconfont/**/*',['icon'])
})
gulp.task('server',function(){
    connect.server({
        root:'dist',
        port:5625,
        livereload:true
    })
})
gulp.task('default',['watch','server'])
