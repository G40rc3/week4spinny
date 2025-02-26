# week-4

My main idea for this project was to have a center button that, once clicked, would spring the image gallery into view and make the images spin in a circle. After clicking the center button, the button itself would become transparent in order to not block the image display in the center. Then the images would spring out from under the button and orbit into their spinning positions around the now invisible button, which was supposed to be the center of both the big circle and small circle. Clicking the center image would have brought everything back under the button and made the button circle appear again.

Initially, there was supposed to be 3 circles, but I gave up on the button circle because things didn’t work as intended, and I became a bit frustrated with how much time I wasted on some elements that were initially supposed to be simple to do.

The gradient effect centers the attention in the middle, and the gradient speed can be controlled from the slider, turning it from a pulse into an epilepsy warning.

The other slider controls the speed of rotation for the images.

The spinning images grow in size once you mouse over them, and also the spinning movement stops, giving you the reassurance that you are interacting with something. Clicking the image will display that image in the center display.

I had issues creating the disappearing button in the center; it made things not work properly, and I gave up on it and just allowed the images to exist freely.

I had issues with making the images continue to spin after making them come out from under the center button, so I just gave up on doing that altogether.

Another massive problem is the fact that when you zoom in and out, the center of the spinning images changes from the center of the circles. However, I noticed that the positions gets reset to default after you refresh the page, so I added a function to refresh the page every time you zoom in and out. This solved the issue but gives it a weird after-effect if you zoom in and out very fast. Not ideal, but it works.

I wanted to add a glassmorphic effect to make the screen fuzzy on the edges and clear in the center. But for some reason, when I added the media queries, the glassmorphic effect didn’t react as intended, so I gave up on that idea for now, and I will attempt it again in a future project.
