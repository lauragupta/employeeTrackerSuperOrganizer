

//set port and express as app
const PORT = process.env.PORT || 3001;
const app = express();

//Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});



//Set app listening on port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
