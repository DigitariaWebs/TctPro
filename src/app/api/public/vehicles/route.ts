import { NextRequest, NextResponse } from 'next/server';
import { featuredVehicles } from '@/Data/Cars';

export const dynamic = 'force-dynamic';

/**
 * GET /api/public/vehicles
 * Public API endpoint to retrieve vehicle listings
 * 
 * Query Parameters:
 * - limit: Number of results to return (default: 20, max: 50)
 * - offset: Number of results to skip for pagination (default: 0)
 * - available: Filter by availability (true/false)
 * - minPrice: Minimum price filter (e.g., 10000)
 * - maxPrice: Maximum price filter (e.g., 50000)
 * - year: Filter by year (e.g., 2020)
 * - transmission: Filter by transmission type (Automatique/Manuelle)
 * 
 * Rate Limit: 30 requests per minute per IP/API key
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Parse query parameters
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 50);
    const offset = parseInt(searchParams.get('offset') || '0');
    const availableFilter = searchParams.get('available');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const yearFilter = searchParams.get('year');
    const transmissionFilter = searchParams.get('transmission');

    // Filter vehicles
    let filteredVehicles = [...featuredVehicles];

    // Apply availability filter
    if (availableFilter !== null) {
      const isAvailable = availableFilter === 'true';
      filteredVehicles = filteredVehicles.filter(v => v.isAvailable === isAvailable);
    }

    // Apply year filter
    if (yearFilter) {
      const year = parseInt(yearFilter);
      filteredVehicles = filteredVehicles.filter(v => v.year === year);
    }

    // Apply transmission filter
    if (transmissionFilter) {
      filteredVehicles = filteredVehicles.filter(
        v => v.transmission.toLowerCase() === transmissionFilter.toLowerCase()
      );
    }

    // Apply price filters (parse CAD prices)
    if (minPrice || maxPrice) {
      filteredVehicles = filteredVehicles.filter(v => {
        const price = parseFloat(v.price.replace(/[^0-9.]/g, ''));
        if (minPrice && price < parseFloat(minPrice)) return false;
        if (maxPrice && price > parseFloat(maxPrice)) return false;
        return true;
      });
    }

    // Get total count before pagination
    const total = filteredVehicles.length;

    // Apply pagination
    const paginatedVehicles = filteredVehicles.slice(offset, offset + limit);

    // Return response with metadata
    return NextResponse.json({
      success: true,
      data: paginatedVehicles,
      metadata: {
        total,
        limit,
        offset,
        returned: paginatedVehicles.length,
        hasMore: offset + limit < total,
      },
      _links: {
        self: `/api/public/vehicles?limit=${limit}&offset=${offset}`,
        next: offset + limit < total ? `/api/public/vehicles?limit=${limit}&offset=${offset + limit}` : null,
        prev: offset > 0 ? `/api/public/vehicles?limit=${limit}&offset=${Math.max(0, offset - limit)}` : null,
      },
    });
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: 'Failed to retrieve vehicles',
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
