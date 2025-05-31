# 🔗 Sandinos Barn Blockchain API

A transparent donation tracking system built with TypeScript, Express, and blockchain technology for **Sandinos Barn NGO**.

## 🎯 Purpose

Provides **complete transparency** for donations through an immutable blockchain ledger. Every donation is cryptographically secured and publicly verifiable.

## ✨ Features

- 🔒 **Proof-of-Work Security** - SHA-256 hashing with dynamic difficulty
- 💾 **Persistent Storage** - Blockchain survives server restarts
- 🏗️ **Professional Architecture** - MVC pattern with TypeScript
- 📝 **Comprehensive Logging** - Application and error logs
- 🧪 **Test Coverage** - 19 tests across core functionality
- 🌐 **RESTful API** - Easy integration with web/mobile apps
- 💝 **Donation Management** - Complex objects with full metadata

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

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
http://localhost:3000
```

### Health Check

```http
GET /health
```

### Donations API

#### Record a Donation

```http
POST /api/donations
Content-Type: application/json

{
  "donor": "Alice Johnson",
  "amount": 100,
  "currency": "USD",
  "purpose": "School supplies for children"
}
```

#### Get All Donations

```http
GET /api/donations
```

### Blockchain API

#### Get All Blocks

```http
GET /api/blocks
```

#### Get Block by Hash

```http
GET /api/blocks/hash/{hash}
```

#### Mine Raw Block

```http
POST /api/blocks/mine
Content-Type: application/json

{
  "data": ["transaction1", "transaction2"]
}
```

## 🏗️ Architecture

```
src/
├── server.ts              # Application entry point
├── config/
│   └── constants.ts       # Blockchain configuration
├── controllers/           # Request handlers
├── middleware/            # Error handling
├── models/               # Blockchain core logic
├── routes/               # API endpoints
├── services/             # Business logic layer
└── utilities/            # Helper functions
```

## 🧪 Example Usage

### Record a Donation

```bash
curl -X POST http://localhost:3000/api/donations \
  -H "Content-Type: application/json" \
  -d '{
    "donor": "Maria Garcia",
    "amount": 50,
    "currency": "USD",
    "purpose": "Educational materials"
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
