## What is this?

An HTTP server that can save whatever you send it to your computer.

## Why is this?

I needed to retrieve an image from my Nintendo Switch and obtain it on my PC. I usually upload it to my phone and send it to myself over Discord. But this time I wanted to do things a bit differently.

How different? I'd like to keep the image as lossless as possible, without it having endured a compression algorithm passage through Discord or Twitter.

## How does this work?

- It retrieves your local IP address, and opens up the port 3000.
- You submit the file through an html client, by navigating to that IP address and that port.
- If you have configured a download location for your server, that file will get saved there. I only tested that behavior on non-admin folders. If not, you'll find it sitting in your Temp folder.

## How can I run it?

- Clone the repo.
- `npm i`
- `cd server && node index.js`
- Done.

## How can I configure it?

You should create an `.env` file at the root of the project. That `.env` file should contain keys defined below.

## How can I configure it?

- Choose a download location with the key `DOWNLOAD_LOCATION`. Insanely enough, relative paths work just as well as absolute paths. If the path contains subfolders, make sure they exist beforehand. Make sure you omit the last slash (ex. type "folder/subfolder" not "folder/subfolder/").

For now that's all that's needed.