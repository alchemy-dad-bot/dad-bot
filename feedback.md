# Dad Bot

Awesome work this week - I think you all did a wonderful job navigating the new world of Discord bots! Its not easy to learn something new as part of a group project and you all did a great job with it. Here is some general feedback / notes:

* I think the model name `User` is a little misleading / confusing -- I would suggest Jokes or UserJokes instead to establish what it is which is a list of custom user jokes
* You should be able to create a single file that exports your client variable so that you don't have to make multiple instances -- then you can breakup your bot code into multiple files -- I've done a bit of refactoring here as an example (do not just merge this -- I haven't tested it and its likely very broken, but it should give you an idea of how you can reorganize your files a bit)
* Make sure you delete all your unused code -- you have a lot of boilerplate code from the Express starter that you're not using -- you should remove all of this -- i put some comments where I think you have unused code
* Since you don't have controllers, you could add some unit tests on your actual Models -- you would test each method on your test and confirm that it saves data -- similar to the controller tests, just cutting out the middleman
