module.exports = function(grunt) {
  grunt.initConfig({
    /*sass: {
      dist: {
        options: {
          *//*sourcemap: 'none',*//*
          style: 'compressed',
          trace: false
        },
        files: {
          'dist/css/app.css': 'src/scss/app.scss'
        }
      },
      dev: {
        options: {
          sourcemap: 'inline',
          style: 'expanded',
          trace: true
        },
        files: {
          'dist/css/app.css': 'src/scss/app.scss'
        }
      }
    },*/
    uncss: {
      dist: {
        files: {
          'src/css/app.un.css': ['src/index.html']
        }
      },
      first: {
        files: {
          'dist/css/app.un.css': ['dist/index.html']
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 8', 'ie 9', 'ie 10', 'ie 11'],
        silent: true
      },
      dist: {
        expand: true,
        flatten: true,
        src: 'src/css/*.css',
        dest: 'src/css/'
      },
      first: {
        src: 'dist/css/app.un.css',
        dest: 'dist/css/app.pfx.css'
      },
      dev: {
        expand: true,
        flatten: true,
        src: 'src/css/*.css',
        dest: 'src/css/'
      }
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      dist: {
        files: {
          'dist/css/app.min.css': ['src/css/app.pfx.css']
        }
      },
      dev: {
        files: {
          'dist/css/app.min.css': ['src/css/app.pfx.css']
        }
      },
      first: {
        files: {
          'dist/css/app.min.css': ['dist/css/app.pfx.css']
        }
      }
    },
    react: {
      dist: {
        files: [
          {
            expand: true,
            cwd: 'src/js/jsx',
            src: ['src/js/jsx/**/*.jsx'],
            dest: 'src/js',
            ext: '.js'
          }
        ]
      }
    },
    uglify: {
      dist: {
        options: {
          compress: true,
          wrap: false,
          mangle: false
        },
        files: [
          {
            src: [
              'src/js/util.js',
              'src/lib/snabbt.js/snabbt.min.js',
              'src/js/app.js'
            ],
            dest: 'dist/js/app.min.js'
          }
        ]
      },
      first: {
        options: {
          compress: true,
          wrap: false,
          mangle: false
        },
        files: [
          {
            src: [
              'src/lib/react/react-with-addons.min.js',
              'src/lib/flux/dist/Flux.js',
              'src/lib/snabbt.js/snabbt.min.js',
              'src/js/app.js'
            ],
            dest: 'dist/js/app.min.js'
          }
        ]
      },
      dev: {
        options: {
          compress: false,
          beautify: true,
          mangle: false,
          wrap: false
        },
        files: [
          {
            src: [
              'src/js/util.js',
              'src/lib/react/react-with-addons.min.js',
              'src/lib/flux/dist/Flux.js',
              'src/lib/snabbt.js/snabbt.min.js',
              'src/js/app.js'
            ],
            dest: 'dist/js/app.min.js'
          }
        ]
      }
    },
    imagemin: {
      dynamic: {
        options: {
          svgoPlugins: [{ removeViewBox: false }]
        },
        files: [{
          expand: true,
          cwd: 'src/img',
          src: ['**/*.{gif,svg}'],
          dest: 'dist/img'
        }]
      },
      dev: {
        options: {
          optimizationLevel: 3,
          svgoPlugins: [{ removeViewBox: false }]
        },
        files: [{
          expand: true,
          cwd: 'src/img',
          src: ['**/*.{png,jpg,gif,svg}'],
          dest: 'dist/img'
        }]
      }
    },
    tinypng: {
      options: {
        apiKey: 'yDv-_0JPQBPvgC7ZdBVgkg4MeuyxylVM',
        checkSigs: true,
        sigFile: 'src/img/image_sigs.json',
        summarize: true,
        showProgress: false,
        stopOnImageError: false
      },
      dynamic: {
        expand: true,
        cwd: 'src/img',
        src: ['**/*.{png,jpg}'],
        dest: 'dist/img'
      }
    },
    watch: {
      configFiles: {
        options: {
          debounceDelay: 25,
          reload: true
        },
        files: ['Gruntfile.js']
      },
      sass: {
        options: {
          debounceDelay: 25,
          spawn: false,
          atBegin: true
        },
        files: ['src/scss/**/*'],
        tasks: ['sass:dev']
      },
      gifsvg: {
        options: {
          debounceDelay: 25,
          spawn: false,
          atBegin: true
        },
        files: [
          'src/img/*.{gif,svg}'
        ],
        tasks: ['newer:imagemin']
      },
      pngjpg: {
        options: {
          debounceDelay: 25,
          spawn: false,
          atBegin: true
        },
        files: [
          'src/img/*.{png,jpg}'
        ],
        tasks: ['tinypng']
      },
      jsx: {
        options: {
          debounceDelay: 25,
          spawn: false,
          atBegin: true
        },

        files: [
          'src/js/**/*.jsx'
        ],
        tasks: ['react','uglify:dev']
      },
      scripts: {
        options: {
          debounceDelay: 25,
          spawn: false,
          atBegin: true
        },
        files: [
          'src/lib/**/*.js'
        ],
        tasks: ['uglify:dev']
      }
    }
  });

  grunt.loadNpmTasks('grunt-newer');
  /*grunt.loadNpmTasks('grunt-contrib-sass');*/
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-uncss');
  grunt.loadNpmTasks('grunt-react');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-tinypng');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('first', [/*'sass:dist', */ 'uncss:first','autoprefixer:first', 'cssmin:first', 'react:dist', 'uglify:first', 'newer:imagemin', 'tinypng']);
  grunt.registerTask('default', [/*'sass:dist', */ 'autoprefixer:dist', 'cssmin:dist', 'uncss:dist', 'react:dist', 'uglify:dist', 'newer:imagemin', 'tinypng']);
  grunt.registerTask('build', [/*'sass:dist', */ 'autoprefixer:dist', 'cssmin:dist', 'uncss:dist', 'react:dist', 'uglify:dist', 'imagemin', 'tinypng']);
  grunt.registerTask('dev', [/*'sass:dev', */ 'autoprefixer:dev', 'cssmin:dev', 'uncss:dev', 'react:dev', 'uglify:dev', 'newer:imagemin', 'tinypng']);
};
