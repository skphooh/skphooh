const fs = require('fs');
const path = require('path');

const srcWearcast = 'C:\\Users\\kuwas\\.gemini\\antigravity\\brain\\a4995b0f-5b09-47c9-8069-2b5dc14ea839\\wearcast_screenshot_1773058028854.png';
const srcMeguri = 'C:\\Users\\kuwas\\.gemini\\antigravity\\brain\\a4995b0f-5b09-47c9-8069-2b5dc14ea839\\meguri24_landing_page_1773058112140.png';

const destWearcast = path.join(__dirname, 'public', 'wearcast-preview.png');
const destMeguri = path.join(__dirname, 'public', 'meguri24-preview.png');

try {
    fs.copyFileSync(srcWearcast, destWearcast);
    console.log('Successfully copied wearcast preview.');

    fs.copyFileSync(srcMeguri, destMeguri);
    console.log('Successfully copied meguri24 preview.');
} catch (err) {
    console.error('Error copying files:', err);
    process.exit(1);
}

process.exit(0);
