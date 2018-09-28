# QR Fileshare

<p align="center">
  <img src="/assets/web-desktop-screenshot.png?raw=true">
</p>
<p align="center">
  <img height="640" src="/assets/web-mobile-screenshot.png?raw=true">
</p>

A browser based application created using NodeJS and React to quickly transfer files to a different device on the same WiFi network by utilizing a random port on the selected network interface. The URL is made easily accessible by generating a QR code which is printed in the terminal.

# Usage

## Installation
```shell
npm install -g qr-fileshare
```
## Usage
In the terminal, run
```shell
fileshare
```
The first time it is run, it prompts for selecting an interface. After that, it defaults to the same interface if available.

A link is then opened in the browser with the web UI. Scan the QR code to open the link on mobile.
