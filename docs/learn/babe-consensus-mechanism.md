# BABE Consensus Mechanism

import Ordered from '@site/src/components/Ordered';

Blind Assignment for Blockchain Extension (BABE) is the consensus protocol used by Hippius to determine block production rights.

**How BABE works:**

<Ordered>
  <li><strong>Epoch-based timing</strong>: The chain is divided into epochs (time periods)</li>
  <li><strong>VRF-based slot assignment</strong>: Validators use Verifiable Random Functions to determine if they have the right to produce a block in a given slot</li>
  <li><strong>Probabilistic finality</strong>: Initially provides probabilistic finality</li>
  <li><strong>GRANDPA finality</strong>: Works alongside GRANDPA for deterministic finality</li>
</Ordered>

This hybrid approach ensures both consistent block production and fast finality, making the network responsive while maintaining security.