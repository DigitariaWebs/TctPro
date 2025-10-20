import { NextResponse } from 'next/server';

/**
 * GET /api/public
 * API Information and available endpoints
 */
export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'TCT Pro Public API - Educational Use',
    version: '1.0.0',
    documentation: '/api-docs',
    endpoints: [
      {
        path: '/api/public/vehicles',
        method: 'GET',
        description: 'Get all vehicles with optional filters',
      },
      {
        path: '/api/public/vehicles/:id',
        method: 'GET',
        description: 'Get a specific vehicle by ID',
      },
      {
        path: '/api/public/stats',
        method: 'GET',
        description: 'Get inventory statistics',
      },
    ],
    rateLimit: {
      maxRequests: 30,
      windowMs: 60000,
      message: '30 requests per minute',
    },
    termsOfUse: {
      educational: true,
      commercial: false,
      attribution: 'Required',
    },
  });
}
