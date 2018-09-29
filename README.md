# QR Fileshare [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Quickly%20transfer%20files%20to%20a%20different%20device,%20via%20a%20neat%20interface.&url=https://github.com/shivensinha4/qr-fileshare&via=sinha_shiven&hashtags=opensource,github,tool,npm,node,react)

<p align="center">
  <img src="/assets/web-desktop-screenshot.png?raw=true">
</p>
<p align="center">
  <img height="600" src="/assets/web-mobile-screenshot.png?raw=true">
</p>

A browser based application created using NodeJS and React to quickly transfer files to a different device on the same WiFi network by utilizing a random port on the selected network interface. The URL is made easily accessible by generating a QR code which is printed in the terminal.

All zoom-zoom.

## Installation
Install it via NPM.
```shell
npm install -g qr-fileshare
```
## Usage
In the terminal, run
```shell
qr-fileshare
```
The first time it is run, it prompts for selecting an interface. After that, it defaults to the same interface if available. A link is then opened in the browser with the web UI. Scan the QR code to open the link on mobile.

## How it works
It serves the web application on a random port on the selected network interface. The web application then uploads to the server, which temporarily stores the file on disk. All clients are notified and updated on uploads via socket connections.

This repository is inspired by [Claudio d'Angelis's qr-filetransfer](https://github.com/claudiodangelis/qr-filetransfer), but also adds an interface and features like multiple uploads and drag-and-drop.
