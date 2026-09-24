'use client';

import React from 'react';
import { Report } from '../types';
import { FileText, Calendar, Sparkles, CheckCircle2 } from 'lucide-react';

interface ReportsViewProps {
    reports: Report[];
}

export const ReportsView: React.FC<ReportsViewProps> = ({ reports }) => {
    return (
        <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                    <div>
                        <h3 className="text-base font-bold text-slate-900">AI Generated Operational Reports</h3>
                        <p className="text-xs text-slate-500 font-medium">Automated briefings and inventory audit scans</p>
                    </div>
                    <span className="rounded-full bg-teal-50 border border-teal-200 px-3 py-1 text-xs font-bold text-teal-800">
                        {reports.length} Briefings Generated
                    </span>
                </div>

                <div className="space-y-4">
                    {reports.map((rep) => (
                        <div
                            key={rep.id}
                            className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 space-y-3 hover:border-teal-300 transition shadow-xs"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2">
                                <div className="flex items-center gap-2">
                                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-100 text-teal-800 font-bold">
                                        <FileText className="h-4 w-4" />
                                    </div>
                                    <h4 className="text-xs font-bold text-slate-900">{rep.title}</h4>
                                    <span className="rounded bg-teal-100 border border-teal-200 px-2 py-0.5 text-[10px] font-bold text-teal-800">
                                        {rep.type}
                                    </span>
                                </div>
                                <div className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {rep.created_at}
                                </div>
                            </div>

                            <p className="text-xs text-slate-700 leading-relaxed">{rep.summary}</p>

                            {rep.metrics && (
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                                    {rep.metrics.map((m, idx) => (
                                        <div key={idx} className="p-2 rounded-lg bg-white border border-slate-200 text-xs">
                                            <div className="text-[10px] text-slate-500 font-medium">{m.label}</div>
                                            <div className="font-extrabold text-slate-900 mt-0.5">{m.value}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
