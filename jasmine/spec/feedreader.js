/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/**
 @function anonymous function
 @description We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */

        it('are defined and have non-zero length', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test to ensure that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
        */
         it('each contains a non-blank url', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined;
                expect(feed.url).not.toEqual("");
            });
         });


        /* Test, looping through each feed
         * in the allFeeds object to ensure it has a name defined
         * and that the name is not empty.
         */
         it('each contains a non-blank name', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined;
                expect(feed.name).not.toEqual("");
            });
         });
    });


    /* A test suite to make sure that the manu is in a correct
     * default state and that it shows and hides as designed
     * when the appropriate item has been clicked.
     */
    describe('The menu', function() {
        /* Test that ensures the menu element is
         * hidden by default.
         */
        it('has menu hidden by default', function() {
            expect($('body')).toHaveClass('menu-hidden');
        });

         /* Test to ensures the menu changes
          * visibility when the menu icon is clicked.
          */
        it('has a menu that toggles showing and hidden', function() {
            $('.menu-icon-link').click();
            expect($('body')).not.toHaveClass('menu-hidden');
            $('.menu-icon-link').click();
            expect($('body')).toHaveClass('menu-hidden');
        });
    });

    /* Test suite for the initial entries when the application starts
     */
    describe('Initial entries', function() {
        /* Causes any test in this suite to have just
         * loaded feed 0 before the test begins
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        /* Test to ensure that the default feed contains at least one entry
         */
        it('have at least one entry on the default feed', function() {
            console.log('one entry on default feed test');
            expect($('.entry').length >= 1).toBe(true);
        });
    });

    /* Test suite for new feed selection
     */
    describe('New feed selection', function() {
        var feedContents = "dummy contents";
        var feedId = 0;

        beforeEach(function(done) {
            loadFeed(feedId, done);
        });

        /* Test to ensures that data is present when a first feed is loaded
         * by the loadFeed function.
         */
        it('data is present when first feed selected', function() {
            expect($('.feed').html()).not.toEqual(feedContents);
            expect($('.entry').length >= 1).toBe(true);
            feedContents = $('.feed').html();
            feedId++;
        });

        /* Test to ensures that data changed when a new feed is loaded
         * by the loadFeed function.
         */
        it('changes feed data when new feed is selected', function() {
            expect($('.feed').html()).not.toEqual(feedContents);
            expect($('.entry').length >= 1).toBe(true);
        });
    });

    /* Udacious suite to make sure every feed causes the feed data
     * to change.
     * NOTE TO GRADER: I couldn't use the same variable to count both
     * in the "it" and also in the load feed and am not sure why.
     * I think it's a closure issue but haven't seen any example
     * of a Jasmine test that uses closures :/
     */
    describe('iterating all feeds the new feed selection', function() {
        var feedContents = 'dummy contents';
        var feedId = 0;
        var feedNum = 0;

        /* Load the current feed before each test within a foreach lool
         */
        beforeEach(function(done) {
            loadFeed(feedId, done);
        });

        /* Test that each feed causes the content to change and
         * that this content has elements.
         */
        allFeeds.forEach(function() {
            it('feed data changes, and has elements when selecting feed: ' + feedNum++, function() {
                expect($('.feed').html()).not.toEqual(feedContents);
                expect($('.entry').length >= 1).toBe(true);
                feedContents = $('.feed').html();
                feedId++;
            });
        });
    });

}());
