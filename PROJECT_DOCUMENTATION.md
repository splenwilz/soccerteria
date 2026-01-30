# Soccerteria: A Digital Implementation of La Quiniela

## Table of Contents

1. [Introduction to La Quiniela](#1-introduction-to-la-quiniela)
2. [What is Soccerteria?](#2-what-is-soccerteria)
3. [Core Betting Options](#3-core-betting-options)
4. [The 15-Match Structure](#4-the-15-match-structure)
5. [The Special 15th Game (Pleno al 15)](#5-the-special-15th-game-pleno-al-15)
6. [Combinatorial System](#6-combinatorial-system)
7. [Pricing Structure](#7-pricing-structure)
8. [Complete Calculation Example](#8-complete-calculation-example)
9. [User Flow](#9-user-flow)
10. [Data Management](#10-data-management)
11. [Authentication System](#11-authentication-system)
12. [Payment Processing](#12-payment-processing)
13. [Admin Features](#13-admin-features)
14. [User Interface](#14-user-interface)
15. [Key Differences from Official La Quiniela](#15-key-differences-from-official-la-quiniela)

---

## 1. Introduction to La Quiniela

**La Quiniela** (officially "La Quiniela de Futbol") is Spain's oldest and most iconic sports lottery, established in 1946. It is operated by Spain's national lottery organization and is deeply embedded in Spanish football culture.

### Traditional Rules

- **15 football matches** from Spanish First and Second Division leagues
- **Predict outcomes** for each match using standardized symbols
- **Combinatorial betting** allows multiple predictions per match
- **"Pleno al 15"** - The 15th match has special rules for exact score prediction
- **Prize pools** based on ticket sales and correct predictions

---

## 2. What is Soccerteria?

Soccerteria is a modern, digital implementation of the traditional La Quiniela lottery system. It is a sports prediction platform where users:

1. **View 15 upcoming football matches** configured by administrators
2. **Make predictions** on the outcome of each match
3. **Pay for their prediction tickets** through a digital wallet or card payment
4. **Win prizes** from a jackpot pool based on prediction accuracy

The platform combines the classic Quiniela mechanics with modern web technologies, offering features like:

- Multi-currency support based on user location
- Digital wallet for storing funds
- Real-time league standings and live scores
- Mobile-responsive design
- Secure payment processing

---

## 3. Core Betting Options

The system implements the five official Quiniela betting symbols:

| Symbol | Meaning | Spanish Name | Description |
|--------|---------|--------------|-------------|
| **1** | Home team wins | "Uno" | The team playing on their home ground wins the match |
| **X** | Draw (tie) | "Equis" | Both teams finish with the same score |
| **2** | Away team wins | "Dos" | The visiting team wins the match |
| **0** | No goals scored | "Cero" | The match ends 0-0 (used primarily in game 15) |
| **M** | More than 2 goals | "Eme" | The team scores more than 2 goals (used primarily in game 15) |

### Option Usage

- **Games 1-14**: Users typically select from 1, X, or 2 (standard match outcome prediction)
- **Game 15**: Users select from 0, 1, 2, or M for both the home and away team separately (score-based prediction)

---

## 4. The 15-Match Structure

Every Quiniela round consists of exactly **15 football matches**. This is a fundamental rule that cannot be changed.

### Match Data Storage

Each match list stores:

- **Team names**: Home and away team for all 15 matches (30 team fields total)
- **Game date**: When the matches will be played
- **Jackpot amount**: The prize pool for this round

### Match List Example

| Game | Home Team | Away Team |
|------|-----------|-----------|
| 1 | Real Madrid | Barcelona |
| 2 | Atletico Madrid | Sevilla |
| 3 | Valencia | Villarreal |
| ... | ... | ... |
| 14 | Mallorca | Las Palmas |
| 15 | Getafe | Celta Vigo |

Administrators create these match lists before each round, selecting the 15 matches from upcoming Spanish league fixtures.

---

## 5. The Special 15th Game (Pleno al 15)

The 15th match in La Quiniela has special rules that differ from games 1-14. This is called "Pleno al 15" (Full on the 15th).

### How It Works

Instead of predicting the simple match outcome (1/X/2), users predict:

1. **Home team's goal performance**: How many goals will the home team score?
   - 0 = Zero goals
   - 1 = One goal
   - 2 = Two goals
   - M = More than two goals

2. **Away team's goal performance**: How many goals will the away team score?
   - Same options: 0, 1, 2, or M

### Example Predictions

| Prediction | Meaning |
|------------|---------|
| Home: 1, Away: 0 | Home team scores 1 goal, away team scores 0 goals (1-0 result) |
| Home: 2, Away: 2 | Both teams score 2 goals (2-2 result) |
| Home: M, Away: 1 | Home team scores 3+ goals, away team scores 1 goal |

### Why It's Special

The 15th game creates a **Cartesian product** of combinations. If you select:
- 2 options for the home team (e.g., 1 and 2)
- 3 options for the away team (e.g., 0, 1, and M)

You get **2 x 3 = 6 combinations** just from game 15, which multiplies your total ticket cost.

---

## 6. Combinatorial System

One of the most powerful features of La Quiniela is the ability to select **multiple options per match**. This increases your chances of winning but also increases the cost.

### Terminology

| Term | Definition | Options Selected |
|------|------------|------------------|
| **Single** | One prediction per match | 1 option |
| **Double** | Two predictions per match | 2 options |
| **Triple** | Three predictions per match | 3 options |

### How Combinations Work

Each match where you select multiple options **multiplies** the total number of combinations:

- **Single**: 1 combination (no multiplication)
- **Double**: 2 combinations (multiplies by 2)
- **Triple**: 3 combinations (multiplies by 3)

### Example

If you make the following selections for 5 games:

| Game | Selection | Type | Combinations |
|------|-----------|------|--------------|
| 1 | 1 | Single | 1 |
| 2 | 1, X | Double | 2 |
| 3 | X | Single | 1 |
| 4 | 1, X, 2 | Triple | 3 |
| 5 | 2 | Single | 1 |

**Total combinations = 1 x 2 x 1 x 3 x 1 = 6 combinations**

Each combination represents a separate "bet" covering one possible outcome scenario.

---

## 7. Pricing Structure

The cost of a Quiniela ticket is based on the number of combinations created by your selections.

### Base Price

The standard base price per combination is **0.75 EUR**.

### Pricing Formula

The total price follows this mathematical formula:

```
Total Price = Base Price x 2^(doubles) x 3^(triples) x (Game15 Home Options x Game15 Away Options)
```

Where:
- **Base Price** = 0.75 EUR
- **doubles** = number of games where you selected exactly 2 options
- **triples** = number of games where you selected exactly 3 options
- **Game15 multiplier** = home options count multiplied by away options count

### Pricing Table

The system uses a lookup table for quick price calculation based on doubles and triples count:

| Doubles | Triples | Price (EUR) | Total Combinations |
|---------|---------|-------------|-------------------|
| 0 | 0 | 0.75 | 1 |
| 1 | 0 | 1.50 | 2 |
| 2 | 0 | 3.00 | 4 |
| 3 | 0 | 6.00 | 8 |
| 0 | 1 | 2.25 | 3 |
| 0 | 2 | 6.75 | 9 |
| 1 | 1 | 4.50 | 6 |
| 2 | 1 | 9.00 | 12 |
| 2 | 2 | 27.00 | 36 |
| 5 | 3 | 648.00 | 864 |
| 14 | 0 | 12,288.00 | 16,384 |

**Note**: The Game 15 multiplier is applied on top of these base prices.

### Price Progression Pattern

- Each additional **double** multiplies the price by 2
- Each additional **triple** multiplies the price by 3
- The **15th game** multiplies by (home selections x away selections)

---

## 8. Complete Calculation Example

Let's walk through a complete example to understand how pricing works.

### User's Selections

| Game | Home Team | Away Team | Selection | Type |
|------|-----------|-----------|-----------|------|
| 1 | Real Madrid | Barcelona | 1 | Single |
| 2 | Atletico | Sevilla | 1, X | Double |
| 3 | Valencia | Villarreal | X | Single |
| 4 | Real Sociedad | Athletic | 1, X, 2 | Triple |
| 5-14 | Various | Various | All singles | 10 Singles |
| 15 | Getafe | Celta | Home: 1, 2 / Away: 0, M | Pleno |

### Step-by-Step Calculation

**Step 1: Count combination types (Games 1-14)**
- Singles: 12 games
- Doubles: 1 game (Game 2)
- Triples: 1 game (Game 4)

**Step 2: Look up base price**
- Key = 1 double, 1 triple
- Base Price = 4.50 EUR

**Step 3: Calculate Game 15 multiplier**
- Home options: 2 (selected '1' and '2')
- Away options: 2 (selected '0' and 'M')
- Multiplier = 2 x 2 = 4

**Step 4: Calculate total**
- Total = 4.50 EUR x 4 = **18.00 EUR**

**Step 5: Verify with combinations**
- Games 1-14 combinations = 2^1 x 3^1 = 6
- Game 15 combinations = 2 x 2 = 4
- Total combinations = 6 x 4 = 24
- Price = 24 x 0.75 EUR = **18.00 EUR** (Verified!)

---

## 9. User Flow

### Registration and Setup

1. **User signs up** using email and password
2. **System detects location** using IP geolocation
3. **Currency is set automatically** based on country (EUR for Spain, USD for USA, etc.)
4. **User profile is created** with empty wallet
5. **User can update profile** with additional information (address, phone, etc.)

### Making a Prediction

1. **Navigate to Draws section** from dashboard
2. **View the 15 matches** for the current round
3. **Select predictions** for each game:
   - Games 1-14: Click 1, X, or 2 (can select multiple)
   - Game 15: Select home team options AND away team options
4. **View real-time cost calculation** as selections change
5. **Click Submit** to proceed to summary

### Checkout Process

1. **Review summary page** showing:
   - All 15 game predictions
   - Singles, doubles, and triples count
   - Total cost in user's currency

2. **Payment options**:
   - **Wallet balance**: If sufficient funds, deduct automatically
   - **Card payment**: If insufficient funds, redirect to secure payment page

3. **Order confirmation**: Receive confirmation and order ID

### Viewing Orders

1. **Orders page** shows all past prediction tickets
2. **Order details** include:
   - All predictions made
   - Amount paid
   - Order status (pending, complete, cancelled)
   - Date and time

---

## 10. Data Management

### Prediction Data Structure

When a user makes predictions, the following data is captured:

| Field | Description | Example |
|-------|-------------|---------|
| Selected Options | Map of game to selected options | Game 1: [1], Game 2: [1, X] |
| Total Amount | Calculated cost in EUR | 18.00 |
| Doubles Count | Number of games with 2 selections | 1 |
| Triples Count | Number of games with 3 selections | 1 |

### Data Flow

1. **Selection Phase**: Data stored in browser's local storage as user makes selections
2. **Summary Phase**: Data retrieved from local storage for review
3. **Payment Phase**: Data validated and prepared for order creation
4. **Storage Phase**: Data persisted to database as JSON when order is created

### Game 15 Data Transformation

During selection, Game 15 uses separate tracking for home and away:
- `game15_home`: [1, 2]
- `game15_away`: [0, M]

Before storage, this is transformed to a single entry:
- `Getafe - Celta`: "1,2 - 0,M"

### Option Ordering

Selected options are always sorted in canonical order: **1, X, 2, 0, M**

This ensures consistent display and comparison regardless of the order in which options were selected.

---

## 11. Authentication System

### User Registration

When a new user signs up:

1. **Account creation** with email and password
2. **Email verification** (optional based on configuration)
3. **Automatic profile setup**:
   - Geolocation detection via IP address
   - Country and city determination
   - Currency assignment based on country
   - Empty wallet creation

### User Roles

| Role | Permissions |
|------|-------------|
| **User** | Make predictions, manage wallet, view orders, update profile |
| **Admin** | All user permissions plus: manage matches, configure prizes, view all users/orders |

### Protected Routes

The following sections require authentication:
- Dashboard
- Draws/Predictions
- Orders
- Wallet
- Profile

Unauthenticated users are redirected to the sign-in page.

### Session Management

- Sessions are maintained securely
- Automatic session refresh
- Secure logout functionality

---

## 12. Payment Processing

### Wallet System

Users have a digital wallet for storing funds:

| Feature | Description |
|---------|-------------|
| **Balance** | Current available funds in user's currency |
| **Add Funds** | Deposit money via card payment |
| **Withdraw** | Request withdrawal of funds |
| **Transaction History** | View all deposits, withdrawals, and purchases |

### Payment Flow

```
User submits prediction
         |
         v
Check wallet balance >= total cost?
         |
    +----+----+
    |         |
   YES        NO
    |         |
    v         v
Deduct from    Redirect to
wallet         payment page
    |         |
    v         v
Create order   Process card
(complete)     payment
              |
              v
         Webhook confirms
         payment success
              |
              v
         Update order
         (complete)
              |
              v
         Add to wallet
         (if wallet top-up)
```

### Payment Types

1. **Wallet Top-Up**
   - User adds funds to wallet
   - Payment processed via card
   - Funds added to wallet balance on success

2. **Game Payment (Direct)**
   - User pays for prediction ticket
   - If wallet insufficient, redirected to card payment
   - Order created with "pending" status
   - Status updated to "complete" on payment confirmation

3. **Game Payment (Wallet)**
   - User has sufficient wallet balance
   - Amount deducted immediately
   - Order created with "complete" status

### Currency Handling

- All internal prices stored in EUR
- Converted to user's local currency for display
- Payment processed in user's local currency
- Exchange rates applied at time of transaction

---

## 13. Admin Features

### Dashboard Overview

Administrators have access to a dedicated dashboard showing:
- Total users
- Recent orders
- Wallet balances
- System status

### Match List Management

Admins create and manage the 15-match lists:

| Field | Description | Validation |
|-------|-------------|------------|
| Teams 1-15 (Home) | Home team for each match | Required, min 1 character |
| Teams 1-15 (Away) | Away team for each match | Required, min 1 character |
| Game Date | When matches will be played | Required, valid date |
| Jackpot | Prize pool amount | Required, minimum 1 |

### Prize Distribution

Configure how winnings are distributed:
- Categories (15 correct, 14 correct, etc.)
- Percentage allocation per category
- Minimum prize amounts

### User Management

- View all registered users
- See user profiles and wallet balances
- Track user activity and orders

### Order Management

- View all orders across all users
- Filter by status, date, user
- Track revenue and statistics

### Communication

- Send messages to users
- System notifications
- Support management

---

## 14. User Interface

### Prediction Table Layout

```
+-----+------------------------+-----+-----+-----+-----+-----+
|  #  |        MATCH           |  1  |  X  |  2  |  0  |  M  |
+-----+------------------------+-----+-----+-----+-----+-----+
|  1  | Real Madrid - Barca    | [*] | [ ] | [ ] |     |     |
+-----+------------------------+-----+-----+-----+-----+-----+
|  2  | Atletico - Sevilla     | [*] | [*] | [ ] |     |     |  <- Double
+-----+------------------------+-----+-----+-----+-----+-----+
|  3  | Valencia - Villarreal  | [ ] | [*] | [ ] |     |     |
+-----+------------------------+-----+-----+-----+-----+-----+
| ... | ...                    |     |     |     |     |     |
+-----+------------------------+-----+-----+-----+-----+-----+
| 14  | Mallorca - Las Palmas  | [*] | [ ] | [ ] |     |     |
+-----+------------------------+-----+-----+-----+-----+-----+
|     |    === PLENO AL 15 === |     |     |     |     |     |
+-----+------------------------+-----+-----+-----+-----+-----+
| 15  | Getafe (HOME)          | [*] | [ ] | [*] | [ ] | [ ] |
|     | Celta (AWAY)           | [ ] | [ ] | [ ] | [*] | [*] |
+-----+------------------------+-----+-----+-----+-----+-----+

[*] = Selected    [ ] = Not Selected
```

### Games 1-14
- Display: Match number, team names, options 1/X/2
- Options 0 and M are hidden (not applicable)
- Multiple selections allowed (creates doubles/triples)

### Game 15 (Pleno al 15)
- Split into two rows: Home team and Away team
- All 5 options available: 0, 1, 2, M
- Separate selections for each team
- Creates Cartesian product of combinations

### Summary Display

```
+---------------------------+
|     PREDICTION SUMMARY    |
+---------------------------+
| Singles:        12        |
| Doubles:         1        |
| Triples:         1        |
+---------------------------+
| Total to Pay:   18.00 EUR |
+---------------------------+
```

### Real-Time Updates

As users make selections:
- Total cost updates immediately
- Doubles/triples count updates
- Visual feedback on selected options
- Warning if approaching high costs

---

## 15. Key Differences from Official La Quiniela

| Feature | Official La Quiniela | Soccerteria |
|---------|---------------------|-------------|
| **Operator** | Spanish National Lottery | Private platform |
| **Base Price** | 0.75 EUR (fixed) | 0.75 EUR (configurable) |
| **Matches** | Official La Liga fixtures | Admin-configured matches |
| **Pleno al 15** | Score prediction (0-2+, M) | Same implementation |
| **Prize Structure** | Fixed percentages + rollovers | Jackpot-based |
| **Payment Methods** | Retail + official website | Digital wallet + card |
| **Currency** | EUR only | Multi-currency support |
| **Deadline** | Before first match kicks off | Admin-set game date |
| **Results** | Official match results | Manual or automated entry |
| **Availability** | Spain only | Global access |

---

## Appendix A: Glossary

| Term | Definition |
|------|------------|
| **La Quiniela** | Spanish football prediction lottery |
| **Pleno al 15** | Special rules for the 15th game predicting exact scores |
| **Single** | One prediction per match |
| **Double** | Two predictions per match (2x combinations) |
| **Triple** | Three predictions per match (3x combinations) |
| **Jackpot** | Total prize pool for a round |
| **Wallet** | User's stored balance for making purchases |
| **Game Date** | Deadline for predictions (before matches start) |

---

## Appendix B: User Types and Permissions

### Regular User

| Feature | Access |
|---------|--------|
| View matches | Yes |
| Make predictions | Yes |
| Manage wallet | Yes |
| View own orders | Yes |
| Update profile | Yes |
| View league tables | Yes |
| View live scores | Yes |

### Administrator

| Feature | Access |
|---------|--------|
| All user features | Yes |
| Create match lists | Yes |
| Edit match lists | Yes |
| Configure prizes | Yes |
| View all users | Yes |
| View all orders | Yes |
| Send communications | Yes |
| System settings | Yes |

---

## Appendix C: Order Statuses

| Status | Description |
|--------|-------------|
| **Pending** | Payment initiated but not confirmed |
| **Complete** | Payment confirmed, prediction recorded |
| **Cancelled** | Order cancelled by user or system |

---

## Appendix D: Supported Currencies

The system automatically detects user location and assigns the appropriate currency:

| Country | Currency | Symbol |
|---------|----------|--------|
| Spain | Euro | EUR |
| United States | US Dollar | USD |
| United Kingdom | British Pound | GBP |
| Mexico | Mexican Peso | MXN |
| Argentina | Argentine Peso | ARS |
| And more... | Based on country | Varies |

Currency conversion rates are applied in real-time for accurate pricing.

---

This documentation provides a complete reference for understanding the Soccerteria platform, a digital implementation of Spain's iconic La Quiniela football prediction lottery system.
