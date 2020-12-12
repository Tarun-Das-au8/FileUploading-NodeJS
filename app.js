const express	=	require("express");
const bodyParser =	require("body-parser");
const multer	=	require('multer');
const cors = require('cors');
const app	=	express();
const port = 2020;

app.use(cors());
app.use(bodyParser.json());

const storage	=	multer.diskStorage({
  destination: (req, file, callback)=>{
    callback(null, './uploads');
  },
  filename: (req, file, callback)=>{
    callback(null, file.fieldname + '-' + Date.now());
  }
});

var upload = multer({ storage : storage }).array('userPhoto',2);


app.get('/',(req,res)=>{
      res.sendFile(__dirname + "/index.html");
});

app.post('/api/photo',(req,res)=>{
	upload(req,res,(err)=> {
		console.log(req.body);
		console.log(req.files);
		if(err) {
			return res.end("Error uploading file.");
		}
		res.end("File is uploaded");
	});
});

app.listen(port,(err)=>{
  if(err) throw err
  console.log(`Server running on port ${port}`)
})
