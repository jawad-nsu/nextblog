// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { databaseConnector, insertDocument } from "../../helpers/db-utils";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid mail" });
      return;
    }

    let client;
    try {
      client = await databaseConnector();
    } catch (error) {
      res.status(500).json({ message: "Database connection failed" });
      return;
    }

    try {
      await insertDocument(client, "newsletter", { email: userEmail });
      client.close();
    } catch (error) {
      res.status(500).json({ message: "Data insertion failed" });
      return;
    }

    res.status(201).json({ message: "signed up successfully" });
  }
};

export default handler;
