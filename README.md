# 🔗 Sandinos Barn Blockchain API

A transparent donation tracking system built with TypeScript, Express, and blockchain technology for **Sandinos Barn NGO**.

## 🎯 Purpose

Provides **complete transparency** for donations through an immutable blockchain ledger. Every donation is cryptographically secured and publicly verifiable.

## 🌟 Features

🔒 Immutable Records - Donations stored in tamper-proof blockchain
⛏️ Proof of Work - Secure mining with dynamic difficulty adjustment
💾 Persistent Storage - Blockchain data survives server restarts
🎯 Type Safety - Built with TypeScript for reliability
🔍 Centralized Logging - Comprehensive application and error logging
✅ Comprehensive Testing - 19+ tests ensuring code quality
🏗️ Professional Architecture - Clean MVC pattern with repository layer

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm 8+

### Installation

```bash
git clone <repository-url>
cd sb-blockchain-api
npm install
```

### Run the Application

```bash
npm run dev
```

The application runs in development mode, which is perfect for NGO use and educational purposes.

### Testing

```bash
npm test
```

## 📚 API Documentation

### Base URL

```
The API will be available at http://localhost:3000
```

### Health Check

```http
GET /health - Health check endpoint
```

### Donations API

#### Record a Donation

```http
POST /api/donations
Content-Type: application/json

{
  "donor": "Alice Johnson",
  "amount": 500,
  "currency": "USD",
  "purposes": [
    {
      "category": "Education",
      "description": "School supplies for children",
      "amount": 300
    },
    {
      "category": "Education",
      "description": "School fees",
      "amount": 200
    }
  ]
}
```

📡 API Endpoints

#### Get All Donations

```http
GET /api/donations - List all donations across all blocks
```

### Blockchain API

#### Get All Blocks

```http
GET /api/blocks - List all blocks in the blockchain
```

#### Get Block by Hash

```http
GET /api/blocks/hash/{hash} - Get specific block by hash
```

#### Mine Raw Block

```http
POST /api/blocks/mine - Mine a new block with custom data
Content-Type: application/json

{
  "data": ["transaction1", "transaction2"]
}
```

## 🏗️ Architecture

```
src/
├── app.ts                # Express application setup
├── server.ts             # Server startup and initialization
├── config/               # Configuration constants
├── controllers/          # Request handlers
├── middleware/           # Express middleware
├── models/              # Data models (Block, Blockchain, Donation)
├── repositories/        # Data access layer
├── routes/              # API route definitions
├── services/            # Business logic services
└── utilities/           # Helper utilities
```

## 🧪 Example Usage

### Record a Donation

```bash
curl -X POST http://localhost:3000/api/donations \
  -H "Content-Type: application/json" \
  -d '{
  "donor": "Anna",
  "amount": 1000,
  "currency": "SEK",
  "purposes": [
    {
      "category": "Education",
      "description": "School supplies for children",
      "amount": 300
    },
    {
      "category": "Education",
      "description": "School fees",
      "amount": 700
    }
  ]
}'
```

### View All Donations

```bash
curl http://localhost:3000/api/donations
```

### Verify Blockchain Integrity

```bash
curl http://localhost:3000/api/blocks
```

## 🔧 Configuration

Key settings in `src/config/constants.ts`:

- `MINE_RATE`: Target time between blocks (1000ms)
- `INITIAL_DIFFICULTY`: Starting mining difficulty (3)

## 📊 Data Storage

- **Blockchain**: `src/data/blockchain.json`
- **Application logs**: `src/data/app.log`
- **Error logs**: `src/data/error.log`

## 🛡️ Security Features

- ✅ Cryptographic hashing (SHA-256)
- ✅ Proof-of-work consensus
- ✅ Chain validation on startup
- ✅ Input validation and sanitization
- ✅ Centralized error handling

## 🎓 Educational Value

This project demonstrates:

- Blockchain fundamentals
- TypeScript best practices
- Test-driven development (TDD)
- RESTful API design
- Professional logging
- Error handling patterns

## 🤝 Contributing

This project was built as part of a blockchain development course. For educational use and NGO applications.

## 📄 License

MIT License - Feel free to use for educational purposes

## 🌟 About Sandinos Barn

_Sandinos Barn_ is committed to transparency in charitable giving. This blockchain system ensures every donation is tracked, verified, and publicly auditable.

---

Built with ❤️ and TypeScript
