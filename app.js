var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
const fileUpload = require('express-fileupload');

var routes = require('./routes/index');
var usuarios = require('./routes/usuarios');
var excursiones = require('./routes/excursiones');
var capitulos = require('./routes/capitulos');
var preguntas = require('./routes/preguntas');
var jugar = require('./routes/jugar');
var excursiones_usuario = require('./routes/excursiones_usuario');
var capitulos_general = require('./routes/capitulos_general');
var tarea_general = require('./routes/tarea_general');
var actividad_general = require('./routes/actividad_general');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

const hbs = require('hbs');

hbs.registerHelper('select', function(selected, options) {
  return options.fn(this).replace(
        new RegExp(' value=\"' + selected + '\"'),
        '$& selected="selected"');
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(fileUpload());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.use('/', routes);
app.use('/usuarios', usuarios);
app.use('/excursiones', excursiones);
app.use('/capitulos', capitulos);
app.use('/preguntas', preguntas);
app.use('/jugar', jugar);
app.use('/excursiones_usuario', excursiones_usuario);
app.use('/capitulos_general', capitulos_general);
app.use('/tarea_general', tarea_general);
app.use('/actividad_general', actividad_general);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
