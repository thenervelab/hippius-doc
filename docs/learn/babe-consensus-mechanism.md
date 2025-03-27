# BABE Consensus Mechanism

Blind Assignment for Blockchain Extension (BABE) is the consensus protocol used by Hippius to determine block production rights.

**How BABE works:**
1. **Epoch-based timing**: The chain is divided into epochs (time periods)
2. **VRF-based slot assignment**: Validators use Verifiable Random Functions to determine if they have the right to produce a block in a given slot
3. **Probabilistic finality**: Initially provides probabilistic finality
4. **GRANDPA finality**: Works alongside GRANDPA for deterministic finality

This hybrid approach ensures both consistent block production and fast finality, making the network responsive while maintaining security.