'use client';

import React, { useEffect, useState } from 'react';
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from 'recharts';
import { Calendar, TrendingUp } from 'lucide-react';

interface ChartPoint {
    label: string;
    sales: number;
    orders: number;
}

export const SalesChart: React.FC = () => {
    const [chartData, setChartData] = useState<ChartPoint[]>([]);
    const [totalSales, setTotalSales] = useState<number>(0);
    const [totalOrders, setTotalOrders] = useState<number>(0);

    const fetchSalesData = async () => {
        try {
            const res = await fetch('/api/ops/sales').then((r) => r.json());
            if (res.success && res.data) {
                setTotalSales(res.data.revenue || 0);
                setTotalOrders(res.data.orders || 0);
                if (res.data.chart && res.data.chart.length > 0) {
                    setChartData(
                        res.data.chart.map((c: any) => ({
                            label: c.time || 'Time',
                            sales: c.sales || 0,
                            orders: c.orders || 0,
                        }))
                    );
                } else {
                    setChartData([]);
                }
            }
        } catch (e) {
            console.error('Failed fetching sales chart:', e);
        }
    };

    useEffect(() => {
        fetchSalesData();
    }, []);

    const avgOrderValue = totalOrders > 0 ? Math.round(totalSales / totalOrders) : 0;

    return (
        <div className="animate-slide-up delay-100 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs card-elevate">
            {/* Header & Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div>
                    <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-slate-900">Sales Analytics</h3>
                        <span className="rounded-full bg-teal-50 px-2.5 py-0.5 text-[10px] font-extrabold text-teal-800 border border-teal-300 flex items-center gap-1">
                            Live Stream
                        </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                        Hourly sales trajectory
                    </p>
                </div>
            </div>

            {/* Summary Mini Bar */}
            <div className="grid grid-cols-2 gap-3 mb-5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <div>
                    <div className="text-slate-500 text-[11px] font-medium">Total Sales</div>
                    <div className="font-bold text-slate-900 mt-0.5">PKR {totalSales.toLocaleString()}</div>
                </div>
                <div>
                    <div className="text-slate-500 text-[11px] font-medium">Average Order Value</div>
                    <div className="font-bold text-teal-800 mt-0.5">PKR {avgOrderValue.toLocaleString()}</div>
                </div>
            </div>

            {/* Chart or Empty State */}
            {chartData.length > 0 ? (
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#0d9488" stopOpacity={0.35} />
                                    <stop offset="95%" stopColor="#0d9488" stopOpacity={0.0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                            <XAxis
                                dataKey="label"
                                stroke="#64748b"
                                fontSize={11}
                                tickLine={false}
                                axisLine={{ stroke: '#cbd5e1' }}
                            />
                            <YAxis
                                stroke="#64748b"
                                fontSize={11}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(val) => `PKR ${val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}`}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#0f172a',
                                    borderColor: '#334155',
                                    borderRadius: '0.75rem',
                                    fontSize: '12px',
                                    color: '#f8fafc',
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)',
                                }}
                                formatter={(value: any) => [`PKR ${Number(value).toLocaleString()}`, 'Cumulative Sales']}
                            />
                            <Area
                                type="monotone"
                                dataKey="sales"
                                stroke="#0d9488"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#salesGradient)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <div className="h-44 w-full flex flex-col items-center justify-center rounded-xl bg-slate-50/70 border border-dashed border-slate-200 text-center p-6">
                    <TrendingUp className="h-8 w-8 text-slate-300 mb-2" />
                    <p className="text-xs font-bold text-slate-700">No Sales Data Recorded Yet</p>
                    <p className="text-[11px] text-slate-500 mt-1 max-w-xs">
                        Sales recorded via API or checkout will plot automatically here.
                    </p>
                </div>
            )}
        </div>
    );
};
