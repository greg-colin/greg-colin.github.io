#Website Performance Optimization

This project consists of a pre-created website, that was in need of optimization,
and optimizations thereto. An animation exists in one page that was required
to run above 60fps.

##Optimizations performed:
-All images have been optimized for the context in which they appear, and additional
images were created by that process and used instead of their originals.

-All JavaScript has either been inlined or minified.

-In the pizzaria page, repetetive document sectors were replaced by a variable.

-An example script was used verbatim to load CSS asynchronously as follows:

> loadCSS

> A function for loading CSS asynchronously
> [c]2014 @scottjehl, Filament Group, Inc.
> Licensed MIT

-All of the pages have been optimized to the requisite page speeds and the 
animation page logs that it renders 10 frames in ~33.2 msec, which works
out to a frame rate of 302fps - half an order of magnitude faster than
required. These speeds were similar before I made today's changes, therefore
I disagreed with the "Framerate" point on my previous assesment.

##Usage:
Use Google Chrome and Developer tools (with the PageSpeed extension) to
access the website at:

[http://greg-colin.github.io/index.html](http://greg-colin.github.io/index.html)

and observe that performance suggestions for each page of the site are
reduced to those over which users have no control, such as HTTP caching
headers.

Within the site, navigate to the item "Cam's Pizzeria" and open developer
tools. Scroll the page up and down to observe the frame rate in the
JavaScript console log.

Navigate to Google PageSpeed Insights at:

[http://developers.google.com/speed/pagespeed/insights/](http://developers.google.com/speed/pagespeed/insights/)

and enter the page from my site:

http://greg-colin.github.io/views/pizza_min.html

where inidicated and press the "Analyze" button. Observe that scoring
for speed and UE exceed requirements. Also, Observe that in the desktop
tab, scoring meets requirements.

##Notes
**NOTE:** Apparently, the slight drop in desktop page speed from my previous submission
is a trade-off for the asynchronously-loading CSS, since this score improves
without it while the mobile version suffers.

**NOTE:**
Within the class videos, our friend Cameron informs students that the
PageSpeed Insights result requirement for mobile is 80+, and 90+ on
the desktop (if memory serves). This is at variance with the scoring
pass/fail criteria stated in my previous evaluation.

**NOTE:**
Changes within main.js for the most recent assesment are marked in the
source with the text: "NOTE:"

##Summary
While I disagreed with my previous evaluation for the reasons given, I have
addressed each of the issues raised in it.

Let me know if you think I've overlooked something and I'll get it fixed!

Greg Colin

##Third Submission Notes
**NOTES ON GRADING:** Evidently, whoever is grading these things is receiving different
results from Google PageSpeed Insights than I am, given the content of the
last review. Upon receipt of that review, I immediately ran the test again and
received a WILDLY different outcome, with my code passing with flying colors.
As a result of this massive discrepancy I took a screenshot of that outcome
and added it to the github, where it can be found at:
[http://greg-colin.github.io/grading-discrepancy.jpg](http://greg-colin.github.io/grading-discrepancy.jpg)
Furthermore, the very moment I upload submission #3, I will run another test
and screenshot those results as well and upload again. Those results will be
available at:
[http://greg-colin.github.io/submission3perf.jpg](http://greg-colin.github.io/submission3perf.jpg)

Additionally, the "5ms pizza change time" issue was not made mention in the
review of submission #1. If it had, it would have been fixed in submission
#2.

The multiweek lag between submissions and feedback is a massive momentum-killer
for students who are trying to continue on while awaiting feedback, most particularly
when multiple submissions are involved. One might be forgiven for thinking that
submissions after the first one would be somehow prioritized.

**NOTE3:**
Changes for submission3 are commented in the code for main.js with the text "NOTE3"

**NOTE3:**
Changed Pizza resize function to run in less than 5ms. No other changes were required
to meet the rubric (see screenshots).
