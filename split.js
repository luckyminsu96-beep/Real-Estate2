const fs = require('fs');

const style = fs.readFileSync('style.css', 'utf8');
const lines = style.split(/\r?\n/);

const globalCss = lines.slice(0, 112).join('\n');
const indexCssLines1 = lines.slice(112, 683);
const postCss = lines.slice(683, 840).join('\n');
const indexCssLines2 = lines.slice(840);

const indexCss = [...indexCssLines1, ...indexCssLines2].join('\n');

if (!fs.existsSync('css')) fs.mkdirSync('css');
if (!fs.existsSync('pages')) fs.mkdirSync('pages');

fs.writeFileSync('css/global.css', globalCss);
fs.writeFileSync('css/index.css', indexCss);
fs.writeFileSync('css/post-home.css', postCss);

let indexHtml = fs.readFileSync('index.html', 'utf8');
indexHtml = indexHtml.replace('<link rel="stylesheet" href="style.css">', '<link rel="stylesheet" href="css/global.css">\n    <link rel="stylesheet" href="css/index.css">');
indexHtml = indexHtml.replace(/href="post-home\.html"/g, 'href="pages/post-home.html"');
fs.writeFileSync('index.html', indexHtml);

let postHtml = fs.readFileSync('post-home.html', 'utf8');
postHtml = postHtml.replace('<link rel="stylesheet" href="style.css">', '<link rel="stylesheet" href="../css/global.css">\n    <link rel="stylesheet" href="../css/post-home.css">');
postHtml = postHtml.replace(/href="index\.html"/g, 'href="../index.html"');
fs.writeFileSync('pages/post-home.html', postHtml);

fs.unlinkSync('post-home.html');
fs.unlinkSync('style.css');

console.log('Successfully separated files into folders.');
