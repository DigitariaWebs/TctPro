# TCT Pro Public API Documentation

## Overview

The TCT Pro Public API provides read-only access to our vehicle inventory data for educational and development purposes. This API is designed to help developers learn about REST APIs, data fetching, and integration patterns.

## Base URL

```
https://your-domain.com/api/public
```

## Authentication

Currently, no API key is required. The API uses IP-based rate limiting for fair usage.

## Rate Limits

- **30 requests per minute** per IP address
- Rate limit information is included in response headers:
  - `X-RateLimit-Limit`: Maximum requests allowed
  - `X-RateLimit-Remaining`: Requests remaining in current window
  - `X-RateLimit-Reset`: Timestamp when the limit resets

When rate limit is exceeded, you'll receive a `429 Too Many Requests` response.

## Endpoints

### 1. Get All Vehicles

```http
GET /api/public/vehicles
```

Retrieve a paginated list of vehicles with optional filters.

#### Query Parameters

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `limit` | number | Number of results to return (max: 50) | 20 |
| `offset` | number | Number of results to skip | 0 |
| `available` | boolean | Filter by availability | - |
| `minPrice` | number | Minimum price filter | - |
| `maxPrice` | number | Maximum price filter | - |
| `year` | number | Filter by year | - |
| `transmission` | string | Filter by transmission type | - |

#### Example Request

```bash
curl "https://your-domain.com/api/public/vehicles?limit=10&available=true"
```

#### Example Response

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Audi RS7 Carbon Optic Audi Exclusive",
      "year": 2018,
      "price": "88 900 CAD",
      "mileage": "82,323 km",
      "transmission": "Automatique",
      "fuel": "Essence",
      "image": "/Cars/AudiRS7/IMG-20250720-WA0029.jpg",
      "gallery": [...],
      "badge": "Disponible",
      "isAvailable": true
    }
  ],
  "metadata": {
    "total": 20,
    "limit": 10,
    "offset": 0,
    "returned": 10,
    "hasMore": true
  },
  "_links": {
    "self": "/api/public/vehicles?limit=10&offset=0",
    "next": "/api/public/vehicles?limit=10&offset=10",
    "prev": null
  }
}
```

### 2. Get Vehicle by ID

```http
GET /api/public/vehicles/:id
```

Retrieve a specific vehicle by its ID.

#### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | number | Vehicle ID |

#### Example Request

```bash
curl "https://your-domain.com/api/public/vehicles/1"
```

#### Example Response

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Audi RS7 Carbon Optic Audi Exclusive",
    "year": 2018,
    "price": "88 900 CAD",
    "mileage": "82,323 km",
    "transmission": "Automatique",
    "fuel": "Essence",
    "image": "/Cars/AudiRS7/IMG-20250720-WA0029.jpg",
    "gallery": [...],
    "badge": "Disponible",
    "isAvailable": true
  }
}
```

### 3. Get Inventory Statistics

```http
GET /api/public/stats
```

Retrieve aggregated statistics about the vehicle inventory.

#### Example Request

```bash
curl "https://your-domain.com/api/public/stats"
```

#### Example Response

```json
{
  "success": true,
  "data": {
    "inventory": {
      "total": 20,
      "available": 10,
      "sold": 10
    },
    "pricing": {
      "average": 18500,
      "minimum": 4200,
      "maximum": 88900,
      "currency": "CAD"
    },
    "distribution": {
      "byYear": {
        "2018": 3,
        "2019": 2,
        ...
      },
      "byTransmission": {
        "Automatique": 18,
        "Manuelle": 2
      },
      "byFuel": {
        "Essence": 19,
        "Diesel": 1
      }
    }
  },
  "metadata": {
    "lastUpdated": "2025-10-20T12:00:00.000Z"
  }
}
```

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "error": "Error Type",
  "message": "Detailed error message"
}
```

### Common Status Codes

- `200` - Success
- `400` - Bad Request (invalid parameters)
- `404` - Not Found
- `429` - Rate Limit Exceeded
- `500` - Internal Server Error

## Code Examples

### JavaScript/Fetch

```javascript
// Fetch all available vehicles
async function getAvailableVehicles() {
  try {
    const response = await fetch('https://your-domain.com/api/public/vehicles?available=true&limit=10');
    const data = await response.json();
    console.log(`Found ${data.metadata.total} vehicles`);
    return data.data;
  } catch (error) {
    console.error('Error:', error);
  }
}
```

### Python

```python
import requests

# Fetch vehicles with filters
response = requests.get(
    'https://your-domain.com/api/public/vehicles',
    params={'available': 'true', 'year': 2020}
)

data = response.json()
print(f"Found {data['metadata']['total']} vehicles")
```

### Node.js (Axios)

```javascript
const axios = require('axios');

async function getVehicleStats() {
  const response = await axios.get('https://your-domain.com/api/public/stats');
  const stats = response.data.data;
  console.log(`Average price: ${stats.pricing.average} CAD`);
}
```

## Terms of Use

### Allowed Uses ✓
- Educational projects and learning
- Portfolio and demonstration applications
- Academic research and analysis
- Non-commercial open-source projects

### Prohibited Uses ✗
- Commercial scraping or reselling of data
- High-frequency automated requests
- Circumventing rate limits
- Misleading representation of data source

## Best Practices

1. **Respect Rate Limits**: Monitor the rate limit headers and implement appropriate delays
2. **Cache Responses**: Store frequently accessed data locally to reduce API calls
3. **Handle Errors**: Implement proper error handling for all API requests
4. **Attribution**: Credit TCT Pro when displaying data from this API
5. **Pagination**: Use pagination for large datasets instead of requesting all data at once

## CORS

The API includes CORS headers allowing cross-origin requests from any domain for educational purposes.

## Support

For questions, issues, or feature requests:
- Email: api@tctpro.com
- Documentation: https://your-domain.com/api-docs

## Changelog

### Version 1.0.0 (October 2025)
- Initial public API release
- Vehicle listing endpoint
- Individual vehicle endpoint
- Statistics endpoint
- Rate limiting implementation

---

**Note**: This API is provided for educational purposes. TCT Pro reserves the right to modify, restrict, or discontinue the API at any time.
