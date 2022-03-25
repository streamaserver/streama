should = chai.should()

describe 'Infinite Scroll', ->
  [$rootScope, $compile, docWindow, $document, $timeout, fakeWindow, origJq] = [undefined]

  beforeEach ->
    module('infinite-scroll')

  beforeEach ->
    inject (_$rootScope_, _$compile_, _$window_, _$document_, _$timeout_) ->
      $rootScope = _$rootScope_
      $compile = _$compile_
      $window = _$window_
      $document = _$document_
      $timeout = _$timeout_
      fakeWindow = angular.element($window)

      origJq = angular.element
      angular.element = (first, args...) ->
        if first == $window
          fakeWindow
        else
          origJq(first, args...)

  afterEach ->
    angular.element = origJq

  it 'triggers on scrolling', ->
    scroller = """
    <div infinite-scroll='scroll()' style='height: 1000px'
      infinite-scroll-immediate-check='false'></div>
    """
    el = angular.element(scroller)
    $document.append(el)

    sinon.stub(fakeWindow, 'height').returns(1000)
    scope = $rootScope.$new(true)
    scope.scroll = sinon.spy()
    $compile(el)(scope)
    $timeout.flush() # 'immediate' call is with $timeout ..., 0
    fakeWindow.scroll()
    scope.scroll.should.have.been.calledOnce

    el.remove()
    scope.$destroy()

  it 'triggers immediately by default', ->
    scroller = """
    <div infinite-scroll='scroll()' style='height: 1000px'></div>
    """
    el = angular.element(scroller)
    $document.append(el)

    sinon.stub(fakeWindow, 'height').returns(1000)
    scope = $rootScope.$new(true)
    scope.scroll = sinon.spy()
    $compile(el)(scope)
    $timeout.flush() # 'immediate' call is with $timeout ..., 0
    scope.scroll.should.have.been.calledOnce

    el.remove()
    scope.$destroy()

  it 'does not trigger immediately when infinite-scroll-immediate-check is false', ->
    scroller = """
    <div infinite-scroll='scroll()' infinite-scroll-distance='1'
      infinite-scroll-immediate-check='false' style='height: 500px;'></div>
    """
    el = angular.element(scroller)
    $document.append(el)

    sinon.stub(fakeWindow, 'height').returns(1000)
    scope = $rootScope.$new(true)
    scope.scroll = sinon.spy()
    $compile(el)(scope)
    $timeout.flush() # 'immediate' call is with $timeout ..., 0
    scope.scroll.should.not.have.been.called
    fakeWindow.scroll()
    scope.scroll.should.have.been.calledOnce

    el.remove()
    scope.$destroy()

  it 'does not trigger when disabled', ->
    scroller = """
    <div infinite-scroll='scroll()' infinite-scroll-distance='1'
      infinite-scroll-disabled='busy' style='height: 500px;'></div>
    """
    el = angular.element(scroller)
    $document.append(el)

    sinon.stub(fakeWindow, 'height').returns(1000)
    scope = $rootScope.$new(true)
    scope.scroll = sinon.spy()
    scope.busy = true
    $compile(el)(scope)
    scope.$digest()

    fakeWindow.scroll()
    scope.scroll.should.not.have.been.called

    el.remove()
    scope.$destroy()

  it 're-triggers after being re-enabled', ->
    scroller = """
    <div infinite-scroll='scroll()' infinite-scroll-distance='1'
      infinite-scroll-disabled='busy' style='height: 500px;'></div>
    """
    el = angular.element(scroller)
    $document.append(el)

    sinon.stub(fakeWindow, 'height').returns(1000)
    scope = $rootScope.$new(true)
    scope.scroll = sinon.spy()
    scope.busy = true
    $compile(el)(scope)
    scope.$digest()

    fakeWindow.scroll()
    scope.scroll.should.not.have.been.called

    scope.busy = false
    scope.$digest()
    scope.scroll.should.have.been.calledOnce

    el.remove()
    scope.$destroy()

  it 'only triggers when the page has been sufficiently scrolled down', ->
    scroller = """
    <div infinite-scroll='scroll()'
      infinite-scroll-distance='1' style='height: 10000px'></div>
    """
    el = angular.element(scroller)
    $document.append(el)

    sinon.stub(fakeWindow, 'height').returns(1000)
    sinon.stub(fakeWindow, 'scrollTop').returns(7999)

    scope = $rootScope.$new(true)
    scope.scroll = sinon.spy()
    $compile(el)(scope)
    scope.$digest()
    fakeWindow.scroll()
    scope.scroll.should.not.have.been.called

    fakeWindow.scrollTop.returns(8000)
    fakeWindow.scroll()
    scope.scroll.should.have.been.calledOnce

    el.remove()
    scope.$destroy()

  it 'respects the infinite-scroll-distance attribute', ->
    scroller = """
    <div infinite-scroll='scroll()' infinite-scroll-distance='5' style='height: 10000px;'></div>
    """
    el = angular.element(scroller)
    $document.append(el)

    sinon.stub(fakeWindow, 'height').returns(1000)
    sinon.stub(fakeWindow, 'scrollTop').returns(3999)

    scope = $rootScope.$new(true)
    scope.scroll = sinon.spy()
    $compile(el)(scope)
    scope.$digest()
    fakeWindow.scroll()
    scope.scroll.should.not.have.been.called

    fakeWindow.scrollTop.returns(4000)
    fakeWindow.scroll()
    scope.scroll.should.have.been.calledOnce

    el.remove()
    scope.$destroy()
