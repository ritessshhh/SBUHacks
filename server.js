const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const natural = require('natural');
const path = require('path');

const app = express();
const port = 3000;

// MongoDB connection URI and Database Name
const uri = "mongodb+srv://amirhamza:Nabil.2001@cluster0.vomraa2.mongodb.net/?retryWrites=true&w=majority";
const dbName = 'Cluster0';
const client = new MongoClient(uri)

// Use body-parser to parse JSON body
app.use(bodyParser.json());

// Static files middleware (if you're serving static content like HTML/CSS/JS)
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
async function connectToMongo() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (e) {
        console.error("Could not connect to MongoDB", e);
    }
}

connectToMongo();

// Sentiment Analysis function
function analyzeSentiment(text) {
    const analyzer = new natural.SentimentAnalyzer('English', natural.PorterStemmer, 'afinn');
    return analyzer.getSentiment(text.split(" "));
}

// Feedback submission endpoint
app.post('/submit-feedback', async (req, res) => {
    try {
        const feedbackText = req.body.feedback; // Assuming the feedback text is under 'feedback' key
        const sentimentScore = analyzeSentiment(feedbackText);

        const feedbackData = {
            ...req.body,
            sentimentScore, // Add the sentiment score to the feedback data
            date: new Date() // You might want to timestamp the feedback
        };

        const db = client.db(dbName);
        const collection = db.collection('feedback');
        await collection.insertOne(feedbackData);

        res.status(200).json({ message: 'Feedback submitted successfully', sentiment: sentimentScore > 0 ? 'Positive' : sentimentScore < 0 ? 'Negative' : 'Neutral' });
    } catch (e) {
        res.status(500).json({ message: 'Failed to submit feedback' });
        console.error(e);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'FrontEnd', 'feedback.html'));
});


