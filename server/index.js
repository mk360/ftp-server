const getIPAddress = require("./getIpAddress");
const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer(async (req, res) => {
    try {
        if (req.url.includes(".ico")) return;
        if (req.method === "POST") {
            await recoverData(req);
            res.statusCode = 200;
        }
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

function recoverData(req) {
    return new Promise((resolve, reject) => {
        let data = "";
        req.on("data", (ch) => {
            data += ch.toString();
        });

        req.on("end", () => {
            const s = JSON.parse(data);
        });
    });
};

server.listen(3000, () => {
    console.log("listening at IP Address " + getIPAddress() + ", port 3000");
});
