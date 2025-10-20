'use client';

import { useState } from 'react';
import { Copy, Check, Book, Code, Database, Shield, Zap } from 'lucide-react';

export default function ApiDocsPage() {
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'endpoints' | 'examples'>('overview');

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

  const copyToClipboard = (text: string, endpoint: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEndpoint(endpoint);
    setTimeout(() => setCopiedEndpoint(null), 2000);
  };

  const endpoints = [
    {
      method: 'GET',
      path: '/api/public/vehicles',
      description: 'Get all vehicles with optional filters and pagination',
      params: [
        { name: 'limit', type: 'number', description: 'Number of results (max: 50, default: 20)' },
        { name: 'offset', type: 'number', description: 'Pagination offset (default: 0)' },
        { name: 'available', type: 'boolean', description: 'Filter by availability' },
        { name: 'minPrice', type: 'number', description: 'Minimum price filter' },
        { name: 'maxPrice', type: 'number', description: 'Maximum price filter' },
        { name: 'year', type: 'number', description: 'Filter by year' },
        { name: 'transmission', type: 'string', description: 'Filter by transmission type' },
      ],
      example: `${baseUrl}/api/public/vehicles?limit=10&available=true`,
    },
    {
      method: 'GET',
      path: '/api/public/vehicles/:id',
      description: 'Get a specific vehicle by ID',
      params: [
        { name: 'id', type: 'number', description: 'Vehicle ID (path parameter)' },
      ],
      example: `${baseUrl}/api/public/vehicles/1`,
    },
    {
      method: 'GET',
      path: '/api/public/stats',
      description: 'Get inventory statistics and distribution data',
      params: [],
      example: `${baseUrl}/api/public/stats`,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <div className="border-b border-amber-500/20 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <Book className="w-8 h-8 text-amber-500" />
            <div>
              <h1 className="text-3xl font-bold text-white">TCT Pro API Documentation</h1>
              <p className="text-slate-400 mt-1">Educational Access to Vehicle Inventory Data</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-amber-500/20">
            <Shield className="w-10 h-10 text-amber-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Rate Limited</h3>
            <p className="text-slate-400">30 requests per minute for fair usage</p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-amber-500/20">
            <Database className="w-10 h-10 text-amber-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Real-time Data</h3>
            <p className="text-slate-400">Access to current vehicle inventory</p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-amber-500/20">
            <Zap className="w-10 h-10 text-amber-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Easy to Use</h3>
            <p className="text-slate-400">RESTful API with JSON responses</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-slate-700">
          {['overview', 'endpoints', 'examples'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as typeof activeTab)}
              className={`px-6 py-3 font-semibold capitalize transition-colors relative ${
                activeTab === tab
                  ? 'text-amber-500'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500" />
              )}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <section className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-amber-500/20">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Book className="w-6 h-6 text-amber-500" />
                Getting Started
              </h2>
              <div className="space-y-4 text-slate-300">
                <p>
                  The TCT Pro Public API provides read-only access to our vehicle inventory data for
                  educational and development purposes.
                </p>
                <div className="bg-slate-900/50 rounded-lg p-4 border border-amber-500/10">
                  <h3 className="font-semibold text-amber-500 mb-2">Base URL</h3>
                  <code className="text-sm">{baseUrl}/api/public</code>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-4 border border-amber-500/10">
                  <h3 className="font-semibold text-amber-500 mb-2">Rate Limits</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>30 requests per minute per IP address</li>
                    <li>Rate limit headers included in all responses</li>
                    <li>429 status code when limit exceeded</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-amber-500/20">
              <h2 className="text-2xl font-bold mb-4">Terms of Use</h2>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-amber-500 mt-1">✓</span>
                  <span>Educational and non-commercial use only</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-500 mt-1">✓</span>
                  <span>Respect rate limits to ensure fair access for all users</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-500 mt-1">✓</span>
                  <span>Attribution to TCT Pro required when displaying data</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>No commercial scraping or reselling of data</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>No automated high-frequency requests</span>
                </li>
              </ul>
            </section>
          </div>
        )}

        {/* Endpoints Tab */}
        {activeTab === 'endpoints' && (
          <div className="space-y-6">
            {endpoints.map((endpoint, idx) => (
              <div
                key={idx}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-amber-500/20"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-lg text-sm font-semibold">
                      {endpoint.method}
                    </span>
                    <code className="text-amber-500 font-mono">{endpoint.path}</code>
                  </div>
                </div>
                <p className="text-slate-300 mb-4">{endpoint.description}</p>

                {endpoint.params.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-white mb-2">Parameters:</h4>
                    <div className="space-y-2">
                      {endpoint.params.map((param, paramIdx) => (
                        <div
                          key={paramIdx}
                          className="bg-slate-900/50 rounded-lg p-3 border border-slate-700"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <code className="text-amber-500 text-sm">{param.name}</code>
                            <span className="text-xs text-slate-500">({param.type})</span>
                          </div>
                          <p className="text-sm text-slate-400">{param.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-slate-400">Example Request:</span>
                    <button
                      onClick={() => copyToClipboard(endpoint.example, endpoint.path)}
                      className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      {copiedEndpoint === endpoint.path ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-slate-400" />
                      )}
                    </button>
                  </div>
                  <code className="text-sm text-amber-500 break-all">{endpoint.example}</code>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Examples Tab */}
        {activeTab === 'examples' && (
          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-amber-500/20">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Code className="w-5 h-5 text-amber-500" />
                JavaScript/Fetch Example
              </h3>
              <pre className="bg-slate-900 rounded-lg p-4 overflow-x-auto border border-slate-700">
                <code className="text-sm text-slate-300">{`// Fetch all available vehicles
fetch('${baseUrl}/api/public/vehicles?available=true&limit=10')
  .then(response => response.json())
  .then(data => {
    console.log(\`Found \${data.metadata.total} vehicles\`);
    console.log(data.data);
  })
  .catch(error => console.error('Error:', error));

// Fetch specific vehicle
fetch('${baseUrl}/api/public/vehicles/1')
  .then(response => response.json())
  .then(data => console.log(data.data))
  .catch(error => console.error('Error:', error));`}</code>
              </pre>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-amber-500/20">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Code className="w-5 h-5 text-amber-500" />
                Python Example
              </h3>
              <pre className="bg-slate-900 rounded-lg p-4 overflow-x-auto border border-slate-700">
                <code className="text-sm text-slate-300">{`import requests

# Fetch all available vehicles
response = requests.get(
    '${baseUrl}/api/public/vehicles',
    params={'available': 'true', 'limit': 10}
)

data = response.json()
print(f"Found {data['metadata']['total']} vehicles")
print(data['data'])

# Get statistics
stats = requests.get('${baseUrl}/api/public/stats').json()
print(f"Average price: {stats['data']['pricing']['average']} CAD")`}</code>
              </pre>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-amber-500/20">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Code className="w-5 h-5 text-amber-500" />
                cURL Example
              </h3>
              <pre className="bg-slate-900 rounded-lg p-4 overflow-x-auto border border-slate-700">
                <code className="text-sm text-slate-300">{`# Get all vehicles
curl "${baseUrl}/api/public/vehicles?limit=10"

# Get vehicle by ID
curl "${baseUrl}/api/public/vehicles/1"

# Get statistics
curl "${baseUrl}/api/public/stats"`}</code>
              </pre>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-amber-500/20">
              <h3 className="text-xl font-semibold mb-4">Response Format</h3>
              <p className="text-slate-400 mb-4">All endpoints return JSON with this structure:</p>
              <pre className="bg-slate-900 rounded-lg p-4 overflow-x-auto border border-slate-700">
                <code className="text-sm text-slate-300">{`{
  "success": true,
  "data": [...], // or {...} for single item
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
}`}</code>
              </pre>
            </div>
          </div>
        )}

        
      </div>
    </div>
  );
}
