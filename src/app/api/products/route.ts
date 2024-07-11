import { NextRequest, NextResponse } from "next/server";

import data from '../../../services/mock.json';

export async function GET(request: NextRequest) {
  return NextResponse.json(data);
};