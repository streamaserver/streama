mod = angular.module('infinite-scroll', [])

mod.directive 'infiniteScroll', ['$rootScope', '$window', '$timeout', ($rootScope, $window, $timeout) ->
  link: (scope, elem, attrs) ->
    $window = angular.element($window)

    # infinite-scroll-distance specifies how close to the bottom of the page
    # the window is allowed to be before we trigger a new scroll. The value
    # provided is multiplied by the window height; for example, to load
    # more when the bottom of the page is less than 3 window heights away,
    # specify a value of 3. Defaults to 0.
    scrollDistance = 0
    if attrs.infiniteScrollDistance?
      scope.$watch attrs.infiniteScrollDistance, (value) ->
        scrollDistance = parseInt(value, 10)

    # infinite-scroll-disabled specifies a boolean that will keep the
    # infnite scroll function from being called; this is useful for
    # debouncing or throttling the function call. If an infinite
    # scroll is triggered but this value evaluates to true, then
    # once it switches back to false the infinite scroll function
    # will be triggered again.
    scrollEnabled = true
    checkWhenEnabled = false
    if attrs.infiniteScrollDisabled?
      scope.$watch attrs.infiniteScrollDisabled, (value) ->
        scrollEnabled = !value
        if scrollEnabled && checkWhenEnabled
          checkWhenEnabled = false
          handler()

    # infinite-scroll specifies a function to call when the window
    # is scrolled within a certain range from the bottom of the
    # document. It is recommended to use infinite-scroll-disabled
    # with a boolean that is set to true when the function is
    # called in order to throttle the function call.
    handler = ->
      windowBottom = $window.height() + $window.scrollTop()
      elementBottom = elem.offset().top + elem.height()
      remaining = elementBottom - windowBottom
      shouldScroll = remaining <= $window.height() * scrollDistance

      if shouldScroll && scrollEnabled
        if $rootScope.$$phase
          scope.$eval attrs.infiniteScroll
        else
          scope.$apply attrs.infiniteScroll
      else if shouldScroll
        checkWhenEnabled = true

    $window.on 'scroll', handler
    scope.$on '$destroy', ->
      $window.off 'scroll', handler

    $timeout (->
      if attrs.infiniteScrollImmediateCheck
        if scope.$eval(attrs.infiniteScrollImmediateCheck)
          handler()
      else
        handler()
    ), 0
]
