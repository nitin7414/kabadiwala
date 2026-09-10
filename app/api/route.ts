import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    app: "Scrap Setu — Kabadiwala Connect",
    version: "0.1.0",
    phase: "Phase 0 Scaffold",
  });
}
