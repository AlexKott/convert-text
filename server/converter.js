const fs = require('fs');
const pdf = require('html-pdf');
const fileManager = require('./fileManager');
const config = require('../config.json');

module.exports = {
    save(type, name, content) {
        if (!fs.existsSync(config.filePath)){
            fs.mkdirSync(config.filePath);
        }
        if (type === 'html') {
            return saveHTML(name, content);
        } else if (type === 'pdf') {
            return savePDF(name, content);
        }
    }
};

function savePDF(name, content) {
    const path = `${config.filePath}/${name}.pdf`;
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            pdf
                .create(content, { format: config.pdfFormat })
                .toFile(path, (err, res) => { // no existent file check
                    if (err) {
                        reject(err);
                    } else {
                        fileManager.update({ name, path });
                        resolve({ fileName: name, fileType: 'PDF' });
                    }
                });
        }, config.timeOut.pdf);
    });
}

function saveHTML(name, content) {
    const path = `${config.filePath}/${name}.html`;
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const htmlContent = `<!doctype html><html>
                    <head><title>${name}</title></head>
                    <body>${content}</body></html>`; // just the basics
            fs.writeFile(path, htmlContent, 'utf8', (err, res) => { // no existent file check
                if (err) {
                    reject(err);
                } else {
                    fileManager.update({ name, path });
                    resolve({ fileName: name, fileType: 'HTML' });
                }
            });
        }, config.timeOut.html);
    });
}
