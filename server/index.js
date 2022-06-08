const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
var bodyParser = require('body-parser');

app.use(cors());
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const db = mysql.createConnection({
  user: 'root',
  host: '127.0.0.1',
  password: '',
  database: 'virtualnau'
});

db.connect(function (err) {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log('db is connected');
  }
});

app.post('/regArticle', (req, res) => {
  const { id, description } = req.body;
  db.query(
    'INSERT INTO articles (id, description) VALUES (?,?)',
    [id, description],
    (err, result) => {
      if (err)
        console.log(err);
    }
  );
});

app.post('/regWorkshop', (req, res) => {
  const { name, contact } = req.body;
  db.query(
    'INSERT INTO workshops (name, contact, money) VALUES (?,?,?)',
    [name, contact, 0],
    (err, result) => {
      if (err)
        console.log(err);
    }
  );
});



app.post('/newTask', (req, res) => {
  const { id, article, description, quantity, packages, cutDate, fabrics, colors, responsable, generalFeatures } = req.body;
  db.query(
    'INSERT INTO tasks (id, article_id, article_description, quantity, packages, cutDate, fabrics, colors, responsable, generalFeatures, state, paid) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
    [id, article, description, quantity, packages, cutDate, fabrics, colors, responsable, generalFeatures, 'toAssign', 0],
    (err, result) => {
      if (err)
        console.log(err);
    }
  );
});

app.get('/getNames', (req, res) => {
  db.query("SELECT name FROM workshops", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post('/getPassword', (req, res) => {
  const user = req.body.user;
  db.query("SELECT password FROM users WHERE user = ?", [user], (err, result) => {
    if (err)
      console.log(err);
    else
      res.send(result);
  });
});

app.post('/getNamesWhere', (req, res) => {
  const { name } = req.body;
  db.query("SELECT id FROM workshops WHERE name = ?", [name], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post('/getDescriptionWhere', (req, res) => {
  const { id } = req.body;
  db.query("SELECT description FROM articles WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post('/getUnpaidTasks', (req, res) => {
  const { name } = req.body;
  db.query("SELECT * FROM tasks WHERE name = ? AND (paid = 0 OR state = 'assigned')", [name], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post('/getTasks', (req, res) => {
  const { name, state, id } = req.body;
  if (!id)
    if (name)
      db.query("SELECT * FROM tasks WHERE name = ? AND state = ?", [name, state], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
    else
      db.query("SELECT * FROM tasks WHERE state = ?", [state], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
  else
    db.query("SELECT * FROM tasks WHERE id = ?", [id], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

app.post('/getParts', (req, res) => {
  const { task } = req.body;
  db.query("SELECT * FROM parts WHERE task = ?", [task], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post('/newPart', (req, res) => {
  const { name, task, date, quantity, weight, money, threads, paid } = req.body;//name y id deben ser los mismos que en el seleccionado

  db.query(
    "INSERT INTO parts (task, date, quantity, weight, money, threads) VALUES (?,?,?,?,?,?)",
    [task, date, quantity, weight, money, threads],
    (err) => {
      if (err) {
        console.log(err);
      } else {
        db.query(
          "INSERT INTO payments (name, date, money) VALUES (?,?,?)",
          [name, date, money],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              if (paid)
                db.query("UPDATE tasks SET paid = 1 WHERE id = ?", [task], (err, result1) => {
                  if (err)
                    console.log(err);
                  else
                    res.send(result1);
                });
              else
                res.send(result);
            }
          }
        );
      }
    }
  );
});

app.delete('/deleteTask/:id', (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM tasks WHERE id = ?", id, (err, aux) => {
    if (err) {
      console.log(err);
    } else {
      db.query("DELETE FROM parts WHERE task = ?", id, (err, result) => {
        if (err)
          console.log(err);
        else
          res.send(result)
      });
    }
  });
});

app.delete('/dropArticle/:id', (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM articles WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete('/dropWorkshop/:name', (req, res) => {
  const name = req.params.name;
  db.query("DELETE FROM workshops WHERE name = ?", name, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put('/printObs', (req, res) => {
  const { id, observations, calification, faulty } = req.body;
  db.query(
    "UPDATE tasks SET observations = ?, calification = ?, faulty = ?, state = 'returned' WHERE id = ?", [observations, calification, faulty, id],
    (err, result) => {
      if (err)
        console.log(err);
      else
        res.send(result);
    }
  );
});

app.put('/setAccount', (req, res) => {
  const { money, name } = req.body;
  db.query(
    "UPDATE workshops SET money = ? WHERE name = ?", [money, name],
    (err, result) => {
      if (err)
        console.log(err);
      else
        res.send(result);
    }
  );
});

app.get('/getTaskCount', (req, res) => {
  db.query("SELECT count FROM taskCount WHERE id = 1", (err, result) => {
    if (err)
      console.log(err);
    else {
      res.send(result);
    }
  });
});

app.get('/getTasks', (req, res) => {
  db.query("SELECT * FROM tasks", (err, result) => {
    if (err)
      console.log(err);
    else {
      res.send(result);
    }
  });
});
app.get('/getWorkshops', (req, res) => {
  db.query("SELECT * FROM workshops", (err, result) => {
    if (err)
      console.log(err);
    else {
      res.send(result);
    }
  });
});
app.get('/getPayments', (req, res) => {
  db.query("SELECT * FROM payments", (err, result) => {
    if (err)
      console.log(err);
    else {
      res.send(result);
    }
  });
});
app.get('/getArticles', (req, res) => {
  db.query("SELECT * FROM articles", (err, result) => {
    if (err)
      console.log(err);
    else {
      res.send(result);
    }
  });
});

app.post('/updateTaskCount', (req, res) => {
  const { task } = req.body;
  db.query("UPDATE taskCount SET count = ?", task, (err, result) => {
    if (err)
      console.log(err);
    else
      res.send(result);
  });
});

app.put('updateArticle', (req, res) => {
  const { id, description } = req.body;
  db.query(
    "UPDATE articles SET description = ? WHERE id = ?", [description, id],
    (err, result) => {
      if (err)
        console.log(err);
      else
        res.send(result);
    }
  );
});

app.put('updateWorkshop', (req, res) => {
  const { name, contact } = req.body;
  db.query(
    "UPDATE workshop SET contact = ? WHERE name = ?", [contact, name],
    (err, result) => {
      if (err)
        console.log(err);
      else
        res.send(result);
    }
  );
});

app.put('/assignTask', (req, res) => {
  const { name, task, deadline, weight, threads, price, exitDate } = req.body;
  db.query(
    "UPDATE tasks SET exitDate = ?, deadline = ?, name = ?, weight = ?, price = ?, threads = ?, state = 'assigned' WHERE id = ?",
    [exitDate, deadline, name, weight, price, threads, task],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put('/payWorkshop', (req, res) => {
  const { name, money } = req.body;
  db.query(
    "UPDATE workshops SET money = money + ? WHERE name = ?",
    [money, name],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post('/getAccount', (req, res) => {
  const { name } = req.body;
  db.query("SELECT money FROM workshops WHERE name = ?", name, (err, result) => {
    if (err)
      console.log(err);
    else
      res.send(result);
  });
});

app.post('/getPrices', (req, res) => {
  const { name, article } = req.body;
  db.query("SELECT * FROM tasks WHERE name = ? AND article_id = ? AND state != 'toAssign'", [name, article], (err, result) => {
    if (err)
      console.log(err);
    else
      res.send(result);
  });
})



app.listen(3307, () => {
  console.log('Yey, your server is running on port 3307');
});