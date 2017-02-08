const gulp = require('gulp');
const less = require('gulp-less');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserify = require('browserify');
const babelify = require('babelify');
const uglify = require('gulp-uglify');

gulp.task('default', ['copy', 'less', 'js']);

gulp.task('w', ['copy', 'less', 'js'], () => {
    gulp.watch('app/js/**/**/*.js', ['js']);
    gulp.watch('app/less/**/*.less', ['less']);
});

gulp.task('copy', () => {
    return gulp.src([
            'node_modules/angular/angular.min.js',
            'node_modules/angular-route/angular-route.min.js',
            'node_modules/quill/dist/quill.min.js',
            'node_modules/quill/dist/quill.snow.css'
        ])
        .pipe(gulp.dest('./app/assets'));
})

gulp.task('less', () => {
    return gulp.src('app/less/style.less')
        .pipe(less())
        .pipe(gulp.dest('./app/assets'));
});

gulp.task('js', () => {
    return browserify('app/js/index.js')
        .transform(babelify, { presets: ['es2015'] })
        .bundle()
        .pipe(source('script.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./app/assets'));
});
