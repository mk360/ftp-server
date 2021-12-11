require('./populateEnv');
const getIPAddress = require("./getIpAddress");
const http = require("http");
const path = require("path");
const fs = require("fs");
const formidable = require("formidable");
const form = formidable();

const server = http.createServer(async (req, res) => {
    if (req.method === "POST") {
        form.parse(req, (err, fields, files) => {
            if (err) {
                console.log(err);
            } else {
                const finalFilePath = process.env.DOWNLOAD_PATH ? `${process.env.DOWNLOAD_PATH}/${files.file.originalFilename}` : files.file.filepath;
                fs.writeFileSync(finalFilePath, fs.readFileSync(files.file.filepath, 'binary'), 'binary');

                res.writeHead(200, {
                    'Content-Type': 'text/html; charset=UTF-8'
                });
                res.write(fs.readFileSync('../client/done.html'));
                res.end();
            }
        });
    } else {
        try {
            if (req.url.includes(".ico")) return;
            const filePath = path.join(__dirname, '../client' + (req.url === "/" || req.url.includes("fileupload") ? "/index.html" : req.url));

            if (req.url.endsWith('.js')) {
                res.writeHead(200, {
                    'Content-Type': 'application/javascript;'
                });
            } else {
                res.writeHead(200, {
                    'Content-Type': 'text/html; charset=UTF-8'
                });
            }

            res.write(fs.readFileSync(filePath));
            res.end();
        } catch (e) {

        }
    }
});

server.listen(3000, () => {
    console.log("listening at IP Address " + getIPAddress() + ", port 3000");
});
