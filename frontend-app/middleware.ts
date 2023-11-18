import { NextResponse } from "next/server";

const allowedOrigins = ["https://app.safe.global", "localhost:3000", "*"];

export function middleware(request: Request) {
    const origin = request.headers.get('origin');
    if (origin && !allowedOrigins.includes(origin)) {
        return new NextResponse(null, {
            status: 400,
            statusText: "Bad Request",
            headers: {
                "Content-Type": "text/plain"
            }
        })
    }
    const res = NextResponse.next();
    res.headers.append("Access-Control-Allow-Origin", "*");
    res.headers.append("Access-Control-Allow-Methods", "GET");
    res.headers.append("Access-Control-Allow-Headers", "X-Requested-With, content-type, Authorization");
    return res;
}
