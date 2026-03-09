import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
    request: Request,
    { params }: { params: { name: string } }
) {
    // Await params based on Next.js 15+ constraints (Next 13/14 handles it fine too if not awaited but good practice)
    const name = params.name;

    let filePath = '';

    // これらのパスは生成されたスクリーンショットの絶対パスです
    if (name === 'wearcast') {
        filePath = 'C:\\Users\\kuwas\\.gemini\\antigravity\\brain\\a4995b0f-5b09-47c9-8069-2b5dc14ea839\\wearcast_screenshot_1773058028854.png';
    } else if (name === 'meguri24') {
        filePath = 'C:\\Users\\kuwas\\.gemini\\antigravity\\brain\\a4995b0f-5b09-47c9-8069-2b5dc14ea839\\meguri24_landing_page_1773058112140.png';
    }

    if (!filePath || !fs.existsSync(filePath)) {
        return new NextResponse('Not Found', { status: 404 });
    }

    try {
        const imageBuffer = fs.readFileSync(filePath);
        return new NextResponse(imageBuffer, {
            headers: {
                'Content-Type': 'image/png',
                'Cache-Control': 'public, max-age=86400',
            },
        });
    } catch (err) {
        console.error('Error reading image file:', err);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
