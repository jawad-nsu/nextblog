import { MongoClient } from "mongodb";
import { getAllDocuments, insertDocument } from "../../../helpers/db-utils";

const handler = async (req, res) => {
  const eventId = req.query.eventId;

  let client;
  try {
    client = await databaseConnector();
  } catch (error) {
    res.status(500).json({ message: "Database connection failed" });
    return;
  }

  if (req.method === "POST") {
    const { name, email, text } = req.body;
    if (
      !name ||
      !email ||
      !text ||
      !email.includes("@") ||
      name.trim() === "" ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid Input" });
      client.close();
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    try {
      const result = await insertDocument(client, "comments", newComment);
      client.close();
      newComment._id = result.insertedId;

      console.log(newComment);

      res.status(201).json({ message: newComment });
    } catch (error) {
      res.status(500).json({ message: "Data insertion failed" });
    }
  }

  if (req.method === "GET") {
    try {
      const documents = await getAllDocuments(client, "comments", { _id: -1 });
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: "getting messages failed" });
    }
  }

  client.close();
};

export default handler;
