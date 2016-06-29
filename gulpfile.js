
/*
 * R E Q U I R E M E N T S
 */

var elixir = require('laravel-elixir');

/*
 * C O N F I G U R A T I O N
 * https://github.com/laravel/elixir/blob/master/src/Config.js
 */

elixir.config.production = false; // <-- minifying
elixir.config.publicDir = 'public';
elixir.config.notifications = true;


/*
 * T A S K S
 */

elixir(function(mix) {

    // Styles
    mix.sass('slider.scss', 'css/slider.css');
});