---
description: 6
---

# How Weights & Rewards Work

If you're running a miner or thinking about becoming one, this is how Hippius decides how much you earn. The system recalculates every 6 hours and distributes rewards automatically — no manual claiming needed.

## The Restaurant Analogy

Think of the Hippius weight system like a restaurant rating that determines how much of the tip pool each waiter gets.

A **manager (validator)** watches each waiter and scores them on two things: how many customers they served (bandwidth, 70%) and how many tables they manage (storage, 30%). The scoring uses a "diminishing returns" curve — going from 0 to 10 tables matters a lot more than going from 100 to 110.

Waiters can work in **teams (families)**. A team's reputation is built from its best members, but each additional member counts a little less than the previous one (80% decay). Only the top 10 members count. The team score is smoothed over time so one bad or good shift doesn't swing things wildly.

The **tip pool** itself isn't fixed — it depends on how busy the restaurant is. When the restaurant is full (the network stores lots of data), waiters get a bigger share. When it's slow, more goes to the house (validator).

Finally, each waiter's cut is simply their team's share of the total: `your_team_score / all_teams_scores * tip_pool`.

## How It Actually Works

The weight calculation flows through five layers:

### 1. Node Scoring

The validator observes each miner and scores it based on two metrics with a **log2 diminishing returns** curve:

- **Bandwidth served (70%)** — how much data you delivered in the reporting window
- **Storage held (30%)** — how much shard data you're storing

Your score is then multiplied by your uptime percentage, and any strikes or integrity failures are subtracted directly.

### 2. Family Aggregation

Miners can operate as a **family** — one account owning multiple child nodes. The family's weight is computed by taking the top 10 nodes, sorted by score, with each subsequent node contributing 80% of the previous one's factor.

The family weight is then smoothed with an exponential moving average (30% new value, 70% previous) and clamped so it can't jump more than 100 points per update cycle. This prevents sudden spikes from gaming.

### 3. Pool Economics

The total weight budget is 65,535 (the max value of a 16-bit integer). This budget is split between all miners and the validator based on how much real storage the network holds relative to token emissions. More storage on the network = bigger share for miners.

### 4. Weight Assignment

Each miner's final weight is their family's share of the total: `family_weight / all_families_weight * miner_pool`. Miners that go offline get zeroed out. New miners face an 80% weight reduction for the first ~100 minutes.

### 5. Rewards

Every 3,600 blocks (~6 hours), rewards are distributed proportionally based on weight and automatically staked to the node owner's account.

## What Matters Most

Ordered by impact on your rewards:

1. **Bandwidth (70% of your score)** — This is the biggest lever. The log2 curve means the first few GB matter far more than going from 100 TB to 200 TB. Focus on consistent, reliable bandwidth.

2. **Storage (30% of your score)** — Store more shard data. Same diminishing returns apply — initial capacity matters most.

3. **Uptime** — Your score is multiplied by your uptime. At 95% uptime you lose 5% of your score. At 50%, you lose half.

4. **Avoid penalties** — Each strike costs 50 weight points. Each integrity failure costs 100. Respond correctly to validator challenges and maintain data integrity.

5. **Stay online** — If your heartbeat goes stale, your weight drops to **zero**. Storage miners get ~5 hours of grace; other types get ~30 minutes.

6. **Family strategy: quality over quantity** — Adding nodes helps, but with heavy diminishing returns. Your best node contributes 100%, the second best 80%, third 64%, and so on. A few solid nodes beats many weak ones.

7. **Be patient** — New families get a minimum floor weight during a grace period. EMA smoothing means weight builds gradually, not overnight.

## Key Numbers

| Parameter | Value |
|-----------|-------|
| Bandwidth weight | 70% |
| Storage weight | 30% |
| Reward cycle | Every 6 hours (3,600 blocks) |
| Max nodes per family | Top 10 count |
| Rank decay per node | 80% of previous |
| Weight smoothing | 30% new / 70% previous |
| Max weight change per cycle | +/- 100 |
| Newcomer grace period | 24 update cycles |
| Offline threshold (storage) | ~5 hours |
| Offline threshold (other) | ~30 minutes |
| Strike penalty | 50 points |
| Integrity failure penalty | 100 points |

## Full Technical Reference

For the complete specification — formulas, code references, worked examples, and configuration parameters — see the detailed weight calculation documentation:

**[Hippius Subnet Weight Calculation — Full Technical Reference](https://github.com/thenervelab/thebrain/blob/main/readme_weights.md)**

## Ready to Start?

- [Set up a storage miner](/earn/storage-miner) — Start earning rewards by providing storage to the network
- [Run a blockchain node](/earn/arion/running-blockchain-node) — The first step to becoming a miner
- [Set up a validator](/earn/installing-validator) — Run the infrastructure that scores miners and submits weights
