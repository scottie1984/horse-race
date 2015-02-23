module.exports = function(grunt){

  grunt.loadNpmTasks('grunt-babel');

  grunt.initConfig({
    'babel': {
            options: {
                sourceMap: false
            },
            dist: {
                files: [
                   {
                       expand: true,
                       cwd: "js",
                       src: ["**/*.js"],
                       dest: "src",
                       ext: ".js"
                   }
               ]
            }
        }
  });

  grunt.registerTask('trans', [
    'babel'
  ]);
};