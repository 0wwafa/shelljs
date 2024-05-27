const { exec } = require('child_process');
const fs  = require('fs');
const https = require('https');

async function  shell(colab = false) {
  console.log("Starting up...");

  const logStream = fs.createWriteStream('log');
   const sshProcess = exec("ssh -o StrictHostKeyChecking=no -R 80:localhost:8568 nokey@localhost.run", { shell: true });
  sshProcess.stdout.pipe(logStream);
  sshProcess.stderr.pipe(logStream);

  const fname = 'ttyd.x86_64'; 
  exec("mkdir -p /usr/local/bin", () => { /* Ignore errors */ });
  if (!fs.existsSync("./ttyd")) {
    const response = await new Promise((resolve) => {
       https.get("https://github.com/tsl0922/ttyd/releases/latest", (res) => {
        resolve(res);
      });
    });
    const ver = response.headers.location.split('/').pop();
    exec(`wget - q https://github.com/tsl0922/ttyd/releases/download/${ver}/${fname} -O ttyd`, () => {
      fs.chmodSync("ttyd", 0o755);
    });
  }

  let hh;
  while  (true) {
    const logContent = fs.readFileSync('log', 'utf-8');
    if (logContent.includes("tunneled")) {
      hh = logContent.split('\n').filter(line => line.includes("tunneled")).pop().split(/\s+/ )[5];
      break;
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  const pw = Math.random().toString(36).slice(-6);

  fs.writeFileSync('dosh', `#!/bin/bash
 clear
echo -n "Password: "
read -sr p
[ "$p" == "${pw}" ] && ( clear
exec bash -i
) || exit
`);
  fs.chmodSync('dosh', 0o755);

  console.log("Starting server..."); 
  console.log(`Your server is: ${hh}`);
  console.log(`Your password is: ${pw}`);

  const ttydProcess = exec(`./ttyd -p 8568 --writable -t 'fontSize=20' -t 'theme={"foreground":"#d 2d2d2","background":"#1b1b1b","cursor":"#adadad","black":"#000000","red":"#d81e00","green":"#5ea702","yellow":"#cfae00","blue":"#4 27ab3","magenta":"#89658e","cyan":"#00a7aa","white":"#dbded8","brightBlack":"#686a66","brightRed":"#f54235","brightGreen":"#99e343"," brightYellow":"#fdeb61","brightBlue":"#84b0d8","brightMagenta":"#bc94b7","brightCyan":"#37e6e8","brightWhite":"#f1f1f0"}' -t 'fontFamily="Menlo For Powerline, Consolas,Liberation Mono,Menlo,Courier,monospace"' -t 'enableTrzsz=true' ./dosh`, { shell: true });
  ttydProcess.stdout.pipe(process.stdout);
  ttydProcess.stderr.pipe(process.stderr);

   if (colab) {
    // Assuming you're using a library like 'jsdom' to provide DOM functionality for IFrame
    const iframe = document.createElement('iframe');
    iframe.src = hh;
    iframe.width = 700;
    iframe.height =  500;
    document.body.appendChild(iframe);
    return iframe;
  } else {
    return true;
  }
}

module.exports = shell;
