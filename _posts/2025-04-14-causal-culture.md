---
title: 'The Culture of Causal Inference: From Theory to Practice: A ⟶ B'
date: 2025-04-14
permalink: /posts/2025/04/causal-culture/
tags:
  - eng
  - causality
  - CausalInference
  - Uber
  - data science
  - MachineLearning
  - Experiments
---

##  Foundations of Causal Inference

Back in the day, Ron Kohavi dedicated a good portion of his book to the culture of experimentation within companies — something halfway between corporate training and a set of empirical recipes. At that time, a full-fledged culture of causal inference had yet to emerge: there was neither a solid theoretical foundation nor real-world cases beyond traditional experiments.

The theoretical groundwork was laid by Schölkopf's student, **Sarah Magliken**. In her work (JMLR, 2020, [link](http://jmlr.org/papers/v21/17-123.html)), she and colleagues from the MIT-IBM Watson AI Lab proposed a universal methodology that allows the integration of heterogeneous data into a unified ontological system for causal analysis.

*(Image: Illustration of an SMM ad from one of Kohavi's followers, interpreting A/B testing a bit too literally.)*

---

## Uber's Journey to Causal Inference

Today, many companies strive to build a culture of causal inference: Causal Lens, Amazon, Zalando — all embracing this methodology. However, Uber was one of the first to articulate this as a core cultural principle. In 2019, they detailed their approach in a [blog post](https://www.uber.com/en-GB/blog/causal-inference-at-uber/).

Uber actively applies causal inference to decision-making, going beyond classical A/B testing. The key aspects of their approach include:

🔹 **Experiments as a standard**, but with awareness of real-world constraints. Uber uses causal analysis to account for violations of test conditions, effect heterogeneity, and external influences.
🔹 **Analysis beyond experiments.** The company develops methods to evaluate causal relationships even in situations where running an experiment is impossible.
🔹 **Causal inference as a strategic development tool.** Understanding causes—not just correlations—enables Uber to enhance user experience and improve operational efficiency.

Thus, at Uber, causal inference is not just analytics; it is a fundamental principle of data-driven decision-making.

![blog img](
https://blog.uber-cdn.com/cdn-cgi/image/width=2160,quality=80,onerror=redirect,format=auto/wp-content/uploads/2022/08/image1-17.png)

---

##  The Evolution of Causal Inference Since 2019

Since 2019, significant changes have reshaped the landscape of causal inference, not only expanding the toolkit but also strengthening the structural approach to data analysis. Here are some key areas of progress:

🔹 **Balancing Techniques** – Modern methods like matching, IP weighting, Double Robust Estimator, and others allow for handling *conditional exchangeability*, effectively mimicking interventions.
[Watch more here](https://youtu.be/Kx6W-Jq3OWE?si=gtIb6XjFZSQBdbGE)

🔹 **Optimal Experiments with Non-Additive Effects** – In real-world scenarios, interactions between variables are rarely additive. New methods enable accounting for combinations of effects.
[Learn more here](https://youtu.be/kMkIndQvLr8?si=7d_IaJ_EPLHTkAp5)

🔹 **Causal Discovery and Time Series Causal Discovery** – Automated detection of causal relationships, especially in time-series data, is becoming a powerful tool for analyzing complex systems.
[Explore more here](https://youtu.be/egnhtAr0Pto?si=U9IDNfehGXuzMs0W)

But most importantly, causal inference is no longer just a set of tools. It's a way of working with counterfactual scenarios, conducting detailed data analysis, and understanding the limitations of each method. CI is a culture, not just a recipe.

