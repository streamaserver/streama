module.exports = (grunt) ->
  grunt.loadNpmTasks 'grunt-coffeelint'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-testacular'

  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    meta:
      banner: '/* <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
    coffeelint:
      src: 'src/**/*.coffee'
      options:
        max_line_length:
          level: 'ignore'
        line_endings:
          value: 'unix'
          level: 'error'
        no_stand_alone_at:
          level: 'error'
    clean:
      options:
        force: true
      build: ["compile/**", "build/**"]
    coffee:
      compile:
        files: [
          {
            expand: true
            cwd: 'src/'
            src: '**/*.coffee'
            dest: 'compile/'
            ext: '.js'
          }
        ],
        options:
          bare: true
    concat:
      options:
        banner: '<%= meta.banner %>'
      dist:
        src: 'compile/**/*.js'
        dest: 'build/ng-infinite-scroll.js'
    uglify:
      options:
        banner: '<%= meta.banner %>'
      dist:
        src: ['build/ng-infinite-scroll.js']
        dest: 'build/ng-infinite-scroll.min.js'
    testacular:
      unit:
        options:
          configFile: 'test/testacular.conf.js'
          autoWatch: true
          browsers: ['Chrome', 'PhantomJS']
          reporters: ['dots']
          runnerPort: 9101
          keepalive: true

  grunt.registerTask 'default', ['coffeelint', 'clean', 'coffee', 'concat', 'uglify']
  grunt.registerTask 'test', ['testacular']
