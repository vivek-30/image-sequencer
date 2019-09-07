module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify-es');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  require('matchdep')
    .filterDev('grunt-*')
    .forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      options: {
        livereload: true
      },
      source: {
        files: ['src/**/*', 'Gruntfile.js', 'examples/lib/*', 'examples/demo.js'],
        tasks: ['compile']
      }
    },

    browserify: {
      core: {
        src: ['src/ImageSequencer.js'],
        dest: 'dist/image-sequencer.js'
      },
      ui: {
        src: ['examples/demo.js'],
        dest: 'dist/image-sequencer-ui.js'
      },
      prodcore: {
        src: ['src/ImageSequencer.js'],
        dest: 'dist/image-sequencer.brow.js'
      },
      produi: {
        src: ['examples/demo.js'],
        dest: 'dist/image-sequencer-ui.brow.js'
      }
    },

    uglify: {
      core: {
        src: ['./dist/image-sequencer.js'],
        dest: './dist/image-sequencer.min.js'
      },
      ui: {
        src: ['dist/image-sequencer-ui.js'],
        dest: 'dist/image-sequencer-ui.min.js'
      },
      prodcore: {
        src: ['dist/image-sequencer.brow.js'],
        dest: 'dist/image-sequencer.js'
      },
      produi: {
        src: ['dist/image-sequencer-ui.brow.js'],
        dest: 'dist/image-sequencer-ui.js'
      }
    },

    browserSync: {
      dev: {
        options: {
          watchTask: true,
          server: './'
        }
      }
    },

    
    jasmine: {
      imageSequencer: {
        src: 'dist/*.js',
        options: {
          specs: 'test/ui/spec/*spec.js',
          vendor: [
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/bootstrap/dist/js/bootstrap.min.js',
            'node_modules/jasmine-jquery/lib/jasmine-jquery.js',
          ] 
        }
      }
    }
  });

  /* Default (development): Watch files and build on change. */
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', ['browserify:core', 'browserify:ui', 'uglify:core', 'uglify:ui']);
  grunt.registerTask('serve', ['browserify:core', 'browserify:ui', 'browserSync', 'watch']);
  grunt.registerTask('compile', ['browserify:core', 'browserify:ui']);
  grunt.registerTask('production', ['browserify:prodcore', 'browserify:produi', 'uglify:prodcore', 'uglify:produi']);
};
