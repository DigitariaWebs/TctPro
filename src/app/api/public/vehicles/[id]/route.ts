import { NextRequest, NextResponse } from 'next/server';
import { featuredVehicles } from '@/Data/Cars';

export const dynamic = 'force-dynamic';

/**
 * GET /api/public/vehicles/:id
 * Public API endpoint to retrieve a specific vehicle by ID
 * 
 * Rate Limit: 30 requests per minute per IP/API key
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const vehicleId = parseInt(id);

    if (isNaN(vehicleId)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid ID',
          message: 'Vehicle ID must be a number',
        },
        { status: 400 }
      );
    }

    const vehicle = featuredVehicles.find(v => v.id === vehicleId);

    if (!vehicle) {
      return NextResponse.json(
        {
          success: false,
          error: 'Not found',
          message: `Vehicle with ID ${vehicleId} not found`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: vehicle,
    });
  } catch (error) {
    console.error('Error fetching vehicle:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: 'Failed to retrieve vehicle',
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, x-api-key',
    },
  });
}
