import bodyParser from 'body-parser'
import { Console } from 'console';
import viewEngineConfig from "./viewEngineConfigs"
var express = require('express')
const AWS = require('aws-sdk');
const fs = require('fs');

const app = express();
const port = 3000;


const s3 = new AWS.S3({
    accessKeyId: 'AKIA6GBMFSPEG3OXDXTJ',
    secretAccessKey: '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'
});


const uploadFile = (fileName, bucketName) => {
    const fileContent = fs.readFileSync(fileName);

    const params = {
        Bucket: bucketName,
        Key: fileName,
        Body: fileContent,
    };

    try {
        s3.upload(params, (err, data) => {
            if (err) {
                console.error('Error uploading file:', err);
            } else {
                console.log(`File uploaded successfully. ${data.Location}`);
            }
        });
    } catch (error) {
        Console.log(error)
    }
};



const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

viewEngineConfig(app)

router.get('/', (req, res) => {


    // Usage
    uploadFile('./src/asset/1.PNG', 'myfirstbucketnodejs');


    res.render("home")
});

app.use("/api/v1", router)




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});