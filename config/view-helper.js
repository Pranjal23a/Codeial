const env = require('./environment');
const fs = require('fs');
const path = require('path');

module.exports = (app) => {
    app.locals.assetPath = function (filePath) {
        if (env.name === 'development') {
            return filePath;
        }

        const manifestPath = path.join(__dirname, '../public/assets/rev-manifest.json');
        try {
            const manifest = JSON.parse(fs.readFileSync(manifestPath));
            return '/' + manifest[filePath];
        } catch (err) {
            console.error('Error reading rev-manifest.json:', err);
            return filePath;
        }
    };
};
