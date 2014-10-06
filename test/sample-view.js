var SampleView = require('views/sample.js');
var expect = chai.expect;

describe("Sample view", function(){
    before(function(){
        this.$fixture =$('<h2>'+
                        'sample'+
                    '</h2>'+
                    '<div>'+
                        '<button id="btn">Click me, bitch</button>'+
                    '</div>');
        this.$container = $('<div class = \"module-container\"></div>');
        this.$container.appendTo('body');
    });

    after(function(){
        this.$container.remove();
    });

    beforeEach(function(){
        this.view = new SampleView({
            model: new Backbone.DeepModel({
                title: 'sample title'
            })
        });
    });

    afterEach(function(){
        this.$container.empty();
        this.view.model.destroy();
    });

    describe("events", function(){
        it("should change button text on click" , function(done){
            var view = this.view;
            var spy = sinon.spy(view, "clickBtn");

            $.when($('#btn').click()).done(function(){
                expect(view.$el.find('#btn').text()).to.be.equal('Yeah, bitch!')
                done();
            });

        });
    });

    describe("render", function(){
        it("should render some content", function(){
            expect($('.module-container h2').text()).to.have.string("sample");
        });
    });

});