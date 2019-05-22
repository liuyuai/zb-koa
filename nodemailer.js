const nodemailer = require('nodemailer');
const template = require('art-template');
const fs = require('fs');
// const path = require('path');



const sendEmail = ()=>{

    console.log('进入SMTP');


    // 开启一个 SMTP 连接池
    let transporter = nodemailer.createTransport({
        host: 'smtp.163.com',
        secureConnection: true, // use SSL
        port: 465,
        secure: true, // secure:true for port 465, secure:false for port 587
        auth: {
            user: 'liuyu5258a@163.com',
            pass: 'liuyu789' // QQ邮箱需要使用授权码
        }
    });


    // let html = fs.createReadStream('preview.html');
    // console.log(html);


    let html = fs.readFileSync('preview.html');
    // fs.readFile('preview.html',function (err,data) {
    //     if(err){
    //         return console.log('读取文件失败');
    //     }
    //
    //     // console.log(data.toString());
    //     html = data.toString();
    // });

    console.log(html.toString());

    let data = template.render(html.toString(),{

        //对应{{ name }}
        name: 'Node',

        //对应{{ age }}
        age: 18,

        //对应{{ province }}
        province: '上海市',

        //对应{{each hobbies}} {{ $value }} {{/each}}
        //此为数组 each开始循环  /each结束循环
        hobbies: [
            '写代码',
            '打游戏',
            '听音乐'
        ],

        //对应{{ title }}
        title: '个人信息'
    });


    // 设置邮件内容（谁发送什么给谁）
    let mailOptions = {
        from: '"刘宇" <liuyu5258a@163.com>', // 发件人
        to: ' liuzhaoyu@51tiangou.com', // 收件人
        // CC:'chenqifeng@51tiangou.com',
        subject: 'Hello', // 主题
        // text: '这是一封来自 Node.js 的测试邮件', // plain text body
        // html: '<b>这是一封来自 Node.js 的测试邮件</b>', // html body
        html: data,
        // 下面是发送附件，不需要就注释掉
        // attachments: [{
        //     filename: 'test.md',
        //     path: './test.md'
        // },
        //     {
        //         filename: 'content',
        //         content: '发送内容'
        //     }
        // ]
    };


    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log(`Message: ${info.messageId}`);
        console.log('---------------------------');
        console.log(`sent: ${info.response}`);
    });


};

module.exports={
    sendEmail
};