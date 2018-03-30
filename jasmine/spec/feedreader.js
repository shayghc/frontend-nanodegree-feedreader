 /**
  * @fileoverview Feedreader test project for Udacity FEWD Nanodegree course.
  * @author Seamus Connolly <sghconnolly@gmail.com">
  * @version 1.1
  * @license MIT license included in the LICENSE.txt file.
  * @copyright Seamus Connolly 2018. Limited to the conditions set in the licence for this file.
  * @see jsdoc documentation is included in the "out" directory which is in the js directory.
  * @summary This is the spec file that Jasmine will read and contains all of the tests that will be run against the application.
  */


/* All of the tests are placed within the $() function,
 * since some of these tests may require DOM elements
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* "RSS Feeds" test suite */
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
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the value for the "URL" property is not empty.
         */
        for (let i = 0; i < allFeeds.length; i++) {
            let test = allFeeds[i]['url'];
            let length = allFeeds[i]['url'].length;
            (function () {
                it('URL for allFeeds[' + i + '] is not empty', function () {
                  expect(test).not.toBe('');
                  expect(length).toBeGreaterThan(0);
                });
            })(allFeeds[i]);
        };

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the value for the "name" property is not empty.
         */
         for (let i = 0; i < allFeeds.length; i++) {
             let test = allFeeds[i]['name'];
             let length = allFeeds[i]['name'].length;
             (function () {
                 it('name property for allFeeds[' + i + '] is not empty', function () {
                   expect(test).not.toBe('');
                   expect(length).toBeGreaterThan(0);
                 });
             })(allFeeds[i]);
         };
    });


    /* "Menu" test suite */
    describe('The menu', function() {
        let menuIcon = $('.menu-icon-link');
        let target = document.body.classList.contains('menu-hidden');
        /* This test ensures that the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('slide menu element is hidden by default', function() {
            expect(target).toBe(true);
        });

         /* This test ensures that the menu changes
          * visibility when the menu icon is clicked.
          */
        it('slide menu should toggle visibility "on" when the menu icon is clicked', function() {
            menuIcon.click();
            // local target declaration required to detect changed state
            let target = document.body.classList.contains('menu-hidden');
            expect(target).toBe(false);
        });

        it('slide menu should toggle visibility "off" when the menu icon is clicked', function () {
            menuIcon.click();
            expect(target).toBe(true);
        });
    });


    /* "Initial Entries" test suite */
    describe('Initial Entries', function() {
        /* This test ensures that when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         beforeEach(function(done) {
            // function to check .feed container has completed loading.
            loadFeed(0, function() {
                done();
            });
         });

         // Check for at least one .entry element within the .feed container.
         it('.feed container should have at least one entry', function(done) {
             let targetContent = $('.feed .entry').length;
             expect(targetContent).toBeGreaterThan(0);
             done();
         })
    });

    /* "New Feed Selection" test suite */
    describe('New Feed Selection', function() {
        let entry = document.getElementsByClassName('entry'),
            originalFeed = null,
            newFeed = null;
        /* This test ensures that when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
         beforeEach(function(done) {
            // function to check .feed container has completed loading.
            loadFeed(0, function() {
                // Check original content of feed
                originalFeed = entry[0].firstElementChild.innerText;
                console.log('Original content in feed is: ' + originalFeed);
                // Wait for feed 0 to finish loading
                loadFeed(1, function() {
                    // Check new content of feed
                    newFeed = entry[0].firstElementChild.innerText;
                    console.log('Changed content in feed is: ' + newFeed);
                    done();
                });
            });
         });

         it('Check that content changes when a new feed is loaded', function(done) {
             expect(newFeed).not.toEqual(originalFeed);
             done();
         });
    });
}());
