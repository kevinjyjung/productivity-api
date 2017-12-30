const csv = require("fast-csv");
const fs = require("fs");

var appRouter = (app) => {
    app.get("/", (req, res) => {
        res.send("Hello World");
    });

    app.get("/tasks", (req, res) => {
        var tasks = [];
        csv.fromPath("./tasks.csv", { headers: true })
            .on("data", (data) => {
                console.log(`${data.id} ${data.timestamp} ${data.name}`);
                tasks.push(data);
            })
            .on("end", () => {
                console.log("done");
                res.send(tasks);
            });
    });

    app.post('/complete', (req, res) => {
        var tasks = [];
        csv.fromPath("./tasks.csv", { headers: true})
            .transform((obj) => {
                return (obj.id === req.body.id) ? 
                    {
                        id: obj.id,
                        timestamp: (new Date()).toISOString(),
                        number: obj.number,
                        unit: obj.unit,
                        name: obj.name,
                    } : obj;
            }).on("data", (data) => {
                tasks.push(data);
            }).on("end", () => {
                csv.writeToPath("./tasks.csv", tasks, { headers: true })
                    .on("finish", () => {
                        console.log("done writing");
                        res.send("OK");
                    });
            });
    });
}

module.exports = appRouter;
