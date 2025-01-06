import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { pool } from "workerpool";
import { error, log } from "node:console";

/*export*/ const __filename = fileURLToPath(import.meta.url);
/*export*/ const __dirname = dirname(__filename);

const port = process.env.PORT || 3000;
// const port = process.env.PORT || 4000;

const fileReadPool = pool(join(__dirname, "file-read-workers.js"));

const server = createServer(
  /*async*/ (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    if (req.url === "/") {
      // log(req.url, req.method);
      // read file and send it
      // try {
      /*const result = await*/ fileReadPool
        .exec("html", ["index.html"])
        .then((result) => res.end(result))
        .catch((err) => {
          error(err);
          res.end();
        })
        .then(() => fileReadPool.terminate());
      // res.end(result);
      // } catch (error) {
      //   // error(err);
      //   // res.end();
      // } finally {
      //   // fileReadPool.terminate();
      // }
      // fileReadPool
      //   .exec("html", ["index.html"])
      //   .then((result) => {
      //     //   console.log('Result: ' + result); // outputs 55
      //     res.end(result);
      //   })
      //   .catch((err) => {
      //     error(err);
      //     res.end();
      //   })
      //   .then(() => {
      //     // pool.terminate(); // terminate all workers when done
      //     fileReadPool.terminate() // terminate all workers when done
      //   });
    } else if (req.url === "/about") {
      // log("/about");
      // res.writeHead(200, { "Content-Type": "text/html" });
      // read file and send it
      res.end("<h1>Sadeepal</h1>");
      // fileReadPool
      //   .exec("html", ["about.html"])
      //   .then((result) => res.end(result))
      //   .catch((err) => {
      //     error(err);
      //     res.end();
      //   })
      //   .then(() => fileReadPool.terminate());

      /*try {
      const result = await fileReadPool.exec("html", ["about.html"]);
      res.end(result);
    } catch (error) {
      error(err);
      res.end();
    } finally {
      fileReadPool.terminate();
    }*/
    }
  }
);

server.listen(port, () => log("server running : " + port));
