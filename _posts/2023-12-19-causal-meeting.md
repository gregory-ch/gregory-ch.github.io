---
title: 'Trends from the Third Annual Causal Data Science Meeting'
date: 2023-12-19
permalink: /posts/2023/12/causal-meeting/
tags:
  - eng
  - causality
  - conferences
  - data science
---

Not so long ago, the third annual Causal Data Science Meeting was held on November 7-8. Among the trends this year, it is worth noting that, unlike in previous years, there are more and more papers on methods directly working in or being developed for production environments.

For example, a recently published [keynote](https://lnkd.in/dvwCMrTt) is devoted to how Root Cause Analysis (RCA) is applied in AMAZON. I was able to ask the speaker a question and he agreed with my assessment that augmented models will be one of the growth drivers in the next 5 years.

The growing interest in causal libraries (especially Microsoft's) also testifies to the penetration of the methods into the practices of European companies. It seems that the idea that treatment effect estimates are more robust to changes in the input distributions (varying with time or circumstances) is penetrating more deeply.

Among other notable presentations:
- A talk about Causal Bandits from DeepMind
- A presentation by Duda and Hornof (Dresden lab) showing that structural estimates, or MLs based on them, show more frequent evidence of higher precision than BlackBox models

For those interested in previous meetings, I recommend checking out [this blog](https://lnkd.in/dUuqEEjr) summarizing the results from previous years. It contains various interesting materials, and for those involved in demand analysis, I particularly recommend looking at the 2022 competition from Zalando, especially the winning models. 