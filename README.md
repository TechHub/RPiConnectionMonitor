# RPiConnectionMonitor
Simple internet connection monitor using node.js + resin.io + raspberry

### How it works?
It will do a dns lookup to check `google.com` to see if the internet connection is alive.
It's not the best way to do it since *sometimes* you can be connected to internet but not able to resolve a DNS but I'd say it's more than enough if you need to do some checks.

Installation
 * Create a new application with [Resin.io](https://resin.io/) and copy the image on the RPi
 * If you want to send an alert setup an ENV variable with Resin.io called MANDRILL
 * Clone this repo
 * `npm install`
 * Add your Resin.io remote git origin
 * `git push resin master`
 
