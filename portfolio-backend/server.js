const express = require("express");
const cors = require("cors");
const { google } = require("googleapis");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

// Google Auth
const auth = new google.auth.GoogleAuth({
  keyFile: "./credentials.json",
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const SPREADSHEET_ID = "1CbzggGHLpLrNtyBdSoerChaOIsG2VmnoFnAPjkBA0iQ";

app.post("/api/contact", async (req, res) => {
  try {
    console.log("Received:", req.body);

    const client = await auth.getClient();

    const sheets = google.sheets({
      version: "v4",
      auth: client,
    });

    const {
      name,
      email,
      phone,
      company,
      projectType,
      budget,
      timeline,
      message,
    } = req.body;

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "'Portfolio Enquiry'!A:I",
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [
          [
            name,
            email,
            phone,
            company,
            projectType,
            budget,
            timeline,
            message,
            new Date().toLocaleString(),
          ],
        ],
      },
    });

    console.log("Google Sheet Updated");
    console.log(response.data);

    res.status(200).json({
      success: true,
      message: "Saved Successfully",
    });
  } catch (err) {
    console.error("ERROR =>", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server Started on Port ${PORT}`);
});