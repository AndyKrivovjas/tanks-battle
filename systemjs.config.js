(function(global) {
  // map tells the System loader where to look for things
  var map = {
    'app':                        'app', // 'dist',
  };
  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: 'main.js',  defaultExtension: 'js' },
  };

  var config = {
    map: map,
    packages: packages
  };
  System.config(config);

  global.bootstrapping = System
       .import( "app" )
       .then(
           function handleResolve() {

               console.info( "System.js successfully bootstrapped app." );

           },
           function handleReject( error ) {

               console.warn( "System.js could not bootstrap the app." );
               console.error( error );

               return( Promise.reject( error ) );

           }
       )
   ;
})(this);
