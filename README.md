# Nate Technical Challenge

## Abstract

I hope exploring my submission will be simple and interesting.

### What does it do?

Mostly everything in the task, including:

1. hitting the `Start` button
2. selecting the corresponding city
3. filling in the form according to the constants

Also:

- the program is agnostic - no strings were hardcoded and the constants like gender, city, etc. are changed - **it will behave properly**.

- there is a well-documented trace of both **HTML** and **graphic(image)** representation of the execution.

You can see those inside:

1. `html-logs` - HTML pages captions, in order
2. `image-logs` - printscreens of the virtual puppeteer browser

You can also remove all the images (don't delete the directory itself) and run the program again and it will recreate them.

### What does it not do?

As I am recovering from an injury, I didn't manage to look deeply into:

1. Capturing CSS
2. Taking care of that annoying popup - I have a commented sequence of `mutationObserver` that should, in theory, take care of it. Not sure about the race conditions and interruptions.
3. Tagging visible elements - just saw that now. 

For all the incomplete points, I can provide a solution further or, at least, discuss possible solutions

### Running

SIMPLE. Just make sure you have `Docker` installed.

```
./start.sh
```

Running the script will trigger the Node.JS `crawler` service that simultaneously:

1. performs the automation
2. creates HTML/graphic step-by-step reports of the actions performed stored in `html-logs`/`image-logs`

## Tech Stack

I went for:

1. Docker/Docker-Compose
2. Javascript - Node.Js
3. Puppeteer - Alternatively I looked at Selenium and Codecest.io
4. Jest - testing


## Testing

**Make sure the crawler service is running**, otherwise you're not gonna be able to run the tests. 

```
cd crawler
./test.sh
```

I tested the **behaviour** of the automation:

  ✓ it should click the start button (6374 ms)

  ✓ it should select the right city and add the corresponding attributes (15566 ms)

  ✓ it should select the corresponding city depending on the constants (14880 ms)

  ✓ it should not add an attribute if a city was not selected (12181 ms)

  ✓ it should click on the select input and then click on the corresponding city, leaving the click attributes (11636 ms)

  ✓ it should fill the form's inputs accordingly (16354 ms)

  ✓ it should fill the form's gender select accordingly (18507 ms)
