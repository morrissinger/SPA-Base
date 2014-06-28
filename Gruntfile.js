module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jekyll: {
      options: {                          // Universal options
        bundleExec: true,
        src : '<%= app %>'
      },
      serve: {                            // Another target
        options: {
          src: 'public',
          dest: '.jekyll/public',
          serve: true
        }
      }      
    },
    watch: {
      project: {
        files: ['public/*', 'public/css/*.css', 'public/js/*.js'],
        tasks: ['sync:update'],
        options: {
          interrupt: true,
          livereload: true
        }
      }
    },
    sync: {
      update: {
        files: [{
          cwd: 'public',
          src: [
            '**', /* Include everything */
          ],
          dest: '.jekyll/public',
        }],
        verbose: true // Display log messages when copying files
      }
    },
    concurrent: {
      serve: {
        options: {
          logConcurrentOutput: true
        },
        tasks: ['watch:project', 'jekyll']
      }
    }
  });

  grunt.loadNpmTasks('grunt-sync');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-concurrent');

  // Default task(s).
  grunt.registerTask('default', ['concurrent:serve']);

};