# Hippius Subnet Weight Calculation System

This document explains how node weights are calculated in the Hippius storage subnet. The system uses a comprehensive scoring mechanism that evaluates multiple aspects of node performance to encourage reliability, efficiency, and network health.

:::warning Important Notice: Mining Competition and Hardware Requirements
Mining in this subnet is highly competitive and hardware requirements will increase over time.

As more miners join the network and upgrade their hardware:
- Performance benchmarks will naturally increase
- Minimum hardware requirements will trend upward
- Older or less powerful setups may see reduced rewards
- You may need to upgrade your hardware periodically
:::

## Overview

The final weight of each node is calculated on a scale of 1-65535 (16-bit) based on several key components:

### Base Scores (100%)
- Availability (35%)
- Performance (20%)
- Reliability (15%)
- Capacity (15%)
- Network (10%)
- Geographic Diversity (5%)

### Modifiers
- Bonuses (up to +30%)
- Penalties (up to -80%)
- Network Scaling Factor
- Relative Position Factor

## Component Breakdown

### 1. Availability Score
Measures the node's ability to respond to pin checks:
- Based on successful_pin_checks / total_pin_checks ratio
- Minimum 10 checks required to qualify
- Frequency bonus for nodes with >100 checks
- Long-term reliability bonus (>30 days)

### 2. Performance Score
Evaluates node's operational efficiency:
- Response Time (40%): Normalized score based on response latency
- Bandwidth (40%): Score based on available bandwidth (capped at 10Gbps)
- Storage Proof Time (20%): Efficiency of storage proof generation

### 3. Reliability Score
Assesses node's consistency:
- Uptime Ratio (50%): Minutes online vs total minutes
- Challenge Success (30%): Successful vs total challenges
- Stability Bonus (20%): Additional score for consistent performance
- Minimum 95% uptime expected for full score

### 4. Capacity Score
Evaluates storage capabilities:
- Usage Ratio (40%): Current vs total storage
- Growth Rate (30%): Storage growth over time
- Free Space Management (30%): Optimal range 60-80% usage
- Minimum requirement: 500GB storage ( will be increased over time )

### 5. Network Score
Measures network connectivity:
- Peer Count (35%): Progressive scoring based on peer connections
- Latency (35%): Network response time
- Stability (30%): Long-term connection reliability
- Minimum 10 peers required

### 6. Geographic Diversity Score
Promotes network decentralization:
- Distribution Quality (40%): Based on global node spread
- Location Uniqueness (40%): Rewards underrepresented regions
- Regional Balance (20%): Prevents regional concentration

## Detailed Scoring Mechanics

### Network Scaling Factor
The network scaling factor adjusts individual node scores based on overall network health:

```rust
network_scale = (avg_network_uptime * 60 + avg_success_rate * 40) / 100
```

- Averages all node metrics
- Weighted towards uptime stability
- Normalizes scores across network conditions

### Geographic Distribution Mechanics

```rust
uniqueness_score = SCALING_FACTOR - (location_count * SCALING_FACTOR / total_nodes)
distribution_score = (current_regions * SCALING_FACTOR) / target_regions
balance_score = if region_count > total/3 { SCALING_FACTOR/2 } else { SCALING_FACTOR }
```

- Minimum 5 distinct regions
- No region should exceed 33% of nodes
- Bonus for underrepresented regions

### Penalty System Details

```rust
downtime_penalty = min(hours * 10_000, 500_000)  // 1% per hour, max 50%
challenge_penalty = min(failures * 5_000, 300_000)  // 0.5% per failure, max 30%
```

- Maximum combined penalty of 80%
- Progressive application
- Recovery period considerations

## Bonus System

Additional rewards for:
- Long-term reliability (0.1% per day, max 20%)
- Perfect challenge performance (5%)
- Healthy storage growth (5%)

## Penalty System

Deductions for:
- Downtime (1% per hour, max 50%)
- Failed challenges (0.5% per failure, max 30%)
- Poor storage utilization (10%)
- Maximum combined penalty: 80%

## Relative Position Calculation

