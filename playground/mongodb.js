// CRUD create read update delete

const { MongoClient, ObjectID } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "taks-time";

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to database!");
    }

    const db = client.db(databaseName);
    // insert(One,Many), update(One,Many), delete(One,Many)

    // db.collection("users")
    //   .insertOne({ name: "Alvin", age: "27" })
    //   .then(result => {
    //     console.log(result.ops);
    //   })
    //   .catch(error => {
    //     console.log("Error", error);
    //   });

    // db.collection("users")
    //   .updateOne(
    //     {
    //       _id: new ObjectID("5d2d7d4b289f2043c3585165")
    //     },
    //     {
    //       $inc: {
    //         age: 1
    //       }
    //     }
    //   )
    //   .then(result => {
    //     console.log(result);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });

    // db.collection("users")
    //   .updateMany(
    //     {
    //       age: 30
    //     },
    //     {
    //       $inc: {
    //         age: 1
    //       }
    //     }
    //   )
    //   .then(result => {
    //     console.log(result.modifiedCount);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });

    db.collection("users")
      .deleteOne({
        age: 36
      })
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });

    db.collection("users")
      .deleteMany({
        age: 32
      })
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });
  }
);
