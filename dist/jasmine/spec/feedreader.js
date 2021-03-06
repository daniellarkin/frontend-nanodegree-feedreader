/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
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
        it('are defined', function() {
          expect(allFeeds).toBeDefined();
          expect(allFeeds.length).toBeGreaterThan(0);
        });
        
        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have a defined URL', function() {
          allFeeds.forEach(function(feed) {
            expect(feed.url).toBeDefined();
            expect((feed.url).length).toBeGreaterThan(0);
          });
        });


        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have a defined name', function() {
          allFeeds.forEach(function(feed) {
            expect(feed.name).toBeDefined();
            expect((feed.name).length).toBeGreaterThan(0);
          });
        });
    });


    /* Write a new test suite named "The menu" */
    describe('The menu', function() {
      
      /* Write a test that ensures the menu element is
       * hidden by default. You'll have to analyze the HTML and
       * the CSS to determine how we're performing the
       * hiding/showing of the menu element.
       */
      it('is hidden by default', function() {
        expect($('body').hasClass('menu-hidden')).toBeTruthy();
      });
    
      /* Write a test that ensures the menu changes
       * visibility when the menu icon is clicked. This test
       * should have two expectations: does the menu display when
       * clicked and does it hide when clicked again.
       */
      it('appear when the icon is click and disappears when clicked again', function() {
        
        $(".menu-icon-link").click();
        expect($('body').hasClass('menu-hidden')).toBe(false);
        $( ".menu-icon-link").click();
        expect($('body').hasClass('menu-hidden')).toBe(true);
      });
    });
    
    /* Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

      /* Write a test that ensures when the loadFeed
       * function is called and completes its work, there is at least
       * a single .entry element within the .feed container.
       * Remember, loadFeed() is asynchronous so this test will require
       * the use of Jasmine's beforeEach and asynchronous done() function.
       */
      beforeEach(function(done){
        loadFeed(0,done);
      });
      
      it("should have at least 1 .entry in the .feed container", function(done){
        // Expect that there is something there in the initial load feed
          expect($('.feed .entry').length).toBeGreaterThan(0);
        done();
      });
    });

    /* Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
      var feed0, feed1;
      
      beforeEach(function(done) {
        loadFeed(1, function() {
          feed0 = $('.feed').html();
          done();
        });
      });

      it('content changes', function(done) {
        loadFeed(0, function() {
          expect($('.feed').html()).not.toEqual(feed0);
          done();
        });
      });
    });
});
