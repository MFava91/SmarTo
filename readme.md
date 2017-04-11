# SmarTo

Smarto is a web application build to make your office live easier. With SmarTo you can check the toilet availability from the comfort of your PC/SmartPhone.

## What it is made of

### Hardaware

- Single-board computer (es: Raspberry Pi/OrangePi)
- Battery pack
- Photosensitive resistance sensor module
- HC-SR501 Pir Motion Detector - [Doc](https://www.mpja.com/download/31227sc.pdf)
- Jumper Wires x 6

### Software

- [AngularJS 1.X](https://angularjs.org/) 
- [Bootstrap 3.X](http://getbootstrap.com/)
- [Node.js 7.X](https://nodejs.org/en/) 
- [Express.js 4.X](http://expressjs.com)

#### Prerequisites

Make sure you have installed all of the following prerequisites on your machine.

- Node.js - [https://github.com/nodesource/distributions](https://github.com/nodesource/distributions)

#### Installation

To install SmarTo's dependencies you are going to use npm. In the application root folder run this in the command-line:

```bash
$ npm install
```

## Running SmarTo

After the install process is over, you'll be able to run SmarTo:

```bash
$ node server.js
```

SmarTo will be running on port 80, just open your browser and visit _http://raspberry-ip_.

I also suggest to run the application with [forever](https://github.com/foreverjs/forever).
To do this, type in the command line:

```bash
$ [sudo] npm install -g forever
```

Then go to application root folder and run:

```bash
$ forever start server.js
```

Now SmarTo is running on server port 80.


