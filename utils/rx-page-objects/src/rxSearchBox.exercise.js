var _ = require('lodash');
var rxSearchBox = require('./rxSearchBox.page').rxSearchBox;

/**
 * @description rxSearchBox exercises.
 * @see rxSearchBox
 * @exports exercise/rxSearchBox
 * @param {Object} [options] - Test options. Used to build valid tests.
 * @param {rxSearchBox} [options.instance=rxSearchbox.initialize()] - Component to exercise.
 * @param {String} [options.cssSelector] - DEPRECATED: Fallback selector string to initialize widget with.
 * @param {Boolean} [options.disabled=false] - Determines if the search box is disabled at the start of the exercise.
 * @param {String} [options.placeholder='Search...'] - Expected placeholder value.
 * @example
 * describe('default exercises', encore.exercise.rxSearchBox({
 *     instance: myPage.searchText, // select one of many widgets from your page objects
 *     placeholder: 'Filter by name...'
 * }));
 */
exports.rxSearchBox = function (options) {
    if (options === undefined) {
        options = {};
    }

    options = _.defaults(options, {
        disabled: false,
        placeholder: 'Search...'
    });

    return function () {
        var component;

        before(function () {
            if (options.instance !== undefined) {
                component = options.instance;
            } else {
                component = rxSearchBox.initialize();
            }

            if (options.cssSelector !== undefined) {
                console.warn('Deprecated exercise option `cssSelector` will be removed in favor of `instance`');
                component = rxSearchBox.initialize($(options.cssSelector));
            }
        });

        it('should show the element', function () {
            expect(component.isDisplayed()).to.eventually.be.true;
        });

        if (options.placeholder) {
            it('should have a placeholder', function () {
                expect(component.placeholder).to.eventually.equal(options.placeholder);
            });
        }

        if (options.disabled) {
            describe('when disabled', function () {
                it('should not display the clear button', function () {
                    expect(component.isClearable()).to.eventually.be.false;
                });

                it('should not be searchable', function () {
                    expect(component.isSearchable()).to.eventually.be.false;
                });
            });//when disabled
        } else {
            describe('when enabled', function () {
                it('should be searchable', function () {
                    expect(component.isSearchable()).to.eventually.be.true;
                });

                it('should update the search term', function () {
                    component.term = 'testing';
                    expect(component.term).to.eventually.equal('testing');
                });

                it('should be clearable', function () {
                    expect(component.isClearable()).to.eventually.be.true;
                });

                it('should clear the search term', function () {
                    component.clear();
                    expect(component.term).to.eventually.equal('');
                });

                it('should not be clearable', function () {
                    expect(component.isClearable()).to.eventually.be.false;
                });
            });//when enabled
        }
    };
};
