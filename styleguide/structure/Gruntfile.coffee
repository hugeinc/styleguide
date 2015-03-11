module.exports = (grunt) ->

   #
   # Config
   #
   grunt.initConfig

      #
      # Tasks description
      #
      notify_hooks:
        options:
          enabled: true,
          max_jshint_notifications: 5,
          title: "Project Name",
          success: true,
          duration: 5

      notify:
        watch:
          options:
            title: 'Task Complete',
            message: 'Compiled. Refreshing..'

        server:
          options:
            message: 'Styleguide Running!'


      sass:
       dist:
        options:
          style: 'expanded'

        files:
          '../assets/styles/styleguide.css' : '../styleguide.scss',
          '../assets/styles/structure.css' : 'styles/structure.scss'

      concat:
        options:
          separator: ';',

        dist:
          src: ['scripts/vendor/jquery-1.11.1.min.js', 'scripts/vendor/handlebars.js', 'scripts/vendor/sitemap.js', 'scripts/*.js'],
          dest: '../assets/scripts/styleguide.js'


      jsonlint:
        default:
          src: ['../*.json', '../modules/**/*.json']

      jshint:
        all: ['scripts/*.js', '../modules/**/*.js'],
        options:
          jshintrc: true

      jscs:
        src: ['scripts/*.js', '../modules/**/*.js']
        options:
          config: "jscsrc"


      watch:
       sass:
         files: ['styles/*.scss', '../modules/**/*.scss', '../styleguide.scss'],
         tasks: ['sass', 'notify:watch']

       css:
         files: ['../assets/styles/styleguide.css'],
         tasks: ['notify:watch'],
         options:
            livereload: true

       json:
         files: ['../**/*.json'],
         tasks: ['notify:watch'],
         options:
            livereload: true

       handlebars:
         files: ['../**/*.handlebars'],
         tasks: ['notify:watch'],
         options:
            livereload: true

       js:
         files: ['scripts/*.js', '../modules/**/*.js'],
         tasks: ['concat', 'notify:watch'],
         options:
            livereload: true


      connect:
        server:
          options:
            port: 8000,
            hostname: 'localhost',
            open: true,
            base: '../../'


      clean:
        hooks: ['../../.git/hooks/pre-commit']
        options:
          force: true


      shell:
        setupHooks:
          command: ['cp .hooks/pre-commit ../../.git/hooks/', 'chmod +x ../../.git/hooks/pre-commit'].join '&&'


      #
      # Load tasks packages
      #
      grunt.loadNpmTasks 'grunt-contrib-connect'
      grunt.loadNpmTasks 'grunt-contrib-sass'
      grunt.loadNpmTasks 'grunt-contrib-watch'
      grunt.loadNpmTasks 'grunt-contrib-concat'
      grunt.loadNpmTasks 'grunt-jsonlint'
      grunt.loadNpmTasks 'grunt-contrib-jshint'
      grunt.loadNpmTasks 'grunt-jscs'
      grunt.loadNpmTasks 'grunt-shell'
      grunt.loadNpmTasks 'grunt-contrib-clean'
      grunt.loadNpmTasks 'grunt-notify'


      #
      ## Register task names
      #

      #
      # Default task to watch sass and js files
      #
      grunt.registerTask 'default', ['watch']
      grunt.registerTask 'serve', ['connect', 'notify:server', 'watch']
      grunt.registerTask 'setupHooks', ['clean:hooks', 'shell:setupHooks']