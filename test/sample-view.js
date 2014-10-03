var SampleView = require('views/sample.js');
var expect = chai.expect;

describe("Sample view", function(){
    before(function(){
        this.$fixture = $('<div class = \"module-container\"></div>');
        this.$fixture.appendTo('body');
    });

    beforeEach(function(){
        this.$fixture.empty();

        this.view = new SampleView({
            model: new Backbone.DeepModel({
                title: 'sample title'
            })
        });
    });

    afterEach(function(){
        this.view.model.destroy();
    });

    after(function(){
        $('.module-container').remove();
    });

    it("should render some content", function(){
        expect($('.module-container h2').text()).to.have.string("sample");
    });
});