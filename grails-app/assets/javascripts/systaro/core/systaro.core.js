//= wrapped

//= require_self
//= require_tree services
//= require_tree controllers
//= require_tree directives
//= require_tree domain
//= require_tree filters
//= require_tree templates

angular.module("systaro.core", []);

_.mixin({
  formatString: function(format, tokens) {
    var values = [];

    if(_.isArray(tokens) || _.isObject(tokens)) {
      values = tokens;
    } else {
      values = _.takeRight(arguments, arguments.length - 1);
    }

    _.forEach(values, function(value, key) {
      format = _.replace(format, '{' + key + '}', _.isUndefined(value) ? '' : _.toString(value));
    });

    return format;
  }
});
