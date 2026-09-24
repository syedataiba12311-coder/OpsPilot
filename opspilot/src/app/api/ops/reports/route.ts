import { NextResponse } from 'next/server';
import { getReports, generateReport } from '@/lib/operations';

export async function GET() {
    try {
        const data = await getReports();
        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json().catch(() => ({}));
        const reportType = body.type || 'Restock';
        const report = await generateReport(reportType);
        return NextResponse.json({ success: true, data: report });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