Compares node performance against the network:
- Minimum 25% base position
- Scaled based on performance ranking
- Competitive bonus for close scores
- Network scaling factor based on average performance

## Anti-Gaming Measures

- Minimum requirements for valid scoring
- Penalties for suspicious metrics
- Progressive scoring system
- Sanity checks on all metrics

## Edge Cases

The system handles various edge cases:
- New nodes with limited history
- Network outages
- Storage fluctuations
- Geographic isolation
- Peer connection issues

## Implementation Notes

- All calculations use saturating arithmetic to prevent overflow
- Internal scaling factor of 1,000,000 for precision
- Safe conversion between u32 and u64 where needed

## Performance Impact

Scores are most heavily influenced by:
1. Consistent uptime and availability
2. Storage efficiency and growth
3. Network connectivity and responsiveness
4. Geographic distribution
5. Long-term reliability

## Detailed Scoring Mechanics

### Composite Score Details
Used for relative positioning, combines multiple metrics into a single comparable value:

#### 1. Component Weights:
- Uptime Score (30%)
- Challenge Success (30%)
- Response Performance (20%)
- Storage Efficiency (20%)

#### 2. Multipliers:
```rust
final_score = (weighted_sum * penalty_multiplier) / SCALING_FACTOR
```

### Precision and Overflow Protection

#### 1. Internal Scaling:
```rust
const INTERNAL_SCALING: u32 = 1_000_000;
```
- All calculations use this factor for precision
- Prevents loss of significance in divisions
- Allows fine-grained differentiation

#### 2. Safe Arithmetic:
```rust
value.saturating_mul(scalar)
     .saturating_div(divisor)
```
- Prevents integer overflow
- Maintains score validity
- Handles edge cases safely

### Progressive Scoring Examples

#### 1. Uptime Scoring:
```rust
If uptime > 95%:
    score = base_score * 1.2  // 20% bonus
If uptime < 95%:
    score = base_score * 0.7  // 30% penalty
```

#### 2. Storage Utilization:
```rust
If 60% ≤ usage ≤ 80%:
    score = base_score * 1.2  // Optimal range bonus
If usage < 30% or usage > 90%:
    apply 10% penalty
```

#### 3. Peer Connections:
```rust
If peers < MIN_PEERS:
    score = (peer_count/MIN_PEERS) * 0.5  // Progressive penalty
If peers > MIN_PEERS:
    bonus = min((peers - MIN_PEERS) * 0.001, 0.5)  // Up to 50% bonus
```

### Long-term Performance Incentives

#### 1. Reliability Bonuses:
```rust
uptime_bonus = min(consecutive_days * 1_000, 200_000)  // 0.1% per day, max 20%
challenge_bonus = if perfect_history { 50_000 } else { 0 }  // 5% for perfect record
```

#### 2. Growth Incentives:
```rust
growth_bonus = if healthy_growth { 50_000 } else { 0 }  // 5% for sustained growth
```

### Practical Example

For a node with:
- 98% uptime
- 15 peers
- 70% storage utilization
- 5ms average response time
- No recent failures

The calculation flow would be:

#### 1. Base Scores:
```rust
Availability: ~980,000 (98%)
Performance: ~850,000 (85%)
Reliability: ~950,000 (95%)
Capacity: ~900,000 (90%)
Network: ~850,000 (85%)
Diversity: depends on network distribution
```

#### 2. Weighted Combination:
```rust
Base Weight = (980k*.35 + 850k*.20 + 950k*.15 + 900k*.15 + 850k*.10 + diversity*.05)
```

#### 3. Modifiers:
```rust
Bonus: +15% (long-term reliability)
No penalties
Network Scaling: Based on network averages
Position: Based on relative ranking
```

#### 4. Final Weight Scaling:
```rust
Final = (Base * Network_Scale * (1 + Bonus) * Position) / Scaling_Factors
```

## Best Practices for Node Operators

To achieve optimal weights:
1. Maintain stable uptime (>95%)
2. Provide adequate storage (>100GB)
3. Maintain healthy peer connections (>10 peers)
4. Keep storage utilization between 60-80%
5. Ensure good network connectivity
6. Choose underserved geographic locations 