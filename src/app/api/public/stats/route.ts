import { NextRequest, NextResponse } from 'next/server';
import { featuredVehicles } from '@/Data/Cars';

export const dynamic = 'force-dynamic';

/**
 * GET /api/public/stats
 * Public API endpoint to retrieve inventory statistics
 * 
 * Rate Limit: 30 requests per minute per IP/API key
 */
export async function GET(request: NextRequest) {
  try {
    const totalVehicles = featuredVehicles.length;
    const availableVehicles = featuredVehicles.filter(v => v.isAvailable).length;
    const soldVehicles = featuredVehicles.filter(v => !v.isAvailable).length;

    // Calculate price statistics
    const prices = featuredVehicles.map(v => parseFloat(v.price.replace(/[^0-9.]/g, '')));
    const averagePrice = prices.reduce((a, b) => a + b, 0) / prices.length;
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    // Get year distribution
    const yearDistribution = featuredVehicles.reduce((acc, v) => {
      acc[v.year] = (acc[v.year] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    // Get transmission types
    const transmissionTypes = featuredVehicles.reduce((acc, v) => {
      acc[v.transmission] = (acc[v.transmission] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Get fuel types
    const fuelTypes = featuredVehicles.reduce((acc, v) => {
      acc[v.fuel] = (acc[v.fuel] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return NextResponse.json({
      success: true,
      data: {
        inventory: {
          total: totalVehicles,
          available: availableVehicles,
          sold: soldVehicles,
        },
        pricing: {
          average: Math.round(averagePrice),
          minimum: minPrice,
          maximum: maxPrice,
          currency: 'CAD',
        },
        distribution: {
          byYear: yearDistribution,
          byTransmission: transmissionTypes,
          byFuel: fuelTypes,
        },
      },
      metadata: {
        lastUpdated: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: 'Failed to retrieve statistics',
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
