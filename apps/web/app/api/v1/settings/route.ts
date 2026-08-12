import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      siteName: "Adruva Solution",
      description:
        "AI-Powered Digital Transformation & Web/Mobile App Development Agency.",
      contactEmail: "hello@adruvasolution.com",
      contactPhone: "+91 98765 43210",
      officeAddress: "Rajpur Road, Jakhan, Dehradun",
      facebookUrl: "https://facebook.com",
      instagramUrl: "https://instagram.com",
      linkedinUrl: "https://linkedin.com",
      twitterUrl: "https://twitter.com",
    },
  });
}
