import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      siteName: "Adruva Solution",
      description:
        "AI-Powered Digital Transformation & Web/Mobile App Development Agency.",
      contactEmail: "info@adruvasolution.com",
      contactPhone: "+91 91492 76799",
      officeAddress:
        "Near Bageshwari Devi Mandir, Shanti Nagar, Dhalwala, Rishikesh, Uttarakhand - 249137",
      facebookUrl: "https://facebook.com",
      instagramUrl: "https://instagram.com",
      linkedinUrl: "https://linkedin.com",
      twitterUrl: "https://twitter.com",
    },
  });
}
