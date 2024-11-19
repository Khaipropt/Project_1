const express = require ('express');
const app = express();
const port = 3000;

// Đinh nghĩa 1 route cơ bản 
app.get('/' , (req , res) => {
    res.send('Hello world');
});

// Khởi động server 
app.listen(port , () => {
    console.log(`Server đang chạy trên cổng ${port}`);
    });