var Hand = require('models/hand.js');
var expect = chai.expect;
describe("Hand Model", function(){
    it('should be created with five fingres', function(){
        var hand = new Hand();
        expect(hand.get('fingersCount')).to.equal(5);
    });


    it('should loose one finger after cut', function(){
        var hand = new Hand();
        var cutSpy = sinon.spy(hand, 'cutFinger');
        hand.cutFinger();
        expect(cutSpy.called).to.be.true;
        expect(hand.get('fingersCount')).to.equal(4);
    });
});