---
title: "Review of Chernozhukov's Causal ML Textbook"
date: 2024-04-05
permalink: /posts/2024/04/causal-textbook/
tags:
  - eng
  - causality
  - textbooks
  - causal-ml-book
---

On Twitter/X, there's been a lot of discussion about [Chernozhukov's textbook](http://causalml-book.org/), which came out on February 24th. Having read several chapters in detail and skimmed through the rest, here's my take on it.

### Strengths:
- **Core Structure**: The narrative begins with a general formulation that enables comparison of different identification strategies (graphical, balancing, experimental, and structural)
- **Notation**: Many topics are consolidated with relatively consistent notation (e.g., double robust methods are compared with conditional ignorability)
- **Topic Coverage**: Includes numerous deep topics (e.g., connection of regression and treatment effects)

### Disadvantages:
- **Layout**: The narrative template, borrowed from [this source](https://lnkd.in/eZq8CXjk), originally used a blogging logic with numerous notes and examples. However, in a technical manual, this approach feels redundant
- **Narrative Imbalance**: The division between advanced and general topics often seems arbitrary. Many explanations are omitted, the sequence feels random for newcomers, and the separation of predictive and causal methods appears as ax ante without proper justification
- **Unexplained Terms**: Several concepts (like Neyman Orthogonality) are treated as common knowledge when they're not, and there are many such instances throughout the book

### Verdict:
This book isn't suitable for beginners (and probably not for second-time learners either). Its main strength lies in attempting to bridge CS and Economics audiences while searching for universals. I plan to use it as a reference for specific cases and as a source for keywords and citations to original works. I hope it will provide economists with better insight into the CS perspective, which has historically treated the topic somewhat [superficially](https://lnkd.in/ewDbJE9a). 