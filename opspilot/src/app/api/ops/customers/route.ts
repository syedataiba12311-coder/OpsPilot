import { NextResponse } from 'next/server';
import { getCustomers } from '@/lib/operations';

export async function GET() {
    try {
        const result = await getCustomers();
        return NextResponse.json({
            success: true,
            timestamp: new Date().toISOString(),
            data: result,
        });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
