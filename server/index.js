const getIPAddress = require("./getIpAddress");
const http = require("http");
const path = require("path");
const fs = require("fs");
const formidable = require("formidable");

const server = http.createServer(async (req, res) => {
    const form = formidable();
    if (req.method === "POST") {
        form.parse(req, (err, fields, files) => {
            const ws = fs.createWriteStream("./test");
            if (err) {
                console.log(err);
            } else {
                console.log(files.file.filepath);
                fs.writeFileSync("./test.png", fs.readFileSync(files.file.filepath, 'binary'), 'binary');
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                res.end(JSON.stringify({ "bruh":  false }));
            }
        });
        return;
    }

    try {
        if (req.url.includes(".ico")) return;
        const filePath = path.join(__dirname, '../client' + (req.url === "/" || req.url.includes("fileupload") ? "/index.html" : req.url));
        const { size } = fs.statSync(filePath);

        if (req.url.endsWith('.js')) {
            res.writeHead(200, {
                'Content-Type': 'application/javascript;'
            });
        } else {
            res.writeHead(200, {
                'Content-Length': size,
                'Content-Type': 'text/html; charset=UTF-8'
            });
        }

        res.write(fs.readFileSync(filePath));
        res.end();
    } catch (e) {

    }
});

server.listen(3000, () => {
    console.log("listening at IP Address " + getIPAddress() + ", port 3000");
});
