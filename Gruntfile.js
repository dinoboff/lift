// Generated on 2014-03-18 using generator-angular 0.6.0-rc.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    yeoman: {
      // configurable paths
      app: require('./bower.json').appPath || 'app',
      dist: 'dist',
      build: 'build'
    },
    watch: {
      app: {
        files: [
          '<%= yeoman.app %>/styles/{,*/}*.{scss,sass}',
          '<%= yeoman.app %>/images/**/*',
          '<%= yeoman.app %>/scripts/**/*',
          '<%= yeoman.app %>/views/**/*',
          '<%= yeoman.app %>/*.html',
        ],
        tasks: ['build']
      },
    },
    autoprefixer: {
      options: ['last 1 version'],
      dist: {
        files: [{
          expand: true,
          cwd: 'app/styles/',
          src: '{,*/}*.css',
          dest: 'app/styles/'
        }]
      }
    },
    connect: {
      options: {
        port: 8888,
        hostname: '0.0.0.0',
        base: './'
      },
      app: {
        open: '/app'
      },
      build: {
        open: '/build'
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>',
          ]
        }]
      },
      build: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.build %>',
          ]
        }]
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/scripts/{,*/}*.js'
      ]
    },
    compass: {
      options: {
        sassDir: '<%= yeoman.app %>/styles',
        cssDir: '<%= yeoman.app %>/styles',
        generatedImagesDir: '<%= yeoman.app %>/images/generated',
        imagesDir: '<%= yeoman.app %>/images',
        javascriptsDir: '<%= yeoman.app %>/scripts',
        fontsDir: '<%= yeoman.app %>/fonts',
        importPath: '<%= yeoman.app %>/bower_components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/fonts',
        relativeAssets: false
      },
      app: {},
      server: {
        options: {
          debugInfo: true
        }
      }
    },
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/scripts/{,*/}*.js',
            '<%= yeoman.dist %>/styles/{,*/}*.css',
            '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= yeoman.dist %>/styles/fonts/*'
          ]
        }
      }
    },
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.build %>',
        flow: {
          html: {
            steps: {
              'js': ['concat'],
              'css': ['concat']
            },
            post: {}
          }
        }
      }
    },
    usemin: {
      html: ['<%= yeoman.build %>/**/*.html', '<%= yeoman.dist %>/**/*.html'],
      css: ['<%= yeoman.build %>/styles/**/*.css', '<%= yeoman.dist %>/styles/**/*.css'],
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= yeoman.build %>/images'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.build %>/images'
        }]
      }
    },
    cssmin: {
      dist: {
        files: {
          '<%= yeoman.dist %>/styles/main.css': [
            '<%= yeoman.build %>/styles/{,*/}*.css'
          ]
        }
      }
    },
    htmlmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.build %>',
          src: ['*.html', 'views/*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    copy: {
      build: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.build %>',
          src: [
            '*.{ico,txt}',
            '*.html',
            'views/*.html',
            '.htaccess',
            'images/{,*/}*',
            'fonts/*'
          ]
        },{
          expand: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.build %>',
          src: [
            'bower_components/bootstrap-sass-official/vendor/assets/fonts/bootstrap/*'
          ]
        }, {
          expand: true,
          cwd: 'app/bower_components/font-awesome',
          dest: '<%= yeoman.build %>',
          src: [
            'fonts/*'
          ]
        }]
      },
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.build %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '**/*',
            '!scripts/**/*',
            '!styles/**/*',
            '!*.html',
            '!views/**/*.html'
          ]
        }]
      }
    },
    concurrent: {},
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      },
      autoUnit: {
        configFile: 'karma.conf.js',
        autoWatch: true,
        singleRun: false
      }

    },
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.build %>/scripts',
          src: '*.js',
          dest: '<%= yeoman.dist %>/scripts'
        }]
      }
    },
    uglify: {
      dist: {
        files: {
          '<%= yeoman.dist %>/scripts/scripts.js': [
            '<%= yeoman.dist %>/scripts/scripts.js'
          ]
        }
      }
    }
  });

  /** Build tasks **/
  // TODO: check compass doesn't auto prefix css already.
  grunt.registerTask('build:css', ['compass:app', 'autoprefixer']);
  grunt.registerTask('build:assets', [
    'jshint',
    'clean:build',
    'build:css',
    'useminPrepare',
    'concat',
    'copy:build',
  ]);
  grunt.registerTask('build', ['build:assets','usemin']);

  /** dist task

    like build but minify assets and add revision to assets

  **/
  grunt.registerTask('dist', [
    'build:assets',
    'clean:dist',
    'copy:dist',
    'ngmin',
    'htmlmin',
    'cssmin',
    'uglify',
    'rev',
    'usemin'
  ]);

  /** Test tasks **/
  // TODO: add 2e2 tasks
  grunt.registerTask('test', ['jshint', 'karma:unit']);
  grunt.registerTask('autotest', ['jshint', 'karma:autoUnit']);

  /** misc **/
  grunt.registerTask('dev', ['build', 'connect:app', 'watch:app']);
  grunt.registerTask('default', ['jshint', 'test', 'build']);
};