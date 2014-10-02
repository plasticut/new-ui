(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (typeof _$jscoverage['lib/app/models/hand.js'] === 'undefined'){_$jscoverage['lib/app/models/hand.js']=[];
_$jscoverage['lib/app/models/hand.js'].source=['\'use strict\';',
'',
'',
'var Hand = Backbone.Model.extend({',
'    defaults: function(){',
'        return {',
'            fingersCount: 5,',
'            isLeft: false',
'        };',
'    },',
'    cutFinger: function(){',
'        var newval = this.get(\'fingersCount\')-1;',
'        this.set(\'fingersCount\', newval);',
'    }',
'});',
'',
'module.exports = Hand;'];
_$jscoverage['lib/app/models/hand.js'][1]=0;
_$jscoverage['lib/app/models/hand.js'][4]=0;
_$jscoverage['lib/app/models/hand.js'][6]=0;
_$jscoverage['lib/app/models/hand.js'][12]=0;
_$jscoverage['lib/app/models/hand.js'][13]=0;
_$jscoverage['lib/app/models/hand.js'][17]=0;
}_$jscoverage['lib/app/models/hand.js'][1]++;
'use strict';


_$jscoverage['lib/app/models/hand.js'][4]++;
var Hand = Backbone.Model.extend({
    defaults: function(){
        _$jscoverage['lib/app/models/hand.js'][6]++;
return {
            fingersCount: 5,
            isLeft: false
        };
    },
    cutFinger: function(){
        _$jscoverage['lib/app/models/hand.js'][12]++;
var newval = this.get('fingersCount')-1;
        _$jscoverage['lib/app/models/hand.js'][13]++;
this.set('fingersCount', newval);
    }
});

_$jscoverage['lib/app/models/hand.js'][17]++;
module.exports = Hand;
},{}],2:[function(require,module,exports){
var Hand = require('./../.tmp/lib-cov/app/models/hand.js');
describe("Hand Model", function(){
    it('should be created with five fingres', function(){
        var hand = new Hand();
        chai.expect(hand.get('fingersCount')).to.equal(5);
    });


    it('should loose one finger after cut', function(){
        var hand = new Hand();
        var cutSpy = sinon.spy(hand, 'cutFinger');
        hand.cutFinger();
        chai.expect(cutSpy.called).to.be.true;
        chai.expect(hand.get('fingersCount')).to.equal(4);
    });
});
},{"./../.tmp/lib-cov/app/models/hand.js":1}]},{},[2])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3ovcHJvamVjdHMvbmV3X3VpL25ldy11aS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL2hvbWUvei9wcm9qZWN0cy9uZXdfdWkvbmV3LXVpLy50bXAvbGliLWNvdi9hcHAvbW9kZWxzL2hhbmQuanMiLCIvaG9tZS96L3Byb2plY3RzL25ld191aS9uZXctdWkvdGVzdC9oYW5kLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpZiAodHlwZW9mIF8kanNjb3ZlcmFnZSA9PT0gJ3VuZGVmaW5lZCcpIF8kanNjb3ZlcmFnZSA9IHt9O1xuaWYgKHR5cGVvZiBfJGpzY292ZXJhZ2VbJ2xpYi9hcHAvbW9kZWxzL2hhbmQuanMnXSA9PT0gJ3VuZGVmaW5lZCcpe18kanNjb3ZlcmFnZVsnbGliL2FwcC9tb2RlbHMvaGFuZC5qcyddPVtdO1xuXyRqc2NvdmVyYWdlWydsaWIvYXBwL21vZGVscy9oYW5kLmpzJ10uc291cmNlPVsnXFwndXNlIHN0cmljdFxcJzsnLFxuJycsXG4nJyxcbid2YXIgSGFuZCA9IEJhY2tib25lLk1vZGVsLmV4dGVuZCh7JyxcbicgICAgZGVmYXVsdHM6IGZ1bmN0aW9uKCl7JyxcbicgICAgICAgIHJldHVybiB7JyxcbicgICAgICAgICAgICBmaW5nZXJzQ291bnQ6IDUsJyxcbicgICAgICAgICAgICBpc0xlZnQ6IGZhbHNlJyxcbicgICAgICAgIH07JyxcbicgICAgfSwnLFxuJyAgICBjdXRGaW5nZXI6IGZ1bmN0aW9uKCl7JyxcbicgICAgICAgIHZhciBuZXd2YWwgPSB0aGlzLmdldChcXCdmaW5nZXJzQ291bnRcXCcpLTE7JyxcbicgICAgICAgIHRoaXMuc2V0KFxcJ2ZpbmdlcnNDb3VudFxcJywgbmV3dmFsKTsnLFxuJyAgICB9Jyxcbid9KTsnLFxuJycsXG4nbW9kdWxlLmV4cG9ydHMgPSBIYW5kOyddO1xuXyRqc2NvdmVyYWdlWydsaWIvYXBwL21vZGVscy9oYW5kLmpzJ11bMV09MDtcbl8kanNjb3ZlcmFnZVsnbGliL2FwcC9tb2RlbHMvaGFuZC5qcyddWzRdPTA7XG5fJGpzY292ZXJhZ2VbJ2xpYi9hcHAvbW9kZWxzL2hhbmQuanMnXVs2XT0wO1xuXyRqc2NvdmVyYWdlWydsaWIvYXBwL21vZGVscy9oYW5kLmpzJ11bMTJdPTA7XG5fJGpzY292ZXJhZ2VbJ2xpYi9hcHAvbW9kZWxzL2hhbmQuanMnXVsxM109MDtcbl8kanNjb3ZlcmFnZVsnbGliL2FwcC9tb2RlbHMvaGFuZC5qcyddWzE3XT0wO1xufV8kanNjb3ZlcmFnZVsnbGliL2FwcC9tb2RlbHMvaGFuZC5qcyddWzFdKys7XG4ndXNlIHN0cmljdCc7XG5cblxuXyRqc2NvdmVyYWdlWydsaWIvYXBwL21vZGVscy9oYW5kLmpzJ11bNF0rKztcbnZhciBIYW5kID0gQmFja2JvbmUuTW9kZWwuZXh0ZW5kKHtcbiAgICBkZWZhdWx0czogZnVuY3Rpb24oKXtcbiAgICAgICAgXyRqc2NvdmVyYWdlWydsaWIvYXBwL21vZGVscy9oYW5kLmpzJ11bNl0rKztcbnJldHVybiB7XG4gICAgICAgICAgICBmaW5nZXJzQ291bnQ6IDUsXG4gICAgICAgICAgICBpc0xlZnQ6IGZhbHNlXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBjdXRGaW5nZXI6IGZ1bmN0aW9uKCl7XG4gICAgICAgIF8kanNjb3ZlcmFnZVsnbGliL2FwcC9tb2RlbHMvaGFuZC5qcyddWzEyXSsrO1xudmFyIG5ld3ZhbCA9IHRoaXMuZ2V0KCdmaW5nZXJzQ291bnQnKS0xO1xuICAgICAgICBfJGpzY292ZXJhZ2VbJ2xpYi9hcHAvbW9kZWxzL2hhbmQuanMnXVsxM10rKztcbnRoaXMuc2V0KCdmaW5nZXJzQ291bnQnLCBuZXd2YWwpO1xuICAgIH1cbn0pO1xuXG5fJGpzY292ZXJhZ2VbJ2xpYi9hcHAvbW9kZWxzL2hhbmQuanMnXVsxN10rKztcbm1vZHVsZS5leHBvcnRzID0gSGFuZDsiLCJ2YXIgSGFuZCA9IHJlcXVpcmUoJy4vLi4vLnRtcC9saWItY292L2FwcC9tb2RlbHMvaGFuZC5qcycpO1xuZGVzY3JpYmUoXCJIYW5kIE1vZGVsXCIsIGZ1bmN0aW9uKCl7XG4gICAgaXQoJ3Nob3VsZCBiZSBjcmVhdGVkIHdpdGggZml2ZSBmaW5ncmVzJywgZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIGhhbmQgPSBuZXcgSGFuZCgpO1xuICAgICAgICBjaGFpLmV4cGVjdChoYW5kLmdldCgnZmluZ2Vyc0NvdW50JykpLnRvLmVxdWFsKDUpO1xuICAgIH0pO1xuXG5cbiAgICBpdCgnc2hvdWxkIGxvb3NlIG9uZSBmaW5nZXIgYWZ0ZXIgY3V0JywgZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIGhhbmQgPSBuZXcgSGFuZCgpO1xuICAgICAgICB2YXIgY3V0U3B5ID0gc2lub24uc3B5KGhhbmQsICdjdXRGaW5nZXInKTtcbiAgICAgICAgaGFuZC5jdXRGaW5nZXIoKTtcbiAgICAgICAgY2hhaS5leHBlY3QoY3V0U3B5LmNhbGxlZCkudG8uYmUudHJ1ZTtcbiAgICAgICAgY2hhaS5leHBlY3QoaGFuZC5nZXQoJ2ZpbmdlcnNDb3VudCcpKS50by5lcXVhbCg0KTtcbiAgICB9KTtcbn0pOyJdfQ==
