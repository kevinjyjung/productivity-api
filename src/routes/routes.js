const csv = require("fast-csv");

var appRouter = (app) => {
    app.get("/", (req, res) => {
        res.send("Hello World");
    });

    app.get("/tasks", (req, res) => {
        csv.fromPath("./tasks.csv", { headers: true })
            .on("data", (data) => {
                console.log(`${data.id} ${data.timestamp} ${data.name}`);
            })
            .on("end", () => {
                console.log("done");
                res.send("Done reading csv");
            });
    });
}

module.exports = appRouter;
