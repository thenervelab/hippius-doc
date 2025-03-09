---
sidebar_position: 3
---

# Substrate, BABE, and Staking

An accessible guide to the core technologies powering the Hippius network.

## Substrate Framework

Substrate is a modular blockchain development framework created by Parity Technologies. It provides a flexible foundation for building custom blockchains without having to implement every component from scratch.

**Key benefits of Substrate for Hippius:**
- **Modularity**: Customizable runtime modules (pallets) for specific functionality
- **Upgradability**: Forkless runtime upgrades via on-chain governance
- **Performance**: Efficient, lightweight client with WebAssembly execution
- **Flexibility**: Adaptable to various consensus mechanisms and network designs

Hippius leverages Substrate's architecture to deliver a specialized blockchain optimized for decentralized storage and compute services.

## BABE Consensus Mechanism

Blind Assignment for Blockchain Extension (BABE) is the consensus protocol used by Hippius to determine block production rights.

**How BABE works:**
1. **Epoch-based timing**: The chain is divided into epochs (time periods)
2. **VRF-based slot assignment**: Validators use Verifiable Random Functions to determine if they have the right to produce a block in a given slot
3. **Probabilistic finality**: Initially provides probabilistic finality
4. **GRANDPA finality**: Works alongside GRANDPA for deterministic finality

This hybrid approach ensures both consistent block production and fast finality, making the network responsive while maintaining security.

## Nominated Proof-of-Stake (NPoS)

Hippius uses Nominated Proof-of-Stake to secure the network and distribute block rewards efficiently.

**Key components of NPoS:**
1. **Validators**: Node operators who produce blocks and validate transactions
2. **Nominators**: Token holders who stake their tokens to support validators
3. **Stake-weighted selection**: Validators are selected based on total stake (their own plus nominations)
4. **Reward distribution**: Rewards are distributed proportionally to stake

**Benefits of NPoS:**
- More energy-efficient than Proof-of-Work systems
- Broader participation than traditional Proof-of-Stake
- Economic security through stake slashing for malicious behavior
- Lower barrier to participation through nomination

## Economic Model

Staking on Hippius creates a robust economic model that aligns incentives for network security:

- **Bittensor Alpha Emission**: As a Bittensor subnet, rewards are distributed in Alpha tokens controlled by Bittensor's emission schedule (maximum supply of 21M)
- **Marketplace Revenue Sharing**: Stakers earn a proportional share of revenue generated from marketplace sales
- **Slashing**: Economic penalties for validators who misbehave or go offline
- **Bonding periods**: Tokens are locked during staking to ensure commitment
- **Reward distribution**: Automatic distribution based on stake and validator performance

### Revenue Distribution

Marketplace revenue is distributed according to the following allocation:
- **60%** to miners who provide storage and compute resources
- **30%** to validators and stakers who secure the network
- **10%** to treasury for ongoing development and ecosystem growth

By participating in staking, users not only earn rewards from token emissions and marketplace revenue but also contribute directly to the security and decentralization of the Hippius network.
