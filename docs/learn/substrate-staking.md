---
sidebar_label: Substrate & Staking
sidebar_position: 3
---

import Ordered from '@site/src/components/Ordered';
import Unordered from '@site/src/components/Unordered';

# Substrate, BABE, and Staking

An accessible guide to the core technologies powering the Hippius network.

## Substrate Framework

Substrate is a modular blockchain development framework created by Parity Technologies. It provides a flexible foundation for building custom blockchains without having to implement every component from scratch.

**Key benefits of Substrate for Hippius:**

<Unordered>
  <li><strong>Modularity</strong>: Customizable runtime modules (pallets) for specific functionality</li>
  <li><strong>Upgradability</strong>: Forkless runtime upgrades via on-chain governance</li>
  <li><strong>Performance</strong>: Efficient, lightweight client with WebAssembly execution</li>
  <li><strong>Flexibility</strong>: Adaptable to various consensus mechanisms and network designs</li>
</Unordered>

Hippius leverages Substrate's architecture to deliver a specialized blockchain optimized for decentralized storage and compute services.

## BABE Consensus Mechanism

Blind Assignment for Blockchain Extension (BABE) is the consensus protocol used by Hippius to determine block production rights.

**How BABE works:**

<Ordered>
  <li><strong>Epoch-based timing</strong>: The chain is divided into epochs (time periods)</li>
  <li><strong>VRF-based slot assignment</strong>: Validators use Verifiable Random Functions to determine if they have the right to produce a block in a given slot</li>
  <li><strong>Probabilistic finality</strong>: Initially provides probabilistic finality</li>
  <li><strong>GRANDPA finality</strong>: Works alongside GRANDPA for deterministic finality</li>
</Ordered>

This hybrid approach ensures both consistent block production and fast finality, making the network responsive while maintaining security.

## Nominated Proof-of-Stake (NPoS)

Hippius uses Nominated Proof-of-Stake to secure the network and distribute block rewards efficiently.

**Key components of NPoS:**

<Ordered>
  <li><strong>Validators</strong>: Node operators who produce blocks and validate transactions</li>
  <li><strong>Nominators</strong>: Token holders who stake their tokens to support validators</li>
  <li><strong>Stake-weighted selection</strong>: Validators are selected based on total stake (their own plus nominations)</li>
  <li><strong>Reward distribution</strong>: Rewards are distributed proportionally to stake</li>
</Ordered>

**Benefits of NPoS:**

<Unordered>
  <li>More energy-efficient than Proof-of-Work systems</li>
  <li>Broader participation than traditional Proof-of-Stake</li>
  <li>Economic security through stake slashing for malicious behavior</li>
  <li>Lower barrier to participation through nomination</li>
</Unordered>

## Economic Model

Staking on Hippius creates a robust economic model that aligns incentives for network security:

<Unordered>
  <li><strong>Bittensor Alpha Emission</strong>: As a Bittensor subnet, rewards are distributed in Alpha tokens controlled by Bittensor's emission schedule (maximum supply of 21M)</li>
  <li><strong>Marketplace Revenue Sharing</strong>: Stakers earn a proportional share of revenue generated from marketplace sales</li>
  <li><strong>Slashing</strong>: Economic penalties for validators who misbehave or go offline</li>
  <li><strong>Bonding periods</strong>: Tokens are locked during staking to ensure commitment</li>
  <li><strong>Reward distribution</strong>: Automatic distribution based on stake and validator performance</li>
</Unordered>

### Revenue Distribution

Marketplace revenue is distributed according to the following allocation:

<Unordered>
  <li><strong>60%</strong> to miners who provide storage and compute resources</li>
  <li><strong>30%</strong> to validators and stakers who secure the network</li>
  <li><strong>10%</strong> to treasury for ongoing development and ecosystem growth</li>
</Unordered>

By participating in staking, users not only earn rewards from token emissions and marketplace revenue but also contribute directly to the security and decentralization of the Hippius network.
