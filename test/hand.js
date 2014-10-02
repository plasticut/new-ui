var Hand = require('models/hand.js');
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