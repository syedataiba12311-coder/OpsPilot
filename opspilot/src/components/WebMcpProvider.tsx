'use client';

import { useEffect } from 'react';
import { registerWebMcpTools } from '@/lib/webmcp/registerWebMcpTools';

export function WebMcpProvider() {
    useEffect(() => {
        registerWebMcpTools();
    }, []);

    return null;
}
